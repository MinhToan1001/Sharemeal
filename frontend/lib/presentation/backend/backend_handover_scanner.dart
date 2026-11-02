import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import '../../data/repositories/firebase_app_state.dart';
import '../shared/interaction/handover_confirmation.dart';

class BackendHandoverScanner extends StatefulWidget {
  const BackendHandoverScanner(
      {super.key,
      required this.state,
      required this.orderId,
      required this.stage});
  final FirebaseAppState state;
  final String orderId, stage;
  @override
  State<BackendHandoverScanner> createState() => _BackendHandoverScannerState();
}

class _BackendHandoverScannerState extends State<BackendHandoverScanner> {
  final camera = MobileScannerController(formats: [BarcodeFormat.qrCode]);
  bool busy = false;
  String? error;
  @override
  void dispose() {
    camera.dispose();
    super.dispose();
  }

  Future<void> detected(BarcodeCapture capture) async {
    if (busy) return;
    final prefix = 'sharemeal:${widget.orderId}:${widget.stage}:';
    final codes = capture.barcodes
        .map((b) => b.rawValue)
        .whereType<String>()
        .where((v) => v.startsWith(prefix));
    if (codes.isEmpty) {
      setState(() => error = 'Mã QR không thuộc đơn hoặc bước giao nhận này.');
      return;
    }
    setState(() {
      busy = true;
      error = null;
    });
    try {
      if (!await verifyWithPickupQuantity(context, widget.state, widget.orderId,
          widget.stage, codes.first.substring(prefix.length))) {
        if (mounted) setState(() => busy = false);
        return;
      }
      await camera.stop();
      if (mounted) Navigator.pop(context, true);
    } catch (e) {
      await camera.stop();
      if (mounted) setState(() => error = FirebaseAppState.readableError(e));
    }
  }

  @override
  Widget build(BuildContext context) => Scaffold(
      appBar: AppBar(title: const Text('Quét mã bàn giao')),
      body: Column(children: [
        Expanded(
            child: MobileScanner(
                controller: camera,
                onDetect: detected,
                errorBuilder: (_, e) => const Center(
                    child: Text(
                        'Không mở được camera. Kiểm tra quyền camera hoặc quay lại nhập PIN.')))),
        if (busy && error == null) const LinearProgressIndicator(),
        if (error != null)
          Padding(padding: const EdgeInsets.all(16), child: Text(error!)),
        if (error != null && busy)
          TextButton(
              onPressed: () async {
                await camera.start();
                if (mounted) {
                  setState(() {
                    busy = false;
                    error = null;
                  });
                }
              },
              child: const Text('Quét lại')),
        const SafeArea(
            top: false,
            child: Padding(
                padding: EdgeInsets.all(16),
                child: Text(
                    'Mã được kiểm tra trên máy chủ và chỉ sử dụng một lần.')))
      ]));
}
