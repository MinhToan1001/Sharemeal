import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:qr_flutter/qr_flutter.dart';
import '../controllers/firebase_app_state.dart';
import '../figma/figma_prototype_controller.dart';
import 'app_navigation.dart';
import 'handover_confirmation.dart';
import 'handover_scanner.dart';

void _tracking(BuildContext context, FirebaseAppState s,
    {bool replace = false}) {
  final route = s.role == 'donor'
      ? '/user/donor/order-tracking'
      : s.role == 'charity'
          ? '/user/organization/order-tracking'
          : '/user/volunteer/job-detail';
  if (replace) {
    Navigator.pushReplacementNamed(context, route);
  } else {
    Navigator.pushNamed(context, route);
  }
}

class MatchSuccessContent extends StatelessWidget {
  const MatchSuccessContent({super.key});
  @override
  Widget build(BuildContext context) {
    final s = FigmaPrototypeScope.of(context).frontend as FirebaseAppState;
    final o = s.selectedOrder, f = s.selectedFood;
    final self = o.transport == 'Tự đến lấy';
    void close() => Navigator.pushNamedAndRemoveUntil(
        context, homeRoute(s.role), (_) => false);
    return Scaffold(
        backgroundColor: mealBackground,
        appBar: AppBar(
            automaticallyImplyLeading: false,
            title: const Text('Ghép nối thành công'),
            actions: [
              IconButton(
                  key: const ValueKey('match/close'),
                  tooltip: 'Đóng và về trang chủ',
                  onPressed: close,
                  icon: const Icon(Icons.close))
            ]),
        body: ListView(padding: const EdgeInsets.all(24), children: [
          const Icon(Icons.handshake_outlined, size: 64, color: mealGreen),
          const SizedBox(height: 20),
          Text('${o.quantity} suất ${f.name}',
              style:
                  const TextStyle(fontSize: 22, fontWeight: FontWeight.w700)),
          const SizedBox(height: 16),
          Text(
              'Người cho: ${f.donor}\nĐiểm lấy: ${f.address}\n'
              'Tổ chức nhận: ${o.organization}\nGiờ hẹn: ${o.time}\nMã đơn: ${o.id}',
              style: const TextStyle(height: 1.7)),
          const SizedBox(height: 24),
          Text(self
              ? 'Tổ chức tự đến lấy. Người cho xuất mã lấy hàng khi đại diện tổ chức đã tới và kiểm tra thực phẩm.'
              : 'Người cho đã giữ suất cho tổ chức. Tình nguyện viên nhận chuyến, tới điểm lấy của người cho, rồi vận chuyển đến tổ chức.'),
          const SizedBox(height: 16),
          if (!self)
            const Text(
                'Có hai mã khác nhau: người cho tạo mã lấy hàng; tổ chức tạo mã nhận hàng. Tình nguyện viên xác nhận mã của đúng bên tại mỗi điểm.'),
          const SizedBox(height: 28),
          FilledButton(
              key: const ValueKey('match/tracking'),
              onPressed: () => _tracking(context, s),
              child: const Text('Theo dõi bàn giao')),
          const SizedBox(height: 12),
          OutlinedButton(onPressed: close, child: const Text('Về trang chủ'))
        ]));
  }
}

class HandoverCodeContent extends StatefulWidget {
  const HandoverCodeContent({super.key, required this.stage});
  final String stage;
  @override
  State<HandoverCodeContent> createState() => _HandoverCodeContentState();
}

class _HandoverCodeContentState extends State<HandoverCodeContent> {
  String _requested = '';
  String? _error;
  bool _loading = false;

