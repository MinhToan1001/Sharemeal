import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../figma/figma_prototype_controller.dart';

const mealGreen = Color(0xFF006642);
const mealInk = Color(0xFF193E34);
const mealBackground = Color(0xFFF5F8F5);

String homeRoute(String role) => switch (role) {
      'volunteer' => '/user/volunteer/dashboard',
      'charity' || 'organization' => '/user/organization/dashboard',
      'admin' => '/admin/dashboard',
      _ => '/user/donor/dashboard',
    };

void mealBack(BuildContext context) {
  if (Navigator.canPop(context)) {
    Navigator.pop(context);
    return;
  }
  final role = FigmaPrototypeScope.of(context)
          .values['VariableID:80:1172']
          ?.toString() ??
      'donor';
  Navigator.pushReplacementNamed(context, homeRoute(role));
}

class MealBottomBar extends StatelessWidget {
  const MealBottomBar(
      {super.key,
      required this.role,
      required this.page,
      this.icons = const []});
  final String role, page;
  final List<dynamic> icons;
  @override
  Widget build(BuildContext context) {
    final c = FigmaPrototypeScope.of(context);
    final r = role == 'current'
        ? (c.values['VariableID:80:1172'] as String? ?? 'donor')
        : role;
    final List<(String, String, IconData)> tabs = switch (r) {
      'donor' => [
          ('Trang chủ', '/user/donor/dashboard', Icons.home_outlined),
          ('Tin đăng', '/user/donor/my-listings', Icons.format_list_bulleted),
          ('Tác động', '/user/donor/impact-report', Icons.bar_chart_outlined),
          ('Tôi', '/shared/profile', Icons.person_outline)
        ],
      'volunteer' => [
          ('Trang chủ', '/user/volunteer/dashboard', Icons.home_outlined),
          (
            'Việc giao',
            '/user/volunteer/available-jobs',
            Icons.local_shipping_outlined
          ),
          ('Lịch', '/user/volunteer/calendar', Icons.calendar_today_outlined),
          ('Huy hiệu', '/user/volunteer/badges', Icons.star_outline),
          ('Tôi', '/shared/profile', Icons.person_outline)
        ],
      'admin' => [
          ('Tổng quan', '/admin/dashboard', Icons.grid_view_outlined),
          ('Hồ sơ', '/admin/approval-queue', Icons.fact_check_outlined),
          ('Điều phối', '/admin/dispatch-map', Icons.route_outlined),
          ('Sự cố', '/admin/food-safety-incident', Icons.warning_amber),
          ('Thêm', '/admin/account-management', Icons.more_horiz)
        ],
      _ => [
          ('Trang chủ', '/user/organization/dashboard', Icons.home_outlined),
          ('Tìm đồ ăn', '/user/organization/food-discovery', Icons.search),
          ('Nhu cầu', '/user/organization/needs', Icons.list_alt_outlined),
          ('Đơn nhận', '/user/organization/orders', Icons.inventory_2_outlined),
          ('Tôi', '/shared/profile', Icons.person_outline)
        ],
    };
    int selected = page == 'profile'
        ? tabs.length - 1
        : page == 'dashboard'
            ? 0
            : r == 'donor'
                ? (page.contains('impact') || page.contains('history') ? 2 : 1)
                : r == 'volunteer'
                    ? (page.contains('calendar') || page.contains('shift')
                        ? 2
                        : page == 'badges'
                            ? 3
                            : 1)
                    : r == 'admin'
                        ? (page.contains('review') || page.contains('approval')
                            ? 1
                            : page.contains('dispatch')
                                ? 2
                                : page.contains('incident')
                                    ? 3
                                    : 4)
                        : page.contains('food')
                            ? 1
                            : page.contains('need')
                                ? 2
                                : 3;
    final displayIcons = role == 'current' && r == 'donor'
        ? const [
            '1b2aa867-15f1-41c7-826e-d2fe5673b32f.svg',
            'a4c96987-6d04-449b-b551-0b37630486da.svg',
            'df3ae16c-1efe-46ad-a1ed-2b6e31e73745.svg',
            '16cd2160-ec16-43f2-a5d9-234005a17a91.svg'
          ]
        : icons.isNotEmpty
            ? icons
            : r == 'volunteer'
                ? const [
                    'f66376a9-b426-49ab-86f4-a30caaa56513.svg',
                    'a24c7b95-5be4-4563-881f-78e6665139fe.svg',
                    '6ec1cbaa-d098-45bf-a45b-9fe4ccf7848f.svg',
                    '4a9acd1c-8bad-40a5-a9af-21dfdc8cac03.svg',
                    '6a0432a7-dd0d-4496-a4e8-aa5dd970c70b.svg'
                  ]
                : r == 'admin'
                    ? const []
                    : const [
                        'fab7932a-f662-4eaf-a684-3ae37831cfc1.svg',
                        '388a58b3-4c91-467e-986f-62edb7f1bc7f.svg',
                        '9e960a1f-451e-4d56-b20b-90eb91b31ff6.svg',
                        'd888107b-aa0a-4c14-9296-5d3e92651aba.svg',
                        'f5b21e7e-d6a0-4597-8144-138fd4ba085c.svg'
                      ];
    return Material(
        color: Colors.white,
        child: Row(children: [
          for (var i = 0; i < tabs.length; i++)
            Expanded(
                child: InkWell(
              key: ValueKey('nav/$r/$i'),
              onTap: () {
                if (i != selected) {
                  c.values['VariableID:80:1172'] = r;
                  Navigator.of(context).pushReplacementNamed(tabs[i].$2);
                }
              },
              child: Semantics(
                  selected: i == selected,
                  button: true,
                  label: tabs[i].$1,
                  child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        if (i < displayIcons.length && displayIcons[i] != null)
                          SvgPicture.asset('assets/figma/${displayIcons[i]}',
                              width: 25,
                              height: 25,
                              colorFilter: ColorFilter.mode(
                                  i == selected
                                      ? mealGreen
                                      : const Color(0xFF717171),
                                  BlendMode.srcIn))
                        else
                          Icon(tabs[i].$3,
                              size: 25,
                              color: i == selected
                                  ? mealGreen
                                  : const Color(0xFF717171)),
                        const SizedBox(height: 5),
                        Text(tabs[i].$1,
                            style: TextStyle(
                                fontFamily: 'Inter',
                                fontSize: 12,
                                fontWeight: i == selected
                                    ? FontWeight.w600
                                    : FontWeight.w400,
                                color: i == selected
                                    ? mealGreen
                                    : const Color(0xFF717171))),
                      ])),
            ))
        ]));
  }
}

/// A native, scrollable detail surface using the app's original mobile palette.
Future<void> showMealSheet(BuildContext context, String title, Widget child) =>
    showModalBottomSheet<void>(
        context: context,
        isScrollControlled: true,
        backgroundColor: mealBackground,
        showDragHandle: true,
        builder: (context) => SafeArea(
            child: Padding(
                padding: EdgeInsets.fromLTRB(
                    24, 0, 24, 24 + MediaQuery.viewInsetsOf(context).bottom),
                child: SingleChildScrollView(
                    child: Column(
                        mainAxisSize: MainAxisSize.min,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                      Text(title,
                          style: const TextStyle(
                              fontSize: 21,
                              fontWeight: FontWeight.w600,
                              color: mealInk)),
                      const SizedBox(height: 20),
                      child
                    ])))));
