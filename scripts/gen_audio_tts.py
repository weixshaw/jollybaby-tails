#!/usr/bin/env python3
# ============================================================
# gen_audio_tts.py - 用 edge-tts 把 data.js 里的完整英文故事
# 朗读成音频（用于没有真人完整朗读的海洋/冰川尾巴）
#
# 用法:
#   python3 scripts/gen_audio_tts.py          # 生成全部缺英文音频的书
#   python3 scripts/gen_audio_tts.py ocean    # 只生成海洋尾巴
#
# 说明: 声音为微软神经语音（AI 朗读），非真人；每页之间插入停顿，
#       与朗读模式的逐页文案一一对应。可改 VOICE 换声音。
# ============================================================
import asyncio
import json
import re
import subprocess
import sys
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parent.parent
VOICE = "en-US-JennyNeural"   # 温柔女声；备选: en-GB-SoniaNeural, en-US-AriaNeural
RATE = "-12%"                  # 稍慢，适合宝宝听
PAGE_PAUSE_SEC = 0.9          # 页间停顿


def load_books():
    # data.js 是 JS 对象字面量（属性名无引号），用 node 序列化成 JSON 再读取
    data_js = ROOT / "js" / "data.js"
    code = (
        "const fs=require('fs');"
        f"let src=fs.readFileSync('{data_js}','utf8');"
        "eval(src.replace('const BOOKS','globalThis.BOOKS'));"
        "process.stdout.write(JSON.stringify(globalThis.BOOKS))"
    )
    out = subprocess.run(["node", "-e", code], check=True, capture_output=True, text=True)
    return json.loads(out.stdout)


async def synth(text, out_path: Path):
    tts = edge_tts.Communicate(text, VOICE, rate=RATE)
    await tts.save(str(out_path))


def mp3_duration(path: Path) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", str(path)],
        check=True, capture_output=True, text=True)
    return float(out.stdout.strip())


def make_silence(path: Path):
    if not path.exists():
        subprocess.run(
            ["ffmpeg", "-y", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono",
             "-t", str(PAGE_PAUSE_SEC), "-q:a", "9", str(path)],
            check=True, capture_output=True)


def concat_with_pauses(parts, out: Path):
    silent = ROOT / "audio" / ".tmp-silence.mp3"
    make_silence(silent)
    names = []
    for part in parts:
        names.append(str(part))
        names.append(str(silent))
    list_file = ROOT / "audio" / ".tmp-list.txt"
    list_file.write_text("\n".join(f"file '{Path(n).name}'" for n in names), encoding="utf-8")
    subprocess.run(
        ["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(list_file),
         "-c:a", "libmp3lame", "-q:a", "6", str(out)],
        check=True, capture_output=True)
    list_file.unlink(missing_ok=True)


def main():
    only = sys.argv[1] if len(sys.argv) > 1 else None
    books = load_books()
    for book in books:
        if only and book["id"] != only:
            continue
        out = ROOT / "audio" / f"{book['id']}-en.mp3"
        if out.exists():
            print(f"✅ {book['zh']} (en) 已存在，跳过")
            continue
        parts = []
        try:
            for i, page in enumerate(book["pages"]):
                part = ROOT / "audio" / f".tmp-{book['id']}-p{i+1}.mp3"
                print(f"🎙 合成 {book['zh']} 第 {i+1} 页 ...")
                asyncio.run(synth(page["en"], part))
                parts.append(part)
            concat_with_pauses(parts, out)
            print(f"   ✅ 完成 → {out}")

            # 记录逐页时间轴（页时长 + 页间停顿），供 App 字幕精确对齐
            timeline = []
            cursor = 0.0
            for part in parts:
                dur = mp3_duration(part)
                timeline.append({"start": round(cursor, 2), "end": round(cursor + dur, 2)})
                cursor += dur + PAGE_PAUSE_SEC
            subs_dir = ROOT / "subs"
            subs_dir.mkdir(exist_ok=True)
            sub_file = subs_dir / f"{book['id']}-en.json"
            sub_file.write_text(
                json.dumps({"book": book["id"], "pages": timeline}, ensure_ascii=False, indent=1),
                encoding="utf-8")
            print(f"   📝 时间轴 → {sub_file}")
        finally:
            for part in parts:
                part.unlink(missing_ok=True)
    silent = ROOT / "audio" / ".tmp-silence.mp3"
    silent.unlink(missing_ok=True)
    print("📦 全部完成！")


if __name__ == "__main__":
    main()
