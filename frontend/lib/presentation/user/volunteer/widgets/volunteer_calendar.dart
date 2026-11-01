import 'package:flutter/material.dart';
import '../../../shared/figma/figma_prototype_controller.dart';
import '../../../shared/interaction/app_navigation.dart';
import '../../../shared/interaction/frontend_actions.dart';
import '../../../shared/interaction/frontend_state.dart';

String _dateLabel(DateTime date) => '${date.day}/${date.month}/${date.year}';
String _weekday(DateTime date) =>
    date.weekday == 7 ? 'CN' : 'T${date.weekday + 1}';
const _muted = Color(0xFF687C74);
const _pale = Color(0xFFE3F2E9);

class VolunteerCalendar extends StatelessWidget {
  const VolunteerCalendar({super.key});
  @override
  Widget build(BuildContext context) {
    final state = FigmaPrototypeScope.of(context).frontend;
    final selected = state.calendarDate;
    final today = FrontendState.dateOnly(state.now());
    final monday = selected.subtract(Duration(days: selected.weekday - 1));
    final registered = state.shiftRegistered(selected);
    final jobs = state.orders
        .where((o) =>
            o.driver == 'Trần Quốc Bảo' &&
            o.transport != 'Tự đến lấy' &&
            ['assigned', 'pickedUp'].contains(o.status) &&
            state.get('job.date.${o.id}', FrontendState.dateKey(today)) ==
                FrontendState.dateKey(selected))
        .toList();
    return Column(children: [
      Container(
          color: Colors.white,
          padding: const EdgeInsets.fromLTRB(20, 24, 20, 14),
          child: Column(children: [
            Row(children: [
              const Expanded(
                  child: Text('Lịch tình nguyện',
                      style: TextStyle(
                          fontSize: 24,
                          color: mealInk,
                          fontWeight: FontWeight.w700))),
              TextButton(
                  onPressed: () =>
                      state.set('calendar.date', FrontendState.dateKey(today)),
                  child: const Text('Hôm nay'))
            ]),
            Row(children: [
              IconButton(
                  key: const ValueKey('calendar/previous'),
                  tooltip: 'Tuần trước',
                  onPressed: () => state.set(
                      'calendar.date',
                      FrontendState.dateKey(
                          selected.subtract(const Duration(days: 7)))),
                  icon: const Icon(Icons.chevron_left, color: mealGreen)),
              Expanded(
                  child: TextButton(
                      key: const ValueKey('calendar/picker'),
                      onPressed: () async {
                        final day = await showDatePicker(
                            context: context,
                            initialDate: selected,
                            firstDate: DateTime(2020),
                            lastDate: DateTime(today.year + 5, 12, 31));
                        if (day != null) {
                          state.set(
                              'calendar.date', FrontendState.dateKey(day));
                        }
                      },
                      child: Text('Tháng ${selected.month}, ${selected.year}',
                          style: const TextStyle(
                              color: mealGreen, fontWeight: FontWeight.w600)))),
              IconButton(
                  key: const ValueKey('calendar/next'),
                  tooltip: 'Tuần sau',
                  onPressed: () => state.set(
                      'calendar.date',
                      FrontendState.dateKey(
                          selected.add(const Duration(days: 7)))),
                  icon: const Icon(Icons.chevron_right, color: mealGreen)),
            ]),
            Row(children: [
              for (var i = 0; i < 7; i++)
                Expanded(
                    child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 2),
                        child: _DayTile(
                            day: monday.add(Duration(days: i)),
                            selected: selected)))
            ])
          ])),
      Expanded(
          child: ListView(
              padding: const EdgeInsets.fromLTRB(20, 18, 20, 24),
              children: [
            Text('${_weekday(selected)} · ${_dateLabel(selected)}',
                key: const ValueKey('calendar/selected-label'),
                style: const TextStyle(
                    color: mealInk, fontSize: 16, fontWeight: FontWeight.w600)),
            const SizedBox(height: 14),
            if (jobs.isEmpty && !registered)
              Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                      color: _pale, borderRadius: BorderRadius.circular(18)),
                  child: Row(children: [
                    const Icon(Icons.event_available_outlined,
                        size: 43, color: mealGreen),
                    const SizedBox(width: 15),
                    const Expanded(
                        child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                          Text('Chưa có lịch đã đăng ký',
                              style: TextStyle(
                                  color: mealInk,
                                  fontSize: 15,
                                  fontWeight: FontWeight.w600)),
                          SizedBox(height: 6),
                          Text('Chọn ca phù hợp bên dưới để bắt đầu.',
                              style: TextStyle(
                                  color: _muted, fontSize: 12, height: 1.5))
                        ]))
                  ])),
            for (final job in jobs)
              Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: _CalendarCard(
                      icon: Icons.local_shipping_outlined,
                      title: state.foods
                          .firstWhere((f) => f.id == job.foodId)
                          .name,
                      detail: '${job.time} · #${job.id}',
                      badge: job.status == 'pickedUp'
                          ? 'Đang giao'
                          : 'Đến lấy hàng',
                      child: TextButton(
                          onPressed: () {
                            state.selectOrder(job.id);
                            Navigator.pushNamed(
                                context, '/user/volunteer/delivery-tracking');
                          },
                          child: const Text('Theo dõi chuyến →')))),
            if (registered)
              _CalendarCard(
                  icon: Icons.event_available_outlined,
                  title: 'Ca giao tối · Q.1, Q.3, Q.5',
                  detail: '18:00–21:00 · ${_dateLabel(selected)}',
                  badge: 'Đã đăng ký',
                  child: TextButton(
                      key: const ValueKey('calendar/cancel'),
                      onPressed: () async {
                        final confirmed = await showDialog<bool>(
                            context: context,
                            builder: (context) => AlertDialog(
                                    title: const Text('Hủy ca đã đăng ký?'),
                                    content: Text(
                                        'Ca tối ngày ${_dateLabel(selected)} sẽ được gỡ khỏi lịch của bạn.'),
                                    actions: [
                                      TextButton(
                                          onPressed: () =>
                                              Navigator.pop(context, false),
                                          child: const Text('Giữ ca')),
                                      FilledButton(
                                          onPressed: () =>
                                              Navigator.pop(context, true),
                                          child: const Text('Hủy ca'))
                                    ]));
                        if (confirmed == true) state.cancelShift(selected);
                      },
                      child: const Text('Hủy đăng ký',
                          style: TextStyle(color: Color(0xFFB42318))))),
            const SizedBox(height: 22),
            const Text('Ca có thể tham gia',
                style: TextStyle(
                    color: mealInk, fontSize: 16, fontWeight: FontWeight.w600)),
            const SizedBox(height: 12),
            if (!selected.isBefore(today) && !registered)
              _CalendarCard(
                  icon: Icons.nightlight_outlined,
                  title: 'Ca tối · Trung tâm thành phố',
                  detail: '18:00–21:00 · Xe máy · Túi giữ nhiệt',
                  badge: 'Còn 3 chỗ',
                  child: FilledButton(
                      key: const ValueKey('calendar/register'),
                      onPressed: () {
                        state.set(
                            'shift.date', FrontendState.dateKey(selected));
                        Navigator.pushNamed(
                            context, '/user/volunteer/shift-registration');
                      },
                      child: const Text('Xem ca & đăng ký')))
            else
              Padding(
                  padding: const EdgeInsets.all(16),
                  child: Text(
                      registered
                          ? 'Bạn đã đăng ký ca tối ngày này. Chọn ngày khác để xem thêm ca.'
                          : 'Ngày đã qua. Chọn hôm nay hoặc một ngày sắp tới.',
                      style: const TextStyle(
                          color: _muted, fontSize: 13, height: 1.5))),
            const SizedBox(height: 18),
            const Text('Lịch và số chỗ hiện là dữ liệu kiểm thử trên thiết bị.',
                style: TextStyle(color: _muted, fontSize: 11, height: 1.5)),
          ])),
    ]);
  }
}

