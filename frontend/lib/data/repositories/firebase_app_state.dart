import 'dart:async';
import 'package:firebase_auth/firebase_auth.dart';
import '../firebase/backend_api.dart';
import '../firebase/firebase_services.dart';
import '../../presentation/shared/interaction/frontend_state.dart';

/// Firebase snapshots feed widgets; local controls contain draft data only.
class FirebaseAppState extends FrontendState {
  FirebaseAppState(this.services) : api = BackendApi(services) {
    _clear();
  }
  final FirebaseServices services;
  final BackendApi api;
  StreamSubscription<User?>? _authSubscription;
  StreamSubscription<Map<String, dynamic>>? _viewSubscription;
  Map<String, dynamic> snapshot = {};
  bool loading = true, busy = false, _closed = false;
  String? error;
  int _generation = 0, _version = -1;
  final Set<String> _profileDrafts = {};
  @override
  void selectOrder(String id) {
    if (id != selectedOrderId) {
      values.removeWhere(
          (k, _) => k.startsWith('review.') || k.startsWith('thanks.'));
    }
    super.selectOrder(id);
    _savedReview();
    _savedReceipt();
  }

  void _savedReceipt() {
    final receipt = rows('orders')
        .where(
            (o) => o['id'] == selectedOrderId && o['receiptState'] == 'pending')
        .firstOrNull;
    if (receipt == null) return;
    // Pending intent is already committed: reopening must show its frozen
    // quantity/note, while preserving a newly chosen photo for legacy intents.
    values['receipt.quantity'] = receipt['qtyReceived'] ?? receipt['received'];
    values['receipt.note'] = receipt['discrepancyNote'] ?? '';
    if (get('receipt.photo', '').isEmpty && receipt['receiptPhoto'] != null) {
      values['receipt.photo'] = receipt['receiptPhoto'];
    }
  }

  void _savedReview() {
    final review = rows('reviews')
        .where((r) => r['orderId'] == selectedOrderId && r['uid'] == user?.uid)
        .firstOrNull;
    if (review != null) {
      values.putIfAbsent('review.note', () => review['note'] ?? '');
      values.putIfAbsent('review.rating', () => review['rating'] ?? 5);
    }
  }

  @override
  void set(String key, dynamic value) {
    if (key.startsWith('profile.')) _profileDrafts.add(key);
    super.set(key, value);
  }

  User? get user => services.auth.currentUser;
  Map<String, dynamic> get profile =>
      Map<String, dynamic>.from(snapshot['profile'] as Map? ?? {});
  String get role => profile['role']?.toString() ?? '';
  bool get verified => user?.emailVerified ?? false;
  bool get approved => profile['verificationStatus'] == 'approved';
  List<Map<String, dynamic>> rows(String name) =>
      (snapshot[name] as List? ?? [])
          .whereType<Map>()
          .map((x) => Map<String, dynamic>.from(x))
          .toList();
  void _clear() {
    values.clear();
    _profileDrafts.clear();
    foods.clear();
    orders.clear();
    needs.clear();
    messages.clear();
    tickets.clear();
    history.clear();
    selectedFoodId = '';
    selectedOrderId = '';
    orderStateUsed = false;
    snapshot = {};
    _version = -1;
    values.addAll({
      'backend.role': '',
      'license.name': '',
      'license.tax': '',
      'license.issued': '',
      'license.type': '',
      'warehouse.received': 0,
      'warehouse.distributed': 0
    });
  }

  Future<void> initialize() async {
    if (BackendApi.emulatorHost.isNotEmpty) {
      await services.auth.useAuthEmulator(BackendApi.emulatorHost, 9099);
      services.database.useDatabaseEmulator(BackendApi.emulatorHost, 9000);
    }
    await services.auth.setLanguageCode('vi');
    _authSubscription = services.auth.authStateChanges().listen((user) async {
      final generation = ++_generation;
      await _viewSubscription?.cancel();
      _clear();
      error = null;
      loading = user != null;
      changed();
      if (user == null) return;
      try {
        final response = await api.call('refresh');
        if (generation != _generation) return;
        applyView(response['view']);
        if (user.emailVerified) _subscribe(user.uid, generation);
      } catch (e) {
        if (generation == _generation) {
          error = readableError(e);
          loading = false;
          changed();
        }
      }
    });
  }

