$ErrorActionPreference = 'Stop'
if ($env:FIREBASE_AUTH_EMULATOR_HOST -ne '127.0.0.1:9099' -or
    $env:FIREBASE_DATABASE_EMULATOR_HOST -ne '127.0.0.1:9000') {
    throw 'Run through Firebase emulators:exec with demo-sharemeal-b only.'
}
$projectRoot = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$logDirectory = Join-Path $projectRoot '.local/logs'
New-Item -ItemType Directory -Path $logDirectory -Force | Out-Null
$bridgeScript = Join-Path $PSScriptRoot 'group_b_test_bridge.cjs'
$device = if ($env:SHAREMEAL_DEVICE) { $env:SHAREMEAL_DEVICE } else { 'emulator-5554' }
$bridge = Start-Process -FilePath (Get-Command node.exe).Source -ArgumentList ('"{0}"' -f $bridgeScript) -WindowStyle Hidden -RedirectStandardOutput (Join-Path $logDirectory 'acceptance-bridge.log') -RedirectStandardError (Join-Path $logDirectory 'acceptance-bridge-error.log') -PassThru
Push-Location $projectRoot
try {
    & (Join-Path $projectRoot 'run_flutter.cmd') test integration_test/native_acceptance_check.dart --no-pub -d $device --reporter expanded
    $result = $LASTEXITCODE
} finally {
    Pop-Location
    if (-not $bridge.HasExited) { Stop-Process -Id $bridge.Id }
}
exit $result
