import 'package:flutter/material.dart';
import '../figma/figma_prototype_controller.dart';
import 'app_navigation.dart';
import 'frontend_actions.dart';
import '../../../data/repositories/firebase_app_state.dart';

class ProfileSummary extends StatelessWidget {
  const ProfileSummary({super.key});
  @override
  Widget build(BuildContext context) {
    final state = FigmaPrototypeScope.of(context).frontend;
    String display(String key, String sample) {
      final value = state.get<String>('profile.$key', '').trim();
      return value.isNotEmpty
          ? value
          : state is FirebaseAppState
              ? (key == 'name'
                  ? 'Chưa cập nhật họ tên'
                  : 'Chưa cập nhật số điện thoại')
              : sample;
    }

    return Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(18),
            border: Border.all(color: const Color(0xFFDCE7DF))),
        child: Row(children: [
          CircleAvatar(
              radius: 25,
              backgroundColor: const Color(0xFFE3F2E9),
              child: Text(
                  state
                      .get('profile.name', 'Nguyễn Minh Anh')
                      .trim()
                      .split(' ')
                      .last
                      .characters
                      .take(1)
                      .toString(),
                  style: const TextStyle(color: mealGreen, fontSize: 24))),
          const SizedBox(width: 12),
          Expanded(
              child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                for (final field in const [
                  ['name', 'Họ và tên', 'Nguyễn Minh Anh', 'text'],
                  ['phone', 'Số điện thoại', '0903 123 456', 'phone']
                ])
                  Expanded(
                      child: InkWell(
                          key: ValueKey('profile/edit/${field[0]}'),
                          onTap: () => FrontendActions.run(context, '6:2504', {
                                'action': 'editField',
                                'key': 'profile.${field[0]}',
                                'label': field[1],
                                'initial': field[2],
                                'mode': field[3]
                              }),
                          child: Row(children: [
                            Expanded(
                                child: Text(display(field[0], field[2]),
                                    maxLines: 2,
                                    overflow: TextOverflow.ellipsis,
                                    style: TextStyle(
                                        color: field[0] == 'name'
                                            ? mealInk
                                            : const Color(0xFF687C74),
                                        fontSize: field[0] == 'name' ? 16 : 12,
                                        height: 1.25,
                                        fontWeight: field[0] == 'name'
                                            ? FontWeight.w600
                                            : FontWeight.w400))),
                            const SizedBox(width: 8),
                            const Icon(Icons.edit_outlined,
                                color: mealGreen, size: 19),
                          ]))),
                const Text('Một tài khoản, nhiều cách đóng góp',
                    style: TextStyle(color: mealGreen, fontSize: 11)),
              ])),
        ]));
  }
}
