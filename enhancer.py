#!/usr/bin/env python3
"""
High-Performance Video Enhancement Pipeline
Uses RIFE (frame interpolation) and Real-ESRGAN (upscaling) with Vulkan acceleration.
"""

import argparse
import sys
import os
import subprocess
import shutil
from pathlib import Path
from tqdm import tqdm
import json
import tempfile

class VideoEnhancer:
    def __init__(self, bin_dir="./bin"):
        self.bin_dir = Path(bin_dir)
        self.rife_exe = self.bin_dir / "rife-ncnn-vulkan" / "rife-ncnn-vulkan.exe"
        self.esrgan_exe = self.bin_dir / "realesrgan-ncnn-vulkan" / "realesrgan-ncnn-vulkan.exe"
        self.ffmpeg_exe = shutil.which("ffmpeg")
        
    def check_dependencies(self) -> bool:
        """Verify all required executables are available."""
        print("🔍 Checking dependencies...")
        
        missing = []
        
        if not self.rife_exe.exists():
            missing.append(f"RIFE executable not found: {self.rife_exe}")
        else:
            print(f"  ✓ RIFE: {self.rife_exe}")
            
        if not self.esrgan_exe.exists():
            missing.append(f"Real-ESRGAN executable not found: {self.esrgan_exe}")
        else:
            print(f"  ✓ Real-ESRGAN: {self.esrgan_exe}")
            
        if not self.ffmpeg_exe:
            missing.append("FFmpeg not found. Install via: winget install ffmpeg (or brew/apt)")
        else:
            print(f"  ✓ FFmpeg: {self.ffmpeg_exe}")
        
        if missing:
            print("\n❌ Missing dependencies:")
            for msg in missing:
                print(f"   {msg}")
            print("\n💡 Run 'setup_env.bat' to download binaries automatically.")
            return False
        
        print("✅ All dependencies found!\n")
        return True
    
    def extract_frames(self, video_path: str, fps: int = 30) -> str:
        """Extract video frames to temporary directory."""
        temp_dir = Path(tempfile.gettempdir()) / "video_enhancement"
        frames_dir = temp_dir / "frames_extracted"
        frames_dir.mkdir(parents=True, exist_ok=True)
        
        print(f"📹 Extracting frames from: {video_path}")
        output_pattern = str(frames_dir / "%06d.png")
        
        cmd = [
            self.ffmpeg_exe,
            "-i", video_path,
            "-r", str(fps),
            "-q:v", "2",
            output_pattern
        ]
        
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True
        )
        
        if result.returncode != 0:
            print(f"❌ Frame extraction failed: {result.stderr}")
            sys.exit(1)
        
        frame_count = len(list(frames_dir.glob("*.png")))
        print(f"✅ Extracted {frame_count} frames\n")
        return str(frames_dir)
    
    def interpolate_frames(self, frames_dir: str, target_fps: int = 60) -> str:
        """Interpolate frames using RIFE to achieve target FPS."""
        interpolated_dir = Path(frames_dir).parent / "frames_interpolated"
        interpolated_dir.mkdir(parents=True, exist_ok=True)
        
        print(f"🎬 Interpolating frames to {target_fps}fps with RIFE...")
        
        cmd = [
            str(self.rife_exe),
            "-i", frames_dir,
            "-o", str(interpolated_dir),
            "-m", "models-ensemble"
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode != 0:
            print(f"❌ Frame interpolation failed: {result.stderr}")
            sys.exit(1)
        
        frame_count = len(list(interpolated_dir.glob("*.png")))
        print(f"✅ Interpolated to {frame_count} frames\n")
        return str(interpolated_dir)
    
    def upscale_frames(self, frames_dir: str, scale: int = 4) -> str:
        """Upscale frames using Real-ESRGAN to 4K."""
        upscaled_dir = Path(frames_dir).parent / "frames_upscaled"
        upscaled_dir.mkdir(parents=True, exist_ok=True)
        
        print(f"🎨 Upscaling frames {scale}x with Real-ESRGAN...")
        
        cmd = [
            str(self.esrgan_exe),
            "-i", frames_dir,
            "-o", str(upscaled_dir),
            "-s", str(scale),
            "-m", "realesrgan-x4plus-anime",
            "-n", "4"
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode != 0:
            print(f"❌ Upscaling failed: {result.stderr}")
            sys.exit(1)
        
        frame_count = len(list(upscaled_dir.glob("*.png")))
        print(f"✅ Upscaled {frame_count} frames\n")
        return str(upscaled_dir)
    
    def encode_video(self, frames_dir: str, output_path: str, fps: int = 60, crf: int = 18) -> None:
        """Encode frames back into video with H.264."""
        print(f"🎥 Encoding video to: {output_path}")
        print(f"   FPS: {fps}, Quality: {crf} (lower = better)")
        
        input_pattern = str(Path(frames_dir) / "%06d.png")
        
        cmd = [
            self.ffmpeg_exe,
            "-framerate", str(fps),
            "-i", input_pattern,
            "-c:v", "libx264",
            "-preset", "slow",
            "-crf", str(crf),
            "-pix_fmt", "yuv420p",
            output_path,
            "-y"
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode != 0:
            print(f"❌ Encoding failed: {result.stderr}")
            sys.exit(1)
        
        file_size_mb = Path(output_path).stat().st_size / (1024 * 1024)
        print(f"✅ Video encoded successfully ({file_size_mb:.2f} MB)\n")
    
    def run_pipeline(self, input_file: str, output_file: str = None, 
                     skip_interpolation: bool = False, skip_upscale: bool = False) -> None:
        """Run the complete enhancement pipeline."""
        
        if not Path(input_file).exists():
            print(f"❌ Input file not found: {input_file}")
            sys.exit(1)
        
        if not self.check_dependencies():
            sys.exit(1)
        
        if output_file is None:
            stem = Path(input_file).stem
            output_file = f"{stem}_enhanced.mp4"
        
        print(f"🚀 Starting Video Enhancement Pipeline")
        print(f"   Input:  {input_file}")
        print(f"   Output: {output_file}\n")
        
        try:
            # Step 1: Extract frames
            frames_dir = self.extract_frames(input_file, fps=30)
            
            # Step 2: Interpolate (optional)
            if not skip_interpolation:
                frames_dir = self.interpolate_frames(frames_dir, target_fps=60)
            
            # Step 3: Upscale (optional)
            if not skip_upscale:
                frames_dir = self.upscale_frames(frames_dir, scale=4)
            
            # Step 4: Encode
            fps = 60 if not skip_interpolation else 30
            self.encode_video(frames_dir, output_file, fps=fps)
            
            print("🎉 Pipeline completed successfully!")
            
        except KeyboardInterrupt:
            print("\n⚠️  Pipeline interrupted by user")
            sys.exit(1)
        except Exception as e:
            print(f"\n❌ Pipeline error: {e}")
            sys.exit(1)


def main():
    parser = argparse.ArgumentParser(
        description="High-Performance Video Enhancement with RIFE + Real-ESRGAN",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python enhancer.py video.mp4
  python enhancer.py video.mp4 -o enhanced.mp4
  python enhancer.py video.mp4 --skip-upscale
  python enhancer.py video.mp4 --bin-dir /custom/bin/path
        """
    )
    
    parser.add_argument(
        "input",
        help="Input video file path"
    )
    
    parser.add_argument(
        "-o", "--output",
        default=None,
        help="Output video file path (default: {input}_enhanced.mp4)"
    )
    
    parser.add_argument(
        "--skip-interpolation",
        action="store_true",
        help="Skip frame interpolation (60fps enhancement)"
    )
    
    parser.add_argument(
        "--skip-upscale",
        action="store_true",
        help="Skip upscaling (4K enhancement)"
    )
    
    parser.add_argument(
        "--bin-dir",
        default="./bin",
        help="Path to bin directory containing NCNN executables (default: ./bin)"
    )
    
    args = parser.parse_args()
    
    enhancer = VideoEnhancer(bin_dir=args.bin_dir)
    enhancer.run_pipeline(
        input_file=args.input,
        output_file=args.output,
        skip_interpolation=args.skip_interpolation,
        skip_upscale=args.skip_upscale
    )


if __name__ == "__main__":
    main()