  void _subscribe(String uid, int generation) {
    _viewSubscription?.cancel();
    _viewSubscription = api.watch(uid).listen((view) {
      if (generation == _generation) {
        applyView(view);
      }
    }, onError: (Object e) {
      if (generation == _generation) {
        _clear();
        loading = false;
        error = 'Không đồng bộ được Firebase. Kiểm tra mạng và Database Rules.';
        changed();
      }
    });
  }

  static String readableError(Object e) => e is FirebaseAuthException
      ? switch (e.code) {
          'invalid-credential' ||
          'wrong-password' ||
          'user-not-found' =>
            'Email hoặc mật khẩu chưa đúng.',
          'email-already-in-use' =>
            'Email đã được đăng ký. Hãy đăng nhập hoặc đặt lại mật khẩu.',
          'weak-password' => 'Mật khẩu cần ít nhất 8 ký tự.',
          'invalid-email' => 'Email chưa hợp lệ.',
          'operation-not-allowed' =>
            'Cần bật Email/Password trong Firebase Authentication.',
          'too-many-requests' => 'Quá nhiều lần thử. Vui lòng chờ rồi thử lại.',
          'network-request-failed' =>
            'Không kết nối được Firebase Authentication.',
          _ => e.message ?? 'Chưa thực hiện được xác thực.'
        }
      : e is FirebaseException
          ? switch (e.code) {
              'permission-denied' =>
                'Firebase từ chối thao tác. Kiểm tra quyền đã duyệt hoặc làm mới dữ liệu rồi thử lại.',
              'disconnected' ||
              'unavailable' =>
                'Mất kết nối Firebase. Kiểm tra mạng rồi thử lại.',
              _ => 'Chưa lưu được Firebase: ${e.message ?? e.code}'
            }
          : e is StateError
              ? e.message.toString()
              : 'Chưa hoàn tất thao tác. Kiểm tra mạng và cấu hình Firebase.';
  void applyView(dynamic raw) {
    if (raw is! Map) return;
    final view = Map<String, dynamic>.from(raw),
        version = (raw['version'] as num?)?.toInt() ?? 0;
    if (version < _version) return;
    _version = version;
    snapshot = view;
    loading = false;
    error = null;
    foods = rows('foods').map(FoodListing.fromJson).toList();
    orders = rows('orders').map(MealOrder.fromJson).toList();
    for (final pair in [
      (needs, 'needs'),
      (messages, 'messages'),
      (tickets, 'tickets'),
      (history, 'history')
    ]) {
      pair.$1
        ..clear()
        ..addAll(rows(pair.$2));
    }
    if (!foods.any((f) => f.id == selectedFoodId)) {
      selectedFoodId = foods.isEmpty ? '' : foods.first.id;
    }
    if (!orders.any((o) => o.id == selectedOrderId)) {
      selectedOrderId = orders.isEmpty ? '' : orders.first.id;
    }
    orderStateUsed = orders.isNotEmpty;
    values['profile.email'] = profile['email'] ?? user?.email ?? '';
    for (final key in ['name', 'phone', 'address']) {
      if (!_profileDrafts.contains('profile.$key')) {
        values['profile.$key'] = profile[key] ?? '';
      }
    }
    values['backend.role'] = role;
    for (final r in ['donor', 'charity', 'volunteer']) {
      values['verification.$r'] =
          role == r ? profile['verificationStatus'] ?? 'draft' : 'draft';
    }
    for (final r in ['donor', 'organization', 'volunteer']) {
      if (!_profileDrafts.contains('profile.$r.name')) {
        values['profile.$r.name'] = profile['name'] ?? '';
      }
    }
    values['warehouse.received'] =
        (view['inventory'] as Map?)?['received'] ?? 0;
    values['warehouse.distributed'] =
        (view['inventory'] as Map?)?['distributed'] ?? 0;
    values.removeWhere((key, _) => key.startsWith('shift.registered.'));
    for (final shift in rows('shifts')) {
      values['shift.registered.${shift['date']}'] = true;
    }
    for (final code
        in rows('codes').where((c) => c['orderId'] == selectedOrderId)) {
      values[code['stage'] == 'pickup' ? 'handover.pin' : 'receipt.pin'] =
          code['pin'];
      values['handover.expires'] = DateTime.fromMillisecondsSinceEpoch(
              (code['expiresAt'] as num).toInt())
          .toIso8601String();
    }
    _savedReview();
    _savedReceipt();
    changed();
  }