class _DayTile extends StatelessWidget {
  const _DayTile({required this.day, required this.selected});
  final DateTime day, selected;
  @override
  Widget build(BuildContext context) {
    final state = FigmaPrototypeScope.of(context).frontend;
    final active = day == selected;
    final hasShift = state.shiftRegistered(day);
    return Semantics(
        selected: active,
        child: Material(
            color: active ? mealGreen : Colors.transparent,
            borderRadius: BorderRadius.circular(12),
            child: InkWell(
                key: ValueKey('calendar/day/${FrontendState.dateKey(day)}'),
                borderRadius: BorderRadius.circular(12),
                onTap: () =>
                    state.set('calendar.date', FrontendState.dateKey(day)),
                child: SizedBox(
                    height: 68,
                    child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(_weekday(day),
                              style: TextStyle(
                                  color: active ? Colors.white70 : _muted,
                                  fontSize: 11)),
                          const SizedBox(height: 5),
                          Text('${day.day}',
                              style: TextStyle(
                                  color: active ? Colors.white : mealInk,
                                  fontWeight: FontWeight.w600,
                                  fontSize: 16)),
                          const SizedBox(height: 5),
                          Container(
                              width: 4,
                              height: 4,
                              decoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  color: hasShift
                                      ? (active ? Colors.white : mealGreen)
                                      : Colors.transparent)),
                        ])))));
  }
}

