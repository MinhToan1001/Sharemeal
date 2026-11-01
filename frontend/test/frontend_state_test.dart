import 'package:flutter_test/flutter_test.dart';
import 'package:sharemeal/presentation/shared/interaction/frontend_state.dart';

void main() {
  test('Vietnamese search filters all query tokens, not unrelated cards', () {
    final s = FrontendState();
    expect(
        s.searchFoods(query: 'cơm gà').map((f) => f.name), ['Cơm gà xối mỡ']);
    expect(
        s.searchFoods(query: 'com ga').map((f) => f.name), ['Cơm gà xối mỡ']);
    expect(s.searchFoods(query: 'bánh', category: 'Rau củ'), isEmpty);
    expect(s.searchFoods(query: 'khong ton tai'), isEmpty);
  });
  test(
      'Draft, safety validation, publish, edit and close share one local model',
      () {
    final s = FrontendState();
    s.set('food.name', 'Cơm gà mới');
    s.set('food.quantity', 7);
    s.choose('food.storage', 'Để lạnh');
    s.choose('food.allergens', 'Hải sản', multiple: true, initial: ['Trứng']);
    s.set('food.safe.fresh', false);
    expect(s.publishFood, throwsStateError);
    s.set('food.safe.fresh', true);
    final food = s.publishFood();
    expect(food.quantity, 7);
    expect(food.storage, 'Để lạnh');
    expect(food.allergens, ['Trứng', 'Hải sản']);
    expect(s.searchFoods(query: 'cơm gà mới', mine: true).single.id, food.id);
    s.set('edit.name', '');
    expect(s.editFood, throwsStateError);
    expect(food.name, 'Cơm gà mới');
    s.set('edit.name', 'Cơm phần');
    s.set('edit.quantity', '5');
    s.editFood();
    expect(food.quantity, 5);
    s.closeFood();
    expect(food.status, 'closed');
    expect(s.searchFoods(query: 'Cơm phần'), isEmpty);
  });
  test('Quantities clamp and actual order state has guarded transitions', () {
    final s = FrontendState();
    s.step('food.quantity', -1, initial: 1, min: 1, max: 100);
    expect(s.get('food.quantity', 0), 1);
    s.set('request.quantity', 100);
    expect(s.requestFood, throwsStateError);
    s.set('request.quantity', 3);
    final o = s.requestFood();
    expect(o.status, 'awaiting');
    expect(() => s.transitionOrder('completed'), throwsStateError);
    s.transitionOrder('accepted');
    expect(s.selectedFood.quantity, 17);
    s.transitionOrder('assigned');
    s.transitionOrder('pickedUp');
    s.set('receipt.quantity', 2);
    s.transitionOrder('completed');
    expect(s.history.first['quantity'], 2);
    final length = s.history.length;
    s.transitionOrder('completed');
    expect(s.history.length, length);
    s.selectFood('SM-2039');
    expect(s.requestFood().quantity, 8);
  });
  test(
      'Distribution cannot exceed stock and chat messages are real local entries',
      () {
    final s = FrontendState();
    s.set('distribution.children', '16');
    s.set('distribution.elderly', '0');
    expect(s.distribute, throwsStateError);
    s.set('distribution.children', '7');
    s.distribute();
    expect(s.warehouseBalance, 8);
    expect(s.sendMessage, throwsStateError);
    s.sendMessage('Tôi đang đến');
    expect(s.messages.single['text'], 'Tôi đang đến');
    expect(s.impact('Tháng')['meals'], 85);
    expect(s.impact('Tuần')['meals'], 43);
  });
}
