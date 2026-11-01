import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../../../shared/figma/figma_prototype_controller.dart';
import '../../../shared/interaction/app_navigation.dart';
import '../../../shared/interaction/frontend_actions.dart';

class DonorImpactReportPage extends StatelessWidget {
  const DonorImpactReportPage({super.key});
  static const routeName = '/user/donor/impact-report';
  @override
  Widget build(BuildContext context) {
    final s = FigmaPrototypeScope.of(context).frontend;
    final period = s.get('impact.period', 'Tháng');
    final stats = s.impact(period);
    final history = s.history
        .where((e) =>
            (e['daysAgo'] as num) <
            (period == 'Tuần'
                ? 7
                : period == 'Tháng'
                    ? 31
                    : 366))
        .toList();
    final bars = List<num>.generate(
        4,
        (i) => history
            .where(
                (e) => ((e['daysAgo'] as num) / 7).floor().clamp(0, 3) == 3 - i)
            .fold<num>(0, (n, e) => n + (e['quantity'] as num)));
    final maxValue = math.max(1, bars.reduce(math.max));
    Widget card(Widget child) => Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(18),
            border: Border.all(color: const Color(0xFFDFE9E3))),
        child: child);
    return Scaffold(
        backgroundColor: mealBackground,
        body: Align(
            alignment: Alignment.topCenter,
            child: FittedBox(
                fit: BoxFit.contain,
                alignment: Alignment.topCenter,
                child: SizedBox(
                    width: 402,
                    height: 874,
                    child: RepaintBoundary(
                        key: const ValueKey('figma/donor-impact'),
                        child: ColoredBox(
                            color: mealBackground,
                            child: Column(children: [
                              Padding(
                                  padding:
                                      const EdgeInsets.fromLTRB(12, 25, 22, 12),
                                  child: Row(children: [
                                    IconButton(
                                        onPressed: () => Navigator.canPop(
                                                context)
                                            ? Navigator.pop(context)
                                            : Navigator.pushReplacementNamed(
                                                context,
                                                '/user/donor/dashboard'),
                                        icon: SvgPicture.asset(
                                            'assets/figma/6e73cde8-565d-4200-8049-78c6f6660029.svg',
                                            width: 24,
                                            height: 24)),
                                    const Expanded(
                                        child: FittedBox(
                                            fit: BoxFit.scaleDown,
                                            alignment: Alignment.centerLeft,
                                            child: Text('Báo cáo tác động',
                                                style: TextStyle(
                                                    fontSize: 22,
                                                    fontWeight: FontWeight.w600,
                                                    color: mealInk))))
                                  ])),
                              Expanded(
                                  child: ListView(
                                      padding: const EdgeInsets.symmetric(
                                          horizontal: 22),
                                      children: [
                                    Container(
                                        padding: const EdgeInsets.all(4),
                                        decoration: BoxDecoration(
                                            color: const Color(0xFFE7EFEB),
                                            borderRadius:
                                                BorderRadius.circular(12)),
                                        child: Row(children: [
                                          for (final p in [
                                            'Tuần',
                                            'Tháng',
                                            'Năm'
                                          ])
                                            Expanded(
                                                child: TextButton(
                                                    key: ValueKey('impact/$p'),
                                                    style: TextButton.styleFrom(
                                                        backgroundColor: p ==
                                                                period
                                                            ? Colors.white
                                                            : Colors
                                                                .transparent,
                                                        foregroundColor:
                                                            p == period
                                                                ? mealGreen
                                                                : const Color(
                                                                    0xFF7F938A),
                                                        shape: RoundedRectangleBorder(
                                                            borderRadius:
                                                                BorderRadius.circular(
                                                                    9))),
                                                    onPressed: () => s.set(
                                                        'impact.period', p),
                                                    child: Text(p)))
                                        ])),
                                    const SizedBox(height: 16),
                                    Row(children: [
                                      for (final item in [
                                        (
                                          'Suất đã chia sẻ',
                                          '${stats['meals']}'
                                        ),
                                        ('Thực phẩm (kg)', '${stats['kg']}'),
                                        ('Đơn hoàn tất', '${stats['orders']}')
                                      ])
                                        Expanded(
                                            child: Container(
                                                margin: EdgeInsets.only(
                                                    right: item.$1 == 'Đơn hoàn tất'
                                                        ? 0
                                                        : 8),
                                                padding:
                                                    const EdgeInsets.all(14),
                                                height: 96,
                                                decoration: BoxDecoration(
                                                    color: item.$1 ==
                                                            'Suất đã chia sẻ'
                                                        ? const Color(
                                                            0xFF1F7054)
                                                        : Colors.white,
                                                    borderRadius:
                                                        BorderRadius.circular(
                                                            16),
                                                    border: Border.all(
                                                        color: const Color(
                                                            0xFFDFE9E3))),
                                                child: Column(
                                                    crossAxisAlignment:
                                                        CrossAxisAlignment.start,
                                                    children: [
                                                      Text(item.$1,
                                                          maxLines: 2,
                                                          overflow: TextOverflow
                                                              .ellipsis,
                                                          style: TextStyle(
                                                              fontSize: 10,
                                                              height: 1.2,
                                                              color: item.$1 ==
                                                                      'Suất đã chia sẻ'
                                                                  ? Colors.white
                                                                  : const Color(
                                                                      0xFF789087))),
                                                      const Spacer(),
                                                      FittedBox(
                                                          fit: BoxFit.scaleDown,
                                                          child: Text(item.$2,
                                                              style: TextStyle(
                                                                  fontSize: 28,
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .w700,
                                                                  color: item.$1 ==
                                                                          'Suất đã chia sẻ'
                                                                      ? Colors
                                                                          .white
                                                                      : mealGreen)))
                                                    ])))
                                    ]),
                                    const SizedBox(height: 16),
                                    card(Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          const Text('Suất ăn chia sẻ trong kỳ',
                                              style: TextStyle(
                                                  fontSize: 14,
                                                  fontWeight: FontWeight.w600,
                                                  color: mealInk)),
                                          const SizedBox(height: 28),
                                          SizedBox(
                                              height: 170,
                                              child: Row(
                                                  crossAxisAlignment:
                                                      CrossAxisAlignment.end,
                                                  children: [
                                                    for (var i = 0; i < 4; i++)
                                                      Expanded(
                                                          child: Padding(
                                                              padding:
                                                                  const EdgeInsets
                                                                      .symmetric(
                                                                      horizontal:
                                                                          7),
                                                              child: Column(
                                                                  mainAxisAlignment:
                                                                      MainAxisAlignment
                                                                          .end,
                                                                  children: [
                                                                    Text(
                                                                        '${bars[i]}',
                                                                        style: const TextStyle(
                                                                            fontSize:
                                                                                12,
                                                                            fontWeight:
                                                                                FontWeight.w600)),
                                                                    const SizedBox(
                                                                        height:
                                                                            5),
                                                                    AnimatedContainer(
                                                                        duration: const Duration(
                                                                            milliseconds:
                                                                                220),
                                                                        height: math.max(
                                                                            3,
                                                                            bars[i] /
                                                                                maxValue *
                                                                                120),
                                                                        decoration: BoxDecoration(
                                                                            color: i == 3
                                                                                ? const Color(0xFF1F7054)
                                                                                : const Color(0xFF9FCBB8),
                                                                            borderRadius: const BorderRadius.vertical(top: Radius.circular(6)))),
                                                                    const SizedBox(
                                                                        height:
                                                                            8),
                                                                    Text(
                                                                        'Tuần ${i + 1}',
                                                                        style: const TextStyle(
                                                                            fontSize:
                                                                                10,
                                                                            color:
                                                                                Color(0xFF789087)))
                                                                  ])))
                                                  ]))
                                        ])),
                                    const SizedBox(height: 16),
                                    card(Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          const Text('Theo loại thực phẩm',
                                              style: TextStyle(
                                                  fontSize: 14,
                                                  fontWeight: FontWeight.w600,
                                                  color: mealInk)),
                                          const SizedBox(height: 14),
                                          for (final cat in [
                                            'Cơm & món mặn',
                                            'Rau củ',
                                            'Bánh'
                                          ]) ...[
                                            Builder(builder: (context) {
                                              final n = history
                                                  .where((e) =>
                                                      e['category'] == cat)
                                                  .fold<num>(
                                                      0,
                                                      (n, e) =>
                                                          n +
                                                          (e['quantity']
                                                              as num));
                                              final v =
                                                  (stats['meals'] ?? 0) == 0
                                                      ? 0.0
                                                      : n / stats['meals']!;
                                              return Column(children: [
                                                Row(
                                                    mainAxisAlignment:
                                                        MainAxisAlignment
                                                            .spaceBetween,
                                                    children: [
                                                      Text(cat,
                                                          style:
                                                              const TextStyle(
                                                                  fontSize:
                                                                      12)),
                                                      Text(
                                                          '${(v * 100).round()}%',
                                                          style: const TextStyle(
                                                              fontSize: 12,
                                                              fontWeight:
                                                                  FontWeight
                                                                      .w600))
                                                    ]),
                                                const SizedBox(height: 6),
                                                LinearProgressIndicator(
                                                    value: v,
                                                    color: mealGreen,
                                                    backgroundColor:
                                                        const Color(0xFFE7EFEB),
                                                    borderRadius:
                                                        BorderRadius.circular(
                                                            4)),
                                                const SizedBox(height: 14)
                                              ]);
                                            }),
                                          ]
                                        ])),
                                    TextButton(
                                        onPressed: () => Navigator.pushNamed(
                                            context,
                                            '/user/donor/donation-history'),
                                        child: const Text(
                                            'Xem lịch sử chia sẻ  ›')),
                                    const SizedBox(height: 8),
                                  ])),
                              Padding(
                                  padding:
                                      const EdgeInsets.fromLTRB(22, 8, 22, 14),
                                  child: SizedBox(
                                      width: 358,
                                      height: 48,
                                      child: OutlinedButton(
                                          key: const ValueKey('impact/export'),
                                          onPressed: () => FrontendActions.run(
                                              context,
                                              'donor-impact',
                                              {'action': 'exportPdf'}),
                                          style: OutlinedButton.styleFrom(
                                              foregroundColor: mealGreen,
                                              side: const BorderSide(
                                                  color: mealGreen),
                                              shape: RoundedRectangleBorder(
                                                  borderRadius:
                                                      BorderRadius.circular(
                                                          16))),
                                          child:
                                              const Text('Xuất báo cáo PDF')))),
                              const SizedBox(
                                  height: 67,
                                  child: MealBottomBar(
                                      role: 'donor',
                                      page: 'impact_report',
                                      icons: [
                                        '1b2aa867-15f1-41c7-826e-d2fe5673b32f.svg',
                                        'a4c96987-6d04-449b-b551-0b37630486da.svg',
                                        'df3ae16c-1efe-46ad-a1ed-2b6e31e73745.svg',
                                        '16cd2160-ec16-43f2-a5d9-234005a17a91.svg'
                                      ])),
                            ])))))));
  }
}