class ShiftRegistration extends StatelessWidget {
  const ShiftRegistration({super.key});
  @override
  Widget build(BuildContext context) {
    final state = FigmaPrototypeScope.of(context).frontend;
    final date = state.shiftDate;
    final today = FrontendState.dateOnly(state.now());
    final enabled = !date.isBefore(today) && !state.shiftRegistered(date);
    return ListView(padding: const EdgeInsets.only(bottom: 18), children: [
      Container(
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
              color: _pale, borderRadius: BorderRadius.circular(18)),
          child: Row(children: [
            const Icon(Icons.calendar_month_outlined,
                color: mealGreen, size: 42),
            const SizedBox(width: 14),
            Expanded(
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                  const Text('Ngày tình nguyện',
                      style: TextStyle(color: _muted, fontSize: 12)),
                  const SizedBox(height: 5),
                  Text('${_weekday(date)} · ${_dateLabel(date)}',
                      key: const ValueKey('shift/date'),
                      style: const TextStyle(
                          color: mealInk,
                          fontWeight: FontWeight.w600,
                          fontSize: 18)),
                ])),
            IconButton(
                tooltip: 'Đổi ngày',
                onPressed: () async {
                  final selected = await showDatePicker(
                      context: context,
                      initialDate: date.isBefore(today) ? today : date,
                      firstDate: today,
                      lastDate: DateTime(today.year + 2, 12, 31));
                  if (selected != null) {
                    state.set('shift.date', FrontendState.dateKey(selected));
                  }
                },
                icon:
                    const Icon(Icons.edit_calendar_outlined, color: mealGreen)),
          ])),
      const SizedBox(height: 16),
      _CalendarCard(
          icon: Icons.nightlight_outlined,
          title: 'Ca tối · Trung tâm thành phố',
          detail: '18:00–21:00',
          badge: state.shiftRegistered(date) ? 'Đã đăng ký' : 'Còn 3 chỗ',
          child: Column(children: [
            const ListTile(
                contentPadding: EdgeInsets.zero,
                leading: Icon(Icons.location_on_outlined, color: mealGreen),
                title: Text('Quận 1, 3, 5', style: TextStyle(fontSize: 14)),
                subtitle: Text('Ưu tiên chuyến dưới 5 km',
                    style: TextStyle(fontSize: 12))),
            const ListTile(
                contentPadding: EdgeInsets.zero,
                leading: Icon(Icons.two_wheeler_outlined, color: mealGreen),
                title: Text('Xe máy & túi giữ nhiệt',
                    style: TextStyle(fontSize: 14))),
            SizedBox(
                width: double.infinity,
                child: FilledButton(
                    key: const ValueKey('shift/confirm'),
                    onPressed: enabled
                        ? () => FrontendActions.run(
                            context, '65:1427', {'action': 'registerShift'})
                        : null,
                    child: Text(state.shiftRegistered(date)
                        ? 'Bạn đã đăng ký ca này'
                        : 'Đăng ký ca này'))),
          ])),
      const SizedBox(height: 16),
      const _CalendarCard(
          icon: Icons.wb_sunny_outlined,
          title: 'Ca trưa · Quận 7',
          detail: '10:30–13:30',
          badge: 'Đã đủ người'),
      const SizedBox(height: 16),
      const Text(
          'Đăng ký ca không tự nhận chuyến. Bạn vẫn chủ động chọn chuyến trong mục Việc giao.',
          style: TextStyle(fontSize: 13, color: _muted, height: 1.6)),
    ]);
  }
}

class _CalendarCard extends StatelessWidget {
  const _CalendarCard(
      {required this.icon,
      required this.title,
      required this.detail,
      required this.badge,
      this.child});
  final IconData icon;
  final String title, detail, badge;
  final Widget? child;
  @override
  Widget build(BuildContext context) => Material(
      color: Colors.white,
      shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(18),
          side: const BorderSide(color: Color(0xFFDCE7DF))),
      child: Padding(
          padding: const EdgeInsets.all(16),
          child:
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
              CircleAvatar(
                  radius: 21,
                  backgroundColor: _pale,
                  child: Icon(icon, color: mealGreen, size: 24)),
              const SizedBox(width: 12),
              Expanded(
                  child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                    Text(title,
                        style: const TextStyle(
                            color: mealInk,
                            fontWeight: FontWeight.w600,
                            fontSize: 15)),
                    const SizedBox(height: 7),
                    Text(detail,
                        style: const TextStyle(
                            color: _muted, fontSize: 12, height: 1.5))
                  ]))
            ]),
            const SizedBox(height: 12),
            Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                decoration: BoxDecoration(
                    color: _pale, borderRadius: BorderRadius.circular(20)),
                child: Text(badge,
                    style: const TextStyle(
                        fontSize: 11,
                        color: mealGreen,
                        fontWeight: FontWeight.w600))),
            if (child != null) ...[const SizedBox(height: 10), child!],
          ])));
}
