// Read-only UI export: editable geometry, text, asset references; no screenshots.
import 'dart:convert';
import 'dart:io';
import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sharemeal/app/sharemeal_app.dart';
import 'package:sharemeal/presentation/shared/figma/figma_primitives.dart';
import 'package:sharemeal/presentation/shared/figma/figma_prototype_controller.dart';
import 'package:sharemeal/presentation/shared/figma/figma_prototype_data.dart';

const nativeKinds = {
  'profilePage','deliveryJobsPage','pageHeader','requestMatchingPanel',
  'listingSummary','listingRequestsPrompt','publishSummary','foodSafetyHero',
  'pickupDetails','licensePhoto','verificationHero','packagingStep',
  'facilityPhotos','licenseFields','safetyCommitments','volunteerCalendar',
  'shiftRegistration','profileSummary','collection','messages','photo',
  'bottomNav','deliveryJobDetails','courierContact','pickupContact',
  'deliveryAcceptanceSummary','handoverTimeline','impactChart','impactCategories',
};

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  testWidgets('Export Flutter layers for editable Figma reconciliation', (t) async {
    t.view.physicalSize = const Size(402, 874);
    t.view.devicePixelRatio = 1;
    await (FontLoader('Inter')..addFont(rootBundle.load('assets/fonts/Inter-Variable.ttf'))).load();
    await (FontLoader('MaterialIcons')..addFont(rootBundle.load('fonts/MaterialIcons-Regular.otf'))).load();
    final output = Directory('../docs/figma-sync')..createSync(recursive: true);
    final results = <Map<String,dynamic>>[];
    for (final entry in {...figmaFrameRoutes, 'donor-impact':'/user/donor/impact-report',
      'profile-charity':'/shared/profile','profile-volunteer':'/shared/profile'}.entries) {
      final c = FigmaPrototypeController(enableTimeouts: false);
      c.values['VariableID:80:1172'] = entry.key == 'profile-charity' || entry.value.contains('/organization/')
          ? 'charity' : entry.key == 'profile-volunteer' || entry.value.contains('/volunteer/') ? 'volunteer' : 'donor';
      if (['6:609','6:1023'].contains(entry.key)) c.frontend.addDemoRequests();
      await t.pumpWidget(ShareMealApp(key:ValueKey(entry.key), initialRoute:entry.value, prototype:c));
      await t.pumpAndSettle();
      await t.runAsync(() async => Future<void>.delayed(const Duration(milliseconds:30)));
      await t.pumpAndSettle();
      final rootId = entry.key.startsWith('profile-') ? '6:2504' : entry.key;
      final boundary = t.renderObject<RenderRepaintBoundary>(find.byKey(ValueKey('figma/$rootId')));
      void cache(RenderObject r) {
        if (r is RenderViewport) r.cacheExtent=20000;
        r.visitChildren(cache);
      }
      cache(boundary);
      await t.pumpAndSettle();
      final elements = <Element>[];
      void visit(Element e) { elements.add(e); e.visitChildren(visit); }
      visit(t.element(find.byKey(ValueKey('figma/$rootId'))));
      final assets = <RenderObject,Map<String,dynamic>>{};
      final names = <RenderObject,String>{};
      final actions = <RenderObject,Map<String,dynamic>>{};
      for (final e in elements) {
        final w = e.widget;
        final ro = e.findRenderObject();
        if (ro == null) continue;
        final wn = w.runtimeType.toString();
        if (wn=='MealMap') assets[ro]={'type':'map'};
        if (w is Checkbox) assets[ro]={'type':'checkbox','checked':w.value==true};
        if (w is LinearProgressIndicator) assets[ro]={'type':'progress','value':w.value??0,
          'color':colorHex(w.color??const Color(0xff006642)),
          'track':colorHex(w.backgroundColor??const Color(0xffe3f2e9))};
        if (['FoodPhoto','MealBottomBar','_RequestCard','LicenseFields','ProfileSummary',
          'FacilityPhotos','SafetyCommitments','VolunteerCalendar','_JobCard',
          'FilledButton','OutlinedButton','TextButton','Checkbox','ChoiceChip','ListTile'].contains(wn)) {
          names[ro] = wn;
        }
        if (w is Image) {
          dynamic provider = w.image;
          if (provider is ResizeImage) provider = provider.imageProvider;
          if (provider is AssetImage) assets[ro] = {'type':'image','asset':provider.assetName};
        }
        if (w is SvgPicture && w.bytesLoader is SvgAssetLoader) {
          assets[ro] = {'type':'svg','asset':(w.bytesLoader as SvgAssetLoader).assetName,'filter':w.colorFilter?.toString()};
        }
        if (w is FigmaBox && w.control.isNotEmpty) actions[ro] = w.control;
      }
      final ex = LayerExport(boundary,assets,names,actions);
      final panels = <Map<String,dynamic>>[];
      for (final e in elements) {
        final w = e.widget;
        if (w is! FigmaBox || !nativeKinds.contains(w.control['kind'])) continue;
        // Native panels are complete subtrees; don't export another panel inside one.
        var nested = false;
        e.visitAncestorElements((a) {
          if (a.widget is FigmaBox && nativeKinds.contains((a.widget as FigmaBox).control['kind'])) { nested = true; return false; }
          return true;
        });
        if (nested) continue;
        final ro = e.findRenderObject();
        if (ro is! RenderBox || !ro.hasSize || ro.size.isEmpty) continue;
        final rect = ex.rect(ro);
        panels.add({'nodeId':w.nodeId,'kind':w.control['kind'],'control':w.control,
          'rect':bounds(rect),'layers':ex.walk(ro)});
      }
      if (entry.key=='donor-impact') panels.add({'nodeId':null,'kind':'impactPage','rect':[0,0,402,874],'layers':ex.walk(boundary)});
      final rootBox=elements.map((e)=>e.widget).whereType<FigmaBox>().where((w)=>w.nodeId==rootId).firstOrNull;
      final ordinary=<Map<String,dynamic>>[];
      for(final w in rootBox?.children??<FigmaBox>[]) {
        if(nativeKinds.contains(w.control['kind'])||w.control['kind']=='mealMap')continue;
        final es=elements.where((e)=>identical(e.widget,w));if(es.isEmpty)continue;
        final ro=es.first.findRenderObject();if(ro is! RenderBox||!ro.hasSize||ro.size.isEmpty)continue;
        ordinary.add({'nodeId':w.nodeId,'rect':bounds(ex.rect(ro)),'layers':ex.walk(ro)});
      }
      if (panels.isNotEmpty) results.add({'frameId':entry.key,'route':entry.value,
        'rootChildIds':rootBox?.children.map((w)=>w.nodeId).whereType<String>().toList()??[],
        'ordinary':ordinary,
        'panels':panels});
      expect(t.takeException(),isNull,reason:entry.key);
      await t.pumpWidget(const SizedBox.shrink());
      c.dispose();
    }
    File('${output.path}/flutter_layers.json').writeAsStringSync(jsonEncode(results));
    // ignore: avoid_print
    print('Exported ${results.length} screens / ${results.fold<int>(0,(n,s)=>n+(s['panels'] as List).length)} native panels');
  }, timeout: const Timeout(Duration(minutes:5)));
}

