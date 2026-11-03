class FoodListing {
  static List<String> photoUrls(dynamic value, [String cover = '']) {
    final items = value is Map
        ? (value.keys.toList()..sort((a, b) => '$a'.compareTo('$b')))
            .map((key) => value[key])
        : value is Iterable
            ? value
            : const [];
    return <String>{
      if (cover.trim().isNotEmpty) cover.trim(),
      for (final item in items)
        if (item is String && item.trim().isNotEmpty) item.trim()
    }.toList();
  }

  FoodListing(
      {required this.id,
      required this.name,
      required this.donor,
      required this.category,
      required this.quantity,
      this.storage = 'Còn nóng',
      this.allergens = const ['Trứng'],
      this.status = 'open',
      this.distance = 1.2,
      this.address = '45 Nguyễn Thị Minh Khai, Quận 1',
      this.pickup = '19:00–20:30',
      this.photo = '',
      this.photos = const [],
      this.note = '',
      this.latitude,
      this.longitude,
      this.mine = false,
      this.createdAt = ''});
  final String id;
  String name,
      donor,
      category,
      storage,
      status,
      address,
      pickup,
      photo,
      note,
      createdAt;
  int quantity;
  double distance;
  double? latitude, longitude;
  bool mine;
  List<String> allergens;
  List<String> photos;
  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'donor': donor,
        'category': category,
        'quantity': quantity,
        'storage': storage,
        'allergens': allergens,
        'status': status,
        'distance': distance,
        'address': address,
        'pickup': pickup,
        'photo': photo,
        'photos': photos,
        'note': note,
        'latitude': latitude,
        'longitude': longitude,
        'mine': mine,
        'createdAt': createdAt
      };
  factory FoodListing.fromJson(Map<String, dynamic> j) => FoodListing(
      id: j['id'],
      name: j['name'],
      donor: j['donor'],
      category: j['category'],
      quantity: j['quantity'],
      storage: j['storage'],
      allergens: List<String>.from(j['allergens'] ?? []),
      status: j['status'],
      distance: (j['distance'] as num?)?.toDouble() ?? 0,
      address: j['address'],
      pickup: j['pickup'],
      photo: photoUrls(j['photos'], '${j['photo'] ?? ''}').firstOrNull ?? '',
      photos: photoUrls(j['photos'], '${j['photo'] ?? ''}'),
      note: j['note'] ?? '',
      latitude: (j['latitude'] as num?)?.toDouble(),
      longitude: (j['longitude'] as num?)?.toDouble(),
      mine: j['mine'] ?? false,
      createdAt: j['createdAt'] ?? '');
}

class MealOrder {
  MealOrder(
      {required this.id,
      required this.foodId,
      required this.organization,
      required this.quantity,
      this.status = 'accepted',
      this.transport = 'Nhờ giao hộ',
      this.driver = 'Trần Quốc Bảo',
      this.time = '19:30',
      this.note = '',
      this.received = 0});
  final String id, foodId;
  String organization, status, transport, driver, time, note;
  int quantity, received;
  int get progress => switch (status) {
        'awaiting' => 15,
        'accepted' => 35,
        'assigned' => 55,
        'pickedUp' => 80,
        'completed' => 100,
        _ => 0
      };
  Map<String, dynamic> toJson() => {
        'id': id,
        'foodId': foodId,
        'organization': organization,
        'quantity': quantity,
        'status': status,
        'transport': transport,
        'driver': driver,
        'time': time,
        'note': note,
        'received': received
      };
  factory MealOrder.fromJson(Map<String, dynamic> j) => MealOrder(
      id: j['id'],
      foodId: j['foodId'],
      organization: j['organization'],
      quantity: j['quantity'],
      status: j['status'],
      transport: j['transport'],
      driver: j['driver'],
      time: j['time'],
      note: j['note'] ?? '',
      received: j['received'] ?? 0);
}
