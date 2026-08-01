/* ============================================================
 * reader.js - 朗读模式：全屏图文、横滑翻页
 *
 * 翻页状态以 targetIndex（目标页）为准，而不是实时 scrollLeft，
 * 避免平滑滚动动画进行中连点按钮时把 Math.round(scrollLeft) 算成
 * 中间值导致跳页。手动滑动后会在滚动停止时校准 targetIndex。
 * ============================================================ */
(function () {
  "use strict";

  const pagesEl = document.getElementById("reader-pages");
  const pageInfo = document.getElementById("reader-page-info");
  const titleEl = document.getElementById("reader-title-text");
  const emojiEl = document.getElementById("reader-emoji");

  let book = null;
  let total = 0;
  let targetIndex = 0;
  let settleTimer = null;
  let langMode = "both";           // both | zh | en

  const langBtn = document.getElementById("btn-lang-mode");
  const LANG_MODES = [
    { key: "both", label: "中英" },
    { key: "zh", label: "中文" },
    { key: "en", label: "英文" }
  ];

  function setLangMode(mode) {
    langMode = mode;
    langBtn.textContent = LANG_MODES.find((m) => m.key === mode).label;
    pagesEl.classList.toggle("lang-zh", mode === "zh");
    pagesEl.classList.toggle("lang-en", mode === "en");
    // 切换后重算当前页显示位置
    pagesEl.scrollLeft = targetIndex * pageWidth();
  }

  langBtn.addEventListener("click", () => {
    const idx = LANG_MODES.findIndex((m) => m.key === langMode);
    setLangMode(LANG_MODES[(idx + 1) % LANG_MODES.length].key);
  });

  function open(b) {
    book = b;
    total = b.pages.length;

    emojiEl.textContent = b.emoji;
    titleEl.textContent = b.zh + " · " + b.en;

    // 渲染页面卡片
    pagesEl.innerHTML = b.pages.map((p, i) => `
      <section class="reader-page">
        <div class="page-animal">${p.icon}</div>
        <div class="page-zh">${p.zh}</div>
        <div class="page-en">${p.en}</div>
        <div class="page-tag">第 ${i + 1} 页 / 共 ${total} 页</div>
      </section>`).join("");

    // 回到第一页
    targetIndex = 0;
    pagesEl.scrollLeft = 0;
    setLangMode("both");
    updateNav();

    // 隐藏首页/详情视图，显示朗读模式
    document.getElementById("view-home").classList.add("hidden");
    document.getElementById("view-detail").classList.add("hidden");
    document.getElementById("view-reader").classList.remove("hidden");
  }

  function pageWidth() {
    return pagesEl.clientWidth || 1;
  }

  function currentFromScroll() {
    return Math.round(pagesEl.scrollLeft / pageWidth());
  }

  function updateNav() {
    pageInfo.textContent = `${book.zh} · 第 ${targetIndex + 1} / ${total} 页`;
    document.getElementById("btn-prev").disabled = targetIndex <= 0;
    document.getElementById("btn-next").disabled = targetIndex >= total - 1;
  }

  function goTo(i) {
    targetIndex = Math.max(0, Math.min(total - 1, i));
    pagesEl.scrollTo({ left: targetIndex * pageWidth(), behavior: "smooth" });
    updateNav();
  }

  /* 滑动过程中只更新页码显示；停止后校准目标页（手动滑动场景） */
  pagesEl.addEventListener("scroll", () => {
    clearTimeout(settleTimer);
    settleTimer = setTimeout(() => {
      targetIndex = currentFromScroll();
      updateNav();
    }, 120);
  });

  /* 支持 scrollend（现代浏览器），停止后立即校准 */
  pagesEl.addEventListener("scrollend", () => {
    clearTimeout(settleTimer);
    targetIndex = currentFromScroll();
    updateNav();
  });

  /* 底部按钮：基于 targetIndex，动画中连点不会跳页 */
  document.getElementById("btn-prev").addEventListener("click", () => goTo(targetIndex - 1));
  document.getElementById("btn-next").addEventListener("click", () => goTo(targetIndex + 1));

  /* 返回 */
  document.getElementById("btn-reader-back").addEventListener("click", () => {
    document.getElementById("view-reader").classList.add("hidden");
    document.getElementById("view-detail").classList.remove("hidden");
  });

  window.JBReader = { open };
})();
