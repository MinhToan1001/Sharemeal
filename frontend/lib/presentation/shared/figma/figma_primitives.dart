import 'dart:async';
import 'dart:math' as math;
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'figma_prototype_controller.dart';
import 'live_figma_bindings.dart';
import '../controllers/firebase_app_state.dart';
import '../interaction/app_navigation.dart';
import '../interaction/frontend_actions.dart';
import '../interaction/frontend_collections.dart';
import '../interaction/interaction_values.dart';
import '../interaction/handover_scanner.dart';
import '../interaction/impact_widgets.dart';
import '../../user/donor/widgets/verification_widgets.dart';
import '../../user/volunteer/widgets/volunteer_calendar.dart';
import '../interaction/profile_summary.dart';
import '../interaction/status_visuals.dart';
import '../interaction/food_photo.dart';
import '../interaction/meal_map.dart';
import '../interaction/meal_page_header.dart';
import '../interaction/profile_page_content.dart';
import '../../user/donor/widgets/request_matching_panels.dart';
import '../../user/donor/widgets/listing_visuals.dart';
import '../../user/volunteer/widgets/delivery_jobs_content.dart';
import '../../user/volunteer/widgets/delivery_job_details.dart';
import '../../admin/widgets/review_content.dart';
import '../interaction/live_flow_pages.dart';
import '../interaction/media_gallery.dart';
import '../interaction/horizontal_options_strip.dart';

double _number(dynamic value, [double fallback = 0]) =>
    value is num ? value.toDouble() : fallback;

Color figmaColor(dynamic value) {
  final input = value?.toString() ?? '';
  if (input == 'transparent' || input.isEmpty) return Colors.transparent;
  final parts = RegExp(r'[\d.]+')
      .allMatches(input)
      .map((m) => double.parse(m.group(0)!))
      .toList();
  if (parts.length >= 3) {
    return Color.fromRGBO(parts[0].round(), parts[1].round(), parts[2].round(),
        parts.length > 3 ? parts[3].clamp(0, 1) : 1);
  }
  return Colors.transparent;
}

class FigmaScreen extends StatefulWidget {
  const FigmaScreen(
      {super.key,
      required this.frameId,
      required this.child,
      this.timeoutsEnabled = true});
  final String frameId;
  final FigmaBox child;
  final bool timeoutsEnabled;

  @override
  State<FigmaScreen> createState() => _FigmaScreenState();
}

class _FigmaScreenState extends State<FigmaScreen> {
  Timer? _timer;
  bool _scheduled = false;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_scheduled || !widget.timeoutsEnabled) return;
    _scheduled = true;
    final controller = FigmaPrototypeScope.of(context);
    if (!controller.enableTimeouts) return;
    for (final reaction
        in controller.reactions(widget.frameId, widget.frameId)) {
      if (reaction['trigger']?['type'] == 'AFTER_TIMEOUT') {
        final seconds = _number(reaction['trigger']['timeout'], 1.2);
        _timer = Timer(Duration(milliseconds: (seconds * 1000).round()), () {
          if (mounted) {
            controller.trigger(context, widget.frameId, widget.frameId,
                trigger: 'AFTER_TIMEOUT');
          }
        });
        break;
      }
    }
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final keyboardInset = MediaQuery.viewInsetsOf(context).bottom;
    final viewport = MediaQuery.sizeOf(context);
    final state = FigmaPrototypeScope.of(context).frontend;
    if (state is FirebaseAppState) {
      if (['6:3798', '77:1321', '77:1384'].contains(widget.frameId)) {
        return AdminReviewContent(frame: widget.frameId);
      }
      if (widget.frameId == '6:1333') return const RequestFoodContent();
      if (widget.frameId == '6:2352') return const ChatContent();
      if (['6:1525', '6:661'].contains(widget.frameId)) {
        return const OrderTrackingContent();
      }
    }
    final screen = state is FirebaseAppState
        ? bindLiveScreen(widget.child, widget.frameId, state)
        : widget.child;
    return _FigmaFrameScope(
      frameId: widget.frameId,
      child: Scaffold(
        resizeToAvoidBottomInset: true,
        backgroundColor: figmaColor(widget.child.style['background']),
        body: LayoutBuilder(builder: (context, constraints) {
          final canvas = Align(
            alignment: Alignment.topCenter,
            child: FittedBox(
              fit: BoxFit.contain,
              alignment: Alignment.topCenter,
              child: SizedBox(
                width: 402,
                height: 874,
                child: RepaintBoundary(
                  key: ValueKey('figma/${widget.frameId}'),
                  child: screen,
                ),
              ),
            ),
          );
          if (keyboardInset > 0) {
            return SingleChildScrollView(
                child: SizedBox(height: viewport.height, child: canvas));
          }
          return canvas;
        }),
      ),
    );
  }
}

class _FigmaFrameScope extends InheritedWidget {
  const _FigmaFrameScope({required this.frameId, required super.child});
  final String frameId;
  static String of(BuildContext context) =>
      context.dependOnInheritedWidgetOfExactType<_FigmaFrameScope>()!.frameId;
  @override
  bool updateShouldNotify(_FigmaFrameScope oldWidget) =>
      oldWidget.frameId != frameId;
}

/// Native layout primitive shared by screen-specific widget trees.
/// Values are mechanically translated from the high-fidelity Figma reference.
class FigmaBox extends StatelessWidget {
  const FigmaBox({
    super.key,
    this.nodeId,
    this.name = '',
    this.tag = 'div',
    required this.width,
    required this.height,
    this.x = 0,
    this.y = 0,
    this.text,
    this.asset,
    this.formLabel,
    this.fixedHeight = false,
    this.initiallyVisible = true,
    this.style = const {},
    this.control = const {},
    this.children = const [],
  });

  final String? nodeId;
  final String name;
  final String tag;
  final double width, height, x, y;
  final String? text, asset, formLabel;
  final bool fixedHeight, initiallyVisible;
  final Map<String, dynamic> style;
  final Map<String, dynamic> control;
  final List<FigmaBox> children;

