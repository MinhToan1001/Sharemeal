import 'package:flutter/material.dart';
import 'dart:convert';
import '../controllers/firebase_app_state.dart';
import '../../../app/routing/session_route_gate.dart';
import '../figma/figma_prototype_controller.dart';
import 'app_navigation.dart';
import 'frontend_actions.dart';
import 'frontend_state.dart';
import 'food_expiry.dart';
import 'package:url_launcher/url_launcher.dart';

/// Adapter for the existing Figma form controls. Server data never uses local
/// demo commands; successful navigation follows the server acknowledgement.
abstract final class FirebaseActions {
  static Future<bool> run(
      BuildContext context, String frame, Map<String, dynamic> spec) async {
    final c = FigmaPrototypeScope.of(context), state = c.frontend;
    if (state is! FirebaseAppState) return false;
    final s = state,
        action = spec['action'] ?? 'navigate',
        label = spec['label']?.toString() ?? '';
    if (frame == '6:370' &&
        label.startsWith('Tiếp tục') &&
        s.get('food.name', '').trim().isEmpty) {
      throw StateError('Hãy nhập tên món ăn.');
    }
    if (label == 'Xem lại tin đăng' &&
        s.get('food.address', '').trim().isEmpty) {
      throw StateError('Hãy nhập địa chỉ lấy thực phẩm.');
    }
    // A realtime update can remove a request card before its command ACK.
    // Keep the route's navigator/messenger instead of that disposable row.
    final navigation = Navigator.of(context);
    final feedback = ScaffoldMessenger.of(context);
    final origin = ModalRoute.of(context);
    void go(String path, {Object? arguments}) {
      if (navigation.mounted && (origin?.isCurrent ?? true)) {
        if (path.startsWith('/auth/') ||
            frame == '6:246' ||
            frame == '46:526') {
          navigation.pushNamedAndRemoveUntil(path, (_) => false);
        } else {
          navigation.pushNamed(path, arguments: arguments);
        }
      }
    }

    void message(String text) {
      if (feedback.mounted && (origin?.isCurrent ?? true)) {
        feedback.showSnackBar(SnackBar(content: Text(text)));
      }
    }

    Future<String> uploadPhoto(String key, String folder) async {
      var photo = s.get(key, '');
      if (photo.isNotEmpty &&
          !photo.startsWith('https://res.cloudinary.com/')) {
        photo = await s.api.upload(photo, folder);
        s.set(key, photo);
      }
      return photo;
    }

    Future<String?> choose(
            String title, List<Map<String, dynamic>> rows, String key) =>
        showDialog<String>(
            context: context,
            builder: (context) => SimpleDialog(title: Text(title), children: [
                  for (final row in rows)
                    SimpleDialogOption(
                        onPressed: () => Navigator.pop(context, '${row[key]}'),
                        child: Text('${row['name'] ?? row['id']}'))
                ]));
    if (frame == '64:1230' &&
        ['64:1246', '64:1253', '64:1257'].contains(spec['source'])) {
      final role = switch (spec['source']) {
        '64:1253' => 'charity',
        '64:1257' => 'volunteer',
        _ => 'donor'
      };
      if (s.role == role && s.approved) {
        s.values.remove('application.role');
        go(homeRoute(s.role));
      } else {
        s.set('application.role', role);
        go(applicationRoute(role));
      }
      return true;
    }
    if (frame == '64:1199' && label.startsWith('Lưu mật khẩu')) {
      final email =
          s.get('auth.forgot_password.email.hoac.so.dien.thoai', '').trim();
      await s.services.auth.sendPasswordResetEmail(email: email);
      s.values.removeWhere((k, _) => k.startsWith('auth.forgot_password.'));
      message('Đã gửi liên kết đặt lại mật khẩu. Hãy mở email để tiếp tục.');
      go('/auth/login');
      return true;
    }
    if (frame == '6:268' &&
        ['98:1302', '98:1313', '98:1321'].contains(spec['source'])) {
      final role = switch (spec['source']) {
        '98:1313' => 'charity',
        '98:1321' => 'volunteer',
        _ => 'donor'
      };
      s.set('application.role', role);
      c.values['VariableID:80:1172'] = role;
      return true;
    }

    if (frame == '6:246' && label == 'Đăng nhập') {
      if (!c.validateForm(frame, context)) return true;
      await s.login(s.get('auth.login.email.hoac.so.dien.thoai', ''),
          s.get('auth.login.mat.khau', ''));
      s.values.removeWhere((k, _) => k.startsWith('auth.'));
      go(s.verified
          ? s.role.isEmpty
              ? '/auth/role-selection'
              : homeRoute(s.role)
          : '/auth/email-verification');
      return true;
    }
    if (frame == '46:526' && label.startsWith('Tạo tài khoản')) {
      if (!c.validateForm(frame, context)) return true;
      if (!s.get(
          'register.check.toi.dong.y.voi.ieu.khoan.su.dung.va.chi', true)) {
        throw StateError('Cần đồng ý điều khoản sử dụng.');
      }
      final email = s.get('auth.register.email.hoac.so.dien.thoai', ''),
          password = s.get('auth.register.mat.khau', ''),
          name = s.get('auth.register.ho.va.ten', '');
      try {
        await s.register(email, password, name);
      } finally {
        s.values.removeWhere((k, _) => k.contains('mat.khau'));
      }
      go('/auth/email-verification');
      return true;
    }
    if (frame == '6:295' && label.startsWith('Xác nhận')) {
      await s.confirmEmailVerification();
      go(s.role.isEmpty ? '/auth/role-selection' : homeRoute(s.role));
      return true;
    }
    if (action == 'resendCode') {
      await s.sendVerificationEmail();
      message('Đã gửi liên kết xác minh đến ${s.user?.email}.');
      return true;
    }
    if (action == 'logout' || label.startsWith('Đăng xuất')) {
      await s.logout();
      go('/auth/login');
      return true;
    }
    if (action == 'changePassword') {
      await s.services.auth.sendPasswordResetEmail(email: s.user!.email!);
      message('Đã gửi liên kết đặt lại mật khẩu qua email.');
      return true;
    }
    if (action == 'editContact' && frame == '6:295') {
      await s.logout();
      go('/auth/register');
      return true;
    }
    if (label == 'Tiếp tục với vai trò đã chọn') {
      final role = c.values['VariableID:80:1172']?.toString() ?? 'donor';
      if (s.role.isEmpty) await s.command('selectRole', {'role': role});
      s.set('application.role', role);
      go(applicationRoute(role));
      return true;
    }
    if (frame == '64:1116' && label == 'Gửi lại phần bổ sung') {
      final file =
          Map<String, dynamic>.from(s.values['supplement.file'] as Map? ?? {});
      var path = '${file['path'] ?? ''}';
      if (path.isEmpty) throw StateError('Hãy chọn tài liệu bổ sung.');
      if (!path.startsWith('https://res.cloudinary.com/')) {
        path = await s.api.upload(path, 'documents');
      }
      final old = s
              .rows('applications')
              .where((a) => a['id'] == s.profile['applicationId'])
              .firstOrNull ??
          {};
      await s.command('submitApplication', {
        'role': old['role'] ?? s.role,
        'documents': [
          ...List<String>.from(old['documents'] as List? ?? []),
          path
        ],
        'details': old['details'] ?? 'Tài liệu bổ sung',
        'consent': true
      });
      go('/shared/verification-pending');
      return true;
    }
    if (label.startsWith('Gửi hồ sơ') ||
        label == 'Gửi lại phần bổ sung' ||
        action == 'submitCommitment') {
      if (!c.validateForm(frame, context)) return true;
      final role = s.get('application.role', s.role);
      final checks = switch (frame) {
        '64:1314' => ['verification.individual.consent'],
        '64:880' => ['verification.organization.consent'],
        '64:933' => [
            'verification.volunteer.bag',
            'verification.volunteer.sealed',
            'verification.volunteer.recipient'
          ],
        _ => FrontendState.commitmentKeys
            .map((k) => 'onboarding.commitment.$k')
            .toList(),
      };
      if (checks.any((k) => !s.get(k, false))) {
        throw StateError('Hãy xác nhận đủ các cam kết.');
      }
      final prefix = switch (frame) {
        '64:1314' => 'individual_verification.file.',
        '64:880' => 'organization_profile.file.',
        '64:933' => 'volunteer_profile.file.',
        _ => 'facility.photo.',
      };
      final evidence = s.values.entries
          .where((e) =>
              e.key.startsWith(prefix) ||
              prefix == 'facility.photo.' && e.key == 'license.photo')
          .toList();
      final docs = <String>[];
      final docLabels = <String, String>{};
      for (final e in evidence) {
        final value = e.value is Map
            ? e.value['path']?.toString() ?? ''
            : e.value.toString();
        if (value.isEmpty) continue;
        final url = value.startsWith('https://res.cloudinary.com/')
            ? value
            : await s.api.upload(value, 'documents');
        s.values[e.key] =
            e.value is Map ? {...e.value as Map, 'path': url} : url;
        docs.add(url);
        docLabels[url] = switch (e.key) {
          'license.photo' => 'Giấy phép kinh doanh',
          'facility.photo.front' => 'Mặt tiền cơ sở',
          'facility.photo.kitchen' => 'Khu chế biến',
          'facility.photo.fridge' => 'Khu bảo quản',
          'facility.photo.washing' => 'Khu vệ sinh dụng cụ',
          'facility.photo.certificate' => 'Giấy tờ an toàn thực phẩm',
          _ => e.value is Map
              ? '${e.value['name'] ?? 'Tài liệu xác minh ${docs.length}'}'
              : e.key.contains('anh.dia.diem')
                  ? 'Ảnh địa điểm nhận'
                  : 'Ảnh xác minh ${docs.length}',
        };
      }
      if (docs.isEmpty) {
        throw StateError('Hãy đính kèm giấy tờ xác minh trước khi gửi.');
      }
      if (prefix == 'facility.photo.' &&
          (!s.facilityComplete || s.get('license.photo', '').isEmpty)) {
        throw StateError('Hãy bổ sung giấy phép và đủ 5 ảnh cơ sở.');
      }
      final profilePrefix = role == 'charity' ? 'organization' : role;
      await s.command(
          'updateProfile',
          {
            'name':
                s.get('profile.$profilePrefix.name', s.get('profile.name', '')),
            'address': s.get(
                'profile.$profilePrefix.address', s.get('profile.address', '')),
          }..removeWhere((_, v) => v.toString().trim().isEmpty));
      await s.command('submitApplication', {
        'role': role,
        'consent': true,
        'documents': docs,
        'details': jsonEncode({
          ...Map.fromEntries(s.values.entries.where((e) =>
              [
                'profile.name',
                'profile.email',
                'profile.phone',
                'profile.address'
              ].contains(e.key) ||
              e.key.startsWith('profile.$profilePrefix.') ||
              role == 'volunteer' && e.key == 'profile.vehicle' ||
              role == 'donor' &&
                  prefix == 'facility.photo.' &&
                  (e.key.startsWith('license.') ||
                      e.key.startsWith('availability.')))),
          'documentLabels': docLabels,
        }),
      });
      go('/shared/verification-pending');
      return true;
    }
    if (label == 'Kiểm tra kết quả xác minh') {
      await s.refresh();
      s.values.remove('application.role');
      if (s.approved) {
        go(homeRoute(s.role));
      } else if (['supplement', 'rejected', 'draft']
          .contains(s.profile['verificationStatus'])) {
        go(applicationRoute(s.role));
      } else {
        message('Hồ sơ vẫn đang chờ admin xét duyệt.');
      }
      return true;
    }
    if (action == 'licenseContinue' &&
        ['name', 'tax', 'issued', 'type']
            .any((k) => s.get('license.$k', '').trim().isEmpty)) {
      throw StateError('Hãy nhập đủ thông tin giấy phép.');
    }
    if (label == 'Kiểm tra kết quả xử lý') {
      await s.refresh();
      message('Đã cập nhật kết quả từ Firebase.');
      return true;
    }
    final id = spec['id']?.toString() ?? s.selectedOrderId;
    switch (action) {
      case 'openOrder':
        s.selectOrder('${spec['id']}');
        go('${spec['route']}');
        return true;
      case 'selectAccount':
        final selected = await choose(
            'Tài khoản',
            s.rows('accounts').where((u) => u['role'] != 'admin').toList(),
            'uid');
        if (selected != null) s.set('admin.account.uid', selected);
        return true;
      case 'toggleAccount':
        await s.command('setAccountDisabled',
            {'uid': spec['uid'], 'disabled': spec['disabled']});
        return true;
      case 'selectVolunteer':
        final selected = await choose(
            'Tình nguyện viên',
            s
                .rows('accounts')
                .where((u) =>
                    u['role'] == 'volunteer' &&
                    u['verificationStatus'] == 'approved' &&
                    u['disabled'] != true)
                .toList(),
            'uid');
        if (selected != null) s.set('admin.volunteer.uid', selected);
        return true;
      case 'selectDispatchOrder':
        final selected = await choose(
            'Chuyến giao',
            s
                .rows('orders')
                .where((o) => ['awaiting', 'accepted', 'assigned', 'pickedUp']
                    .contains(o['status']))
                .toList(),
            'id');
        if (selected != null) {
          s.selectOrder(selected);
          if (!context.mounted) return true;
          final order =
              s.rows('orders').where((o) => o['id'] == selected).first;
          final cancel = await showDialog<bool>(
              context: context,
              builder: (context) => AlertDialog(
                    title: const Text('Chi tiết đơn nhận'),
                    content: Text(
                        '$selected\n${order['quantity']} suất · ${order['status']}'),
                    actions: [
                      TextButton(
                          onPressed: () => Navigator.pop(context, false),
                          child: const Text('Đóng')),
                      if (['awaiting', 'accepted', 'assigned']
                          .contains(order['status']))
                        OutlinedButton(
                            onPressed: () => Navigator.pop(context, true),
                            child: const Text('Hủy đơn')),
                      if (order['status'] == 'pickedUp')
                        TextButton(
                            onPressed: () {
                              Navigator.pop(context, false);
                              go('/admin/food-safety-incident');
                            },
                            child: const Text('Xử lý qua hỗ trợ')),
                    ],
                  ));
          if (cancel == true && context.mounted) {
            await FrontendActions.run(context, frame, {
              'kind': 'action',
              'action': 'cancelOrder',
              'id': selected,
              'stay': true,
            });
          }
        }
        return true;
      case 'assignVolunteer':
        await s
            .command('assignVolunteer', {'id': spec['id'], 'uid': spec['uid']});
        go('/admin/reassignment-result');
        return true;
      case 'openTicket':
        s.set('admin.ticket.id', spec['id']);
        if (s.orders.any((o) => o.id == spec['orderId'])) {
          s.selectOrder('${spec['orderId']}');
        }
        go('/admin/complaint-review');
        return true;
      case 'resolveTicket':
        final note = await FrontendActions.edit(context, 'Kết quả xử lý', '');
        if (note == null) return true;
        await s.command('resolveTicket',
            {'id': spec['id'], 'status': 'resolved', 'note': note});
        s.set('admin.decision.note', note);
        go('/admin/case-resolution');
        return true;
      case 'openNotification':
        await s.command('readNotification', {'id': spec['id']});
        final notice = s
                .rows('notifications')
                .where((n) => n['id'] == spec['id'])
                .firstOrNull ??
            {};
        final selected = s.orders
            .where((o) => '${notice['body']}'.contains(o.id))
            .firstOrNull;
        if (selected != null) {
          s.selectOrder(selected.id);
          go(s.role == 'charity'
              ? '/user/organization/order-tracking'
              : s.role == 'volunteer'
                  ? '/user/volunteer/job-detail'
                  : '/user/donor/order-tracking');
        } else {
          message('${notice['body'] ?? ''}');
        }
        return true;
      case 'openAdminRecord':
        s.values.removeWhere((k, _) => k.startsWith('admin.audit.'));
        s.values['admin.selection.id'] = spec['id'];
        s.values['admin.selection.kind'] = spec['table'];
        s.changed();
        go(
            '/admin/${spec['role'] == 'charity' ? 'organization' : spec['role'] == 'volunteer' ? 'volunteer' : 'donor'}-review',
            arguments: {'id': spec['id'], 'table': spec['table']});
        return true;
      case 'openDocument':
        final uri = Uri.tryParse('${spec['url']}');
        if (uri != null) {
          await launchUrl(uri, mode: LaunchMode.externalApplication);
        }
        return true;
      case 'publish':
      case 'editListing':
        final edit = action == 'editListing', f = s.selectedFood;
        final name = edit ? s.get('edit.name', f.name) : s.get('food.name', '');
        if (name.trim().isEmpty) throw StateError('Hãy nhập tên món ăn.');
        final now = DateTime.now();
        final expiry = FoodExpiry.resolve(
            s.get('food.expiry', FoodExpiry.defaultTime(now)), now);
        var photo = s.get('food.photo', edit ? f.photo : '');
        if ((s.values['food.photos'] as List? ?? (edit ? f.photos : []))
                .isEmpty &&
            photo.isEmpty) {
          throw StateError(
              'Hãy chọn ít nhất một ảnh món ăn để admin kiểm tra.');
        }
        if ((s.values['food.photos'] as List? ?? []).isEmpty &&
            photo.isNotEmpty &&
            !photo.startsWith('https://res.cloudinary.com/')) {
          photo = await s.api.upload(photo, 'food');
        }
        final photos = <String>[];
        final pendingPhotos = List<String>.from(
            s.values['food.photos'] as List? ?? (edit ? f.photos : []));
        for (var i = 0; i < pendingPhotos.length; i++) {
          final path = pendingPhotos[i];
          final url = path.startsWith('https://res.cloudinary.com/')
              ? path
              : await s.api.upload(path, 'food');
          if (!photos.contains(url)) photos.add(url);
          pendingPhotos[i] = url;
          s.set('food.photos', List<String>.from(pendingPhotos));
          s.set('food.photo', pendingPhotos.first);
        }
        if (photos.isNotEmpty) photo = photos.first;
        if (photos.isEmpty && photo.isNotEmpty) photos.add(photo);
        final result = await s.command(edit ? 'editFood' : 'publishFood', {
          if (edit) 'id': f.id,
          'name': name,
          'quantity': edit
              ? int.tryParse(s.get('edit.quantity', '${f.quantity}')) ?? 0
              : s.get('food.quantity', 20),
          'category':
              s.get('food.category', edit ? f.category : 'Cơm & món mặn'),
          'storage': s.get('food.storage', edit ? f.storage : 'Còn nóng'),
          'address': s.get('food.address', edit ? f.address : ''),
          'pickup': edit &&
                  (s.values.containsKey('edit.from') ||
                      s.values.containsKey('edit.to'))
              ? '${s.get('edit.from', f.pickup.split('–').first)}–${s.get('edit.to', f.pickup.split('–').last)}'
              : s.get('food.pickup', edit ? f.pickup : '19:00–20:30'),
          if (s.values['food.latitude'] != null)
            'latitude': s.values['food.latitude'],
          if (s.values['food.longitude'] != null)
            'longitude': s.values['food.longitude'],
          'photo': photo,
          'photos': photos,
          'allergens':
              s.values['food.allergens'] ?? (edit ? f.allergens : <String>[]),
          'note': s.get(edit ? 'edit.note' : 'food.note', edit ? f.note : ''),
          'expiresAt': edit && !s.values.containsKey('food.expiry')
              ? s
                  .rows('foods')
                  .firstWhere((row) => row['id'] == f.id)['expiresAt']
              : expiry.toUtc().toIso8601String(),
          'safe': ['untouched', 'packed', 'fresh']
              .every((k) => s.get('food.safe.$k', true))
        });
        s.selectedFoodId = result['id'] as String;
        s.values.removeWhere(
            (k, _) => k.startsWith('food.') || k.startsWith('edit.'));
        message('Đã gửi món ăn, đang chờ admin duyệt.');
        go(edit ? '/user/donor/listing-detail' : '/user/donor/publish-success');
        return true;
      case 'closeListing':
        await s.command('closeFood', {'id': s.selectedFoodId});
        go('/user/donor/my-listings');
        return true;
      case 'requestFood':
        if (!s.get('request.commitment', false)) {
          throw StateError(
              'Hãy xác nhận cam kết sử dụng và bảo quản thực phẩm.');
        }
        final requestTime = s.get('request.time', '19:30');
        if (!RegExp(r'^(?:[01][0-9]|2[0-3]):[0-5][0-9]$')
            .hasMatch(requestTime)) {
          throw StateError('Giờ nhận cần định dạng HH:mm, ví dụ 19:30.');
        }
        final result = await s.command('requestFood', {
          'foodId': s.selectedFoodId,
          'quantity': s.get('request.quantity',
              s.selectedFood.quantity < 15 ? s.selectedFood.quantity : 15),
          'transport': s.get('request.transport', 'Nhờ giao hộ'),
          'time': s.get('request.time', '19:30'),
          'receiver': s.get('request.receiver', '${s.profile['name'] ?? ''}'),
          'note': s.get('request.purpose', '')
        });
        s.selectedOrderId = result['id'] as String;
        s.values.removeWhere((k, _) => k.startsWith('request.'));
        go('/user/organization/request-pending');
        return true;
      case 'cancelOrder':
        final reason = await FrontendActions.edit(context, 'Lý do hủy đơn', '');
        if (reason == null) return true;
        if (reason.isEmpty) throw StateError('Hãy nhập lý do hủy đơn.');
        await s.command('transitionOrder',
            {'id': id, 'status': 'cancelled', 'reason': reason});
        if (id == s.selectedOrderId) {
          s.values.remove('handover.pin');
          s.values.remove('receipt.pin');
        }
        if (spec['stay'] != true) {
          go(s.role == 'admin'
              ? '/admin/dispatch-map'
              : s.role == 'donor'
                  ? '/user/donor/incoming-requests'
                  : '/user/organization/orders');
        }
        return true;
      case 'acceptOrder':
      case 'rejectOrder':
      case 'acceptJob':
      case 'confirmReceipt':
        if (action == 'confirmReceipt' &&
            s.get('receipt.condition', 'Tốt, đúng mô tả') == 'Có vấn đề') {
          go('/shared/report-discrepancy');
          return true;
        }
        String? receiptNote;
        if (action == 'confirmReceipt') {
          final record = s.rows('orders').firstWhere((o) => o['id'] == id);
          final received = s.get('receipt.quantity', s.selectedOrder.quantity);
          if (record['receiptState'] != 'pending' &&
              (received != (record['qtyRequested'] ?? record['quantity']) ||
                  received != (record['qtyPickedUp'] ?? record['quantity']))) {
            receiptNote = await FrontendActions.edit(context,
                'Ghi chú chênh lệch số lượng', s.get('receipt.note', ''));
            if (receiptNote == null) return true;
            s.set('receipt.note', receiptNote);
            if (receiptNote.isEmpty) {
              throw StateError('Hãy nhập ghi chú chênh lệch số lượng.');
            }
          }
        }
        await s.command('transitionOrder', {
          'id': id,
          'status': switch (action) {
            'acceptOrder' => 'accepted',
            'rejectOrder' => 'rejected',
            'acceptJob' => 'assigned',
            _ => 'completed'
          },
          if (action == 'confirmReceipt')
            'received': s.get('receipt.quantity', s.selectedOrder.quantity),
          if (action == 'confirmReceipt')
            'photo': await uploadPhoto('receipt.photo', 'proof'),
          if (action == 'confirmReceipt')
            'note': receiptNote ?? s.get('receipt.note', ''),
        });
        if (action == 'acceptJob') {
          s.selectOrder(id);
          s.set('jobs.scope', 'mine');
          message('Đã nhận chuyến. Hãy đến người cho để xác nhận lấy hàng.');
          go('/user/volunteer/pickup');
        } else if (action == 'confirmReceipt') {
          go('/user/organization/order-tracking');
        } else {
          if (action == 'acceptOrder') {
            s.selectOrder(id);
            message('Đã chấp nhận yêu cầu. Suất ăn đã được giữ cho tổ chức.');
          }
          go(action == 'acceptOrder'
              ? '/user/donor/pickup-schedule'
              : action == 'rejectOrder'
                  ? '/user/donor/incoming-requests'
                  : '/user/organization/orders');
        }
        return true;
      case 'confirmSchedule':
        await s.command('confirmSchedule', {
          'id': id,
          'time': s.get('pickup.time', '19:30'),
          'note': s.get('pickup.note', '')
        });
        go('/user/donor/match-success');
        return true;
      case 'demoPickup':
        s.set('demo.handover.stage', 'pickup');
        go('/user/volunteer/pickup-photo');
        return true;
      case 'demoDelivery':
        s.set('demo.handover.stage', 'receipt');
        go('/user/volunteer/pickup-photo');
        return true;
      case 'cameraNext':
      case 'confirmPickup':
      case 'verifyPin':
        final stage = s.get('demo.handover.stage', 'pickup');
        await s.command('confirmDemoHandover', {'id': id, 'stage': stage});
        s.values.remove('demo.handover.stage');
        go(s.role == 'charity'
            ? '/user/organization/confirm-receipt'
            : stage == 'receipt'
                ? '/user/volunteer/delivery-complete'
                : '/user/volunteer/delivery-tracking');
        return true;
      case 'renewCode':
        message('Mã QR dùng minh họa trong bản demo.');
        return true;
      case 'addNeed':
        await s.command('addNeed', {
          'title': s.get('need.title', ''),
          'quantity': int.tryParse(s.get('need.quantity', '32')) ?? 0,
          'category': (s.values['need.category'] as List? ?? ['Cơm & món mặn'])
              .join(', '),
          'priority': s.get('need.priority', 'Bình thường')
        });
        go('/user/organization/needs');
        return true;
      case 'distribute':
        await s.command('distribute', {
          'quantity': (int.tryParse(s.get('distribution.children', '0')) ?? 0) +
              (int.tryParse(s.get('distribution.elderly', '0')) ?? 0)
        });
        go('/user/organization/distribution');
        return true;
      case 'sendMessage':
      case 'quickMessage':
        await s.command('sendMessage', {
          'orderId': id,
          'text': action == 'quickMessage'
              ? spec['value']
              : s.get('chat.message', '')
        });
        s.set('chat.message', '');
        return true;
      case 'sendThanks':
        await s.command('sendThanks', {
          'orderId': id,
          'text': s.get('thanks.message', ''),
          'photo': await uploadPhoto('thanks.photo', 'thanks')
        });
        go('/user/organization/thank-you-sent');
        return true;
      case 'saveReview':
        await s.command('saveReview', {
          'orderId': id,
          'rating': s.get('review.rating', 5),
          'note': s.get('review.note', 'Cảm ơn')
        });
        go('/user/donor/donation-history');
        return true;
      case 'submitTicket':
        var photo = s.get('support.photo', '');
        if (photo.isNotEmpty &&
            !photo.startsWith('https://res.cloudinary.com/')) {
          photo = await s.api.upload(photo, 'documents');
        }
        final ticket = await s.command('submitTicket', {
          'orderId': s.orders.any((o) => o.id == id) ? id : '',
          'reason': s.get('support.reason', 'Hỗ trợ'),
          'detail': s.get('support.detail', ''),
          'photo': photo
        });
        s.set('support.ticketId', ticket['id']);
        go('/shared/support-status');
        return true;
      case 'readAll':
        await s.command('readAll');
        return true;
      case 'transferJob':
        await s.command('transferJob',
            {'id': id, 'reason': s.get('transfer.reason', 'Có việc đột xuất')});
        go(homeRoute(s.role));
        return true;
      case 'registerShift':
        await s.command('registerShift',
            {'date': s.shiftDate.toIso8601String().split('T').first});
        go('/user/volunteer/calendar');
        return true;
      case 'cancelShift':
        await s.command('registerShift', {
          'date': s.calendarDate.toIso8601String().split('T').first,
          'cancel': true
        });
        return true;
    }
    // The original review buttons commit the selected Firebase record.
    if (label == 'Phê duyệt hồ sơ' ||
        label == 'Từ chối' ||
        label == 'Yêu cầu bổ sung') {
      final kind =
          spec['recordKind'] ?? s.get('admin.selection.kind', 'applications');
      final selected = spec['recordId'] ?? s.get('admin.selection.id', '');
      if (selected.isEmpty) {
        throw StateError('Hãy chọn một hồ sơ trong hàng đợi.');
      }
      final approved = label == 'Phê duyệt hồ sơ';
      if (approved &&
          List.generate(
                  3, (i) => '${spec['auditPrefix'] ?? 'admin.audit.$frame'}.$i')
              .any((k) => !s.get(k, false))) {
        throw StateError('Hãy đối chiếu đủ các điều kiện.');
      }
      String note = 'Đã đối chiếu và phê duyệt';
      if (!approved) {
        if (!context.mounted) return true;
        final entered =
            await FrontendActions.edit(context, 'Nội dung gửi người dùng', '');
        if (entered == null) return true;
        if (entered.trim().isEmpty) throw StateError('Hãy nhập lý do.');
        note = entered;
      }
      if (kind != 'applications' && label == 'Yêu cầu bổ sung') {
        throw StateError(
            'Tin món ăn và nhu cầu được duyệt hoặc từ chối kèm lý do.');
      }
      await s.command(
          switch (kind) {
            'foods' => 'reviewFood',
            'needs' => 'reviewNeed',
            _ => 'reviewApplication'
          },
          {
            'id': selected,
            'status': approved
                ? kind == 'applications'
                    ? 'approved'
                    : 'open'
                : label == 'Từ chối'
                    ? 'rejected'
                    : 'supplement',
            'note': note,
          });
      s.set('admin.decision.note', note);
      go(approved
          ? '/admin/approval-result'
          : label == 'Từ chối'
              ? '/admin/rejection-result'
              : '/admin/supplement-request');
      return true;
    }
    return false;
  }
}
