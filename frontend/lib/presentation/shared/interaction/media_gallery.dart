import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'app_navigation.dart';
import 'food_photo.dart';

/// Uploaded evidence stays readable at full size; no credentials are embedded.
class MediaGallery extends StatefulWidget {
  const MediaGallery(
      {super.key,
      required this.urls,
      this.labels = const [],
      this.height = 220});
  final List<String> urls, labels;
  final double height;
  @override
  State<MediaGallery> createState() => _MediaGalleryState();
}

class _MediaGalleryState extends State<MediaGallery> {
  final _pages = PageController();
  int _index = 0;
  @override
  void dispose() {
    _pages.dispose();
    super.dispose();
  }

  String label(int i) => i < widget.labels.length
      ? widget.labels[i]
      : 'Ảnh hoặc tài liệu ${i + 1}';
  Widget preview(String url, {bool large = false}) => url
          .toLowerCase()
          .contains('.pdf')
      ? const Center(
          child:
              Icon(Icons.picture_as_pdf_outlined, size: 64, color: mealGreen))
      : Image(
          image: storedMealImage(url),
          fit: BoxFit.contain,
          errorBuilder: (_, __, ___) => const Center(
              child: Text('Không tải được ảnh. Hãy mở tài liệu gốc.')));
  Future<void> showFull(int i) async {
    final url = widget.urls[i];
    if (url.toLowerCase().contains('.pdf')) {
      await launchUrl(Uri.parse(url), mode: LaunchMode.externalApplication);
      return;
    }
    if (!mounted) return;
    await showDialog<void>(
        context: context,
        builder: (context) => Dialog.fullscreen(
            child: Scaffold(
                appBar: AppBar(title: Text(label(i)), actions: [
                  if (url.startsWith('https://'))
                    IconButton(
                        tooltip: 'Mở ảnh gốc',
                        onPressed: () => launchUrl(Uri.parse(url),
                            mode: LaunchMode.externalApplication),
                        icon: const Icon(Icons.open_in_new))
                ]),
                body: InteractiveViewer(
                    minScale: .5,
                    maxScale: 6,
                    child: Center(child: preview(url, large: true))))));
  }

  @override
  Widget build(BuildContext context) {
    if (widget.urls.isEmpty) {
      return SizedBox(
          height: widget.height,
          child: const Center(
              child: Text('Chưa có ảnh hoặc tài liệu được tải lên.')));
    }
    final current = _index.clamp(0, widget.urls.length - 1);
    return Column(mainAxisSize: MainAxisSize.min, children: [
      SizedBox(
          height: widget.height,
          child: Stack(children: [
            Positioned.fill(
                child: PageView.builder(
                    controller: _pages,
                    itemCount: widget.urls.length,
                    onPageChanged: (i) => setState(() => _index = i),
                    itemBuilder: (_, i) => InkWell(
                        key: ValueKey('media/open/$i'),
                        onTap: () => showFull(i),
                        child: preview(widget.urls[i])))),
            if (widget.urls.length > 1) ...[
              Positioned(
                  left: 0,
                  top: widget.height / 2 - 24,
                  child: IconButton.filledTonal(
                      key: const ValueKey('media/previous'),
                      tooltip: 'Tài liệu trước',
                      onPressed: current > 0
                          ? () => _pages.previousPage(
                              duration: const Duration(milliseconds: 180),
                              curve: Curves.easeOut)
                          : null,
                      icon: const Icon(Icons.chevron_left))),
              Positioned(
                  right: 0,
                  top: widget.height / 2 - 24,
                  child: IconButton.filledTonal(
                      key: const ValueKey('media/next'),
                      tooltip: 'Tài liệu tiếp theo',
                      onPressed: current < widget.urls.length - 1
                          ? () => _pages.nextPage(
                              duration: const Duration(milliseconds: 180),
                              curve: Curves.easeOut)
                          : null,
                      icon: const Icon(Icons.chevron_right))),
            ]
          ])),
      const SizedBox(height: 8),
      Text('${current + 1}/${widget.urls.length} · ${label(current)}',
          textAlign: TextAlign.center,
          style: const TextStyle(
              color: mealInk, fontSize: 13, fontWeight: FontWeight.w600)),
      TextButton.icon(
          onPressed: () => showFull(current),
          icon: const Icon(Icons.zoom_in, size: 18),
          label: const Text('Phóng to / mở tài liệu')),
    ]);
  }
}
