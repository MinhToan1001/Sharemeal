"""QA only: compare native captures with original Figma screenshots."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageChops, ImageStat
import json

root = Path(__file__).resolve().parents[2] / 'docs' / 'figma'
expected = sorted((root / 'expected').glob('*.png'))
sheet = Image.new('RGB', (len(expected) * 402, 900), '#dddddd')
draw = ImageDraw.Draw(sheet)
scores = []
for i, path in enumerate(expected):
    other = root / 'actual' / path.name
    if not other.exists():
        continue
    first = Image.open(path).convert('RGB')
    second = Image.open(other).convert('RGB')
    # Side by side at 50% size: Figma left, Flutter right.
    sheet.paste(first.resize((201, 437)), (i * 402, 24))
    sheet.paste(second.resize((201, 437)), (i * 402 + 201, 24))
    diff = ImageChops.difference(first, second)
    sheet.paste(diff.resize((402, 437)), (i * 402, 463))
    score = sum(ImageStat.Stat(diff).mean) / 3
    scores.append({'screen': path.stem.replace('_', ':'), 'mean_channel_error': score})
    draw.text((i * 402 + 6, 4), f'{path.stem} Figma | Flutter  MAE {score:.2f}', fill='#111111')
sheet.save(root / 'comparison.png')
(root / 'comparison_scores.json').write_text(json.dumps(scores, indent=2), encoding='utf-8')
print(json.dumps(scores))

manifest = json.loads((root / 'screen_map.json').read_text(encoding='utf-8'))
for group in sorted({s['group'] for s in manifest}):
    screens = [s for s in manifest if s['group'] == group]
    columns = 5
    rows = (len(screens) + columns - 1) // columns
    contact = Image.new('RGB', (columns * 201, rows * 461), '#dddddd')
    pen = ImageDraw.Draw(contact)
    for i, screen in enumerate(screens):
        path = root / 'actual' / (screen['frameId'].replace(':', '_') + '.png')
        if not path.exists():
            continue
        x, y = (i % columns) * 201, (i // columns) * 461
        contact.paste(Image.open(path).convert('RGB').resize((201, 437)), (x, y + 24))
        pen.text((x + 4, y + 3), screen['frameId'] + ' ' + screen['name'][:20], fill='#111111')
    contact.save(root / ('contact_' + group.replace('/', '_') + '.png'))
