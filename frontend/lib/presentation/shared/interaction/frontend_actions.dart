import 'dart:async';
import 'dart:io';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:file_picker/file_picker.dart';
import 'package:image_picker/image_picker.dart';
import 'package:path_provider/path_provider.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:share_plus/share_plus.dart';
import 'package:url_launcher/url_launcher.dart';
import '../figma/figma_prototype_controller.dart';
import 'app_navigation.dart';
import 'frontend_state.dart';
import 'interaction_values.dart';
import 'backend_actions.dart';
import '../../../data/repositories/firebase_app_state.dart';
import 'food_photo.dart';

/// Frontend commands. No Firebase writes, fake confirmations or server authority.
abstract final class FrontendActions {
  static final Set<String> _busy = {};
  static void message(BuildContext context, String text) {
    ScaffoldMessenger.of(context)
      ..removeCurrentSnackBar()
      ..showSnackBar(SnackBar(content: Text(text)));
  }

  static Future<String?> edit(
      BuildContext context, String title, String initial,
      {bool secret = false, TextInputType? keyboard}) async {
    final text = TextEditingController(text: initial);
    final result = await showDialog<String>(
        context: context,
        builder: (context) => AlertDialog(
                title: Text(title),
                content: TextField(
                    autofocus: true,
                    controller: text,
                    obscureText: secret,
                    keyboardType: keyboard,
                    decoration: InputDecoration(labelText: title)),
                actions: [
                  TextButton(
                      onPressed: () => Navigator.pop(context),
                      child: const Text('Hủy')),
                  FilledButton(
                      onPressed: () => Navigator.pop(context, text.text.trim()),
                      child: const Text('Lưu'))
                ]));
    await Future<void>.delayed(const Duration(milliseconds: 250));
    text.dispose();
    return result;
  }

