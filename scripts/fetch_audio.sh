#!/usr/bin/env bash
# ============================================================
# fetch_audio.sh - 下载 Jollybaby 尾巴书官方/精选讲解音频
#
# 用法:
#   bash scripts/fetch_audio.sh              # 下载全部 10 条音频
#   bash scripts/fetch_audio.sh jungle       # 只下丛林尾巴（中文+英文）
#   bash scripts/fetch_audio.sh jungle zh    # 只下丛林尾巴中文
#
# 前置要求: yt-dlp（安装: pip3 install yt-dlp）
# 说明: 中文轨优先用 Jollybaby 官方 B 站故事视频；
#       英文轨用 YouTube 上质量好的朗读视频。
#       若某个视频抓取失败，可在 B 站/YouTube 下载 mp3 后
#       直接放入 audio/ 目录（文件名 <书id>-<zh|en>.mp3）。
# ============================================================

set -euo pipefail
cd "$(dirname "$0")/.."

mkdir -p audio

if ! command -v yt-dlp >/dev/null 2>&1; then
  echo "❌ 未找到 yt-dlp，请先安装:  pip3 install yt-dlp"
  exit 1
fi

# 书 id -> 书名
book_name() {
  case "$1" in
    jungle)   echo "丛林尾巴 Jungle Tails" ;;
    ocean)    echo "海洋尾巴 Ocean Tails" ;;
    farm)     echo "农场尾巴 Farm Tails" ;;
    dinosaur) echo "恐龙尾巴 Dinosaur Tails" ;;
    glacier)  echo "冰川尾巴 Glacier Tails" ;;
  esac
}

# 视频源: 书id|语言|视频URL（B 站 / YouTube 均可）
# 中文轨 = Jollybaby 官方 B 站账号故事视频；
# 英文轨 = B 站完整带读（双语完整带读/全英/精读）
# 想换源：直接改这里的 URL 即可
SOURCES=(
  "jungle|zh|https://www.bilibili.com/video/BV1TaArzWE7v"
  "jungle|en|https://www.bilibili.com/video/BV1EY4y1R7WX"
  "ocean|zh|https://www.bilibili.com/video/BV1wAAnzXEpZ"
  "ocean|en|https://www.youtube.com/watch?v=FZ-Y1G-6bgU"
  "farm|zh|https://www.bilibili.com/video/BV12UPWzrEyJ"
  "farm|en|https://www.bilibili.com/video/BV1YN411n7JU"
  "dinosaur|zh|https://www.bilibili.com/video/BV1VY9WB4Ear"
  "dinosaur|en|https://www.bilibili.com/video/BV1Df4y1E7Wj"
  "glacier|zh|https://www.bilibili.com/video/BV1UjX5BpERn"
  "glacier|en|https://www.youtube.com/watch?v=vj1VTOUvRPn8"
)

download() {
  local book="$1" lang="$2" url="$3"
  local out="audio/${book}-${lang}.mp3"

  if [ -s "$out" ]; then
    echo "✅ $(book_name "$book") (${lang}) 已存在，跳过"
    return
  fi

  echo "🎧 下载 $(book_name "$book") (${lang}) ..."
  yt-dlp -f "ba/b" -x --audio-format mp3 \
    -o "${out}" \
    --no-playlist --no-warnings \
    --extractor-args "youtube:player_client=android" \
    "$url" 2>&1 | tail -3 || true
  if [ -s "$out" ]; then
    echo "   ✅ 完成 → ${out}"
  else
    echo "   ⚠️ 下载失败，请手动放入 ${out}"
  fi
}

filter="${1:-}"
filter2="${2:-}"

for src in "${SOURCES[@]}"; do
  IFS='|' read -r book lang url <<< "$src"
  if [ -n "$filter" ] && [ "$book" != "$filter" ]; then continue; fi
  if [ -n "$filter2" ] && [ "$lang" != "$filter2" ]; then continue; fi
  download "$book" "$lang" "$url"
done

echo "📦 全部完成！audio/ 目录:"
ls -la audio/
