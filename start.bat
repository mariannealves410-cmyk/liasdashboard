@echo off
echo ================================================
echo   LIAS 2026 - Gerando Dashboard...
echo ================================================
powershell -ExecutionPolicy Bypass -File "%~dp0build.ps1"
echo.
echo Abrindo dashboard no navegador...
start "" "%~dp0dashboard.html"
echo Pronto! O dashboard foi aberto no navegador.
pause
