import 'dart:io';
import 'package:flutter/material.dart';
import 'frontend_state.dart';

ImageProvider<Object> storedMealImage(String path) {
  if (path.startsWith('https://')) return NetworkImage(path);
  return FileImage(File(path));
}

/// Stock/demo photos are only a fallback. A real uploaded photo always wins.
String foodPhotoAsset(String name, String category) {
  final normalized = FrontendState.normalize(name);
  if (normalized.contains('canh') || normalized.contains('sup')) {
    return 'assets/images/food/soup.png';
  }
  if (category == 'Bánh' || normalized.contains('banh')) {
    return 'assets/images/food/bread.png';
  }
  if (category == 'Rau củ') return 'assets/images/food/vegetables.png';
  return 'assets/figma/b06546c1-6369-4414-803f-e9faf884379d.png';
}

class FoodPhoto extends StatelessWidget {
  const FoodPhoto(
      {super.key,
      required this.name,
      required this.category,
      this.photo = '',
      this.radius = 14});
  FoodPhoto.listing(FoodListing food, {super.key, this.radius = 14})
      : name = food.name,
        category = food.category,
        photo = food.photo;
  final String name, category, photo;
  final double radius;
  @override
  Widget build(BuildContext context) {
    Widget fallback() => Stack(fit: StackFit.expand, children: [
          Image.asset(foodPhotoAsset(name, category),
              fit: BoxFit.cover,
              width: double.infinity,
              height: double.infinity),
          Positioned(
              bottom: 4,
              right: 4,
              child: Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 5, vertical: 2),
                  decoration: BoxDecoration(
                      color: Colors.black54,
                      borderRadius: BorderRadius.circular(5)),
                  child: const Text('Minh họa',
                      style: TextStyle(color: Colors.white, fontSize: 8))))
        ]);
    return Semantics(
        image: true,
        label: 'Ảnh $name',
        child: ClipRRect(
            borderRadius: BorderRadius.circular(radius),
            child: photo.isEmpty
                ? fallback()
                : photo.startsWith('https://')
                    ? Image.network(photo,
                        fit: BoxFit.cover,
                        width: double.infinity,
                        height: double.infinity,
                        errorBuilder: (_, e, st) => fallback())
                    : Image.file(File(photo),
                        fit: BoxFit.cover,
                        width: double.infinity,
                        height: double.infinity,
                        errorBuilder: (_, e, st) => fallback())));
  }
}