double rounded(double x) => (x*1000).round()/1000;
List<double> bounds(Rect r) => [rounded(r.left),rounded(r.top),rounded(r.width),rounded(r.height)];
String colorHex(Color c) => c.toARGB32().toRadixString(16).padLeft(8,'0');

class LayerExport {
  LayerExport(this.root,this.assets,this.names,this.actions);
  final RenderBox root;
  final Map<RenderObject,Map<String,dynamic>> assets,actions;
  final Map<RenderObject,String> names;
  Rect rect(RenderBox box) => MatrixUtils.transformRect(box.getTransformTo(root),Offset.zero & box.size);
  List<Map<String,dynamic>> children(RenderObject r) {
    final result=<Map<String,dynamic>>[];
    r.visitChildren((c)=>result.addAll(walk(c)));
    return result;
  }
  List<Map<String,dynamic>> walk(RenderObject ro) {
    if (ro is RenderOffstage && ro.offstage) return [];
    if (ro is RenderOpacity && ro.opacity==0) return [];
    if (ro is! RenderBox || !ro.hasSize) return children(ro);
    if (ro.size.width<=0 || ro.size.height<=0) return [];
    final b=rect(ro);
    final n=<String,dynamic>{'rect':bounds(b),'name':names[ro]??ro.runtimeType.toString()};
    if (actions.containsKey(ro)) n['control']=actions[ro];
    if (assets.containsKey(ro)) return [{...n,...assets[ro]!}];
    InlineSpan? inline;
    if (ro is RenderParagraph) inline=ro.text;
    if (ro is RenderEditable) inline=ro.text;
    if (inline!=null) {
      final text=inline.toPlainText();
      if (text.trim().isEmpty) return [];
      TextStyle? style=inline.style;
      if (style==null && inline is TextSpan && inline.children?.isNotEmpty==true) style=inline.children!.first.style;
      final s=style??const TextStyle();
      final painter=TextPainter(text:inline,textDirection:TextDirection.ltr)..layout(maxWidth:math.max(.1,ro.size.width));
      final metrics=painter.computeLineMetrics();
      final lineHeight=metrics.isEmpty?s.fontSize??14:metrics.first.height;
      painter.dispose();
      return [{...n,'type':s.fontFamily=='MaterialIcons'?'icon':'text','text':text,
        'font':s.fontFamily??'Inter','size':s.fontSize??14,'weight':s.fontWeight?.value??400,
        'color':colorHex(s.color??const Color(0xff193e34)),
        'height':s.height,'lineHeight':lineHeight,'letterSpacing':s.letterSpacing??0,
        'align':ro is RenderParagraph?ro.textAlign.name:'left'}];
    }
    if (ro.runtimeType.toString()=='_RenderColoredBox') {n['fill']=colorHex((ro as dynamic).color as Color);}
    if (ro is RenderDecoratedBox && ro.decoration is BoxDecoration) {
      final d=ro.decoration as BoxDecoration;
      if (d.color!=null) n['fill']=colorHex(d.color!);
      if (d.borderRadius!=null) {
        final r=d.borderRadius!.resolve(TextDirection.ltr);
        n['radius']=[r.topLeft.x,r.topRight.x,r.bottomRight.x,r.bottomLeft.x];
      }
      if (d.shape==BoxShape.circle) n['radius']=List.filled(4,math.min(b.width,b.height)/2);
      if (d.border is Border) {
        final q=d.border as Border;
        n['border']={'color':colorHex(q.top.color),'width':q.top.width};
      }
    }
    if (ro is RenderPhysicalModel) {
      n['fill']=colorHex(ro.color);
      final r=ro.borderRadius??BorderRadius.zero;
      n['radius']=[r.topLeft.x,r.topRight.x,r.bottomRight.x,r.bottomLeft.x];
      n['clip']=ro.clipBehavior!=Clip.none;
    }
    if (ro is RenderPhysicalShape) {
      n['fill']=colorHex(ro.color);
      final clipper=ro.clipper;
      if (clipper is ShapeBorderClipper && clipper.shape is RoundedRectangleBorder) {
        final shape=clipper.shape as RoundedRectangleBorder;
        final r=shape.borderRadius.resolve(TextDirection.ltr);
        n['radius']=[r.topLeft.x,r.topRight.x,r.bottomRight.x,r.bottomLeft.x];
        if (shape.side.width>0 && shape.side.style!=BorderStyle.none) n['border']={'color':colorHex(shape.side.color),'width':shape.side.width};
      }
      n['clip']=ro.clipBehavior!=Clip.none;
    }
    if (ro is RenderClipRRect) {
      final r=ro.borderRadius.resolve(TextDirection.ltr);
      n['radius']=[r.topLeft.x,r.topRight.x,r.bottomRight.x,r.bottomLeft.x];
      n['clip']=true;
    }
    if (ro is RenderClipRect || ro is RenderViewport || ro is RenderShrinkWrappingViewport) n['clip']=true;
    if (ro is RenderFlex) {
      n['type']='flex';n['axis']=ro.direction.name;n['cross']=ro.crossAxisAlignment.name;
      n['main']=ro.mainAxisAlignment.name;
      final slots=<Map<String,dynamic>>[];
      RenderBox? child=ro.firstChild;
      while (child!=null) {
        if (child.hasSize) {
          final r=rect(child);
          final content=walk(child);
          slots.add({'type':'slot','name':'Flex item','rect':bounds(r),'children':content});
        }
        child=(child.parentData as FlexParentData).nextSibling;
      }
      n['children']=slots;
      return [n];
    }
    final cs=children(ro);
    if (n.containsKey('fill')||n.containsKey('border')||n.containsKey('clip')||n.containsKey('radius')||names.containsKey(ro)||actions.containsKey(ro)) {
      n['type']='frame';n['children']=cs;return [n];
    }
    return cs;
  }
}