  Future<Map<String, dynamic>> command(String command,
      [Map<String, dynamic> payload = const {}]) async {
    if (busy) throw StateError('Đang xử lý thao tác trước.');
    final generation = _generation;
    busy = true;
    error = null;
    changed();
    try {
      final response = await api.call(command, payload);
      if (generation == _generation) applyView(response['view']);
      return Map<String, dynamic>.from(response['result'] as Map? ?? {});
    } finally {
      busy = false;
      changed();
    }
  }

  Future<void> login(String email, String password) async {
    await services.auth
        .signInWithEmailAndPassword(email: email.trim(), password: password);
    await refresh();
    if (profile.isEmpty) {
      await command('registerProfile',
          {'name': user?.displayName ?? email.trim().split('@').first});
    }
    if (profile['disabled'] == true) {
      await logout();
      throw StateError('Tài khoản đã bị khóa. Liên hệ quản trị viên.');
    }
  }

  Future<void> loadHandover(String stage, {bool renew = false}) async {
    final result = await command(renew ? 'renewHandover' : 'loadHandover',
        {'id': selectedOrderId, 'stage': stage});
    values[stage == 'pickup' ? 'handover.pin' : 'receipt.pin'] = result['pin'];
    values['handover.expires'] = DateTime.fromMillisecondsSinceEpoch(
            (result['expiresAt'] as num).toInt())
        .toIso8601String();
    changed();
  }

  Future<void> register(String email, String password, String name) async {
    if (password.length < 8) throw StateError('Mật khẩu cần ít nhất 8 ký tự.');
    await services.auth.createUserWithEmailAndPassword(
        email: email.trim(), password: password);
    await user!.updateDisplayName(name.trim());
    await command('registerProfile', {'name': name});
    await refresh();
    await sendVerificationEmail();
  }

  Future<void> sendVerificationEmail() async {
    final account = user;
    if (account == null) throw StateError('Cần đăng nhập.');
    await account.sendEmailVerification();
  }

  Future<void> confirmEmailVerification() async {
    if (user == null) throw StateError('Cần đăng nhập.');
    await user!.reload();
    if (user?.emailVerified != true) {
      throw StateError(
          'Hãy mở liên kết xác minh trong email rồi bấm kiểm tra lại.');
    }
    await user!.getIdToken(true);
    await refresh();
    _subscribe(user!.uid, _generation);
  }

  Future<void> refresh() async {
    final generation = _generation, uid = user?.uid;
    final response = await api.call('refresh');
    if (generation == _generation && uid == user?.uid) {
      applyView(response['view']);
      // Console-assigned roles can change the authorized query subscriptions.
      if (uid != null && verified) _subscribe(uid, generation);
    }
  }

  Future<void> logout() async {
    ++_generation;
    await _viewSubscription?.cancel();
    _clear();
    await services.auth.signOut();
    loading = false;
    changed();
  }

  @override
  Future<void> load() async {}
  @override
  List<FoodListing> searchFoods(
      {String query = '',
      String category = 'Tất cả',
      bool mine = false,
      String status = 'all'}) {
    final result = super.searchFoods(
        query: query, category: category, mine: mine, status: 'all');
    return result.where((f) {
      if (mine) {
        return status == 'all' ||
            f.status == status ||
            status == 'open' && ['pending', 'rejected'].contains(f.status);
      }
      final row = rows('foods').where((r) => r['id'] == f.id).firstOrNull ?? {};
      final expiry = DateTime.tryParse('${row['expiresAt']}');
      return f.status == 'open' &&
          (expiry == null || expiry.isAfter(DateTime.now()));
    }).toList();
  }

  @override
  void changed() {
    if (!_closed) notifyListeners();
  }

  @override
  FoodListing get selectedFood => foods.isEmpty
      ? FoodListing(
          id: '',
          name: '',
          donor: '',
          category: '',
          quantity: 0,
          allergens: [],
          address: '',
          pickup: '',
          storage: '')
      : super.selectedFood;
  @override
  MealOrder get selectedOrder => orders.isEmpty
      ? MealOrder(
          id: '',
          foodId: '',
          organization: '',
          quantity: 0,
          driver: '',
          time: '')
      : super.selectedOrder;
  @override
  void dispose() {
    _closed = true;
    _authSubscription?.cancel();
    _viewSubscription?.cancel();
    api.close();
    super.dispose();
  }
}
