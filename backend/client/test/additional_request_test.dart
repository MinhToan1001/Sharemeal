import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sharemeal_client/sharemeal_client.dart';

class _User extends Fake implements User {}

class _Auth extends Fake implements FirebaseAuth {
  @override
  User get currentUser => _User();
}

class _Reference extends Fake implements DatabaseReference {
  final writes = <Map<String, Object?>>[];
  @override
  Future<void> update(Map<String, Object?> value) async => writes.add(value);
}

class _Database extends Fake implements FirebaseDatabase {
  final root = _Reference();
  @override
  DatabaseReference ref([String? path]) => root;
}

class _Services extends Fake implements FirebaseServices {
  @override
  final auth = _Auth();
  @override
  final _Database database = _Database();
}

class _Client extends ShareMealClient {
  _Client(this.services) : super(services);
  final _Services services;
  String previous = 'accepted';
  @override
  String get uid => 'organization';
  @override
  String id() => 'additional-two';
  @override
  Future<Map<String, dynamic>> account([String? role]) async =>
      {'name': 'Tổ chức'};
  @override
  Future<Map<String, dynamic>> read(String path) async => {
        'id': 'food-nine',
        'donorId': 'donor',
        'status': 'open',
        'name': 'Cơm',
        'quantity': 9,
        'reserved': 7,
        'expiresAtMs':
            DateTime.now().add(const Duration(hours: 2)).millisecondsSinceEpoch,
      };
  @override
  Future<Map<String, dynamic>> matching(
          String table, String key, String value) async =>
      {
        'first-seven': {
          'foodId': 'food-nine',
          'organizationId': uid,
          'quantity': 7,
          'status': previous
        }
      };
  @override
  Future<Map<String, dynamic>> snapshot() async => {};
  @override
  Future<void> notify(String target, String title, String body) async {}
}

void main() {
  Map<String, dynamic> request(int count) => {
        'foodId': 'food-nine',
        'quantity': count,
        'transport': 'Nhờ giao hộ',
        'time': '19:30'
      };
  for (final status in ['accepted', 'assigned', 'pickedUp', 'completed']) {
    test(
        'nine meals minus accepted seven allows same organization to request two after $status',
        () async {
      final services = _Services();
      final client = _Client(services)..previous = status;
      final response = await client.call('requestFood', request(2));
      expect(response['result']['id'], 'additional-two');
      final created = services
          .database.root.writes.single['demo/orders/additional-two'] as Map;
      expect(created['quantity'], 2);
      expect(created['status'], 'awaiting');
      client.close();
    });
  }
  test('a pending request still prevents accidental duplicate submissions',
      () async {
    final services = _Services();
    final client = _Client(services)..previous = 'awaiting';
    await expectLater(client.call('requestFood', request(2)), throwsStateError);
    expect(services.database.root.writes, isEmpty);
    client.close();
  });
  test('remaining two cannot be requested as three', () async {
    final services = _Services();
    final client = _Client(services);
    await expectLater(client.call('requestFood', request(3)), throwsStateError);
    expect(services.database.root.writes, isEmpty);
    client.close();
  });
}
