import 'package:flutter/material.dart';
import '../../data/repositories/firebase_app_state.dart';

class BackendFoodImage extends StatefulWidget {
  const BackendFoodImage({super.key, required this.state, required this.path});
  final FirebaseAppState state;
  final String path;
  @override
  State<BackendFoodImage> createState() => _BackendFoodImageState();
}

class _BackendFoodImageState extends State<BackendFoodImage> {
  late Future<String> url;
  @override
  void initState() {
    super.initState();
    url = _load();
  }

  Future<String> _load() async {
    final response =
        await widget.state.api.call('fileUrl', {'path': widget.path});
    return response['result']['url'] as String;
  }

  @override
  void didUpdateWidget(covariant BackendFoodImage oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.path != widget.path) url = _load();
  }

  @override
  Widget build(BuildContext context) => SizedBox(
      height: 160,
      width: double.infinity,
      child: ClipRRect(
          borderRadius: BorderRadius.circular(12),
          child: FutureBuilder<String>(
              future: url,
              builder: (context, result) => result.hasData
                  ? Image.network(result.data!,
                      fit: BoxFit.cover,
                      errorBuilder: (_, e, st) => const Center(
                          child: Icon(Icons.broken_image_outlined)))
                  : Center(
                      child: result.hasError
                          ? const Icon(Icons.broken_image_outlined)
                          : const CircularProgressIndicator()))));
}
