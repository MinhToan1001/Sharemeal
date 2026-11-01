"""Extract editable Material icon outlines from the app's actual font asset."""
import json
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen

root = Path(__file__).resolve().parents[2]
screens = json.loads((root / 'docs/figma-sync/flutter_layers.json').read_text(encoding='utf-8'))
icons = {0xE5CA}  # check
def walk(n):
    if n.get('type') == 'icon':
        icons.add(ord(n['text'][0]))
    for c in n.get('children', []):
        walk(c)
for s in screens:
    for p in s['panels']:
        for n in p['layers']:
            walk(n)
font = TTFont(root / 'frontend/build/unit_test_assets/fonts/MaterialIcons-Regular.otf')
cmap = font.getBestCmap()
glyphs = font.getGlyphSet()
em = font['head'].unitsPerEm
ascent = font['hhea'].ascent
result = {}
for cp in sorted(icons):
    if cp not in cmap:
        raise RuntimeError(f'Missing app icon glyph: {cp}')
    pen = SVGPathPen(glyphs)
    glyphs[cmap[cp]].draw(pen)
    result[str(cp)] = f'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 {em} {em}"><path transform="translate(0,{ascent}) scale(1,-1)" d="{pen.getCommands()}" fill="currentColor"/></svg>'
(root / 'docs/figma-sync/icon_outlines.json').write_text(json.dumps(result), encoding='utf-8')
print(json.dumps({'glyphs':len(result),'em':em,'ascent':ascent}))
