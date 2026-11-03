@echo off
setlocal
set "sharemealFlutter=%~dp0tooling\flutter\bin\flutter.bat"
if exist "%sharemealFlutter%" goto run
set "sharemealFlutter="
for /f "delims=" %%F in ('where flutter.bat 2^>nul') do if not defined sharemealFlutter set "sharemealFlutter=%%F"
if defined sharemealFlutter goto run
echo Khong tim thay Flutter SDK. Hay cai Flutter va them thu muc bin vao PATH.
exit /b 1
:run
pushd "%~dp0frontend"
call "%sharemealFlutter%" %*
set "taskExitCode=%ERRORLEVEL%"
popd
exit /b %taskExitCode%
