@echo off
setlocal
if not exist "%~dp0tooling\flutter\bin\flutter.bat" (
  echo Khong tim thay Flutter SDK tai tooling\flutter.
  exit /b 1
)
pushd "%~dp0frontend"
call "%~dp0tooling\flutter\bin\flutter.bat" %*
set "taskExitCode=%ERRORLEVEL%"
popd
exit /b %taskExitCode%