  bool visible(FigmaPrototypeController controller, String frame) =>
      (control['kind'] != 'conditional' ||
          (control['allowed'] as List)
              .contains(controlValue(controller.frontend, control))) &&
      controller.visible(frame, nodeId, fallback: initiallyVisible);

  double layoutHeight(FigmaPrototypeController controller, String frame) {
    final boundHeight = controller.bound(frame, nodeId, 'height');
    if (boundHeight is num) return boundHeight.toDouble();
    final isColumn = ['flex', 'inline-flex'].contains(style['display']) &&
        style['direction'] == 'column';
    if (!isColumn ||
        fixedHeight ||
        text != null ||
        ['auto', 'scroll'].contains(style['overflowY'])) {
      return height;
    }
    final flow = children
        .where((c) => c.style['position'] != 'absolute' && c.tag != 'hotspot');
    final initial = flow.where((c) => c.initiallyVisible).toList();
    final current = flow.where((c) => c.visible(controller, frame)).toList();
    final originalSum = initial.fold<double>(0, (sum, c) => sum + c.height);
    final currentSum = current.fold<double>(
        0, (sum, c) => sum + c.layoutHeight(controller, frame));
    final gap = _number(style['rowGap'], _number(style['gap']));
    return height +
        currentSum -
        originalSum +
        (math.max(0, current.length - 1) - math.max(0, initial.length - 1)) *
            gap;
  }

  TextStyle get textStyle {
    final size = _number(style['fontSize'], 16);
    final weight = _number(style['fontWeight'], 400).round();
    final line = double.tryParse(
        (style['lineHeight'] ?? '').toString().replaceAll('px', ''));
    return TextStyle(
      color: figmaColor(style['color']),
      fontFamily: 'Inter',
      fontSize: size,
      fontWeight: FontWeight.values[((weight / 100).round() - 1).clamp(0, 8)],
      fontVariations: [
        ui.FontVariation('wght', weight.toDouble()),
        const ui.FontVariation('opsz', 14)
      ],
      // Some exported captions have a 32px line inside a 16px frame. Keep
      // their font readable instead of shrinking the glyph with that line box.
      height: line == null || line <= 0
          ? 1.21
          : (height > 0 && height < size * 1.8 && line > height
                  ? math.max(size * 1.2, height)
                  : line) /
              size,
      leadingDistribution: TextLeadingDistribution.even,
      letterSpacing: _number(style['letterSpacing']),
      decoration: style['decoration'] == 'underline'
          ? TextDecoration.underline
          : TextDecoration.none,
    );
  }

  TextAlign get textAlign => switch (style['textAlign']) {
        'center' => TextAlign.center,
        'right' || 'end' => TextAlign.right,
        'justify' => TextAlign.justify,
        _ => TextAlign.left,
      };

  BorderRadius get _radius {
    final values = style['radius'] as List? ?? const [0, 0, 0, 0];
    return BorderRadius.only(
      topLeft: Radius.circular(_number(values[0])),
      topRight: Radius.circular(_number(values[1])),
      bottomRight: Radius.circular(_number(values[2])),
      bottomLeft: Radius.circular(_number(values[3])),
    );
  }

  EdgeInsets get _padding {
    final p = style['padding'] as List? ?? const [0, 0, 0, 0];
    final b = style['borderWidths'] as List? ?? const [0, 0, 0, 0];
    return EdgeInsets.fromLTRB(
        _number(p[3]) + _number(b[3]),
        _number(p[0]) + _number(b[0]),
        _number(p[1]) + _number(b[1]),
        _number(p[2]) + _number(b[2]));
  }

  Border? get _border {
    final widths = List<dynamic>.from(
        style['borderWidths'] as List? ?? const [0, 0, 0, 0]);
    // Exported page bars sometimes carry a full HTML border. In the design
    // these are separators, not rectangular frames around the header/footer.
    if (width >= 360 &&
        height <= 200 &&
        height >= 60 &&
        _radius == BorderRadius.zero) {
      widths[1] = widths[3] = 0;
      if (y < 200) widths[0] = 0;
      if (y > 550) widths[2] = 0;
    }
    if (widths.every((v) => _number(v) == 0)) return null;
    final colors = style['borderColors'] as List? ?? const ['', '', '', ''];
    BorderSide side(int i) => BorderSide(
        width: _number(widths[i]),
        color: figmaColor(colors[i]),
        style: _number(widths[i]) == 0 ? BorderStyle.none : BorderStyle.solid);
    return Border(top: side(0), right: side(1), bottom: side(2), left: side(3));
  }

  List<BoxShadow>? get _shadows {
    final value = style['shadow']?.toString() ?? '';
    if (value == 'none' || value.isEmpty) return null;
    final matches = RegExp(
            r'(rgba?\([^)]+\))\s+([-\d.]+)px\s+([-\d.]+)px\s+([-\d.]+)px(?:\s+([-\d.]+)px)?')
        .allMatches(value);
    return matches
        .map((m) => BoxShadow(
            color: figmaColor(m[1]),
            offset: Offset(double.parse(m[2]!), double.parse(m[3]!)),
            blurRadius: double.parse(m[4]!),
            spreadRadius: double.tryParse(m[5] ?? '') ?? 0))
        .toList();
  }

  List<Color> get _gradientColors {
    final source = style['backgroundImage']?.toString() ?? '';
    if (!source.startsWith('linear-gradient(')) return const [];
    final firstLayer = RegExp(r'linear-gradient\((?:[^()]|\([^()]*\))*\)')
            .firstMatch(source)
            ?.group(0) ??
        source;
    final colors = RegExp(r'rgba?\([^)]+\)')
        .allMatches(firstLayer)
        .map((m) => figmaColor(m.group(0)))
        .toList();
    return colors;
  }

