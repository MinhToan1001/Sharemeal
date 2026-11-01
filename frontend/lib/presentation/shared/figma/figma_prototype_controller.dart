import 'package:flutter/material.dart';
import 'figma_prototype_data.dart';
import '../interaction/frontend_state.dart';
import '../interaction/app_navigation.dart';
import '../interaction/interaction_values.dart';

/// Interaction state imported from Figma, separate from Firebase business data.
class FigmaPrototypeController extends ChangeNotifier {
  FigmaPrototypeController(
      {this.enableTimeouts = true, FrontendState? frontend})
      : frontend = frontend ?? FrontendState(),
        values = Map<String, dynamic>.from(figmaPrototypeDefaults) {
    this.frontend.addListener(_frontendChanged);
  }

  final FrontendState frontend;
  @override
  void dispose() {
    frontend.removeListener(_frontendChanged);
    frontend.dispose();
    super.dispose();
  }

  final Map<String, dynamic> values;
  final bool enableTimeouts;
  final Map<String, String> fields = {};
  void _frontendChanged() {
    syncFrontend();
    notifyListeners();
  }

  void syncFrontend() {
    final serverRole = frontend.values['backend.role'];
    if (serverRole is String && serverRole.isNotEmpty) {
      values['VariableID:80:1172'] =
          frontend.values['application.role'] ?? serverRole;
    }
    if (frontend.values.containsKey('backend.role')) {
      final role = frontend.values['application.role'] ?? serverRole;
      values['VariableID:98:1172'] = 'Đang chọn: ${switch (role) {
        'charity' => 'Tổ chức',
        'volunteer' => 'Tình nguyện',
        _ => 'Người cho'
      }}';
    }
    const verification = {
      'donor': 'VariableID:80:1173',
      'charity': 'VariableID:80:1174',
      'volunteer': 'VariableID:80:1175'
    };
    for (final e in verification.entries) {
      final status = frontend.values['verification.${e.key}'];
      if (status != null) values[e.value] = status;
    }
    if (!frontend.orderStateUsed) return;
    final order = frontend.selectedOrder, status = order.status;
    final active = ['assigned', 'pickedUp', 'completed'].contains(status);
    final picked = ['pickedUp', 'completed'].contains(status);
    final label = switch (status) {
      'awaiting' => 'Chờ người cho xác nhận',
      'accepted' => 'Đang tìm tình nguyện viên',
      'assigned' => 'Tình nguyện viên đang đến lấy',
      'pickedUp' => 'Đang giao đến tổ chức',
      'completed' => 'Đã hoàn tất',
      'rejected' => 'Yêu cầu đã bị từ chối',
      _ => 'Đơn đã hủy'
    };
    values.addAll({
      'VariableID:80:1176':
          ['awaiting', 'rejected', 'cancelled'].contains(status)
              ? status
              : 'accepted',
      'VariableID:80:1177': active,
      'VariableID:80:1178': picked,
      'VariableID:80:1180': status == 'completed',
      'VariableID:110:1143': label,
      'VariableID:110:1144': '${order.progress}%',
      'VariableID:110:1145': 326 * order.progress / 100,
      'VariableID:110:1147': label,
      'VariableID:110:1148': order.driver,
      'VariableID:110:1149': active,
      'VariableID:110:1150': status == 'pickedUp',
      'VariableID:110:1151': status == 'completed',
      'VariableID:110:1152': status == 'awaiting',
      'VariableID:110:1153': status == 'accepted',
      'VariableID:110:1154':
          '${order.quantity} suất ${frontend.selectedFood.name}',
      'VariableID:80:1184': label
    });
  }

  final Map<String, Map<String, Map<String, dynamic>>> formSpecs = {};
  void registerField(String frame, Map<String, dynamic> spec) {
    (formSpecs[frame] ??= {})[spec['key'] as String] = spec;
  }

  bool validateForm(String frame, BuildContext context) {
    for (final spec in formSpecs[frame]?.values ?? <Map<String, dynamic>>[]) {
      final value = frontend
          .get<String>(
              spec['key'],
              spec['key'].toString().startsWith('auth.')
                  ? ''
                  : controlValue(frontend, spec)?.toString() ?? '')
          .trim();
      String? error;
      if (spec['required'] == true && value.isEmpty) {
        error = 'Hãy nhập ${spec['label'] ?? 'đầy đủ thông tin'}.';
      }
      if (value.isNotEmpty &&
          spec['mode'] == 'email' &&
          !RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$').hasMatch(value) &&
          !((spec['label']?.toString() ?? '')
                  .toLowerCase()
                  .contains('điện thoại') &&
              RegExp(r'^\+?[\d\s-]{9,15}$').hasMatch(value))) {
        error = 'Email chưa hợp lệ.';
      }
      if (value.isNotEmpty && spec['mode'] == 'password' && value.length < 6) {
        error = 'Mật khẩu cần ít nhất 6 ký tự.';
      }
      if (error != null) {
        ScaffoldMessenger.of(context)
            .showSnackBar(SnackBar(content: Text(error)));
        return false;
      }
    }
    final passwords = (formSpecs[frame]?.values ?? <Map<String, dynamic>>[])
        .where((s) => s['mode'] == 'password')
        .map((s) => frontend.get<String>(s['key'], ''))
        .toList();
    if (passwords.length > 1 && passwords.toSet().length > 1) {
      ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Hai mật khẩu chưa trùng khớp.')));
      return false;
    }
    return true;
  }

  Map<String, dynamic>? node(String frameId, String? id) {
    if (id == null) return null;
    final frame = figmaPrototypeFrames[frameId] as Map<String, dynamic>?;
    final nodes = frame?['nodes'] as List<dynamic>? ?? const [];
    for (final entry in nodes) {
      if (entry['id'] == id) return entry as Map<String, dynamic>;
    }
    return null;
  }

  String? bindingId(dynamic binding) {
    if (binding is List) {
      for (final item in binding) {
        final id = bindingId(item);
        if (id != null) return id;
      }
    }
    if (binding is Map) {
      if (binding['id'] is String) return binding['id'] as String;
      if (binding['value'] != null) return bindingId(binding['value']);
    }
    return null;
  }

  dynamic bound(String frameId, String? nodeId, String property) {
    final bindings = node(frameId, nodeId)?['bindings'] as Map? ?? const {};
    final id = bindingId(bindings[property]);
    return id == null ? null : values[id];
  }

  bool visible(String frameId, String? id, {bool fallback = true}) =>
      bound(frameId, id, 'visible') as bool? ?? fallback;

  List<dynamic> reactions(String frameId, String? id) =>
      node(frameId, id)?['reactions'] as List<dynamic>? ?? const [];

  bool tappable(String frameId, String? id) =>
      reactions(frameId, id).any((r) => r['trigger']?['type'] == 'ON_CLICK');

  void editField(String frameId, String? id, String value, String? textId) {
    fields['$frameId/$id'] = value;
    final binding =
        bindingId((node(frameId, textId)?['bindings'] as Map?)?['characters']);
    if (binding != null) {
      values[binding] = value;
      notifyListeners();
    }
  }

  dynamic evaluate(dynamic expression) {
    if (expression == null || expression is! Map) return expression;
    final type = expression['type'];
    final value = expression['value'];
    if (type == 'VARIABLE_ALIAS') {
      return values[value is Map ? value['id'] : expression['id']];
    }
    if (type != 'EXPRESSION') return value;
    final fn = value['expressionFunction'];
    final args = (value['expressionArguments'] as List).map(evaluate).toList();
    switch (fn) {
      case 'EQUALS':
        return args[0] == args[1];
      case 'NOT_EQUALS':
        return args[0] != args[1];
      case 'AND':
        return args.every((a) => a == true);
      case 'OR':
        return args.any((a) => a == true);
      case 'NOT':
        return args[0] != true;
      case 'GREATER_THAN':
        return (args[0] as num) > (args[1] as num);
      case 'GREATER_THAN_OR_EQUAL':
        return (args[0] as num) >= (args[1] as num);
      case 'LESS_THAN':
        return (args[0] as num) < (args[1] as num);
      case 'LESS_THAN_OR_EQUAL':
        return (args[0] as num) <= (args[1] as num);
      case 'ADDITION':
        return (args[0] as num) + (args[1] as num);
      case 'SUBTRACTION':
        return (args[0] as num) - (args[1] as num);
      default:
        throw StateError('Unsupported Figma expression: $fn');
    }
  }

  List<Map<String, dynamic>> apply(List<dynamic> actions) {
    final navigation = <Map<String, dynamic>>[];
    for (final raw in actions) {
      final action = raw as Map<String, dynamic>;
      switch (action['type']) {
        case 'SET_VARIABLE':
          values[action['variableId'] as String] =
              evaluate(action['variableValue']);
        case 'CONDITIONAL':
          for (final block in action['conditionalBlocks'] as List) {
            if (block['condition'] == null ||
                evaluate(block['condition']) == true) {
              navigation.addAll(apply(block['actions'] as List? ?? const []));
              break;
            }
          }
        case 'NODE':
        case 'BACK':
        case 'CLOSE':
        case 'URL':
          navigation.add(action);
        default:
          throw StateError('Unsupported Figma action: ${action['type']}');
      }
    }
    return navigation;
  }

  List<dynamic> actionsFor(String frameId, String? id,
      {String trigger = 'ON_CLICK'}) {
    final result = <dynamic>[];
    for (final reaction in reactions(frameId, id)) {
      if (reaction['trigger']?['type'] == trigger) {
        result.addAll(figmaPrototypeActions[reaction['action'] as int] as List);
      }
    }
    return result;
  }

  Future<void> trigger(BuildContext context, String frameId, String? id,
      {String trigger = 'ON_CLICK'}) async {
    final sourceRoute = figmaFrameRoutes[frameId] ?? '';
    if (sourceRoute.startsWith('/user/')) {
      final role = sourceRoute.split('/')[2];
      values['VariableID:80:1172'] = role == 'organization' ? 'charity' : role;
    }
    final navigation = apply(actionsFor(frameId, id, trigger: trigger));
    syncFrontend();
    notifyListeners();
    for (final action in navigation) {
      if (!context.mounted) return;
      switch (action['type']) {
        case 'BACK':
        case 'CLOSE':
          mealBack(context);
        case 'NODE':
          final destination = action['destinationId'] as String?;
          final route = figmaFrameRoutes[destination];
          if (route == null) {
            throw StateError('Unmapped Figma destination: $destination');
          }
          if (action['navigation'] == 'NAVIGATE' ||
              action['navigation'] == 'SWAP') {
            if (trigger == 'AFTER_TIMEOUT') {
              await Navigator.of(context).pushReplacementNamed(route);
            } else {
              await Navigator.of(context).pushNamed(route);
            }
          } else {
            throw StateError(
                'Unsupported Figma navigation: ${action['navigation']}');
          }
        case 'URL':
          throw StateError('External links must be wired explicitly.');
      }
    }
  }
}

class FigmaPrototypeScope extends InheritedNotifier<FigmaPrototypeController> {
  const FigmaPrototypeScope({
    super.key,
    required FigmaPrototypeController controller,
    required super.child,
  }) : super(notifier: controller);

  static FigmaPrototypeController of(BuildContext context) {
    final scope =
        context.dependOnInheritedWidgetOfExactType<FigmaPrototypeScope>();
    assert(scope != null, 'FigmaPrototypeScope is required above the app.');
    return scope!.notifier!;
  }
}
