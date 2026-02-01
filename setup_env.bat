@echo off
REM Video Enhancement Pipeline - Environment Setup for Windows
REM Downloads and extracts RIFE and Real-ESRGAN Vulkan binaries

setlocal enabledelayedexpansion
set "BIN_DIR=%CD%\bin"
set "TEMP_DOWNLOAD=%TEMP%\video_enhancement_setup"

echo.
echo ======================================
echo Video Enhancement Setup (Windows)
echo ======================================
echo.

REM Check if bin directory exists
if not exist "!BIN_DIR!" (
    echo [*] Creating bin directory...
    mkdir "!BIN_DIR!"
)

REM Check for required tools
echo [*] Checking prerequisites...

where powershell >nul 2>&1
if errorlevel 1 (
    echo [!] PowerShell not found. Please install PowerShell.
    exit /b 1
)

where tar >nul 2>&1
if errorlevel 1 (
    echo [!] tar not found. Windows 10+ required with tar support.
    exit /b 1
)

echo [+] Prerequisites OK

REM Create temporary directory
if not exist "!TEMP_DOWNLOAD!" (
    mkdir "!TEMP_DOWNLOAD!"
)

REM Download RIFE
echo.
echo [*] Downloading RIFE-ncnn-vulkan...
set "RIFE_URL=https://github.com/nihui/rife-ncnn-vulkan/releases/download/v0.0.1/rife-ncnn-vulkan-20230303-windows.zip"
set "RIFE_ZIP=!TEMP_DOWNLOAD!\rife.zip"

if not exist "!RIFE_ZIP!" (
    powershell -Command "try { Invoke-WebRequest -Uri '!RIFE_URL!' -OutFile '!RIFE_ZIP!' -ErrorAction Stop; Write-Host '[+] RIFE downloaded'; exit 0 } catch { Write-Host '[!] RIFE download failed'; exit 1 }"
    if errorlevel 1 (
        echo [!] Failed to download RIFE
        goto error
    )
) else (
    echo [*] RIFE already downloaded
)

REM Extract RIFE
echo [*] Extracting RIFE...
if exist "!BIN_DIR!\rife-ncnn-vulkan" (
    echo [*] RIFE already extracted, skipping...
) else (
    tar -xf "!RIFE_ZIP!" -C "!BIN_DIR!" 2>nul
    if errorlevel 1 (
        echo [!] Failed to extract RIFE
        goto error
    )
    echo [+] RIFE extracted
)

REM Download Real-ESRGAN
echo.
echo [*] Downloading Real-ESRGAN-ncnn-vulkan...
set "ESRGAN_URL=https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.5.4/realesrgan-ncnn-vulkan-20220424-windows.zip"
set "ESRGAN_ZIP=!TEMP_DOWNLOAD!\esrgan.zip"

if not exist "!ESRGAN_ZIP!" (
    powershell -Command "try { Invoke-WebRequest -Uri '!ESRGAN_URL!' -OutFile '!ESRGAN_ZIP!' -ErrorAction Stop; Write-Host '[+] Real-ESRGAN downloaded'; exit 0 } catch { Write-Host '[!] Real-ESRGAN download failed'; exit 1 }"
    if errorlevel 1 (
        echo [!] Failed to download Real-ESRGAN
        goto error
    )
) else (
    echo [*] Real-ESRGAN already downloaded
)

REM Extract Real-ESRGAN
echo [*] Extracting Real-ESRGAN...
if exist "!BIN_DIR!\realesrgan-ncnn-vulkan" (
    echo [*] Real-ESRGAN already extracted, skipping...
) else (
    tar -xf "!ESRGAN_ZIP!" -C "!BIN_DIR!" 2>nul
    if errorlevel 1 (
        echo [!] Failed to extract Real-ESRGAN
        goto error
    )
    echo [+] Real-ESRGAN extracted
)

REM Verify installations
echo.
echo [*] Verifying installations...
if exist "!BIN_DIR!\rife-ncnn-vulkan\rife-ncnn-vulkan.exe" (
    echo [+] RIFE executable found
) else (
    echo [!] RIFE executable not found
    goto error
)

if exist "!BIN_DIR!\realesrgan-ncnn-vulkan\realesrgan-ncnn-vulkan.exe" (
    echo [+] Real-ESRGAN executable found
) else (
    echo [!] Real-ESRGAN executable not found
    goto error
)

REM Check FFmpeg
where ffmpeg >nul 2>&1
if errorlevel 1 (
    echo [!] FFmpeg not installed. Install via:
    echo     winget install ffmpeg
    echo     OR download from https://ffmpeg.org/download.html
) else (
    echo [+] FFmpeg found
)

echo.
echo ======================================
echo Setup completed successfully!
echo ======================================
echo.
echo Next steps:
echo   1. Ensure FFmpeg is installed (winget install ffmpeg)
echo   2. Run: python enhancer.py your_video.mp4
echo.
echo In VS Code:
echo   - Press Ctrl+Shift+B to run the default task
echo   - Or select "Run AI Enhancer" from the task menu
echo.

REM Cleanup
rmdir /s /q "!TEMP_DOWNLOAD!" 2>nul

endlocal
exit /b 0

:error
echo.
echo [X] Setup failed. Please check the errors above.
rmdir /s /q "!TEMP_DOWNLOAD!" 2>nul
endlocal
exit /b 1