  Gradient? get _gradient {
    final colors = _gradientColors;
    if (colors.length < 2 || colors.every((color) => color == colors.first)) {
      return null;
    }
    return LinearGradient(
        begin: Alignment.centerLeft,
        end: Alignment.centerRight,
        colors: colors);
  }

  TextSpan _inlineSpan(FigmaPrototypeController controller, String frame) {
    var value =
        controller.bound(frame, nodeId, 'characters')?.toString() ?? text;
    if (style['whiteSpace'] == 'normal') {
      value = value?.replaceAll(RegExp(r'[ \t\r\n]+'), ' ');
    }
    return TextSpan(
        text: value,
        style: textStyle,
        children: children.isEmpty
            ? null
            : [
                for (final child in children)
                  child._inlineSpan(controller, frame),
              ]);
  }

  FigmaBox get _typographyLeaf {
    if (text?.trim().isNotEmpty == true || children.isEmpty) return this;
    FigmaBox? emptyText;
    for (final child in children) {
      final leaf = child._typographyLeaf;
      if (leaf.text?.trim().isNotEmpty == true) return leaf;
      if (leaf.text != null) emptyText ??= leaf;
    }
    return emptyText ?? this;
  }

  bool get _textGroup =>
      asset == null &&
      (text?.trim().isNotEmpty == true || children.isNotEmpty) &&
      (text != null ||
          (figmaColor(style['background']).a == 0 &&
              _gradient == null &&
              _border == null)) &&
      [null, 'choiceLabel', 'enabledLabel'].contains(control['kind']) &&
      children.every((c) => c._textGroup);

  bool get _hasImage => asset != null || children.any((c) => c._hasImage);

  double usedWidth(List<FigmaBox> boxes) =>
      boxes.fold<double>(0, (sum, c) => sum + c.width) +
      math.max(0, boxes.length - 1) *
          _number(style['columnGap'], _number(style['gap']));

  FigmaBox _withWidth(double value, {String? align}) => FigmaBox(
      key: key,
      nodeId: nodeId,
      name: name,
      tag: tag,
      width: value,
      height: height,
      x: x,
      y: y,
      text: text,
      asset: asset,
      formLabel: formLabel,
      fixedHeight: fixedHeight,
      initiallyVisible: initiallyVisible,
      style: align == null ? style : {...style, 'textAlign': align},
      control: control,
      children: _textGroup
          ? [for (final c in children) c._withWidth(math.max(1, value - c.x))]
          : children);

  Offset get _translation {
    final transform = '${style['transform'] ?? ''}';
    if (!transform.startsWith('matrix(')) return Offset.zero;
    final values = transform.substring(7, transform.length - 1).split(',');
    return values.length == 6
        ? Offset(double.tryParse(values[4].trim()) ?? 0,
            double.tryParse(values[5].trim()) ?? 0)
        : Offset.zero;
  }

  Widget _absoluteChild(
      FigmaBox child, List<FigmaBox> siblings, double parentWidth) {
    if (nodeId == '6:1399' && child.control['kind'] == 'input') {
      // The exported second field extended 70 px outside the 402 px frame.
      return Positioned(
          left: child.control['key'] == 'need.before' ? 191 : 6,
          top: child.y,
          child: child._withWidth(173));
    }
    final left = child.x + child._translation.dx;
    final top = child.y + child._translation.dy;
    var right = parentWidth - _padding.right;
    if (child._textGroup && child._translation.dx == 0) {
      for (final sibling in siblings) {
        if (identical(sibling, child) || sibling.tag == 'hotspot') continue;
        // Decorative empty rectangles/dots are backgrounds, not text limits.
        if (!sibling._textGroup &&
            !sibling._hasImage &&
            sibling.control.isEmpty) {
          continue;
        }
        final sx = sibling.x + sibling._translation.dx;
        final sy = sibling.y + sibling._translation.dy;
        if (sx > left && sy < top + child.height && sy + sibling.height > top) {
          right = math.min(right, sx - 4);
        }
      }
    }
    if (child._textGroup &&
        child.width >= 45 &&
        child.width <= 70 &&
        child.height >= 25 &&
        child.height <= 40) {
      final tiles = siblings
          .where((b) =>
              b.width >= 70 &&
              b.width <= 130 &&
              b.height >= 70 &&
              b.height <= 140 &&
              b._radius != BorderRadius.zero &&
              b.y <= top &&
              b.y + b.height >= top + child.height &&
              b.x <= left + child.width / 2 &&
              b.x + b.width >= left + child.width / 2)
          .toList();
      if (tiles.length == 1) {
        final tile = tiles.single;
        return Positioned(
            left: tile.x + 6 - child._translation.dx,
            top: child.y,
            child: child._withWidth(tile.width - 12, align: 'center'));
      }
    }
    final available = math.max(1.0, right - left);
    final w = child.style['preserveWidth'] != true &&
            child._textGroup &&
            child._translation.dx == 0
        ? available
        : child.width;
    return Positioned(
        left: child.nodeId == '6:1390' && nodeId == '6:1380' ? 207 : child.x,
        top: child.y,
        child: child.tag == 'hotspot' ? child : child._withWidth(w));
  }

  Widget _readableText(String value, TextStyle style, double availableWidth,
      double availableHeight,
      {TextAlign? align}) {
    // A fixed text-node width from the export must never truncate a whole
    // button label. Use the repaired parent width and fit only if necessary.
    return LayoutBuilder(builder: (context, constraints) {
      final w = math.max(1.0, math.min(availableWidth, constraints.maxWidth));
      final lineHeight = (style.fontSize ?? 14) * (style.height ?? 1.21);
      if (availableHeight < lineHeight * 1.65) {
        // Slightly long single-line captions should fit horizontally, rather
        // than wrapping once and then shrinking to half their intended size.
        return FittedBox(
            fit: BoxFit.scaleDown,
            alignment: (align ?? textAlign) == TextAlign.center
                ? Alignment.center
                : (align ?? textAlign) == TextAlign.right
                    ? Alignment.centerRight
                    : Alignment.centerLeft,
            child: Text(value,
                style: style,
                textAlign: align ?? textAlign,
                maxLines: 1,
                softWrap: false));
      }
      final painter = TextPainter(
          text: TextSpan(text: value, style: style),
          textDirection: Directionality.of(context),
          textAlign: align ?? textAlign)
        ..layout(maxWidth: w);
      final needsFit = painter.height > availableHeight + 1;
      painter.dispose();
      final label = Text(value,
          style: style,
          textAlign: align ?? textAlign,
          softWrap: true,
          overflow: TextOverflow.visible);
      return needsFit
          ? FittedBox(
              fit: BoxFit.scaleDown,
              alignment: Alignment.centerLeft,
              child: SizedBox(width: w, child: label))
          : label;
    });
  }

