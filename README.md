# 🐯 Jollybaby 尾巴书乐园

给宝宝的 Jollybaby 布书（尾巴系列）中英文早教小网页 App。

- 🏠 统一入口：5 本尾巴书（丛林 / 海洋 / 农场 / 恐龙 / 冰川），按中文 / English 切换
- ▶️ 一键播放：每本书有中文讲解 + 英文朗读音频，可循环
- 📖 朗读模式：全屏大字逐页图文（中英对照），家长抱着书照着读

纯静态网页，无框架、无后端，双击 `index.html` 就能用，也能一键部署到网上。

## 目录结构

```
jollybaby-app/
├── index.html           # 主页面
├── css/style.css        # 样式（移动优先）
├── js/
│   ├── data.js          # ★ 书籍数据：文案、音频路径、视频链接（要改内容改这里）
│   ├── app.js           # 列表 / 筛选 / 播放
│   └── reader.js        # 朗读模式翻页
├── audio/               # mp3 音频（每本中英文各一个）
└── scripts/
    └── fetch_audio.sh   # 自动下载音频
```

## 🔊 音频怎么来

```bash
# 1. 安装 yt-dlp（仅首次）
pip3 install yt-dlp

# 2. 下载全部音频
#    中文 = Jollybaby 官方 B 站故事音频
#    英文 = B 站完整带读（丛林/农场/恐龙）；海洋/冰川无真人完整朗读，
#          用 AI 语音生成（见下面第 4 步）
bash scripts/fetch_audio.sh

# 3. 也可以只下一本，或只下一种语言
bash scripts/fetch_audio.sh jungle       # 丛林尾巴（中+英）
bash scripts/fetch_audio.sh jungle zh    # 只下中文

# 4. 海洋/冰川的英文完整故事音频（AI 朗读，微软神经语音，可换声音/语速）
pip3 install edge-tts
python3 scripts/gen_audio_tts.py            # 生成全部缺英文音频的书
python3 scripts/gen_audio_tts.py ocean      # 只生成海洋尾巴
```

换视频源：编辑 `scripts/fetch_audio.sh` 里的 `SOURCES` 数组（`书id|语言|URL`）。
某个抓不到：手动下载 mp3 放进 `audio/`，文件名 `<书id>-<zh|en>.mp3` 即可生效。

## 📝 改文案 / 加书

全部在 `js/data.js` 里：

- 改文案：找到对应 `pages`，改 `zh` / `en` 字段
- 加官方视频：在书的 `videos` 数组加 `{ title: "标题", url: "https://www.bilibili.com/video/BVxxxx", desc: "说明" }`
- 加新书：复制一个对象，改 `id`、书名、`emoji`、`pages`、`audio` 路径

## 🚀 部署到网上（任选其一）

### 方式一：Netlify Drop（最简单，不用命令行）

1. 打开 https://app.netlify.com/drop
2. 把整个 `jollybaby-app/` 文件夹拖进去
3. 完成，得到一个公开网址（可改自定义域名）

### 方式二：GitHub Pages

```bash
cd jollybaby-app
git init
git add .
git commit -m "jollybaby tails app"
# 在 GitHub 建一个仓库后：
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

然后到仓库 Settings → Pages → Source 选 `main` 分支，即可访问 `https://<用户名>.github.io/<仓库名>/`。

## 本地预览

```bash
cd jollybaby-app
node scripts/serve.js        # 打开 http://localhost:8756
# 或: npx serve .            # 任意支持 Range 的静态服务器均可
```

> ⚠️ 不要用 `python3 -m http.server`——它不支持 HTTP Range 请求，音频会无法拖动进度条（部署到 Netlify / GitHub Pages 无此问题）。

## 说明

- 逐页文案按官方带读风格整理（短句 + 拟声 + 中英对照），非实体书内页逐字原文；手上有书可对照 `data.js` 自行校准
- 音频仅供家庭自用，请勿再分发
