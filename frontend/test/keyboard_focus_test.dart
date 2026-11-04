import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sharemeal/app/sharemeal_app.dart';
import 'package:sharemeal/presentation/shared/controllers/firebase_app_state.dart';
import 'package:sharemeal/presentation/shared/figma/figma_prototype_controller.dart';
import 'firebase_app_state_test.dart' show TestServices;

void main() {
  for (final route in [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password'
  ]) {
    testWidgets('$route keeps input focus while Android keyboard animates',
        (tester) async {
      tester.view.physicalSize = const Size(360, 800);
      tester.view.devicePixelRatio = 1;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      addTearDown(tester.view.resetViewInsets);
      final state = FirebaseAppState(TestServices());
      final controller =
          FigmaPrototypeController(frontend: state, enableTimeouts: false);
      addTearDown(controller.dispose);
      await tester
          .pumpWidget(ShareMealApp(prototype: controller, initialRoute: route));
      await tester.pumpAndSettle();

      final fields = tester
          .widgetList<TextField>(find.byType(TextField))
          .map((field) => field.key!)
          .toList();
      expect(fields, isNotEmpty);
      for (final key in fields) {
        final field = find.byKey(key);
        await tester.ensureVisible(field);
        await tester.tap(field);
        await tester.pump();
        final editableFinder =
            find.descendant(of: field, matching: find.byType(EditableText));
        final editable = tester.state<EditableTextState>(editableFinder);
        expect(editable.widget.focusNode.hasFocus, isTrue);
        const value = TextEditingValue(
            text: 'demo@example.test',
            selection: TextSelection.collapsed(offset: 4),
            composing: TextRange(start: 0, end: 4));
        tester.testTextInput.updateEditingValue(value);
        await tester.pump();

        // Android sends several inset changes as the IME opens, changes size,
        // and closes. None may dispose the active EditableText or its session.
        for (final inset in [48.0, 160.0, 300.0, 240.0, 0.0, 300.0]) {
          tester.view.viewInsets = FakeViewPadding(bottom: inset);
          await tester.pump(const Duration(milliseconds: 32));
          expect(
              tester.state<EditableTextState>(editableFinder), same(editable),
              reason: 'Keyboard resize must preserve the editing session');
          expect(editable.widget.focusNode.hasFocus, isTrue);
          expect(editable.widget.controller.value, value);
          expect(tester.testTextInput.isVisible, isTrue);
        }
        tester.testTextInput.updateEditingValue(value.copyWith(
            text: 'demo2@example.test',
            selection: const TextSelection.collapsed(offset: 5),
            composing: TextRange.empty));
        await tester.pump();
        expect(editable.widget.controller.text, 'demo2@example.test');
      }
      expect(tester.takeException(), isNull);
      await tester.pumpWidget(const SizedBox.shrink());
    });
  }
}
