@echo off
chcp 65001 >nul
cd /d "%~dp0"
where dotnet >nul 2>nul
if errorlevel 1 (
    echo Can cai .NET 10 SDK truoc khi chay ung dung.
    pause
    exit /b 1
)
echo Mo trinh duyet tai http://localhost:5188 sau khi ung dung khoi dong.
echo Nhan Ctrl+C trong cua so nay de dung ung dung.
dotnet run --project "%~dp0SoThuChi.csproj"
pause
