$ErrorActionPreference='Stop'
if ($env:FIREBASE_AUTH_EMULATOR_HOST -ne '127.0.0.1:9099' -or $env:FIREBASE_DATABASE_EMULATOR_HOST -ne '127.0.0.1:9000') { throw 'Run through Firebase emulators:exec with demo-sharemeal-b only.' }
$projectRoot=Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$bridge=Start-Process -FilePath (Get-Command node.exe).Source -ArgumentList (Join-Path $PSScriptRoot 'group_b_test_bridge.cjs') -WindowStyle Hidden -RedirectStandardOutput (Join-Path $projectRoot 'tooling/acceptance-bridge.log') -RedirectStandardError (Join-Path $projectRoot 'tooling/acceptance-bridge-error.log') -PassThru
try {
  Set-Location $projectRoot
  $env:GIT_CONFIG_COUNT='1';$env:GIT_CONFIG_KEY_0='safe.directory';$env:GIT_CONFIG_VALUE_0=(Join-Path $projectRoot 'tooling/flutter').Replace('\','/')
  & $env:ComSpec /d /c 'run_flutter.cmd test integration_test/native_acceptance_check.dart --no-pub -d emulator-5554 --reporter expanded > tooling\native-acceptance-check.log 2>&1'
  $result=$LASTEXITCODE
} finally { if(-not $bridge.HasExited){Stop-Process -Id $bridge.Id} }
exit $result