  bool allowed(FirebaseAppState s) {
    final o = s.selectedOrder;
    return widget.stage == 'pickup'
        ? s.role == 'donor' &&
            (o.status == 'assigned' ||
                o.status == 'accepted' && o.transport == 'Tự đến lấy')
        : s.role == 'charity' &&
            o.status == 'pickedUp' &&
            !s.rows('orders').any(
                (row) => row['id'] == o.id && row['deliveryConfirmed'] == true);
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final s = FigmaPrototypeScope.of(context).frontend as FirebaseAppState;
    if (_requested != s.selectedOrderId && allowed(s)) {
      _requested = s.selectedOrderId;
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted) _load();
      });
    }
  }

  Future<void> _load({bool renew = false}) async {
    if (_loading) return;
    final s = FigmaPrototypeScope.of(context).frontend as FirebaseAppState;
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      await s.loadHandover(widget.stage, renew: renew);
    } catch (e) {
      if (mounted) setState(() => _error = FirebaseAppState.readableError(e));
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final s = FigmaPrototypeScope.of(context).frontend as FirebaseAppState;
    final o = s.selectedOrder, f = s.selectedFood;
    final pickup = widget.stage == 'pickup';
    final pin = s.get(pickup ? 'handover.pin' : 'receipt.pin', '');
    return Scaffold(
        appBar: AppBar(
            title: Text(pickup
                ? 'Mã lấy hàng tại người cho'
                : 'Mã nhận hàng tại tổ chức')),
        body: ListView(padding: const EdgeInsets.all(24), children: [
          Text('Đơn ${o.id}',
              style: const TextStyle(fontWeight: FontWeight.w700)),
          const SizedBox(height: 12),
          Text('${o.quantity} suất ${f.name}\n${f.donor} → ${o.organization}'),
          const SizedBox(height: 20),
          Text(pickup
              ? 'Người cho đưa mã này cho ${o.transport == 'Tự đến lấy' ? 'đại diện tổ chức' : o.driver} khi người lấy đã tới, kiểm đếm và chuẩn bị nhận hàng. Xác nhận mã chuyển đơn sang đã lấy hàng.'
              : 'Tổ chức đưa mã này cho ${o.driver} sau khi xe và thực phẩm đã đến nơi. Sau bước này, tổ chức vẫn cần chụp ảnh, nhập số thực nhận và hoàn tất để nhập kho.'),
          const SizedBox(height: 20),
          if (!allowed(s))
            const Text(
                'Chưa đến bước tạo mã này hoặc bước bàn giao đã hoàn tất. Nếu nhờ giao hộ, hãy chờ tình nguyện viên nhận chuyến trước.'),
          if (_loading) const Center(child: CircularProgressIndicator()),
          if (allowed(s) && !_loading && _error == null && pin.isNotEmpty) ...[
            Center(
                child: QrImageView(
                    data: 'sharemeal:${o.id}:${widget.stage}:$pin', size: 230)),
            SelectableText(pin,
                textAlign: TextAlign.center,
                style:
                    const TextStyle(fontSize: 32, fontWeight: FontWeight.w700)),
            const SizedBox(height: 12),
            const Text(
                'Mã có hiệu lực 10 phút, tối đa 5 lần nhập sai và chỉ dùng một lần.',
                textAlign: TextAlign.center),
          ],
          if (_error != null)
            Text(_error!, style: const TextStyle(color: Colors.red)),
          const SizedBox(height: 20),
          if (allowed(s))
            OutlinedButton(
                onPressed: _loading ? null : () => _load(renew: true),
                child: const Text('Tạo mã mới')),
          TextButton(
              onPressed: () => _tracking(context, s, replace: true),
              child: const Text('Theo dõi đơn'))
        ]));
  }
}

class HandoverVerificationContent extends StatefulWidget {
  const HandoverVerificationContent({super.key});
  @override
  State<HandoverVerificationContent> createState() =>
      _HandoverVerificationContentState();
}

class _HandoverVerificationContentState
    extends State<HandoverVerificationContent> {
  final _pin = TextEditingController();
  bool _busy = false;
  String? _error;
  @override
  void dispose() {
    _pin.dispose();
    super.dispose();
  }

  void _finish(FirebaseAppState s) {
    if (s.role == 'charity') {
      Navigator.pushReplacementNamed(
          context, '/user/organization/confirm-receipt');
    } else {
      _tracking(context, s, replace: true);
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = FigmaPrototypeScope.of(context);
    final s = c.frontend as FirebaseAppState;
    final receipt =
        ['recipient', 'delivery'].contains(c.values['VariableID:80:1182']);
    final stage = receipt ? 'receipt' : 'pickup';
    Future<void> verify() async {
      if (_busy) return;
      setState(() {
        _busy = true;
        _error = null;
      });
      try {
        if (!RegExp(r'^\d{6}$').hasMatch(_pin.text)) {
          throw StateError('Hãy nhập đủ 6 chữ số trên mã của bên bàn giao.');
        }
        if (!await verifyWithPickupQuantity(
            context, s, s.selectedOrderId, stage, _pin.text)) {
          return;
        }
        if (mounted) _finish(s);
      } catch (e) {
        if (mounted) setState(() => _error = FirebaseAppState.readableError(e));
      } finally {
        if (mounted) setState(() => _busy = false);
      }
    }

    return Scaffold(
        appBar: AppBar(
            title: Text(receipt
                ? 'Xác nhận giao tại tổ chức'
                : 'Xác nhận lấy tại người cho')),
        body: ListView(padding: const EdgeInsets.all(24), children: [
          Text('Đơn ${s.selectedOrder.id} · ${s.selectedOrder.quantity} suất'),
          const SizedBox(height: 16),
          Text(receipt
              ? 'Xin mã nhận hàng từ tổ chức khi thực phẩm đã tới nơi.'
              : 'Xin mã lấy hàng từ người cho sau khi kiểm tra thực phẩm tại điểm lấy.'),
          const SizedBox(height: 20),
          TextField(
              key: const ValueKey('handover/pin'),
              controller: _pin,
              keyboardType: TextInputType.number,
              maxLength: 6,
              inputFormatters: [FilteringTextInputFormatter.digitsOnly],
              decoration: const InputDecoration(
                  labelText: 'Mã PIN 6 số', border: OutlineInputBorder())),
          if (_error != null)
            Text(_error!, style: const TextStyle(color: Colors.red)),
          FilledButton(
              key: const ValueKey('handover/verify'),
              onPressed: _busy ? null : verify,
              child: Text(_busy ? 'Đang xác nhận…' : 'Xác nhận mã')),
          const SizedBox(height: 20),
          ExpansionTile(title: const Text('Quét mã QR bằng camera'), children: [
            SizedBox(
                height: 300,
                child: HandoverScanner(onVerified: () => _finish(s)))
          ])
        ]));
  }
}
