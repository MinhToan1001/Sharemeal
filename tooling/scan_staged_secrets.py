"""Scan staged blobs; report locations only, never credential values."""
import re
import subprocess
import sys

patterns = {
    'private key': re.compile(r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----'),
    'service account': re.compile(r'"type"\s*:\s*"service_account"'),
    'Cloudinary URL credentials': re.compile(r'cloudinary://[^\s/:]+:[^\s/@]+@'),
    'secret literal': re.compile(
        r'''(?i)(?:api[_ -]?secret|client[_ -]?secret|refresh[_ -]?token|private[_ -]?key)\s*["']?\s*[:=]\s*["']([A-Za-z0-9_+/=.-]{20,})["']'''),
    'GitHub token': re.compile(r'\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,})\b'),
    'Google OAuth token': re.compile(r'\bya29\.[A-Za-z0-9_.-]{25,}'),
}
names = subprocess.check_output(
    ['git', 'diff', '--cached', '--name-only', '--diff-filter=ACM', '-z']
).decode('utf-8').split('\0')
errors = []
for name in filter(None, names):
    data = subprocess.check_output(['git', 'show', ':' + name])
    if b'\0' in data:
        continue
    for number, line in enumerate(data.decode('utf-8', errors='replace').splitlines(), 1):
        for label, pattern in patterns.items():
            if pattern.search(line):
                errors.append(f'{name}:{number}: {label}')
print('\n'.join(errors) if errors else 'Staged secret scan: PASS')
sys.exit(bool(errors))
