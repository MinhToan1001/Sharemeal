import 'dart:convert';
import 'dart:io';

/// Public demo uploads. API Secret is never included in the mobile app.
class CloudinaryStorage {
  final _http = HttpClient()..connectionTimeout = const Duration(seconds: 20);
  static bool isRemote(String path) {
    final uri = Uri.tryParse(path);
    return uri?.scheme == 'https' &&
        uri?.host == 'res.cloudinary.com' &&
        uri!.pathSegments.isNotEmpty &&
        uri.pathSegments.first == 'toanvip';
  }

  Future<String> upload(
      String path, String folder, Map<String, dynamic> config) async {
    final preset = config['uploadPreset']?.toString() ?? '';
    if (preset.isEmpty) {
      throw StateError(
          'Chưa cấu hình upload preset Cloudinary. Xem BACKEND_SETUP.md.');
    }
    final file = File(path),
        size = await File(path).length(),
        ext = path.toLowerCase().split('.').last;
    if (size < 1 ||
        size > 8388608 ||
        !['jpg', 'jpeg', 'png', if (folder == 'documents') 'pdf']
            .contains(ext)) {
      throw StateError('Chọn JPG/PNG, hoặc PDF cho giấy tờ, tối đa 8 MB.');
    }
    final boundary = 'sharemeal${DateTime.now().microsecondsSinceEpoch}';
    final header = StringBuffer();
    for (final e in {'upload_preset': preset}.entries) {
      header.write(
          '--$boundary\r\nContent-Disposition: form-data; name="${e.key}"\r\n\r\n${e.value}\r\n');
    }
    final mime = ext == 'pdf'
        ? 'application/pdf'
        : ext == 'png'
            ? 'image/png'
            : 'image/jpeg';
    header.write(
        '--$boundary\r\nContent-Disposition: form-data; name="file"; filename="upload.$ext"\r\nContent-Type: $mime\r\n\r\n');
    final before = utf8.encode(header.toString()),
        after = utf8.encode('\r\n--$boundary--\r\n');
    final req = await _http.postUrl(
        Uri.parse('https://api.cloudinary.com/v1_1/toanvip/auto/upload'));
    req.headers.set('Content-Type', 'multipart/form-data; boundary=$boundary');
    req.contentLength = before.length + size + after.length;
    req.add(before);
    await req.addStream(file.openRead());
    req.add(after);
    final response = await req.close().timeout(const Duration(seconds: 90));
    final body = jsonDecode(await utf8.decoder.bind(response).join()) as Map;
    if (response.statusCode != 200 || !isRemote('${body['secure_url']}')) {
      throw StateError(
          'Tải ảnh thất bại: ${body['error']?['message'] ?? response.statusCode}');
    }
    return body['secure_url'] as String;
  }

  void close() => _http.close(force: true);
}
