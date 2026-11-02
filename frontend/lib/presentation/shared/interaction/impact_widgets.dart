import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../figma/figma_prototype_controller.dart';
import 'app_navigation.dart';

class ImpactChart extends StatelessWidget {
  const ImpactChart({super.key});
  @override
  Widget build(BuildContext context) {
    final s = FigmaPrototypeScope.of(context).frontend;
    final period = s.get('impact.period', 'Tháng');
    final bars = s.impactBars(period);
    final labels = s.impactLabels(period);
    final maxValue = math.max(1, bars.reduce(math.max));
    return Padding(
        padding: const EdgeInsets.all(14),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text('Suất nhận theo kỳ · $period',
              style: const TextStyle(
                  fontFamily: 'Inter',
                  fontSize: 13,
                  height: 1.2,
                  fontWeight: FontWeight.w600,
                  color: mealInk)),
          const SizedBox(height: 14),
          Expanded(
              child: Row(crossAxisAlignment: CrossAxisAlignment.end, children: [
            for (var i = 0; i < 4; i++)
              Expanded(
                  child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 8),
                      child: Column(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                            Text('${bars[i]}',
                                style:
                                    const TextStyle(fontSize: 10, height: 1.2)),
                            const SizedBox(height: 4),
                            Expanded(
                                child: Align(
                                    alignment: Alignment.bottomCenter,
                                    child: FractionallySizedBox(
                                        heightFactor:
                                            (bars[i] / maxValue).clamp(.02, 1),
                                        widthFactor: 1,
                                        child: DecoratedBox(
                                            decoration: BoxDecoration(
                                                color: i == 3
                                                    ? const Color(0xFF1F7054)
                                                    : const Color(0xFF9FCBB8),
                                                borderRadius:
                                                    const BorderRadius.vertical(
                                                        top: Radius.circular(
                                                            5))))))),
                            const SizedBox(height: 5),
                            Text(labels[i],
                                style: const TextStyle(
                                    fontSize: 9,
                                    height: 1.2,
                                    color: Color(0xFF789087)))
                          ])))
          ]))
        ]));
  }
}

class ImpactCategories extends StatelessWidget {
  const ImpactCategories({super.key});
  @override
  Widget build(BuildContext context) {
    final s = FigmaPrototypeScope.of(context).frontend;
    final period = s.get('impact.period', 'Tháng');
    final total = s.impact(period)['meals'] ?? 0;
    return Padding(
        padding: const EdgeInsets.all(14),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          const Text('Theo loại thực phẩm',
              style: TextStyle(
                  fontSize: 13,
                  height: 1.2,
                  fontWeight: FontWeight.w600,
                  color: mealInk)),
          const SizedBox(height: 10),
          for (final cat in ['Cơm & món mặn', 'Rau củ', 'Bánh'])
            Expanded(child: Builder(builder: (context) {
              final qty = s
                  .impactEntries(period)
                  .where((e) => e['category'] == cat)
                  .fold<num>(0, (n, e) => n + (e['quantity'] as num));
              final v = total == 0 ? 0.0 : qty / total;
              return Column(children: [
                Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(cat,
                          style: const TextStyle(fontSize: 10, height: 1.2)),
                      Text('${(v * 100).round()}%',
                          style: const TextStyle(fontSize: 10, height: 1.2))
                    ]),
                const SizedBox(height: 4),
                LinearProgressIndicator(
                    value: v,
                    color: mealGreen,
                    backgroundColor: const Color(0xFFE7EFEB),
                    minHeight: 4)
              ]);
            }))
        ]));
  }
}
