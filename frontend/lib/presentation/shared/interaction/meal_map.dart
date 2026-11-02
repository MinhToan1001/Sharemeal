import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:io';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:url_launcher/url_launcher.dart';
import '../figma/figma_prototype_controller.dart';
import 'app_navigation.dart';
import 'frontend_actions.dart';

/// OSM supplies the in-app preview. Navigation opens Google Maps on request.
class MealMap extends StatefulWidget {
  const MealMap({super.key, this.editable = false, this.address, this.height});
  final bool editable;
  final String? address;
  final double? height;
  @override
  State<MealMap> createState() => _MealMapState();
}

class _MealMapState extends State<MealMap> {
  final _map = MapController();
  static final _cache = <String, LatLng>{};
  LatLng? _searched;
  bool _searching = false;
  bool _mapReady = false;
  String _lastAddress = '';
  @override
  void dispose() {
    _map.dispose();
    super.dispose();
  }

  Future<void> search(String address, {bool silent = false}) async {
    if (_searching || address.trim().isEmpty) return;
    final cached = _cache[address];
    if (cached != null) {
      _select(cached);
      return;
    }
    setState(() => _searching = true);
    try {
      final result = await const MethodChannel('sharemeal/maps_config')
          .invokeMapMethod<String, dynamic>('geocode',
              {'address': address}).timeout(const Duration(seconds: 15));
      if (result == null) {
        throw StateError(
            'Chưa tìm thấy địa chỉ. Hãy kéo bản đồ và chạm chọn điểm.');
      }
      final point = LatLng((result['latitude'] as num).toDouble(),
          (result['longitude'] as num).toDouble());
      _cache[address] = point;
      if (mounted) _select(point);
    } catch (e) {
      if (mounted && !silent) {
        FrontendActions.message(
            context,
            e is StateError
                ? e.message.toString()
                : 'Chưa tìm được vị trí. Hãy thử lại hoặc chọn trực tiếp trên bản đồ.');
      }
    } finally {
      if (mounted) setState(() => _searching = false);
    }
  }

  void _select(LatLng point) {
    setState(() => _searched = point);
    if (_mapReady) _map.move(point, 16);
    if (widget.editable) {
      final s = FigmaPrototypeScope.of(context).frontend;
      s.set('food.latitude', point.latitude);
      s.set('food.longitude', point.longitude);
    }
  }

  @override
  Widget build(BuildContext context) {
    final s = FigmaPrototypeScope.of(context).frontend;
    final address = widget.address ??
        (widget.editable
            ? s.get<String>('food.address', s.selectedFood.address)
            : s.selectedFood.address);
    final lat =
        widget.editable ? s.values['food.latitude'] : s.selectedFood.latitude;
    final lon =
        widget.editable ? s.values['food.longitude'] : s.selectedFood.longitude;
    if (_lastAddress != address) {
      _lastAddress = address;
      _searched = null;
      if (!(lat is num && lon is num) && address.trim().isNotEmpty) {
        WidgetsBinding.instance.addPostFrameCallback((_) {
          if (mounted) search(address, silent: true);
        });
      }
    }
    final point = lat is num && lon is num
        ? LatLng(lat.toDouble(), lon.toDouble())
        : _searched;
    Future<void> open() async {
      final query =
          point == null ? address : '${point.latitude},${point.longitude}';
      if (!await launchUrl(
              Uri.https('www.google.com', '/maps/search/',
                  {'api': '1', 'query': query}),
              mode: LaunchMode.externalApplication) &&
          context.mounted) {
        FrontendActions.message(
            context, 'Chưa mở được Google Maps trên thiết bị.');
      }
    }

    return SizedBox(
        height: widget.height,
        child: ClipRRect(
            borderRadius: BorderRadius.circular(20),
            child: Stack(children: [
              Positioned.fill(
                  child: FlutterMap(
                      key: const ValueKey('map/street-preview'),
                      mapController: _map,
                      options: MapOptions(
                          initialCenter:
                              point ?? const LatLng(10.7769, 106.7009),
                          initialZoom: 16,
                          maxZoom: 19,
                          interactionOptions: InteractionOptions(
                              flags: widget.editable
                                  ? InteractiveFlag.all
                                  : InteractiveFlag.none),
                          onMapReady: () {
                            _mapReady = true;
                            if (_searched != null) _map.move(_searched!, 16);
                          },
                          onTap: widget.editable
                              ? (_, p) => _select(p)
                              : (_, __) => open()),
                      children: [
                    TileLayer(
                        urlTemplate:
                            'https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
                        userAgentPackageName: 'com.example.sharemeal',
                        tileProvider: NetworkTileProvider(
                            headers: {
                              'User-Agent':
                                  'ShareMeal-demo/1.0 (com.example.sharemeal)'
                            },
                            cachingProvider: Platform.isAndroid
                                ? BuiltInMapCachingProvider
                                    .getOrCreateInstance()
                                : const DisabledMapCachingProvider()),
                        maxNativeZoom: 19),
                    if (point != null)
                      MarkerLayer(markers: [
                        Marker(
                            point: point,
                            width: 40,
                            height: 46,
                            alignment: Alignment.topCenter,
                            child: const Icon(Icons.location_pin,
                                color: mealGreen, size: 42))
                      ]),
                    Align(
                        alignment: Alignment.bottomRight,
                        child: GestureDetector(
                            onTap: () => launchUrl(
                                Uri.parse(
                                    'https://www.openstreetmap.org/copyright'),
                                mode: LaunchMode.externalApplication),
                            child: const ColoredBox(
                                color: Colors.white70,
                                child: Padding(
                                    padding: EdgeInsets.all(3),
                                    child: Text(
                                        '© OpenStreetMap · HOT / OSM France',
                                        style: TextStyle(
                                            fontSize: 9, color: mealInk)))))),
                  ])),
              Positioned(
                  top: 8,
                  left: 8,
                  right: 8,
                  child: Material(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(12),
                      elevation: 1,
                      child: Padding(
                          padding: const EdgeInsets.fromLTRB(10, 5, 5, 5),
                          child: Row(children: [
                            Expanded(
                                child: Text(
                                    point == null
                                        ? 'Chưa chọn điểm · ${address.isEmpty ? 'chạm bản đồ để chọn' : address}'
                                        : address.isEmpty
                                            ? 'Điểm đã chọn'
                                            : address,
                                    maxLines: 2,
                                    overflow: TextOverflow.ellipsis,
                                    style: const TextStyle(
                                        fontSize: 11, color: mealInk))),
                            IconButton(
                                tooltip: 'Tìm địa chỉ trên bản đồ',
                                onPressed:
                                    _searching ? null : () => search(address),
                                icon: _searching
                                    ? const SizedBox(
                                        width: 18,
                                        height: 18,
                                        child: CircularProgressIndicator(
                                            strokeWidth: 2))
                                    : const Icon(Icons.search,
                                        color: mealGreen, size: 20)),
                          ])))),
              Positioned(
                  left: 8,
                  bottom: 24,
                  child: FilledButton.tonalIcon(
                      key: const ValueKey('map/open-google'),
                      onPressed: open,
                      icon: const Icon(Icons.open_in_new, size: 16),
                      label: const Text('Mở Google Maps',
                          style: TextStyle(fontSize: 11)))),
            ])));
  }
}
