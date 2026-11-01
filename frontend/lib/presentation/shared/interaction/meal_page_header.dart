import 'package:flutter/material.dart';
import 'app_navigation.dart';

class MealPageHeader extends StatelessWidget {
  const MealPageHeader({super.key, required this.title, this.subtitle = ''});
  final String title, subtitle;
  @override
  Widget build(BuildContext context) => Material(
      color: Colors.white,
      child: Padding(
          padding: const EdgeInsets.fromLTRB(6, 12, 18, 8),
          child: Row(children: [
            IconButton(
                tooltip: 'Quay lại',
                onPressed: () => mealBack(context),
                icon: const Icon(Icons.arrow_back_ios_new,
                    color: mealInk, size: 20)),
            const SizedBox(width: 4),
            Expanded(
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                  Text(title,
                      style: const TextStyle(
                          fontSize: 21,
                          fontWeight: FontWeight.w700,
                          color: mealInk)),
                  if (subtitle.isNotEmpty) ...[
                    const SizedBox(height: 4),
                    Text(subtitle,
                        style: const TextStyle(
                            fontSize: 11, color: Color(0xFF687C74)))
                  ]
                ])),
          ])));
}