  @override
  Widget build(BuildContext context) {
    final frame = _FigmaFrameScope.of(context);
    final controller = FigmaPrototypeScope.of(context);
    if (!visible(controller, frame)) return const SizedBox.shrink();
    final effectiveWidth =
        _number(controller.bound(frame, nodeId, 'width'), width);
    final effectiveHeight = layoutHeight(controller, frame);
    final active = children.where((c) => c.visible(controller, frame)).toList();
    final absolute = active
        .where((c) => c.style['position'] == 'absolute' || c.tag == 'hotspot')
        .toList();
    final normal = active.where((c) => !absolute.contains(c)).toList();
    final flex =
        style['display'] == 'flex' || style['display'] == 'inline-flex';
    final vertical = style['direction'] == 'column';
    final scrollY =
        style['overflowY'] == 'auto' || style['overflowY'] == 'scroll';
    final categoryStrip = !vertical &&
        active.length > 1 &&
        active.every((c) =>
            c.control['kind'] == 'choice' &&
            ['category', 'allergens', 'filter']
                .any((key) => '${c.control['key']}'.contains(key)));
    final scrollX = categoryStrip ||
        style['overflowX'] == 'auto' ||
        style['overflowX'] == 'scroll';
    final kind = control['kind'];
    final selected = controlSelected(controller.frontend, control);
    final enabled = controlEnabled(controller.frontend, control);
    final isInput = kind == 'input' ||
        (name == 'Input' && children.any((c) => c.text != null));

    final boxHeight = effectiveHeight;

    Widget content;
    final plainButton = ['action', 'choice'].contains(kind) &&
        !['pickImage', 'camera', 'cameraNext', 'pickDocument']
            .contains(control['action']) &&
        width >= 60 &&
        height >= 24 &&
        height <= 64 &&
        !_hasImage &&
        _radius != BorderRadius.zero &&
        _typographyLeaf.text != null;
    if (plainButton) {
      final label = '${control['label'] ?? _typographyLeaf.text ?? ''}';
      var labelStyle = _typographyLeaf.textStyle;
      if (kind == 'choice' && control.containsKey('selectedColor')) {
        labelStyle = labelStyle.copyWith(
            color: figmaColor(
                control[selected ? 'selectedColor' : 'unselectedColor']));
      } else if (control.containsKey('enabledWhen') && !enabled) {
        labelStyle = labelStyle.copyWith(color: const Color(0xFF687C74));
      }
      content = Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
          child: Center(
              child: _readableText(
                  label, labelStyle, effectiveWidth - 20, boxHeight - 6,
                  align: TextAlign.center)));
    } else if (kind == 'needCounter') {
      content = Align(
          alignment: Alignment.centerLeft,
          child: FittedBox(
              fit: BoxFit.scaleDown,
              alignment: Alignment.centerLeft,
              child: Text.rich(TextSpan(children: [
                TextSpan(
                    text: '${control['quantity']}',
                    style: const TextStyle(
                        color: mealGreen,
                        fontSize: 40,
                        height: 1.1,
                        fontWeight: FontWeight.w700)),
                TextSpan(
                    text: ' / ${control['total']} suất đã được ghép',
                    style: const TextStyle(
                        color: mealInk, fontSize: 13, height: 1.2)),
              ]))));
    } else if (kind == 'needProgress') {
      content = ClipRRect(
          borderRadius: BorderRadius.circular(20),
          child: LinearProgressIndicator(
              value: (control['value'] as num).toDouble(),
              minHeight: boxHeight,
              color: mealGreen,
              backgroundColor: Colors.white));
    } else if (kind == 'dashboardBell') {
      content = IconButton(
          tooltip: 'Thông báo',
          padding: EdgeInsets.zero,
          onPressed: () => FrontendActions.run(context, frame,
              {'action': 'route', 'route': '/shared/notifications'}),
          icon: const Icon(Icons.notifications_none_outlined,
              color: mealInk, size: 24));
    } else if (kind == 'boundRecords') {
      final rows = List<FigmaBox>.from(control['rows'] as List);
      content = ListView(children: [
        for (final row in rows)
          SizedBox(width: row.width, height: row.height, child: row)
      ]);
    } else if (kind == 'liveDocument') {
      final urls = List<String>.from(control['urls'] as List);
      content = PageView(children: [
        for (final url in urls)
          GestureDetector(
              onTap: () => FrontendActions.run(
                  context, frame, {'action': 'openDocument', 'url': url}),
              child: url.toLowerCase().endsWith('.pdf')
                  ? const Center(
                      child: Icon(Icons.description_outlined,
                          color: mealGreen, size: 48))
                  : Image.network(url,
                      fit: BoxFit.contain,
                      errorBuilder: (_, e, st) => const Icon(
                          Icons.broken_image_outlined,
                          color: mealGreen)))
      ]);
    } else if (kind == 'profilePage') {
      content = const ProfilePageContent();
    } else if (kind == 'deliveryJobsPage') {
      content = const DeliveryJobsContent();
    } else if (kind == 'deliveryJobDetails') {
      content = const DeliveryJobDetails();
    } else if (kind == 'courierContact') {
      content = const CourierContact();
    } else if (kind == 'handoverTimeline') {
      content = const HandoverTimeline();
    } else if (kind == 'pickupContact') {
      content = const PickupContact();
    } else if (kind == 'deliveryAcceptanceSummary') {
      content = const DeliveryAcceptanceSummary();
    } else if (kind == 'pageHeader') {
      content = MealPageHeader(
          title: control['title'], subtitle: control['subtitle'] ?? '');
    } else if (kind == 'requestMatchingPanel') {
      content = RequestMatchingPanel(matching: control['matching'] == true);
    } else if (kind == 'listingSummary') {
      content = const ListingSummary();
    } else if (kind == 'listingRequestsPrompt') {
      content = const ListingRequestsPrompt();
    } else if (kind == 'publishSummary') {
      content = const PublishSummary();
    } else if (kind == 'foodSafetyHero') {
      content = const FoodSafetyHero();
    } else if (kind == 'pickupDetails') {
      content = const PickupDetails();
    } else if (kind == 'mealMap') {
      content = MealMap(editable: control['editable'] == true);
    } else if (kind == 'licensePhoto') {
      content = const LicensePhoto();
    } else if (kind == 'verificationHero') {
      content = const VerificationHero();
    } else if (kind == 'packagingStep') {
      content = PackagingStep(index: control['index']);
    } else if (kind == 'facilityPhotos') {
      content = const FacilityPhotos();
    } else if (kind == 'licenseFields') {
      content = const LicenseFields();
    } else if (kind == 'safetyCommitments') {
      content = const SafetyCommitments();
    } else if (kind == 'volunteerCalendar') {
      content = const VolunteerCalendar();
    } else if (kind == 'shiftRegistration') {
      content = const ShiftRegistration();
    } else if (kind == 'profileSummary') {
      content = const ProfileSummary();
    } else if (kind == 'qr') {
      content = QrImageView(
          data:
              'sharemeal:${controller.frontend.selectedOrder.id}:${control['purpose'] == 'receipt' ? 'receipt' : 'pickup'}:${control['purpose'] == 'receipt' ? controller.frontend.get('receipt.pin', '') : controller.frontend.get('handover.pin', '')}',
          size: width,
          padding: const EdgeInsets.all(8),
          backgroundColor: Colors.white);
    } else if (kind == 'impactChart') {
      content = const ImpactChart();
    } else if (kind == 'impactCategories') {
      content = const ImpactCategories();
    } else if (kind == 'scanner') {
      content = const HandoverScanner();
    } else if (kind == 'bottomNav') {
      content = MealBottomBar(
          role: control['role'],
          page: control['page'],
          icons: control['icons'] as List? ?? const []);
    } else if (kind == 'collection') {
      content = FrontendCollection(collection: control['collection']);
    } else if (kind == 'messages') {
      content = const FrontendMessages();
    } else if (kind == 'checkbox') {
      content = Center(
          child: Transform.scale(
              scale: .85,
              child: Checkbox(
                  key: ValueKey('check/${control['key']}'),
                  value: selected,
                  activeColor: mealGreen,
                  side: const BorderSide(color: Color(0xFF7D9288), width: 1.4),
                  materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                  visualDensity: VisualDensity.compact,
                  onChanged: (_) =>
                      FrontendActions.run(context, frame, control))));
    } else if (kind == 'radioIndicator') {
      content = RadioGroup<String>(
          groupValue: controlValue(controller.frontend, control)?.toString(),
          onChanged: (v) => controller.frontend.set(control['key'], v),
          child: Radio<String>(
              value: control['value'],
              activeColor: mealGreen,
              materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
              visualDensity: VisualDensity.compact));
    } else if (kind == 'slider') {
      final value =
          (controlValue(controller.frontend, control) as num? ?? 5).toDouble();
      content = SliderTheme(
          data: SliderTheme.of(context).copyWith(
              trackHeight: 4,
              thumbShape: const RoundSliderThumbShape(enabledThumbRadius: 8),
              overlayShape: const RoundSliderOverlayShape(overlayRadius: 16)),
          child: Slider(
              padding: EdgeInsets.zero,
              key: ValueKey('slider/${control['key']}'),
              value: value.clamp((control['min'] as num).toDouble(),
                  (control['max'] as num).toDouble()),
              min: (control['min'] as num).toDouble(),
              max: (control['max'] as num).toDouble(),
              divisions: 9,
              activeColor: mealGreen,
              onChanged: (v) =>
                  controller.frontend.set(control['key'], v.round())));
    } else if (kind == 'star') {
      content = Icon(selected ? Icons.star : Icons.star_outline,
          size: width, color: const Color(0xFFDB9B27));
    } else if (kind == 'pinCell') {
      final pin = controller.frontend.get('handover.entered', '');
      final i = control['index'] as int;
      content = Center(
          child: Text(i < pin.length ? pin[i] : '',
              style: const TextStyle(
                  fontSize: 24, color: mealInk, fontWeight: FontWeight.w600)));
    } else if (kind == 'value' || kind == 'computed') {
      final value = kind == 'computed'
          ? computedText(controller.frontend, control['value'])
          : '${controlValue(controller.frontend, control) ?? ''}${control['suffix'] ?? ''}';
      content = Align(
          alignment: Alignment.centerLeft,
          child: FittedBox(
              fit: BoxFit.scaleDown,
              alignment: Alignment.centerLeft,
              child: Text(value,
                  maxLines: 1,
                  style: _typographyLeaf.textStyle,
                  textAlign: textAlign)));
    } else if (isInput) {
      final child = _typographyLeaf;
      if (kind == 'input') controller.registerField(frame, control);
      final inset = control['inset'] as List?;
      content = Padding(
          padding: inset != null
              ? EdgeInsets.only(left: _number(inset[0]), right: 8)
              : EdgeInsets.symmetric(horizontal: _padding.left),
          child: Center(
              child: _FigmaEditableInput(
                  key: ValueKey(
                      'field/${control['key'] ?? '$frame/${nodeId ?? formLabel ?? name}'}'),
                  frameId: frame,
                  box: this,
                  textBox: child,
                  controller: controller)));
    } else if (control['action'] == 'pickDocument' &&
        controller.frontend.values[control['key']] is Map) {
      final file = controller.frontend.values[control['key']] as Map;
      content = Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10),
          child: Row(children: [
            const Icon(Icons.insert_drive_file_outlined,
                color: mealGreen, size: 22),
            const SizedBox(width: 10),
            Expanded(
                child: Text(file['name'].toString(),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(fontSize: 13, color: mealInk))),
            const Icon(Icons.chevron_right, color: mealGreen, size: 18)
          ]));
    } else if (kind == 'photo') {
      final s = controller.frontend;
      final photos = control['key'] == 'selected.photo'
          ? s.selectedFood.photos
          : <String>{
              if (s.get('food.photo', '').isNotEmpty) s.get('food.photo', ''),
              ...List<String>.from(s.values['food.photos'] as List? ?? [])
            }.toList();
      content = photos.isEmpty &&
              control['key'] == 'food.photo' &&
              s is FirebaseAppState
          ? InkWell(
              onTap: () => FrontendActions.run(context, frame, {
                    'kind': 'action',
                    'action': 'pickImage',
                    'key': 'food.photo'
                  }),
              child: const ColoredBox(
                  color: Color(0xFFE5F1EB),
                  child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.add_photo_alternate_outlined,
                            size: 42, color: mealGreen),
                        SizedBox(height: 10),
                        Text('Chọn 1–6 ảnh món ăn',
                            style: TextStyle(color: mealGreen))
                      ])))
          : photos.length > 1
              ? MediaGallery(urls: photos, height: boxHeight, compact: true)
              : control['key'] == 'selected.photo'
                  ? FoodPhoto.listing(s.selectedFood)
                  : FoodPhoto(
                      name: s.get('food.name', 'Cơm gà xối mỡ'),
                      category: s.get('food.category', 'Cơm & món mặn'),
                      photo: s.get('food.photo', ''));
    } else if (control['action'] == 'pickImage' &&
        control['key'] == 'food.photo') {
      final count =
          (controller.frontend.values['food.photos'] as List? ?? []).length;
      content = Row(children: [
        const Icon(Icons.add_photo_alternate_outlined,
            color: mealGreen, size: 20),
        const SizedBox(width: 8),
        Expanded(
            child: Text('Chọn / thêm nhiều ảnh ($count/6)',
                style: const TextStyle(color: mealGreen, fontSize: 13)))
      ]);
    } else if (['pickImage', 'camera', 'cameraNext']
            .contains(control['action']) &&
        controller.frontend
            .get<String>(control['key'] ?? '$frame.photo', '')
            .isNotEmpty) {
      content = ClipRRect(
          borderRadius: _radius,
          child: Image(
              image: storedMealImage(controller.frontend
                  .get(control['key'] ?? '$frame.photo', '')),
              fit: BoxFit.cover,
              errorBuilder: (_, e, st) =>
                  const Icon(Icons.broken_image_outlined, color: mealGreen)));
    } else if (['pickTime', 'editAddress'].contains(control['action']) &&
        controller.frontend.values.containsKey(control['key'])) {
      final current = controller.frontend.values[control['key']].toString();
      final label = control['label'].toString();
      content = Align(
          alignment: Alignment.centerLeft,
          child: Text(
              control['action'] == 'pickTime'
                  ? label.replaceAll(
                      RegExp(r'\d{1,2}:\d{2}(?:[–-]\d{1,2}:\d{2})?'), current)
                  : current,
              style: _typographyLeaf.textStyle));
    } else if (asset != null) {
      final fit = switch (style['objectFit']) {
        'cover' => BoxFit.cover,
        'contain' => BoxFit.contain,
        _ => BoxFit.fill,
      };
      content = asset!.endsWith('.svg')
          ? SvgPicture.asset(asset!,
              width: effectiveWidth, height: boxHeight, fit: fit)
          : Image.asset(asset!,
              width: effectiveWidth,
              height: boxHeight,
              fit: fit,
              filterQuality: FilterQuality.medium);
      if (_radius != BorderRadius.zero) {
        content = ClipRRect(borderRadius: _radius, child: content);
      }
    } else if (text != null && active.isEmpty) {
      var value =
          controller.bound(frame, nodeId, 'characters')?.toString() ?? text!;
      if (style['whiteSpace'] == 'normal') {
        value = value.replaceAll(RegExp(r'[ \t\r\n]+'), ' ');
      }
      final labelStyle = kind == 'enabledLabel'
          ? textStyle.copyWith(
              color: enabled ? Colors.white : const Color(0xFF687C74))
          : ['choiceLabel', 'choice'].contains(kind)
              ? textStyle.copyWith(
                  color: figmaColor(
                      control[selected ? 'selectedColor' : 'unselectedColor']))
              : textStyle;
      content = _readableText(value, labelStyle, effectiveWidth, boxHeight);
    } else if (controller.bound(frame, nodeId, 'characters') != null) {
      // Figma text IDs sometimes belong to a vertical alignment wrapper, not
      // its exported <p>. Bind the displayed label, not only the leaf node.
      content = Align(
          alignment: Alignment(
              textAlign == TextAlign.center
                  ? 0
                  : textAlign == TextAlign.right
                      ? 1
                      : -1,
              style['justify'] == 'center' ? 0 : -1),
          child: _readableText(
              controller.bound(frame, nodeId, 'characters').toString(),
              _typographyLeaf.textStyle,
              effectiveWidth,
              boxHeight));
    } else if (active.isNotEmpty &&
        active.every((c) => ['span', 'text', 'br'].contains(c.tag))) {
      content = Text.rich(_inlineSpan(controller, frame),
          textAlign: textAlign,
          softWrap: !['nowrap', 'pre'].contains(style['whiteSpace']),
          overflow: TextOverflow.visible,
          textHeightBehavior: const TextHeightBehavior(
              leadingDistribution: TextLeadingDistribution.even));
    } else if (flex) {
      final gap = _number(
          style[vertical ? 'rowGap' : 'columnGap'], _number(style['gap']));
      // Preserve CSS/Figma flex geometry, including intentional visible
      // overflow. Flutter Flex instead constrains these labels and clips them.
      final innerMain = vertical
          ? boxHeight - _padding.vertical
          : effectiveWidth - _padding.horizontal;
      final used = normal.fold<double>(
              0,
              (sum, child) =>
                  sum +
                  (vertical
                      ? child.layoutHeight(controller, frame)
                      : child.width)) +
          math.max(0, normal.length - 1) * gap;
      final textChildren = normal.where((c) => c._textGroup).toList();
      final textTotal = textChildren.fold<double>(0, (sum, c) => sum + c.width);
      final shareTextSpace = !vertical &&
          !scrollX &&
          textTotal > 0 &&
          (used > innerMain ||
              ![
                'center',
                'flex-end',
                'space-between',
                'space-around',
                'space-evenly'
              ].contains(style['justify']));
      final textBudget = math.max(1.0, innerMain - (used - textTotal));
      final free = shareTextSpace
          ? 0.0
          : scrollX
              ? math.max(0.0, innerMain - used)
              : innerMain - used;
      double cursor = switch (style['justify']) {
        'center' => free / 2,
        'flex-end' => free,
        'space-around' => free / math.max(1, normal.length) / 2,
        'space-evenly' => free / (normal.length + 1),
        _ => 0,
      };
      final extraGap = switch (style['justify']) {
        'space-between' => math.max(0, free) / math.max(1, normal.length - 1),
        'space-around' => math.max(0, free) / math.max(1, normal.length),
        'space-evenly' => math.max(0, free) / (normal.length + 1),
        _ => 0.0,
      };
      final positioned = <Widget>[];
      for (final child in normal) {
        final childWidth = vertical && child._textGroup
            ? (style['align'] == 'center'
                ? math.min(child.width,
                    math.max(1.0, effectiveWidth - _padding.horizontal))
                : math.max(1.0, effectiveWidth - _padding.horizontal))
            : shareTextSpace && child._textGroup
                ? child.width * textBudget / textTotal
                : child.width;
        final crossFree = vertical
            ? effectiveWidth - _padding.horizontal - childWidth
            : boxHeight -
                _padding.vertical -
                child.layoutHeight(controller, frame);
        final cross = switch (style['align']) {
          'center' => crossFree / 2,
          'flex-end' => crossFree,
          _ => 0.0,
        };
        positioned.add(Positioned(
            left: _padding.left + (vertical ? cross : cursor),
            top: _padding.top + (vertical ? cursor : cross),
            child: child._withWidth(childWidth)));
        cursor +=
            (vertical ? child.layoutHeight(controller, frame) : childWidth) +
                gap +
                extraGap;
      }
      content = Stack(clipBehavior: Clip.none, children: [
        ...positioned,
        for (final child in absolute)
          if (scrollX)
            Positioned(left: child.x, top: child.y, child: child)
          else
            _absoluteChild(child, absolute, effectiveWidth),
      ]);
    } else {
      content = Stack(clipBehavior: Clip.none, children: [
        for (final child in active)
          if (scrollX)
            Positioned(left: child.x, top: child.y, child: child)
          else
            _absoluteChild(child, active, effectiveWidth),
      ]);
    }

    if (scrollY || scrollX) {
      double extentH = boxHeight;
      double extentW = effectiveWidth;
      if (flex && vertical) {
        extentH = math.max(
            boxHeight,
            normal.fold<double>(
                    0, (v, c) => v + c.layoutHeight(controller, frame)) +
                math.max(0, normal.length - 1) * _number(style['gap']) +
                _padding.vertical);
      } else if (flex && !vertical) {
        extentW =
            math.max(effectiveWidth, usedWidth(normal) + _padding.horizontal);
      } else {
        for (final child in active) {
          extentH = math.max(
              extentH, child.y + child.layoutHeight(controller, frame));
          extentW = math.max(extentW, child.x + child.width);
        }
      }
      final scrollContent = SizedBox(
          width: scrollX ? extentW : effectiveWidth,
          height: scrollY ? extentH : boxHeight,
          child: content);
      content = categoryStrip
          ? HorizontalOptionsStrip(
              scrollKey: ValueKey('figma/scroll-x/$nodeId'),
              child: scrollContent)
          : SingleChildScrollView(
              key: ValueKey('figma/scroll-${scrollY ? 'y' : 'x'}/$nodeId'),
              physics: const BouncingScrollPhysics(),
              scrollDirection: scrollY ? Axis.vertical : Axis.horizontal,
              child: scrollContent);
    }

    final gradientColors = _gradientColors;
    // Figma exports stacked solid fills as constant-color gradients.
    // A solid native fill is their exact equivalent, not a new palette choice.
    var background = gradientColors.isNotEmpty &&
            gradientColors.every((color) => color == gradientColors.first)
        ? gradientColors.first
        : figmaColor(style['background']);
    if (kind == 'choice') {
      background = figmaColor(
          control[selected ? 'selectedBackground' : 'unselectedBackground']);
    }
    if (kind == 'toggleCell') {
      background = selected ? mealGreen : const Color(0xFFF2F6F3);
    }
    if (kind != 'enabledLabel' && control.containsKey('enabledWhen')) {
      background = figmaColor(
          control[enabled ? 'enabledBackground' : 'disabledBackground']);
    }
    final border = _border;
    // Clip the children, then paint the border above them. Clipping a decorated
    // box itself double-antialiases corners and lets opaque children hide edges.
    if (!scrollY &&
        !scrollX &&
        (['hidden', 'clip'].contains(style['overflowX']) ||
            ['hidden', 'clip'].contains(style['overflowY']))) {
      content = ClipRRect(borderRadius: _radius, child: content);
    }
    content = DecoratedBox(
        decoration: BoxDecoration(
            color: background,
            gradient: control.containsKey('enabledWhen') ? null : _gradient,
            borderRadius: _radius,
            boxShadow: _shadows),
        child: DecoratedBox(
            position: DecorationPosition.foreground,
            decoration: BoxDecoration(
                border: border,
                borderRadius:
                    border != null && !border.isUniform ? null : _radius),
            child: content));
    content =
        SizedBox(width: effectiveWidth, height: boxHeight, child: content);

    final transform = style['transform']?.toString() ?? 'none';
    if (transform.startsWith('matrix(')) {
      final m = transform
          .substring(7, transform.length - 1)
          .split(',')
          .map((s) => double.parse(s.trim()))
          .toList();
      content = Transform(
          alignment: Alignment.center,
          transform: Matrix4.fromList([
            m[0],
            m[1],
            0,
            0,
            m[2],
            m[3],
            0,
            0,
            0,
            0,
            1,
            0,
            m[4],
            m[5],
            0,
            1
          ]),
          child: content);
    }
    final opacity = _number(style['opacity'], 1).clamp(0.0, 1.0);
    if (opacity < 1) content = Opacity(opacity: opacity, child: content);
    final interactive = [
      'licensePhoto',
      'choice',
      'toggle',
      'toggleCell',
      'step',
      'action',
      'star'
    ].contains(kind);
    if (interactive && !isInput) {
      content = Semantics(
          button: true,
          enabled: enabled,
          selected: kind == 'choice' ? selected : null,
          checked: kind == 'toggle' ? selected : null,
          label: control['label'] as String?,
          child: Material(
              type: MaterialType.transparency,
              child: InkWell(
                  key: ValueKey(control['source'] != null
                      ? 'tap/$frame/${control['source']}'
                      : 'control/$frame/${nodeId ?? control['key']}/${control['value'] ?? kind}'),
                  borderRadius: _radius,
                  onTap: enabled
                      ? () => FrontendActions.run(context, frame, control)
                      : null,
                  child: content)));
    }
    return content;
  }
}