  static Future<void> run(
      BuildContext context, String frame, Map<String, dynamic> spec) async {
    final c = FigmaPrototypeScope.of(context), s = c.frontend;
    // Guard commands too: a disabled button must not be bypassed by another tap target.
    if (!controlEnabled(s, spec)) return;
    final kind = spec['kind'], key = spec['key'] as String? ?? '';
    if (kind == 'choice') {
      s.choose(key, spec['value'].toString(),
          multiple: spec['multiple'] == true,
          initial: List<String>.from(
              spec['initial'] is List ? spec['initial'] : []));
      return;
    }
    if (['toggle', 'toggleCell', 'checkbox'].contains(kind)) {
      s.toggle(key, spec['initial'] == true);
      return;
    }
    if (kind == 'star') {
      s.set(key, spec['value']);
      return;
    }
    if (kind == 'step') {
      final max = spec['maxKey'] == 'selected.quantity'
          ? s.selectedFood.quantity
          : spec['maxKey'] == 'order.quantity'
              ? s.selectedOrder.quantity
              : (spec['max'] as num? ?? 10000).toInt();
      s.step(key, (spec['delta'] as num).toInt(),
          initial: (controlValue(s, spec) as num? ?? 0).toInt(),
          min: (spec['min'] as num? ?? 0).toInt(),
          max: max);
      return;
    }
    final action = spec['action'] as String? ?? 'navigate';
    final task = '$frame/${spec['source'] ?? key}/$action';
    if (!_busy.add(task)) return;
    void go(String route, {bool replace = false}) {
      if (context.mounted) {
        if (replace) {
          Navigator.pushReplacementNamed(context, route);
        } else {
          Navigator.pushNamed(context, route);
        }
      }
    }

    void next() {
      if (context.mounted) {
        unawaited(c.trigger(context, frame, spec['source'] as String?));
      }
    }

    try {
      if (await BackendActions.run(context, frame, spec)) return;
      if (!context.mounted) return;
      final protectedRole = switch (action) {
        'publish' ||
        'editListing' ||
        'closeListing' ||
        'acceptOrder' ||
        'rejectOrder' ||
        'confirmSchedule' =>
          'donor',
        'requestFood' ||
        'addNeed' ||
        'cancelOrder' ||
        'confirmReceipt' ||
        'distribute' ||
        'sendThanks' =>
          'charity',
        'acceptJob' || 'confirmPickup' || 'transferJob' => 'volunteer',
        _ => null
      };
      final statusKey = switch (protectedRole) {
        'donor' => 'VariableID:80:1173',
        'charity' => 'VariableID:80:1174',
        'volunteer' => 'VariableID:80:1175',
        _ => null
      };
      if (statusKey != null && c.values[statusKey] != 'approved') {
        go('/shared/verification-pending');
        return;
      }
      switch (action) {
        case 'editField':
          final mode = spec['mode'];
          if (mode == 'date') {
            final old = DateTime.tryParse(s.get(key, '')) ?? s.now();
            final value = await showDatePicker(
                context: context,
                initialDate: old.isAfter(s.now()) ? s.now() : old,
                firstDate: DateTime(1900),
                lastDate: s.now());
            if (value != null) s.set(key, FrontendState.dateKey(value));
          } else {
            final value = await edit(context, spec['label'] ?? 'Chỉnh sửa',
                s.get(key, spec['initial']?.toString() ?? ''),
                keyboard: mode == 'phone'
                    ? TextInputType.phone
                    : mode == 'number'
                        ? TextInputType.number
                        : null);
            if (value == null) break;
            if (value.isEmpty) {
              throw StateError('Thông tin không được để trống.');
            }
            if (mode == 'phone' &&
                !RegExp(r'^\+?\d{9,15}$')
                    .hasMatch(value.replaceAll(RegExp(r'[\s-]'), ''))) {
              throw StateError('Số điện thoại chưa hợp lệ.');
            }
            var savedValue = value;
            if (key == 'license.tax') {
              savedValue = value.replaceAll(
                  RegExp(
                      r'[\s.\-\u00a0\u200b-\u200d\u2010-\u2015\u202f\ufeff]'),
                  '');
              if (!RegExp(r'^(?:[0-9]{10}|[0-9]{13})$').hasMatch(savedValue)) {
                throw StateError(
                    'Mã số thuế phải gồm 10 hoặc 13 chữ số. Ví dụ: 0312458971 hoặc 0312458971001.');
              }
            }
            s.set(key, savedValue);
            if (s is FirebaseAppState &&
                ['profile.name', 'profile.phone', 'profile.address']
                    .contains(key)) {
              await s.command('updateProfile', {key.split('.').last: value});
            }
          }
        case 'licenseContinue':
          if (s.get('license.photo', '').isEmpty) {
            throw StateError('Hãy chụp hoặc tải ảnh giấy phép lên trước.');
          }
          go('/user/donor/facility-photos');
        case 'facilityContinue':
          if (!s.facilityComplete) {
            throw StateError('Cần đủ 5 ảnh bắt buộc.');
          }
          go('/user/donor/availability');
        case 'submitCommitment':
          if (!s.commitmentComplete) {
            throw StateError('Hãy xác nhận đủ 4 cam kết.');
          }
          if (!s.facilityComplete) {
            throw StateError('Hãy bổ sung đủ 5 ảnh cơ sở trước khi gửi.');
          }
          s.set('verification.donor', 'pending');
          go('/shared/verification-pending');
        case 'route':
          go(spec['route']);
        case 'back':
          mealBack(context);
        case 'pickTime':
          final old = s.get(key, spec['initial']?.toString() ?? '19:00');
          final time = RegExp(r'(\d{1,2}):(\d{2})').firstMatch(old);
          final picked = await showTimePicker(
              context: context,
              initialTime: TimeOfDay(
                  hour: int.tryParse(time?[1] ?? '19') ?? 19,
                  minute: int.tryParse(time?[2] ?? '0') ?? 0),
              builder: (context, child) => MediaQuery(
                  data: MediaQuery.of(context)
                      .copyWith(alwaysUse24HourFormat: true),
                  child: child!));
          if (picked != null) {
            s.set(key,
                '${picked.hour.toString().padLeft(2, '0')}:${picked.minute.toString().padLeft(2, '0')}');
          }
        case 'editAddress':
          final value = await edit(context, 'Địa chỉ lấy thực phẩm',
              s.get(key, spec['initial']?.toString() ?? ''));
          if (value != null && value.isNotEmpty) {
            if (key == 'food.address') {
              s.values.remove('food.latitude');
              s.values.remove('food.longitude');
            }
            s.set(key, value);
            if (s is FirebaseAppState && frame == '6:2504') {
              await s.command('updateProfile', {'address': value});
            }
          }
        case 'pickImage':
        case 'camera':
        case 'cameraNext':
          if (action == 'pickImage' && key == 'food.photo') {
            final photos =
                List<String>.from(s.values['food.photos'] as List? ?? []);
            final existing = s.get('food.photo', '');
            if (photos.isEmpty && existing.isNotEmpty) photos.add(existing);
            final remaining = 6 - photos.length;
            final selected = <XFile>[];
            if (remaining > 1) {
              selected.addAll(await ImagePicker().pickMultiImage(
                  imageQuality: 85, maxWidth: 1600, limit: remaining));
            } else if (remaining == 1) {
              final image = await ImagePicker().pickImage(
                  source: ImageSource.gallery,
                  imageQuality: 85,
                  maxWidth: 1600);
              if (image != null) selected.add(image);
            }
            if (remaining > 0 && selected.isEmpty) break;
            final dir = await getApplicationDocumentsDirectory();
            for (final image in selected.take(6 - photos.length)) {
              final dest =
                  '${dir.path}/sharemeal-${DateTime.now().microsecondsSinceEpoch}-${photos.length}.jpg';
              await File(image.path).copy(dest);
              photos.add(dest);
            }
            s.set('food.photos', photos);
            s.set('food.photo', photos.first);
            if (context.mounted) {
              await showMealSheet(
                  context,
                  'Ảnh món ăn',
                  StatefulBuilder(
                      builder: (context, refresh) =>
                          Column(mainAxisSize: MainAxisSize.min, children: [
                            const Text(
                                'Ảnh đầu tiên là ảnh đại diện. Tối đa 6 ảnh.'),
                            for (var i = 0; i < photos.length; i++)
                              ListTile(
                                  leading: SizedBox(
                                      width: 56,
                                      height: 56,
                                      child: Image(
                                          image: storedMealImage(photos[i]),
                                          fit: BoxFit.cover)),
                                  title: Text('Ảnh ${i + 1}'),
                                  trailing: IconButton(
                                      tooltip: 'Xóa ảnh',
                                      onPressed: () {
                                        photos.removeAt(i);
                                        s.set('food.photos',
                                            List<String>.from(photos));
                                        s.set('food.photo',
                                            photos.isEmpty ? '' : photos.first);
                                        refresh(() {});
                                      },
                                      icon: const Icon(Icons.delete_outline)))
                          ])));
            }
            break;
          }
          final file = await ImagePicker().pickImage(
              source: action == 'pickImage'
                  ? ImageSource.gallery
                  : ImageSource.camera,
              imageQuality: 85,
              maxWidth: 1600);
          if (file != null) {
            final dir = await getApplicationDocumentsDirectory();
            final dest =
                '${dir.path}/sharemeal-${DateTime.now().microsecondsSinceEpoch}.jpg';
            await File(file.path).copy(dest);
            s.set(
                key.isEmpty
                    ? frame == '6:1573'
                        ? 'receipt.photo'
                        : '$frame.photo'
                    : key,
                dest);
            if (s is FirebaseAppState && key == 'pickup.photo') {
              final url = await s.api.upload(dest, 'proof');
              await s.command(
                  'savePickupPhoto', {'id': s.selectedOrderId, 'path': url});
              s.set(key, url);
            }
            if (context.mounted) message(context, 'Đã chọn ảnh.');
            if (action == 'cameraNext') next();
          }
        case 'pickDocument':
          final file = await FilePicker.pickFile();
          if (file != null) {
            final bytes = await file.readAsBytes();
            final dir = await getApplicationDocumentsDirectory();
            final dest =
                '${dir.path}/sharemeal-${DateTime.now().microsecondsSinceEpoch}-${file.name.replaceAll(RegExp(r'[^\w.\-]'), '_')}';
            await File(dest).writeAsBytes(bytes);
            s.set(key, {'name': file.name, 'path': dest});
            if (context.mounted) message(context, 'Đã đính kèm ${file.name}');
          }
        case 'publish':
          s.publishFood();
          go('/user/donor/publish-success', replace: true);
        case 'editListing':
          s.editFood();
          go('/user/donor/listing-detail', replace: true);
        case 'discardEdit':
          s.values.removeWhere((k, v) => k.startsWith('edit.'));
          s.changed();
          go('/user/donor/listing-detail', replace: true);
        case 'closeListing':
          s.closeFood();
          go('/user/donor/my-listings', replace: true);
        case 'requestFood':
          s.requestFood();
          go('/user/organization/request-pending', replace: true);
        case 'addNeed':
          s.addNeed();
          go('/user/organization/needs', replace: true);
        case 'cancelOrder':
          s.transitionOrder('cancelled');
          go('/user/organization/orders', replace: true);
        case 'acceptOrder':
          s.transitionOrder('accepted');
          go('/user/donor/pickup-schedule');
        case 'rejectOrder':
          s.transitionOrder('rejected');
          if (context.mounted) message(context, 'Đã từ chối yêu cầu này.');
          go('/user/donor/incoming-requests', replace: true);
        case 'acceptJob':
          if (s.selectedOrder.status != 'accepted') {
            throw StateError(
                'Chỉ nhận chuyến đã được người cho chấp nhận và chưa có người giao.');
          }
          s.transitionOrder('assigned');
          c.values['VariableID:80:1177'] = true;
          next();
        case 'confirmPickup':
          if (!s.get('handover.verified', false)) {
            throw StateError(
                'Cần quét đúng mã QR hoặc nhập đúng PIN bàn giao trước.');
          }
          if (['recipient', 'delivery']
              .contains(c.values['VariableID:80:1182'])) {
            next();
            break;
          }
          if (s.selectedOrder.status != 'assigned') {
            throw StateError('Hãy nhận chuyến và đối chiếu mã bàn giao trước.');
          }
          s.transitionOrder('pickedUp');
          c.values['VariableID:80:1178'] = true;
          next();
        case 'confirmSchedule':
          if (s.selectedOrder.status == 'awaiting') {
            s.transitionOrder('accepted');
          }
          s.selectedOrder.time = s.get('pickup.time', '19:30');
          s.selectedOrder.note = s.get('pickup.note', '');
          s.changed();
          next();
        case 'nearestJob':
          final jobs = s.orders.where((o) => o.status == 'accepted').toList();
          if (jobs.isEmpty) {
            throw StateError('Hiện chưa có chuyến chờ tình nguyện viên.');
          }
          s.selectOrder(jobs.first.id);
          go('/user/volunteer/job-detail');
        case 'openFood':
          s.selectFood(spec['foodId']);
          go('/user/organization/food-detail');
        case 'confirmReceipt':
          if (s.get('receipt.condition', 'Tốt, đúng mô tả') == 'Có vấn đề') {
            go('/shared/report-discrepancy');
            break;
          }
          if (s.selectedOrder.status != 'pickedUp') {
            throw StateError(
                'Đơn chưa được xác nhận lấy hàng. Hãy hoàn tất bước bàn giao trước.');
          }
          s.transitionOrder('completed');
          s.set('warehouse.received',
              s.get('warehouse.received', 15) + s.selectedOrder.received);
          c.values['VariableID:80:1180'] = true;
          next();
        case 'distribute':
          s.distribute();
          c.values['VariableID:80:1186'] = true;
          go('/user/organization/distribution', replace: true);
        case 'sendMessage':
          s.sendMessage();
        case 'quickMessage':
          s.sendMessage(spec['value']);
        case 'thankTemplate':
          s.set('thanks.message', spec['value']);
        case 'sendThanks':
          final text = s
              .get('thanks.message',
                  'Cảm ơn Bếp Nhà Lan rất nhiều. Các em nhỏ đã có bữa đầy đủ.')
              .trim();
          if (text.isEmpty) {
            throw StateError('Hãy nhập lời cảm ơn trước khi gửi.');
          }
          s.set('thanks.sent', text);
          go('/user/organization/thank-you-sent', replace: true);
        case 'saveReview':
          s.set('review.saved', {
            'rating': s.get('review.rating', 4),
            'tags': s.values['review.tags'] ?? [],
            'note': s.get('review.note', '')
          });
          if (context.mounted) {
            message(context, 'Đã lưu đánh giá trên thiết bị.');
          }
          go('/user/donor/donation-history', replace: true);
        case 'submitTicket':
          s.submitTicket();
          go('/shared/support-status', replace: true);
        case 'readAll':
          s.set('notifications.readAll', true);
          if (context.mounted) {
            message(context, 'Đã đánh dấu tất cả là đã đọc.');
          }
        case 'exportPdf':
        case 'shareReport':
          final bytes =
              frame == '6:3076' ? await receiptPdf(s) : await reportPdf(s);
          if (!context.mounted) break;
          if (action == 'exportPdf') {
            final uri = await FilePicker.saveFile(
                fileName: frame == '6:3076'
                    ? 'ShareMeal-bien-lai.pdf'
                    : 'ShareMeal-tac-dong.pdf',
                bytes: bytes,
                mimeType: 'application/pdf');
            if (uri != null && context.mounted) {
              message(context, 'Đã lưu báo cáo PDF.');
            }
          } else {
            await SharePlus.instance.share(ShareParams(files: [
              XFile.fromData(bytes,
                  mimeType: 'application/pdf', name: 'ShareMeal-tac-dong.pdf')
            ], fileNameOverrides: [
              'ShareMeal-tac-dong.pdf'
            ]));
          }
        case 'renewCode':
          s.set('handover.pin', '${100000 + Random.secure().nextInt(900000)}');
          s.set(
              'handover.expires',
              DateTime.now()
                  .add(const Duration(minutes: 10))
                  .toIso8601String());
          s.set('handover.attempts', 0);
          if (context.mounted) {
            message(context, 'Đã tạo mã PIN mới, hiệu lực 10 phút.');
          }
        case 'pinDigit':
          final old = s.get('handover.entered', '');
          if (old.length < 6) {
            s.set('handover.entered', old + spec['value'].toString());
          }
        case 'pinErase':
          final old = s.get('handover.entered', '');
          if (old.isNotEmpty) {
            s.set('handover.entered', old.substring(0, old.length - 1));
          }
        case 'verifyPin':
          final pin = s.get('handover.entered', '');
          final attempts = s.get('handover.attempts', 0);
          final expiry = DateTime.tryParse(s.get('handover.expires', ''));
          if (attempts >= 3) {
            throw StateError('Đã nhập sai 3 lần. Hãy nhờ bên giao tạo mã mới.');
          }
          if (expiry != null && DateTime.now().isAfter(expiry)) {
            throw StateError('Mã đã hết hạn. Hãy tạo mã mới.');
          }
          final receipt = ['recipient', 'delivery']
              .contains(c.values['VariableID:80:1182']);
          if (pin.length != 6 ||
              pin !=
                  (receipt
                      ? s.get('receipt.pin', '482913')
                      : s.get('handover.pin', '472914'))) {
            s.set('handover.attempts', attempts + 1);
            throw StateError('Mã không đúng. Còn ${2 - attempts} lần thử.');
          }
          s.set('handover.verified', true);
          if (!receipt && s.selectedOrder.status == 'assigned') {
            s.transitionOrder('pickedUp');
          }
          next();
        case 'transferJob':
          final reason = s.get('transfer.reason', 'Có việc đột xuất');
          final person = s.get('transfer.recipient', 'Minh Toàn');
          if (!['assigned', 'pickedUp'].contains(s.selectedOrder.status)) {
            throw StateError('Chỉ chuyển giao chuyến đang thực hiện.');
          }
          s.selectedOrder.driver = person;
          s.set('transfer.sent', {
            'reason': reason,
            'recipient': person,
            'orderId': s.selectedOrderId
          });
          s.changed();
          if (context.mounted) {
            message(context, 'Đã lưu yêu cầu chuyển giao trên thiết bị.');
          }
          go('/user/volunteer/calendar', replace: true);
        case 'copyWeek':
          for (var day = 1; day < 7; day++) {
            for (var slot = 0; slot < 4; slot++) {
              s.values['availability.${slot * 7 + day}'] =
                  s.get('availability.${slot * 7}', slot < 2);
            }
          }
          s.changed();
        case 'inspectFood':
          await showMealSheet(
              context,
              'Kiểm tra trước khi nhận',
              const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                        '✓ Đối chiếu tên món và số lượng\n\n✓ Bao bì sạch, có nắp, không bị đổ\n\n✓ Không có dấu hiệu ôi thiu\n\nNếu có vấn đề, chọn “Có vấn đề” và ghi nhận bằng chứng.')
                  ]));
        case 'call':
          final phone = await edit(
              context, 'Số điện thoại liên hệ', s.get('contact.phone', ''),
              keyboard: TextInputType.phone);
          if (phone != null && phone.isNotEmpty) {
            if (!RegExp(r'^\+?[\d\s-]{8,15}$').hasMatch(phone)) {
              throw StateError('Số điện thoại chưa hợp lệ.');
            }
            s.set('contact.phone', phone);
            if (!await launchUrl(Uri(scheme: 'tel', path: phone),
                mode: LaunchMode.externalApplication)) {
              throw StateError('Không mở được ứng dụng gọi điện.');
            }
          }
        case 'directions':
          final uri = Uri.https('www.google.com', '/maps/search/',
              {'api': '1', 'query': s.selectedFood.address});
          if (!await launchUrl(uri, mode: LaunchMode.externalApplication)) {
            throw StateError('Không mở được bản đồ trên thiết bị.');
          }
        case 'addCalendar':
          final today = DateTime.now();
          final day = s.get('pickup.day', 'Hôm nay');
          final selectedDay = day == 'Ngày mai'
              ? today.add(const Duration(days: 1))
              : day == 'Thứ 6'
                  ? today.add(
                      Duration(days: (DateTime.friday - today.weekday + 7) % 7))
                  : today;
          final clock = RegExp(r'(\d{1,2}):(\d{2})')
              .firstMatch(s.get('pickup.time', s.selectedOrder.time));
          final start = DateTime(
                  selectedDay.year,
                  selectedDay.month,
                  selectedDay.day,
                  int.tryParse(clock?[1] ?? '19') ?? 19,
                  int.tryParse(clock?[2] ?? '30') ?? 30)
              .toUtc();
          String stamp(DateTime d) =>
              '${d.toIso8601String().replaceAll(RegExp(r'[-:]'), '').split('.').first}Z';
          final dir = await getTemporaryDirectory();
          final file = File('${dir.path}/sharemeal-pickup.ics');
          await file.writeAsString(
              'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\nUID:${s.selectedOrder.id}@sharemeal\r\nDTSTAMP:${stamp(DateTime.now().toUtc())}\r\nDTSTART:${stamp(start)}\r\nDTEND:${stamp(start.add(const Duration(minutes: 30)))}\r\nSUMMARY:ShareMeal - Nhan thuc pham\r\nLOCATION:${s.selectedFood.address}\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n');
          await SharePlus.instance.share(ShareParams(
              files: [XFile(file.path, mimeType: 'text/calendar')]));
        case 'language':
          if (!context.mounted) break;
          final value = await showDialog<String>(
              context: context,
              builder: (context) => SimpleDialog(
                      title: const Text('Ngôn ngữ ứng dụng'),
                      children: [
                        SimpleDialogOption(
                            onPressed: () =>
                                Navigator.pop(context, 'Tiếng Việt'),
                            child: const Text('Tiếng Việt'))
                      ]));
          if (value != null) s.set('settings.language', value);
        case 'registerShift':
          s.registerShift();
          go('/user/volunteer/calendar', replace: true);
        case 'cancelShift':
          s.cancelShift(s.calendarDate);
          if (context.mounted) {
            message(context, 'Đã hủy ca tình nguyện trên thiết bị.');
          }
        case 'changePassword':
          // Password changes require Authentication, deliberately not faked locally.
          await showMealSheet(
              context,
              'Bảo mật tài khoản',
              const Text(
                  'Bản hiện tại đang kiểm thử giao diện với dữ liệu cục bộ. Đổi mật khẩu cần Firebase Authentication và sẽ được kết nối trong giai đoạn backend. Mật khẩu không được lưu trên thiết bị.'));
        case 'editContact':
          final value =
              await edit(context, 'Email liên hệ', s.get('profile.email', ''));
          if (value != null &&
              RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$').hasMatch(value)) {
            s.set('profile.email', value);
          }
        case 'resendCode':
          await showMealSheet(
              context,
              'Xác thực email',
              const Text(
                  'Chưa gửi email thật trong giai đoạn frontend. Mã kiểm thử cục bộ: 123456.'));
        case 'togglePassword':
          s.toggle('$key.visible');
        case 'logout':
          s.values.removeWhere((k, v) => k.startsWith('auth.'));
          s.changed();
          if (context.mounted) {
            Navigator.pushNamedAndRemoveUntil(
                context, '/auth/login', (_) => false);
          }
        default:
          final label = spec['label']?.toString() ?? '';
          if (frame == '6:3259' && label == 'Hủy thay đổi') {
            s.values.removeWhere((k, v) => k.startsWith('edit.'));
            s.changed();
          }
          if (frame == '6:370' && label.startsWith('Tiếp tục')) {
            if (s.get('food.name', 'Cơm gà xối mỡ').trim().isEmpty) {
              throw StateError('Hãy nhập tên món ăn.');
            }
          }
          if (frame == '6:416' && label.startsWith('Tiếp tục')) {
            for (final k in ['untouched', 'packed', 'fresh']) {
              if (!s.get('food.safe.$k', true)) {
                throw StateError(
                    'Cần xác nhận đủ 3 điều kiện an toàn trước khi chia sẻ.');
              }
            }
          }
          if (label == 'Xem lại tin đăng' &&
              s.get('food.address', '45 Nguyễn Thị Minh Khai').trim().isEmpty) {
            throw StateError('Hãy chọn địa chỉ lấy thực phẩm.');
          }
          if (frame == '6:246' && label == 'Đăng nhập') {
            if (!c.validateForm(frame, context)) break;
            if (context.mounted) {
              message(context, 'Chế độ kiểm thử giao diện · Dữ liệu cục bộ');
            }
          }
          if (frame == '46:526' && label.startsWith('Tạo tài khoản')) {
            if (!c.validateForm(frame, context)) break;
          }
          if (frame == '6:295' && label.startsWith('Xác nhận')) {
            if (s.get('auth.otp', '') != '123456') {
              throw StateError(
                  'Nhập mã kiểm thử 123456. Chưa kết nối gửi email thật.');
            }
          }
          if (label.startsWith('Gửi hồ sơ') ||
              label == 'Gửi lại phần bổ sung') {
            if (!c.validateForm(frame, context)) break;
            final checks = switch (frame) {
              '64:1314' => ['verification.individual.consent'],
              '64:880' => ['verification.organization.consent'],
              '64:933' => [
                  'verification.volunteer.bag',
                  'verification.volunteer.sealed',
                  'verification.volunteer.recipient'
                ],
              _ => <String>[],
            };
            if (checks.any((key) => !s.get(key, false))) {
              throw StateError(
                  'Hãy xác nhận đầy đủ các điều kiện trước khi gửi.');
            }
            s.set('verification.${c.values['VariableID:80:1172']}', 'pending');
          }
          if (label == 'Phê duyệt hồ sơ') {
            for (var index = 0; index < 3; index++) {
              if (!s.get('admin.audit.$frame.$index', false)) {
                throw StateError(
                    'Hãy đối chiếu đủ các điều kiện trước khi phê duyệt.');
              }
            }
            s.set(
                'verification.${frame == '77:1321' ? 'charity' : frame == '77:1384' ? 'volunteer' : 'donor'}',
                'approved');
          }
          if (['6:3798', '77:1321', '77:1384'].contains(frame) &&
              ['Yêu cầu bổ sung', 'Từ chối'].contains(label)) {
            s.set(
                'verification.${frame == '77:1321' ? 'charity' : frame == '77:1384' ? 'volunteer' : 'donor'}',
                label == 'Từ chối' ? 'rejected' : 'supplement');
          }
          if (frame == '6:2504' && label.startsWith('Báo cáo tác động')) {
            go(c.values['VariableID:80:1172'] == 'donor'
                ? '/user/donor/impact-report'
                : '/user/organization/impact-report');
            break;
          }
          if (frame == '6:2504' && label.startsWith('Địa chỉ')) {
            final value = await edit(context, 'Địa chỉ của tôi',
                s.get('food.address', s.selectedFood.address));
            if (value != null && value.isNotEmpty) s.set('food.address', value);
            break;
          }
          next();
      }
    } on StateError catch (e) {
      if (context.mounted) message(context, e.message.toString());
    } on PlatformException catch (e) {
      if (context.mounted) {
        message(
            context,
            e.code.contains('denied')
                ? 'Chưa được cấp quyền truy cập. Bạn có thể cấp quyền trong cài đặt thiết bị.'
                : 'Không thể thực hiện trên thiết bị: ${e.message ?? e.code}');
      }
    } catch (e) {
      if (context.mounted) {
        message(context, FirebaseAppState.readableError(e));
      }
    } finally {
      _busy.remove(task);
    }
  }

  static Future<Uint8List> reportPdf(FrontendState s) async {
    final font =
        pw.Font.ttf(await rootBundle.load('assets/fonts/Inter-Variable.ttf'));
    final period = s.get('impact.period', 'Tháng'),
        stats = s.impact(s.get('impact.period', 'Tháng'));
    final pdf = pw.Document();
    pdf.addPage(pw.MultiPage(
        theme: pw.ThemeData.withFont(base: font, bold: font),
        build: (_) => [
              pw.Header(
                  level: 0, child: pw.Text('ShareMeal · Báo cáo tác động')),
              pw.Text(
                  'Kỳ: $period · Ngày xuất: ${DateTime.now().toLocal().toString().split('.').first}'),
              pw.SizedBox(height: 20),
              pw.Text(
                  'Suất ăn đã chia sẻ: ${stats['meals']}\nThực phẩm tiết kiệm: ${stats['kg']} kg\nĐơn hoàn tất: ${stats['orders']}'),
              pw.SizedBox(height: 20),
              pw.Text(s is FirebaseAppState
                  ? 'Dữ liệu các đơn hoàn tất đã đồng bộ từ Firebase. Khối lượng là ước tính từ số suất.'
                  : 'Dữ liệu kiểm thử cục bộ trên thiết bị, chưa đồng bộ máy chủ.'),
              pw.SizedBox(height: 20),
              for (final e in s.history.where((e) =>
                  (e['daysAgo'] as num) <
                  (period == 'Tuần'
                      ? 7
                      : period == 'Tháng'
                          ? 31
                          : 366)))
                pw.Padding(
                    padding: const pw.EdgeInsets.only(bottom: 8),
                    child: pw.Text(
                        '${e['name']} · ${e['quantity']} suất · ${e['kg']} kg')),
            ]));
    return pdf.save();
  }

  static Future<Uint8List> receiptPdf(FrontendState s) async {
    final font =
        pw.Font.ttf(await rootBundle.load('assets/fonts/Inter-Variable.ttf'));
    final pdf = pw.Document(), order = s.selectedOrder, food = s.selectedFood;
    pdf.addPage(pw.Page(
        theme: pw.ThemeData.withFont(base: font),
        build: (_) => pw.Column(
                crossAxisAlignment: pw.CrossAxisAlignment.start,
                children: [
                  pw.Header(
                      level: 0, child: pw.Text('ShareMeal · Biên lai điện tử')),
                  pw.Text(
                      'Mã đơn: ${order.id}\nBên cho: ${food.donor}\nBên nhận: ${order.organization}\nNgười giao: ${order.driver}\nThực phẩm: ${food.name}\nSố suất xác nhận: ${order.received}\nTrạng thái: ${order.status}'),
                  pw.SizedBox(height: 24),
                  pw.Text(s is FirebaseAppState
                      ? 'Biên lai từ dữ liệu đơn đã đồng bộ Firebase; không phải hóa đơn tài chính.'
                      : 'Dữ liệu kiểm thử cục bộ, chưa phải chứng từ do máy chủ xác thực.')
                ])));
    return pdf.save();
  }
}
