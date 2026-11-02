import 'package:flutter/material.dart';
import 'app_navigation.dart';

/// Keeps full-size category chips reachable by touch or the next arrow.
class HorizontalOptionsStrip extends StatefulWidget {
  const HorizontalOptionsStrip(
      {super.key, required this.child, required this.scrollKey});
  final Widget child;
  final Key scrollKey;
  @override
  State<HorizontalOptionsStrip> createState() => _HorizontalOptionsStripState();
}

class _HorizontalOptionsStripState extends State<HorizontalOptionsStrip> {
  final _scroll = ScrollController();
  bool _more = false;
  @override
  void initState() {
    super.initState();
    _scroll.addListener(_update);
    WidgetsBinding.instance.addPostFrameCallback((_) => _update());
  }

  @override
  void didUpdateWidget(covariant HorizontalOptionsStrip oldWidget) {
    super.didUpdateWidget(oldWidget);
    WidgetsBinding.instance.addPostFrameCallback((_) => _update());
  }

  void _update() {
    if (!mounted || !_scroll.hasClients) return;
    final more = _scroll.position.maxScrollExtent - _scroll.offset > 1;
    if (more != _more) setState(() => _more = more);
  }

  @override
  void dispose() {
    _scroll.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => Stack(children: [
        SingleChildScrollView(
            key: widget.scrollKey,
            controller: _scroll,
            scrollDirection: Axis.horizontal,
            physics: const BouncingScrollPhysics(),
            child: widget.child),
        if (_more)
          Positioned(
              right: 0,
              top: 2,
              bottom: 2,
              child: IconButton.filledTonal(
                  tooltip: 'Xem thêm danh mục',
                  visualDensity: VisualDensity.compact,
                  style: IconButton.styleFrom(
                      padding: EdgeInsets.zero,
                      minimumSize: const Size(24, 24),
                      backgroundColor: const Color(0xFFE5F1EB)),
                  onPressed: () => _scroll.animateTo(
                      (_scroll.offset + 180)
                          .clamp(0, _scroll.position.maxScrollExtent),
                      duration: const Duration(milliseconds: 240),
                      curve: Curves.easeOut),
                  icon: const Icon(Icons.chevron_right,
                      size: 18, color: mealGreen)))
      ]);
}
