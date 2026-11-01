import 'package:flutter_test/flutter_test.dart';
import 'package:sharemeal/presentation/shared/figma/figma_prototype_controller.dart';

void main() {
  const role = 'VariableID:80:1172', verification = 'VariableID:80:1174';
  const request = 'VariableID:80:1176', assigned = 'VariableID:80:1177';
  const pickedUp = 'VariableID:80:1178', delivered = 'VariableID:80:1180';
  test('Four role cards use the original login branches', () {
    for (final entry in {
      'donor': ['98:1187', '6:319'],
      'charity': ['98:1195', '6:1155'],
      'volunteer': ['98:1200', '6:1737'],
      'admin': ['98:1205', '6:3641'],
    }.entries) {
      final c = FigmaPrototypeController();
      c.apply(c.actionsFor('6:246', entry.value[0]));
      expect(c.values[role], entry.key);
      expect(
          c
              .apply(c.actionsFor('6:246', '98:1222'))
              .map((n) => n['destinationId']),
          [entry.value[1]]);
      c.dispose();
    }
  });
  test('Local admin approval unlocks a pending charity', () {
    final c = FigmaPrototypeController();
    c.values.addAll({role: 'charity', verification: 'pending'});
    expect(c.apply(c.actionsFor('6:246', '98:1222')).single['destinationId'],
        '6:4055');
    c.apply(c.actionsFor('77:1321', '77:1367'));
    expect(c.values[verification], 'approved');
    expect(c.apply(c.actionsFor('6:246', '98:1222')).single['destinationId'],
        '6:1155');
    c.dispose();
  });
  for (final source in {
    '6:1155': '66:1398',
    '6:1470': '84:1590',
    '65:1000': '65:1057'
  }.entries) {
    test('Tracking ${source.key} opens tracking for six order states', () {
      for (final s in [
        ['accepted', false, false, false, '35%'],
        ['accepted', true, false, false, '55%'],
        ['accepted', true, true, false, '80%'],
        ['accepted', true, true, true, '100%'],
        ['awaiting', false, false, false, '15%'],
        ['cancelled', true, true, true, '0%'],
      ]) {
        final c = FigmaPrototypeController();
        c.values.addAll(
            {request: s[0], assigned: s[1], pickedUp: s[2], delivered: s[3]});
        expect(
            c
                .apply(c.actionsFor(source.key, source.value))
                .single['destinationId'],
            '6:1525');
        expect(c.values['VariableID:110:1144'], s[4]);
        expect(c.values['VariableID:110:1149'],
            s[0] == 'accepted' && s[1] == true);
        expect(c.values['VariableID:110:1150'], s[4] == '80%');
        expect(c.values['VariableID:110:1151'], s[4] == '100%');
        c.dispose();
      }
    });
  }
}