class _FigmaEditableInput extends StatefulWidget {
  const _FigmaEditableInput(
      {super.key,
      required this.frameId,
      required this.box,
      required this.textBox,
      required this.controller});
  final String frameId;
  final FigmaBox box, textBox;
  final FigmaPrototypeController controller;
  @override
  State<_FigmaEditableInput> createState() => _FigmaEditableInputState();
}

class _FigmaEditableInputState extends State<_FigmaEditableInput> {
  late final TextEditingController _text;
  late final bool _password;

  @override
  void initState() {
    super.initState();
    _password = widget.box.control['mode'] == 'password' ||
        (widget.box.formLabel ?? '').toLowerCase().contains('khẩu') ||
        (widget.textBox.text ?? '').contains('•');
    final stored = widget
        .controller.fields['${widget.frameId}/${widget.box.nodeId ?? ''}'];
    final spec = widget.box.control;
    final initial = spec['key']?.toString().startsWith('auth.') == true
        ? ''
        : controlValue(widget.controller.frontend, spec)?.toString();
    _text = TextEditingController(text: initial ?? stored ?? '');
  }

  @override
  void dispose() {
    _text.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final spec = widget.box.control;
    final fieldKey = spec['key'] as String?;
    final value = fieldKey == null
        ? null
        : widget.controller.frontend.values[fieldKey]?.toString();
    if (value != null && value != _text.text) {
      _text.value = TextEditingValue(
          text: value,
          selection: TextSelection.collapsed(offset: value.length));
    }
    final hint = widget.controller
            .bound(widget.frameId, widget.textBox.nodeId, 'characters')
            ?.toString() ??
        widget.textBox.text ??
        '';
    return TextField(
      key: ValueKey(
          'input/${fieldKey ?? '${widget.frameId}/${widget.box.nodeId}'}'),
      controller: _text,
      obscureText: _password &&
          !widget.controller.frontend.get('${fieldKey ?? ''}.visible', false),
      autocorrect: false,
      enableSuggestions: !_password,
      cursorColor: const Color(0xFF006642),
      keyboardType: switch (spec['mode']) {
        'number' => TextInputType.number,
        'email' => TextInputType.emailAddress,
        'phone' => TextInputType.phone,
        'multiline' => TextInputType.multiline,
        _ =>
          hint.contains('@') ? TextInputType.emailAddress : TextInputType.text
      },
      textInputAction: spec['mode'] == 'search'
          ? TextInputAction.search
          : spec['mode'] == 'multiline'
              ? TextInputAction.newline
              : TextInputAction.next,
      textAlignVertical: TextAlignVertical.center,
      scrollPadding: const EdgeInsets.fromLTRB(20, 24, 20, 100),
      minLines: 1,
      maxLines: _password
          ? 1
          : spec['mode'] == 'multiline'
              ? math.max(1, ((widget.box.height - 16) / 20).floor())
              : 1,
      inputFormatters: spec['mode'] == 'number'
          ? [FilteringTextInputFormatter.digitsOnly]
          : null,
      style: widget.textBox.textStyle,
      textAlign: widget.textBox.textAlign,
      decoration: InputDecoration(
        isDense: true,
        contentPadding: const EdgeInsets.symmetric(vertical: 8),
        border: InputBorder.none,
        enabledBorder: InputBorder.none,
        focusedBorder: InputBorder.none,
        hintText: spec['hint'] as String? ?? hint,
        hintStyle: widget.textBox.textStyle,
      ),
      onChanged: (value) {
        if (fieldKey != null) widget.controller.frontend.set(fieldKey, value);
        widget.controller.editField(
            widget.frameId, widget.box.nodeId, value, widget.textBox.nodeId);
      },
    );
  }
}
