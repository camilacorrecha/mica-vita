/* ==========================================================
   Mica Vita — Navegación, imágenes de respaldo, carrito y avisos
   ========================================================== */
(function () {
  "use strict";

  /* ---------- Navegación ---------- */
  const page = document.body.dataset.page;
  document.querySelectorAll(".site-nav a[data-page]").forEach((link) => {
    if (link.dataset.page === page) link.setAttribute("aria-current", "page");
  });

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (toggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    };
    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ---------- Imágenes: usa la foto si existe; si no, la ilustración ----------
     Cada <img data-base="img/menu/mango"> prueba en orden:
     mango.webp → mango.jpg → mango.jpeg → mango.png → mango.svg */
  const EXTS = ["webp", "jpg", "jpeg", "png", "svg"];
  function handleImages(root) {
    (root || document).querySelectorAll(".media > img").forEach((img) => {
      if (img.dataset.ready) return;
      img.dataset.ready = "1";
      const box = img.closest(".media");
      const fail = () => {
        if (box) box.classList.add("is-missing");
        img.remove();
      };
      const base = img.dataset.base;
      if (!base) {
        if (img.complete && img.naturalWidth === 0) fail();
        else img.addEventListener("error", fail, { once: true });
        return;
      }
      let i = 0;
      const next = () => (i < EXTS.length ? (img.src = `${base}.${EXTS[i++]}`) : fail());
      img.addEventListener("error", next);
      img.addEventListener("load", () => {
        if (box && !/\.svg$/i.test(img.currentSrc || img.src)) box.classList.add("is-photo");
      });
      next();
    });
  }
  handleImages(document);

  /* ---------- Aviso (toast) con acción opcional ---------- */
  const toastEl = document.createElement("div");
  toastEl.className = "toast";
  toastEl.setAttribute("role", "status");
  toastEl.setAttribute("aria-live", "polite");
  document.body.appendChild(toastEl);
  let toastTimer;
  function toast(message, action) {
    toastEl.textContent = message;
    toastEl.classList.toggle("has-action", Boolean(action));
    if (action) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "toast-action";
      btn.textContent = action.label;
      btn.addEventListener("click", () => {
        toastEl.classList.remove("is-visible");
        action.onClick();
      });
      toastEl.appendChild(btn);
    }
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), action ? 4200 : 2600);
  }

  window.Mica = { handleImages, toast };
})();
