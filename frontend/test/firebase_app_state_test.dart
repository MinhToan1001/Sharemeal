import 'dart:async';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sharemeal/app/sharemeal_app.dart';
import 'package:sharemeal/presentation/shared/figma/figma_prototype_controller.dart';
import 'package:sharemeal_client/sharemeal_client.dart';
import 'package:sharemeal/presentation/shared/controllers/firebase_app_state.dart';

class TestAuth extends Fake implements FirebaseAuth {
  User? account;
  @override
  User? get currentUser => account;
  @override
  Future<void> signOut() async {
    account = null;
  }
}

class TestUser extends Fake implements User {
  @override
  String get uid => 'donor';
  @override
  String? get email => 'donor@example.test';
  @override
  bool get emailVerified => true;
}

class TestDatabase extends Fake implements FirebaseDatabase {}

class DelayedSnapshot extends Fake implements DataSnapshot {
  DelayedSnapshot(this.value);
  @override
  final Object? value;
}

class DelayedReference extends Fake implements DatabaseReference {
  DelayedReference(this.result);
  final Future<DataSnapshot> result;
  @override
  Future<DataSnapshot> get() => result;
}

class DelayedDatabase extends Fake implements FirebaseDatabase {
  final userReads = <Completer<DataSnapshot>>[];
  @override
  DatabaseReference ref([String? path]) {
    if (path == 'users/donor') {
      final read = Completer<DataSnapshot>();
      userReads.add(read);
      return DelayedReference(read.future);
    }
    return DelayedReference(Future.value(DelayedSnapshot(null)));
  }
}

class DelayedServices extends Fake implements FirebaseServices {
  @override
  final TestAuth auth = TestAuth();
  @override
  final DelayedDatabase database = DelayedDatabase();
}

class TestServices extends Fake implements FirebaseServices {
  @override
  final TestAuth auth = TestAuth();
  @override
  final FirebaseDatabase database = TestDatabase();
}

Map<String, dynamic> view({int version = 1, String role = 'donor'}) => {
      'version': version,
      'profile': {
        'uid': 'donor',
        'name': 'Tên thật',
        'role': role,
        'verificationStatus': 'pending'
      },
      'foods': [
        {
          'id': 'real-food',
          'name': 'Món từ Firebase',
          'donor': 'Tên thật',
          'category': 'Cơm',
          'quantity': 5,
          'storage': 'Giữ nóng',
          'status': 'pending',
          'distance': 0,
          'address': 'Địa chỉ thật',
          'pickup': '18:00',
          'allergens': [],
          'mine': true
        }
      ],
      'orders': [],
      'inventory': {'received': 0, 'distributed': 0},
    };
void main() {
  test('a late older Firebase read retains an older view version', () async {
    final services = DelayedServices()..auth.account = TestUser();
    final state = FirebaseAppState(services);
    final older = state.api.snapshot();
    final newer = state.api.snapshot();
    services.database.userReads[1].complete(DelayedSnapshot(null));
    final latest = await newer;
    services.database.userReads[0].complete(DelayedSnapshot(null));
    final late = await older;
    expect(late['version'] as int, lessThan(latest['version'] as int));
    state.dispose();
  });
  testWidgets(
      'live listing screen renders only server food and reacts to approval',
      (tester) async {
    final services = TestServices()..auth.account = TestUser();
    final state = FirebaseAppState(services)..applyView(view());
    final controller =
        FigmaPrototypeController(frontend: state, enableTimeouts: false);
    await tester.pumpWidget(ShareMealApp(
        prototype: controller, initialRoute: '/user/donor/my-listings'));
    await tester.pumpAndSettle();
    expect(find.textContaining('Món từ Firebase'), findsOneWidget);
    expect(find.textContaining('Bếp Nhà Lan'), findsNothing);
    final approved = view(version: 2);
    (approved['profile'] as Map)['verificationStatus'] = 'approved';
    (approved['foods'] as List).single['status'] = 'open';
    state.applyView(approved);
    await tester.pumpAndSettle();
    expect(find.text('Đang mở'), findsOneWidget);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox());
    controller.dispose();
  });
  testWidgets('admin route cannot be unlocked with a prototype role variable',
      (tester) async {
    final services = TestServices()..auth.account = TestUser();
    final state = FirebaseAppState(services)..applyView(view());
    final controller =
        FigmaPrototypeController(frontend: state, enableTimeouts: false);
    controller.values['VariableID:80:1172'] = 'admin';
    await tester.pumpWidget(
        ShareMealApp(prototype: controller, initialRoute: '/admin/dashboard'));
    await tester.pumpAndSettle();
    expect(find.text('Quản trị ShareMeal'), findsNothing);
    expect(find.text('Phê duyệt'), findsNothing);
    expect(find.text('Tên thật'), findsOneWidget);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox());
    controller.dispose();
  });
  test('production state starts empty and never loads local demo records',
      () async {
    final state = FirebaseAppState(TestServices());
    await state.load();
    expect(state.foods, isEmpty);
    expect(state.orders, isEmpty);
    expect(state.history, isEmpty);
    expect(state.needs, isEmpty);
    expect(state.warehouseBalance, 0);
    expect(state.selectedFood.id, isEmpty);
    expect(state.selectedOrder.id, isEmpty);
    state.dispose();
  });
  test(
      'server approval and food snapshots replace data without local authority',
      () {
    final state = FirebaseAppState(TestServices());
    state.applyView(view());
    expect(state.role, 'donor');
    expect(state.approved, false);
    expect(state.foods.single.name, 'Món từ Firebase');
    expect(state.selectedFoodId, 'real-food');
    final approved = view(version: 2);
    (approved['profile'] as Map)['verificationStatus'] = 'approved';
    (approved['foods'] as List).single['status'] = 'open';
    state.applyView(approved);
    expect(state.approved, true);
    expect(state.searchFoods().single.status, 'open');
    state.applyView(view(version: 1));
    expect(state.approved, true,
        reason: 'A late response cannot replace a newer realtime snapshot.');
    state.dispose();
  });
  test(
      'empty server snapshots remove old food and logout clears private drafts',
      () async {
    final state = FirebaseAppState(TestServices());
    state.applyView(view());
    state.set('auth.otp', '654321');
    state.set('support.detail', 'private');
    state.applyView({
      'version': 2,
      'profile': {'role': 'donor', 'verificationStatus': 'approved'}
    });
    expect(state.foods, isEmpty);
    expect(state.selectedFood.id, isEmpty);
    await state.logout();
    expect(state.values.containsKey('auth.otp'), false);
    expect(state.values.containsKey('support.detail'), false);
    expect(state.snapshot, isEmpty);
    expect(state.warehouseBalance, 0);
    state.dispose();
  });
  test('auth errors are readable and never display raw server exceptions', () {
    expect(
        FirebaseAppState.readableError(
            FirebaseAuthException(code: 'invalid-credential')),
        contains('mật khẩu'));
    expect(FirebaseAppState.readableError(StateError('Hồ sơ chưa được duyệt')),
        'Hồ sơ chưa được duyệt');
  });
}
