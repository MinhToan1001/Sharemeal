"""Scan staged blobs; report locations only, never credential values."""
import re
import subprocess
import sys

patterns = {
    'private key': re.compile(r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----'),
    'service account': re.compile(r'"type"\s*:\s*"service_account"'),
    'Cloudinary URL credentials': re.compile(r'cloudinary://[^\s/:]+:[^\s/@]+@'),
    'secret literal': re.compile(
        r'''(?i)(?:api[_ -]?secret|client[_ -]?secret|refresh[_ -]?token|private[_ -]?key|smtp[_ -]?password)\s*["']?\s*[:=]\s*["']([A-Za-z0-9_+/=.-]{20,})["']'''),
    'GitHub token': re.compile(r'\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,})\b'),
    'Google OAuth token': re.compile(r'\bya29\.[A-Za-z0-9_.-]{25,}'),
    'JWT': re.compile(r'\beyJ[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}\b'),
    'AWS access key': re.compile(r'\b(?:AKIA|ASIA)[A-Z0-9]{16}\b'),
    'Slack token': re.compile(r'\bxox[baprs]-[A-Za-z0-9-]{20,}\b'),
}
command = (['git', 'ls-files', '--cached', '-z'] if '--all' in sys.argv else
           ['git', 'diff', '--cached', '--name-only', '--diff-filter=ACM', '-z'])
names = subprocess.check_output(command).decode('utf-8').split('\0')
errors = []
with subprocess.Popen(['git', 'cat-file', '--batch'], stdin=subprocess.PIPE,
                      stdout=subprocess.PIPE) as objects:
    for name in filter(None, names):
        objects.stdin.write((':' + name + '\n').encode('utf-8'))
        objects.stdin.flush()
        header = objects.stdout.readline().split()
        if len(header) != 3 or header[1] != b'blob':
            errors.append(f'{name}: cannot inspect staged blob')
            continue
        data = objects.stdout.read(int(header[2]))
        objects.stdout.read(1)
        if b'\0' in data:
            continue
        for number, line in enumerate(data.decode('utf-8', errors='replace').splitlines(), 1):
            for label, pattern in patterns.items():
                if pattern.search(line):
                    errors.append(f'{name}:{number}: {label}')
    objects.stdin.close()
    objects.wait()
print('\n'.join(errors) if errors else 'Staged secret scan: PASS')
sys.exit(bool(errors))
