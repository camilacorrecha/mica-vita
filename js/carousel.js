/* ==========================================================
   Mica Vita — Carruseles de productos (Menú y Merch)
   ========================================================== */
(function () {
  "use strict";

  const data = window.MICA_DATA;
  if (!data) return;

  const formatCOP = (n) => `$${n.toLocaleString("es-CO")} cop`;

  const slug = (s) =>
    s
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const arrowIcon =
    '<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7z" fill="currentColor"/></svg>';

  function cardHTML(item, dir) {
    const tags = (item.tags || []).join(" - ");
    return `
      <li class="product-card">
        <div class="media card-media" data-label="${esc(item.name)}">
          <img data-base="${dir}/${slug(item.name)}" alt="${esc(item.name)}" loading="lazy" width="400" height="420">
          ${tags ? `<span class="card-tag" title="${esc(tags)}">${esc(tags)}</span>` : ""}
        </div>
        <div class="card-info">
          <h3 class="card-name">${esc(item.name)}</h3>
          ${item.description ? `<p class="card-desc">${esc(item.description)}</p>` : ""}
          <p class="card-price">${formatCOP(item.price)}</p>
          <button class="add-btn" type="button" data-add="${esc(item.name)}" aria-label="Agregar ${esc(item.name)} al carrito">+</button>
        </div>
      </li>`;
  }

  function carouselHTML(id, title, items, dir) {
    return `
      <section class="carousel" aria-labelledby="${id}-title">
        <div class="rail"><h2 id="${id}-title">${esc(title)}</h2></div>
        <button class="arrow arrow--prev" type="button" aria-label="Anterior en ${esc(title)}" aria-controls="${id}-track">${arrowIcon}</button>
        <ul class="carousel-track" id="${id}-track" tabindex="0" aria-label="${esc(title)}">
          ${items.map((item) => cardHTML(item, dir)).join("")}
        </ul>
        <button class="arrow arrow--next" type="button" aria-label="Siguiente en ${esc(title)}" aria-controls="${id}-track">${arrowIcon}</button>
      </section>`;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initCarousel(el) {
    const track = el.querySelector(".carousel-track");
    const prev = el.querySelector(".arrow--prev");
    const next = el.querySelector(".arrow--next");

    const step = () => {
      const card = track.querySelector("li");
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return card ? card.getBoundingClientRect().width + gap : track.clientWidth;
    };
    const go = (dir) => track.scrollBy({ left: dir * step(), behavior: reduceMotion ? "auto" : "smooth" });

    const update = () => {
      const max = track.scrollWidth - track.clientWidth - 2;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max;
    };

    prev.addEventListener("click", () => go(-1));
    next.addEventListener("click", () => go(1));
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    });
    update();
  }

  document.querySelectorAll("[data-carousel]").forEach((mount) => {
    const key = mount.dataset.carousel;
    if (key === "merch") {
      mount.innerHTML = carouselHTML("merch", "Merch", data.merch, "img/merch");
    } else if (key === "menu") {
      mount.innerHTML = data.menu
        .map((cat) => carouselHTML(slug(cat.category), cat.category, cat.items, "img/menu"))
        .join("");
    }
    mount.querySelectorAll(".carousel").forEach(initCarousel);
    if (window.Mica) window.Mica.handleImages(mount);
  });
})();
