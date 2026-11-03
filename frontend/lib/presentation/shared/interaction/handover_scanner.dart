import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import '../figma/figma_prototype_controller.dart';
import 'frontend_actions.dart';
import '../controllers/firebase_app_state.dart';
import 'handover_confirmation.dart';

class HandoverScanner extends StatefulWidget {
  const HandoverScanner({super.key});
  @override
  State<HandoverScanner> createState() => _HandoverScannerState();
}

class _HandoverScannerState extends State<HandoverScanner> {
  MobileScannerController? _camera;
  bool _accepted = false;
  @override
  void dispose() {
    _camera?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = FigmaPrototypeScope.of(context), s = c.frontend;
    final receipt =
        ['recipient', 'delivery'].contains(c.values['VariableID:80:1182']);
    return ClipRRect(
        borderRadius: BorderRadius.circular(18),
        child: _camera == null
            ? ColoredBox(
                color: const Color(0xFF193E34),
                child: Center(
                    child: Column(mainAxisSize: MainAxisSize.min, children: [
                  const Icon(Icons.qr_code_scanner,
                      size: 64, color: Colors.white),
                  const SizedBox(height: 18),
                  FilledButton(
                      onPressed: () => setState(() => _camera =
                          MobileScannerController(
                              formats: [BarcodeFormat.qrCode])),
                      child: const Text('Mở camera để quét')),
                  TextButton(
                      onPressed: () => Navigator.pushNamed(
                          context, '/shared/location-picker'),
                      child: const Text('Nhập mã PIN thay thế',
                          style: TextStyle(color: Colors.white)))
                ])))
            : MobileScanner(
                controller: _camera,
                onDetect: (capture) async {
                  if (_accepted) return;
                  for (final barcode in capture.barcodes) {
                    final raw = barcode.rawValue;
                    if (s is FirebaseAppState) {
                      final parts = raw?.split(':') ?? [];
                      if (parts.length != 4 ||
                          parts[0] != 'sharemeal' ||
                          parts[1] != s.selectedOrderId ||
                          parts[2] != (receipt ? 'receipt' : 'pickup')) {
                        continue;
                      }
                      _accepted = true;
                      try {
                        if (!await verifyWithPickupQuantity(context, s,
                            s.selectedOrderId, parts[2], parts[3])) {
                          _accepted = false;
                          return;
                        }
                        s.set('handover.verified', true);
                        s.set('handover.verified.stage', parts[2]);
                        await _camera?.stop();
                        if (context.mounted) {
                          FrontendActions.message(
                              context, 'Đã đối chiếu đúng mã bàn giao.');
                        }
                      } catch (e) {
                        _accepted = false;
                        if (context.mounted) {
                          FrontendActions.message(
                              context, FirebaseAppState.readableError(e));
                        }
                      }
                      return;
                    }
                    if (raw ==
                        'sharemeal:${s.selectedOrder.id}:${receipt ? 'receipt' : 'pickup'}:${receipt ? s.get('receipt.pin', '482913') : s.get('handover.pin', '472914')}') {
                      final expiry =
                          DateTime.tryParse(s.get('handover.expires', ''));
                      if (expiry != null && DateTime.now().isAfter(expiry)) {
                        FrontendActions.message(
                            context, 'Mã đã hết hạn. Hãy tạo mã mới.');
                        return;
                      }
                      _accepted = true;
                      s.set('handover.verified', true);
                      _camera?.stop();
                      FrontendActions.message(
                          context, 'Đã đối chiếu đúng mã bàn giao.');
                      return;
                    }
                  }
                },
                errorBuilder: (context, error) => ColoredBox(
                    color: const Color(0xFF193E34),
                    child: Center(
                        child:
                            Column(mainAxisSize: MainAxisSize.min, children: [
                      const Padding(
                          padding: EdgeInsets.all(20),
                          child: Text(
                              'Không truy cập được camera. Kiểm tra quyền camera hoặc nhập mã PIN.',
                              textAlign: TextAlign.center,
                              style: TextStyle(color: Colors.white))),
                      TextButton(
                          onPressed: () => Navigator.pushNamed(
                              context, '/shared/location-picker'),
                          child: const Text('Nhập mã PIN',
                              style: TextStyle(color: Colors.white)))
                    ])))));
  }
}
