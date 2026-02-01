#!/bin/bash
# Video Enhancement Pipeline - Environment Setup for macOS/Linux
# Downloads and extracts RIFE and Real-ESRGAN Vulkan binaries

set -e

BIN_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/bin"
TEMP_DOWNLOAD="${TMPDIR:-/tmp}/video_enhancement_setup"

echo ""
echo "======================================"
echo "Video Enhancement Setup (Unix/Linux)"
echo "======================================"
echo ""

# Check if bin directory exists
if [ ! -d "$BIN_DIR" ]; then
    echo "[*] Creating bin directory..."
    mkdir -p "$BIN_DIR"
fi

# Check for required tools
echo "[*] Checking prerequisites..."

if ! command -v curl &> /dev/null; then
    echo "[!] curl not found. Please install curl."
    exit 1
fi

if ! command -v tar &> /dev/null; then
    echo "[!] tar not found. Please install tar."
    exit 1
fi

echo "[+] Prerequisites OK"

# Create temporary directory
mkdir -p "$TEMP_DOWNLOAD"

# Detect OS
OS=$(uname -s)
if [ "$OS" == "Darwin" ]; then
    RIFE_ARCH="macos"
    ESRGAN_ARCH="macos"
    EXE_EXT=""
    echo "[*] Detected macOS"
elif [ "$OS" == "Linux" ]; then
    RIFE_ARCH="linux"
    ESRGAN_ARCH="linux"
    EXE_EXT=""
    echo "[*] Detected Linux"
else
    echo "[!] Unsupported OS: $OS"
    exit 1
fi

# Download RIFE
echo ""
echo "[*] Downloading RIFE-ncnn-vulkan..."
RIFE_URL="https://github.com/nihui/rife-ncnn-vulkan/releases/download/v0.0.1/rife-ncnn-vulkan-20230303-${RIFE_ARCH}.zip"
RIFE_ZIP="$TEMP_DOWNLOAD/rife.zip"

if [ ! -f "$RIFE_ZIP" ]; then
    if curl -L --progress-bar "$RIFE_URL" -o "$RIFE_ZIP"; then
        echo "[+] RIFE downloaded"
    else
        echo "[!] Failed to download RIFE"
        exit 1
    fi
else
    echo "[*] RIFE already downloaded"
fi

# Extract RIFE
echo "[*] Extracting RIFE..."
if [ ! -d "$BIN_DIR/rife-ncnn-vulkan" ]; then
    unzip -q "$RIFE_ZIP" -d "$BIN_DIR"
    chmod +x "$BIN_DIR/rife-ncnn-vulkan/rife-ncnn-vulkan"
    echo "[+] RIFE extracted"
else
    echo "[*] RIFE already extracted, skipping..."
fi

# Download Real-ESRGAN
echo ""
echo "[*] Downloading Real-ESRGAN-ncnn-vulkan..."
ESRGAN_URL="https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.5.4/realesrgan-ncnn-vulkan-20220424-${ESRGAN_ARCH}.zip"
ESRGAN_ZIP="$TEMP_DOWNLOAD/esrgan.zip"

if [ ! -f "$ESRGAN_ZIP" ]; then
    if curl -L --progress-bar "$ESRGAN_URL" -o "$ESRGAN_ZIP"; then
        echo "[+] Real-ESRGAN downloaded"
    else
        echo "[!] Failed to download Real-ESRGAN"
        exit 1
    fi
else
    echo "[*] Real-ESRGAN already downloaded"
fi

# Extract Real-ESRGAN
echo "[*] Extracting Real-ESRGAN..."
if [ ! -d "$BIN_DIR/realesrgan-ncnn-vulkan" ]; then
    unzip -q "$ESRGAN_ZIP" -d "$BIN_DIR"
    chmod +x "$BIN_DIR/realesrgan-ncnn-vulkan/realesrgan-ncnn-vulkan"
    echo "[+] Real-ESRGAN extracted"
else
    echo "[*] Real-ESRGAN already extracted, skipping..."
fi

# Verify installations
echo ""
echo "[*] Verifying installations..."

if [ -f "$BIN_DIR/rife-ncnn-vulkan/rife-ncnn-vulkan" ]; then
    echo "[+] RIFE executable found"
else
    echo "[!] RIFE executable not found"
    exit 1
fi

if [ -f "$BIN_DIR/realesrgan-ncnn-vulkan/realesrgan-ncnn-vulkan" ]; then
    echo "[+] Real-ESRGAN executable found"
else
    echo "[!] Real-ESRGAN executable not found"
    exit 1
fi

# Check FFmpeg
if command -v ffmpeg &> /dev/null; then
    echo "[+] FFmpeg found"
else
    echo "[!] FFmpeg not installed. Install via:"
    if [ "$OS" == "Darwin" ]; then
        echo "    brew install ffmpeg"
    else
        echo "    sudo apt-get install ffmpeg"
    fi
fi

echo ""
echo "======================================"
echo "Setup completed successfully!"
echo "======================================"
echo ""
echo "Next steps:"
echo "  1. Ensure FFmpeg is installed"
echo "  2. Run: python3 enhancer.py your_video.mp4"
echo ""

# Cleanup
rm -rf "$TEMP_DOWNLOAD"

exit 0
