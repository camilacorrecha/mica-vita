/* ==========================================================
   Mica Vita — Carrito
   Guarda los productos en el navegador, actualiza el contador
   y muestra el panel lateral para ver, editar y eliminar
   productos antes de ir a pagar.
   ========================================================== */
(function () {
  "use strict";

  const STORAGE_KEY = "micavita-cart";
  const data = window.MICA_DATA || { menu: [], merch: [] };

  /* ---------- Catálogo: nombre → precio e imagen ---------- */
  const slug = (s) =>
    s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const catalog = {};
  data.menu.forEach((cat) =>
    cat.items.forEach((it) => (catalog[it.name] = { price: it.price, img: `img/menu/${slug(it.name)}.webp`, group: cat.category }))
  );
  data.merch.forEach((it) => (catalog[it.name] = { price: it.price, img: `img/merch/${slug(it.name)}.webp`, group: "Merch" }));

  const formatCOP = (n) => `$${n.toLocaleString("es-CO")} cop`;
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  /* ---------- Almacenamiento ---------- */
  let memory = {};
  function read() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      // Solo productos que existen en el catálogo y cantidades válidas
      const clean = {};
      Object.entries(raw).forEach(([k, v]) => {
        if (catalog[k] && Number.isInteger(v) && v > 0) clean[k] = Math.min(v, 20);
      });
      return clean;
    } catch (e) {
      return { ...memory };
    }
  }
  function write(cart) {
    memory = { ...cart };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      /* sin almacenamiento: queda en memoria mientras la página esté abierta */
    }
    listeners.forEach((fn) => fn());
  }
  const listeners = [];

  const api = {
    items() {
      return Object.entries(read()).map(([name, qty]) => ({
        name,
        qty,
        price: catalog[name].price,
        img: catalog[name].img,
        group: catalog[name].group,
        subtotal: catalog[name].price * qty,
      }));
    },
    count() {
      return Object.values(read()).reduce((a, b) => a + b, 0);
    },
    total() {
      return api.items().reduce((a, it) => a + it.subtotal, 0);
    },
    add(name) {
      if (!catalog[name]) return;
      const cart = read();
      cart[name] = Math.min((cart[name] || 0) + 1, 20);
      write(cart);
    },
    setQty(name, qty) {
      const cart = read();
      if (qty <= 0) delete cart[name];
      else cart[name] = Math.min(qty, 20);
      write(cart);
    },
    remove(name) {
      api.setQty(name, 0);
    },
    clear() {
      write({});
    },
    onChange(fn) {
      listeners.push(fn);
    },
    formatCOP,
    esc,
  };
  window.MicaCart = api;

  // Cambios hechos en otra pestaña
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) listeners.forEach((fn) => fn());
  });

  /* ---------- Contador del encabezado ---------- */
  const cartBtn = document.querySelector(".cart-btn");
  const cartCount = document.querySelector(".cart-count");
  function renderBadge() {
    const n = api.count();
    if (cartCount) {
      cartCount.textContent = n;
      cartCount.hidden = n === 0;
    }
    if (cartBtn) {
      cartBtn.setAttribute("aria-label", `Ver carrito, ${n} ${n === 1 ? "producto" : "productos"}`);
      cartBtn.setAttribute("aria-haspopup", "dialog");
      cartBtn.setAttribute("aria-controls", "cart-drawer");
    }
  }

  /* ---------- Panel lateral ---------- */
  const isCheckout = document.body.dataset.page === "pago";
  const closeIcon =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  const trashIcon =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/></svg>';

  const overlay = document.createElement("div");
  overlay.className = "cart-overlay";
  overlay.hidden = true;
  const drawer = document.createElement("aside");
  drawer.className = "cart-drawer";
  drawer.id = "cart-drawer";
  drawer.setAttribute("role", "dialog");
  drawer.setAttribute("aria-modal", "true");
  drawer.setAttribute("aria-labelledby", "cart-title");
  drawer.hidden = true;
  drawer.innerHTML = `
    <header class="cart-head">
      <h2 class="cart-title" id="cart-title">Tu pedido</h2>
      <button class="cart-close" type="button" aria-label="Cerrar carrito">${closeIcon}</button>
    </header>
    <div class="cart-body"></div>
    <footer class="cart-foot"></footer>`;
  document.body.append(overlay, drawer);

  const body = drawer.querySelector(".cart-body");
  const foot = drawer.querySelector(".cart-foot");

  function lineHTML(it) {
    return `
      <li class="cart-line">
        <img class="cart-thumb" src="${esc(it.img)}" alt="" width="64" height="64">
        <div class="cart-line-info">
          <p class="cart-line-name">${esc(it.name)}</p>
          <p class="cart-line-unit">${formatCOP(it.price)} c/u</p>
          <div class="qty" role="group" aria-label="Cantidad de ${esc(it.name)}">
            <button type="button" class="qty-btn" data-qty="-1" data-name="${esc(it.name)}" aria-label="Quitar uno">−</button>
            <span class="qty-value" aria-live="polite">${it.qty}</span>
            <button type="button" class="qty-btn" data-qty="1" data-name="${esc(it.name)}" aria-label="Agregar uno"${it.qty >= 20 ? " disabled" : ""}>+</button>
          </div>
        </div>
        <div class="cart-line-side">
          <p class="cart-line-total">${formatCOP(it.subtotal)}</p>
          <button type="button" class="cart-remove" data-remove="${esc(it.name)}" aria-label="Eliminar ${esc(it.name)} del carrito">${trashIcon}</button>
        </div>
      </li>`;
  }

  function renderDrawer() {
    const items = api.items();
    if (!items.length) {
      body.innerHTML = `
        <div class="cart-empty">
          <p class="cart-empty-title">Tu carrito está vacío</p>
          <p>Agrega tus favoritos desde la carta y aparecerán aquí.</p>
        </div>`;
      foot.innerHTML = `<a class="btn" href="menu.html">Ver la carta</a>`;
      return;
    }
    body.innerHTML = `<ul class="cart-list">${items.map(lineHTML).join("")}</ul>`;
    foot.innerHTML = `
      <div class="cart-sum"><span>Subtotal</span><strong>${formatCOP(api.total())}</strong></div>
      <p class="cart-note">Recoges tu pedido en Blume Estudio, zona de Colina.</p>
      ${isCheckout ? "" : '<a class="btn cart-pay" href="pago.html">Ir a pagar</a>'}
      <button type="button" class="cart-keep">Seguir comprando</button>`;
  }

  let lastFocus = null;
  function open() {
    renderDrawer();
    lastFocus = document.activeElement;
    overlay.hidden = false;
    drawer.hidden = false;
    document.documentElement.classList.add("cart-open");
    requestAnimationFrame(() => {
      overlay.classList.add("is-open");
      drawer.classList.add("is-open");
      drawer.querySelector(".cart-close").focus();
    });
  }
  function close() {
    overlay.classList.remove("is-open");
    drawer.classList.remove("is-open");
    document.documentElement.classList.remove("cart-open");
    setTimeout(() => {
      overlay.hidden = true;
      drawer.hidden = true;
    }, 250);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  api.open = open;

  drawer.addEventListener("click", (e) => {
    const q = e.target.closest("[data-qty]");
    const r = e.target.closest("[data-remove]");
    if (e.target.closest(".cart-close") || e.target.closest(".cart-keep")) return close();
    if (q) {
      const name = q.dataset.name;
      const current = read()[name] || 0;
      api.setQty(name, current + Number(q.dataset.qty));
    }
    if (r) {
      api.remove(r.dataset.remove);
      if (window.Mica) window.Mica.toast(`${r.dataset.remove} eliminado del carrito`);
    }
  });
  overlay.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (drawer.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "Tab") {
      const f = [...drawer.querySelectorAll("button:not([disabled]), a[href]")];
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  if (cartBtn) cartBtn.addEventListener("click", open);

  /* ---------- Botones "+" de las tarjetas ---------- */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add]");
    if (!btn) return;
    const name = btn.dataset.add;
    api.add(name);
    if (cartBtn) {
      cartBtn.classList.remove("is-bumped");
      void cartBtn.offsetWidth;
      cartBtn.classList.add("is-bumped");
    }
    if (window.Mica) window.Mica.toast(`${name} agregado al carrito`, { label: "Ver carrito", onClick: open });
  });

  api.onChange(() => {
    renderBadge();
    if (!drawer.hidden) renderDrawer();
  });
  renderBadge();
})();
