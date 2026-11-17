/* ==========================================================
   Mica Vita — Página de pago
   Muestra el resumen del pedido, valida los datos y prepara
   el pedido para enviarlo por WhatsApp a la cafetería.
   El pago se hace al recoger (efectivo o tarjeta).
   ========================================================== */
(function () {
  "use strict";

  const cart = window.MicaCart;
  if (!cart) return;

  // WhatsApp que recibe los pedidos (el primero del footer)
  const WHATSAPP = "573174681666";

  const { formatCOP, esc } = cart;
  const summary = document.getElementById("order-summary");
  const form = document.getElementById("checkout-form");
  const done = document.getElementById("checkout-done");
  const layout = document.querySelector(".checkout-layout");
  if (!summary || !form) return;

  const trashIcon =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/></svg>';

  /* ---------- Resumen del pedido ---------- */
  function renderSummary() {
    const items = cart.items();
    const submit = form.querySelector('button[type="submit"]');
    if (!items.length) {
      summary.innerHTML = `
        <div class="cart-empty">
          <p class="cart-empty-title">Tu carrito está vacío</p>
          <p>Elige tus favoritos en la carta para continuar con el pago.</p>
          <a class="btn" href="menu.html">Ver la carta</a>
        </div>`;
      submit.disabled = true;
      return;
    }
    submit.disabled = false;
    summary.innerHTML = `
      <ul class="cart-list">
        ${items
          .map(
            (it) => `
          <li class="cart-line">
            <img class="cart-thumb" src="${esc(it.img)}" alt="" width="64" height="64">
            <div class="cart-line-info">
              <p class="cart-line-name">${esc(it.name)}</p>
              <p class="cart-line-unit">${formatCOP(it.price)} c/u</p>
              <div class="qty" role="group" aria-label="Cantidad de ${esc(it.name)}">
                <button type="button" class="qty-btn" data-qty="-1" data-name="${esc(it.name)}" aria-label="Quitar uno">−</button>
                <span class="qty-value">${it.qty}</span>
                <button type="button" class="qty-btn" data-qty="1" data-name="${esc(it.name)}" aria-label="Agregar uno"${it.qty >= 20 ? " disabled" : ""}>+</button>
              </div>
            </div>
            <div class="cart-line-side">
              <p class="cart-line-total">${formatCOP(it.subtotal)}</p>
              <button type="button" class="cart-remove" data-remove="${esc(it.name)}" aria-label="Eliminar ${esc(it.name)}">${trashIcon}</button>
            </div>
          </li>`
          )
          .join("")}
      </ul>
      <div class="order-totals">
        <div class="cart-sum"><span>Subtotal</span><span>${formatCOP(cart.total())}</span></div>
        <div class="cart-sum cart-sum--total"><span>Total a pagar</span><strong>${formatCOP(cart.total())}</strong></div>
      </div>`;
  }

  summary.addEventListener("click", (e) => {
    const q = e.target.closest("[data-qty]");
    const r = e.target.closest("[data-remove]");
    if (q) {
      const it = cart.items().find((i) => i.name === q.dataset.name);
      cart.setQty(q.dataset.name, (it ? it.qty : 0) + Number(q.dataset.qty));
    }
    if (r) cart.remove(r.dataset.remove);
  });
  cart.onChange(renderSummary);
  renderSummary();

  /* ---------- Validación ---------- */
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const rules = {
    nombre: (v) => (v.trim().length < 2 ? "Escribe tu nombre." : ""),
    celular: (v) => {
      const d = v.replace(/\D/g, "");
      if (!d) return "Escribe tu número de celular.";
      return /^(57)?3\d{9}$/.test(d) ? "" : "Revisa el número: debe tener 10 dígitos y empezar por 3.";
    },
    correo: (v) => (v.trim() && !emailRe.test(v.trim()) ? "Revisa el formato del correo." : ""),
  };

  function check(input) {
    const rule = rules[input.name];
    if (!rule) return true;
    const msg = rule(input.value);
    const field = input.closest(".field");
    field.classList.toggle("has-error", Boolean(msg));
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    field.querySelector(".field-error").textContent = msg;
    return !msg;
  }

  const inputs = [...form.querySelectorAll("input[name=nombre], input[name=celular], input[name=correo]")];
  inputs.forEach((i) => {
    i.addEventListener("blur", () => i.value && check(i));
    i.addEventListener("input", () => i.closest(".field").classList.contains("has-error") && check(i));
  });

  /* ---------- Confirmación ---------- */
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const items = cart.items();
    if (!items.length) return;
    const valid = inputs.map(check).every(Boolean);
    if (!valid) {
      const first = form.querySelector('[aria-invalid="true"]');
      if (first) first.focus();
      return;
    }

    const f = form.elements;
    const pago = form.querySelector('input[name="pago"]:checked').value;
    const code = "MV-" + Date.now().toString(36).slice(-5).toUpperCase();
    const total = cart.total();

    const lines = items.map((it) => `• ${it.qty} × ${it.name} — ${formatCOP(it.subtotal)}`).join("\n");
    const message =
      `¡Hola, Mica Vita! Quiero hacer un pedido.\n\n` +
      `Pedido ${code}\n${lines}\n\nTotal: ${formatCOP(total)}\n` +
      `Pago: ${pago}\nEntrega: recoger en Blume Estudio, zona de Colina\n\n` +
      `Nombre: ${f.nombre.value.trim()}\nCelular: ${f.celular.value.trim()}` +
      (f.correo.value.trim() ? `\nCorreo: ${f.correo.value.trim()}` : "") +
      (f.notas.value.trim() ? `\nNotas: ${f.notas.value.trim()}` : "");

    done.querySelector(".done-code").textContent = code;
    done.querySelector(".done-name").textContent = f.nombre.value.trim().split(" ")[0];
    done.querySelector(".done-list").innerHTML = items
      .map((it) => `<li><span>${it.qty} × ${esc(it.name)}</span><span>${formatCOP(it.subtotal)}</span></li>`)
      .join("");
    done.querySelector(".done-total").textContent = formatCOP(total);
    done.querySelector(".done-pay").textContent = pago;
    done.querySelector(".done-whatsapp").href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

    cart.clear();
    const steps = document.querySelectorAll(".steps li");
    if (steps.length === 3) {
      steps[1].className = "is-done";
      steps[1].removeAttribute("aria-current");
      steps[2].className = "is-current";
      steps[2].setAttribute("aria-current", "step");
    }
    layout.hidden = true;
    done.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
    done.querySelector("h2").focus();
  });
})();
