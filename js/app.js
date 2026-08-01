/* ============================================================
 * app.js - 首页列表 / 语言筛选 / 详情页音频播放
 * ============================================================ */
(function () {
  "use strict";

  /* ---------- 全局状态 ---------- */
  let currentLang = "zh";          // 首页语言 Tab
  let playerLang = "zh";           // 详情页播放语言
  let currentBook = null;
  let scrubbing = false;           // 是否正在拖动进度条
  let subTimeline = null;          // 英文逐页时间轴 [{start,end},...]
  let subIndex = -1;               // 当前字幕页
  const SPEEDS = [0.75, 1, 1.25];

  const $ = (sel) => document.querySelector(sel);

  const views = {
    home: $("#view-home"),
    detail: $("#view-detail"),
    reader: $("#view-reader")
  };

  const audio = $("#audio");
  const progress = $("#progress-bar");
  const subBox = $("#subtitle-box");
  const subText = $("#subtitle-content");
  const subHint = $("#subtitle-hint");

  /* ---------- 工具 ---------- */
  function showView(name) {
    Object.entries(views).forEach(([key, el]) => {
      el.classList.toggle("hidden", key !== name);
    });
    window.scrollTo(0, 0);
  }

  function bookById(id) {
    return BOOKS.find((b) => b.id === id);
  }

  function coverHtml(src, alt) {
    return `<img class="book-cover" src="${src}" alt="${alt}" loading="lazy" onerror="this.style.display='none'">`;
  }

  /* ---------- 首页 ---------- */
  function renderHome() {
    const grid = $("#book-grid");
    grid.innerHTML = BOOKS.map((b) => {
      const nameZh = currentLang === "zh" ? b.zh : b.en;
      const nameEn = currentLang === "zh" ? b.en : b.zh;
      return `
        <button class="book-card" data-id="${b.id}">
          <span class="card-badge">${b.pages.length} 页</span>
          ${coverHtml(b.cover, b.zh)}
          <span class="book-name-zh">${nameZh}</span>
          <span class="book-name-en">${nameEn}</span>
        </button>`;
    }).join("");

    grid.querySelectorAll(".book-card").forEach((card) => {
      card.addEventListener("click", () => openBook(card.dataset.id));
    });
  }

  /* 语言 Tab：切换后刷新卡片文案 */
  document.querySelectorAll("#lang-tabs .tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      currentLang = tab.dataset.lang;
      document.querySelectorAll("#lang-tabs .tab").forEach((t) => t.classList.toggle("active", t === tab));
      renderHome();
    });
  });

  /* ---------- 详情页 ---------- */
  function openBook(id) {
    currentBook = bookById(id);
    if (!currentBook) return;

    $("#detail-emoji").innerHTML = coverHtml(currentBook.cover, currentBook.zh);
    $("#detail-zh").textContent = currentBook.zh;
    $("#detail-en").textContent = currentBook.en;
    $("#player-cover").innerHTML = coverHtml(currentBook.cover, currentBook.zh);

    // 语言切换按钮状态
    document.querySelectorAll("#player-lang-switch button").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === playerLang);
    });

    setAudioSource();
    renderVideos();
    showView("detail");
  }

  function setAudioSource() {
    const src = currentBook.audio[playerLang];
    audio.src = src;
    audio.loop = $("#loop-toggle").checked;
    $("#player-meta").textContent =
      (playerLang === "zh" ? "中文讲解" : "English Story") + " · " + currentBook.zh;

    loadSubs();
    hideSubtitle();

    // 检查音频是否存在；缺失时给提示但不阻断
    $("#missing-tip")?.remove();
    fetch(src, { method: "HEAD" }).then((res) => {
      if (!res.ok) {
        const tip = document.createElement("div");
        tip.id = "missing-tip";
        tip.className = "missing-tip";
        tip.innerHTML = `⚠️ 还没找到这段音频（${src}）。<br>运行 <code>scripts/fetch_audio.sh</code> 自动下载，<br>或把 mp3 文件放到 audio/ 目录下。`;
        $("#player-meta").after(tip);
      }
    }).catch(() => { /* 本地 file:// 打开时 HEAD 可能被拒，静默 */ });

    stopPlayback();
  }

  /* ---------- 播放字幕（歌词式） ---------- */
  function loadSubs() {
    subTimeline = null;
    subIndex = -1;
    if (playerLang !== "en") return;
    fetch(`subs/${currentBook.id}-en.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { subTimeline = data && data.pages ? data.pages : null; })
      .catch(() => { subTimeline = null; });
  }

  /* 当前播放时间对应的字幕页索引 */
  function currentSubIndex() {
    if (!audio.duration || !currentBook) return 0;
    const t = audio.currentTime;
    const n = currentBook.pages.length;

    // 英文：优先用生成时的精确时间轴；也可用 data.js 的 pageStarts 校准
    if (playerLang === "en") {
      const timeline = subTimeline || (currentBook.pageStarts && currentBook.pageStarts.map((s, i) => ({ start: s, end: currentBook.pageStarts[i + 1] })));
      if (timeline && timeline.length === n) {
        for (let i = 0; i < n; i++) {
          const end = timeline[i].end != null ? timeline[i].end : (timeline[i + 1] ? timeline[i + 1].start : Infinity);
          if (t >= timeline[i].start && t < end) return i;
        }
        return n - 1;
      }
    }
    // 中文（官方音频无逐页时间轴）：按页均分；可用 pageStarts 精确校准
    if (currentBook.pageStarts && currentBook.pageStarts.length === n) {
      for (let i = n - 1; i >= 0; i--) {
        if (t >= currentBook.pageStarts[i]) return i;
      }
      return 0;
    }
    return Math.min(n - 1, Math.max(0, Math.floor((t / audio.duration) * n)));
  }

  function renderSubtitle() {
    const idx = currentSubIndex();
    if (idx === subIndex || !currentBook) return;
    subIndex = idx;
    const page = currentBook.pages[idx];
    subText.textContent = playerLang === "zh" ? page.zh : page.en;
    subHint.textContent = `第 ${idx + 1} / ${currentBook.pages.length} 页`;
    startSubtitleScroll();
  }

  /* 内容超出字幕框时缓慢上滚 */
  function startSubtitleScroll() {
    subText.classList.remove("scrolling");
    subText.style.animation = "none";
    void subText.offsetWidth; // 强制 reflow 以重启动画
    const overflow = subText.scrollHeight - subBox.clientHeight;
    if (overflow > 4) {
      subText.style.setProperty("--scroll-distance", `-${overflow}px`);
      subText.style.setProperty("--scroll-duration", `${Math.max(3, overflow / 24)}s`);
      subText.classList.add("scrolling");
    }
  }

  function showSubtitle() {
    $("#player-cover").classList.add("hidden");
    subBox.classList.add("active");
    renderSubtitle();
  }

  function hideSubtitle() {
    $("#player-cover").classList.remove("hidden");
    subBox.classList.remove("active");
    subIndex = -1;
  }

  function stopPlayback() {
    audio.pause();
    $("#btn-play").classList.remove("playing");
    $("#btn-play").textContent = "▶";
    progress.value = 0;
    progress.style.setProperty("--progress", "0%");
  }

  /* ---------- 播放 / 暂停 ---------- */
  $("#btn-play").addEventListener("click", () => {
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => {
    $("#btn-play").classList.add("playing");
    showSubtitle();
  });
  audio.addEventListener("pause", () => {
    $("#btn-play").classList.remove("playing");
    $("#btn-play").textContent = "▶";
  });
  audio.addEventListener("ended", () => {
    $("#btn-play").classList.remove("playing");
    $("#btn-play").textContent = "▶";
  });

  /* ---------- 进度条（可拖动 seek） ---------- */
  /* 切换音频源后（换语言/换书）元数据重新加载，进度条归零，
     并复位 scrubbing，避免拖动状态残留导致进度条冻结 */
  audio.addEventListener("loadedmetadata", () => {
    scrubbing = false;
    progress.value = 0;
    progress.style.setProperty("--progress", "0%");
  });

  audio.addEventListener("timeupdate", () => {
    if (!scrubbing && audio.duration) {
      progress.value = Math.round((audio.currentTime / audio.duration) * 1000);
      progress.style.setProperty("--progress", (progress.value / 10) + "%");
      renderSubtitle();
    }
  });

  progress.addEventListener("input", () => {
    scrubbing = true;
    progress.style.setProperty("--progress", (progress.value / 10) + "%");
  });
  progress.addEventListener("change", () => {
    if (audio.duration) {
      audio.currentTime = (progress.value / 1000) * audio.duration;
    }
    scrubbing = false;
    renderSubtitle();
  });

  /* ---------- 快进 / 快退 15 秒 ---------- */
  $("#btn-rewind").addEventListener("click", () => {
    if (audio.duration) audio.currentTime = Math.max(0, audio.currentTime - 15);
  });
  $("#btn-forward").addEventListener("click", () => {
    if (audio.duration) audio.currentTime = Math.min(audio.duration, audio.currentTime + 15);
  });

  /* ---------- 播放速度（0.75 / 1 / 1.25，记忆选择） ---------- */
  let speedIdx = SPEEDS.indexOf(parseFloat(localStorage.getItem("jbSpeed") || "1"));
  if (speedIdx < 0) speedIdx = 1;
  audio.playbackRate = SPEEDS[speedIdx];
  $("#btn-speed").textContent = SPEEDS[speedIdx] + "×";

  $("#btn-speed").addEventListener("click", () => {
    speedIdx = (speedIdx + 1) % SPEEDS.length;
    audio.playbackRate = SPEEDS[speedIdx];
    $("#btn-speed").textContent = SPEEDS[speedIdx] + "×";
    localStorage.setItem("jbSpeed", SPEEDS[speedIdx]);
  });

  /* ---------- 循环 ---------- */
  $("#loop-toggle").addEventListener("change", () => {
    audio.loop = $("#loop-toggle").checked;
  });

  /* 详情页语言切换 */
  document.querySelectorAll("#player-lang-switch button").forEach((btn) => {
    btn.addEventListener("click", () => {
      playerLang = btn.dataset.lang;
      document.querySelectorAll("#player-lang-switch button").forEach((b) => {
        b.classList.toggle("active", b === btn);
      });
      setAudioSource();
    });
  });

  /* ---------- 视频区（B 站内嵌） ---------- */
  function renderVideos() {
    const section = $("#video-section");
    const list = $("#video-list");
    list.innerHTML = "";

    if (!currentBook.videos || currentBook.videos.length === 0) {
      section.classList.add("hidden");
      return;
    }

    section.classList.remove("hidden");
    currentBook.videos.forEach((v, i) => {
      const item = document.createElement("button");
      item.className = "video-item";
      item.innerHTML = `🎬 ${v.title}<span class="vid-desc">${v.desc || ""}</span>`;
      item.addEventListener("click", () => toggleVideo(v.url, i));
      list.appendChild(item);
    });
  }

  function toggleVideo(url, index) {
    // 已展开则收起
    const existing = document.querySelector(`.bili-wrap[data-idx="${index}"]`);
    if (existing) {
      existing.remove();
      return;
    }

    // 收起其他展开的视频
    document.querySelectorAll(".bili-wrap").forEach((w) => w.remove());

    const bvid = url.match(/BV[0-9A-Za-z]+/)?.[0];
    const ytId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)?.[1];
    const wrap = document.createElement("div");
    wrap.className = "bili-wrap";
    wrap.dataset.idx = index;
    if (bvid) {
      wrap.innerHTML = `<iframe src="https://player.bilibili.com/player.html?bvid=${bvid}&autoplay=0&high_quality=1" scrolling="no" frameborder="no" allowfullscreen="true"></iframe>`;
    } else if (ytId) {
      wrap.innerHTML = `<iframe src="https://www.youtube.com/embed/${ytId}" scrolling="no" frameborder="no" allowfullscreen="true"></iframe>`;
    } else {
      wrap.innerHTML = `<p style="padding:20px;color:#fff">无法内嵌，请<a href="${url}" target="_blank" style="color:#6BBF8A">前往原链接观看</a></p>`;
    }
    $("#video-list").appendChild(wrap);
  }

  /* ---------- 导航 ---------- */
  $("#btn-back").addEventListener("click", () => {
    stopPlayback();
    showView("home");
  });

  $("#btn-read").addEventListener("click", () => {
    if (currentBook && typeof window.JBReader !== "undefined") {
      window.JBReader.open(currentBook);
    }
  });

  /* ---------- 启动 ---------- */
  renderHome();
})();
