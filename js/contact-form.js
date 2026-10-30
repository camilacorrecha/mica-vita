/* ==========================================================
   Mica Vita — Formulario de contacto
   Valida los campos y abre el correo del visitante con el
   mensaje listo para enviar.
   ========================================================== */
(function () {
  "use strict";

  // PENDIENTE: confirmar el correo definitivo de la marca.
  const CONTACT_EMAIL = "micavita@gmail.com";

  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = form.querySelector(".form-status");
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const rules = {
    nombre: (v) => (v.trim().length < 2 ? "Escribe tu nombre." : ""),
    correo: (v) => (!v.trim() ? "Escribe tu correo." : !emailRe.test(v.trim()) ? "Revisa el formato del correo." : ""),
    mensaje: (v) => (v.trim().length < 10 ? "Cuéntanos un poco más (mínimo 10 caracteres)." : "")
  };

  function check(input) {
    const msg = rules[input.name] ? rules[input.name](input.value) : "";
    const field = input.closest(".field");
    const error = field.querySelector(".field-error");
    field.classList.toggle("has-error", Boolean(msg));
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    error.textContent = msg;
    return !msg;
  }

  form.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("blur", () => { if (input.value) check(input); });
    input.addEventListener("input", () => {
      if (input.closest(".field").classList.contains("has-error")) check(input);
      status.textContent = "";
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = [...form.querySelectorAll("input, textarea")];
    const valid = inputs.map(check).every(Boolean);
    if (!valid) {
      const first = form.querySelector('[aria-invalid="true"]');
      if (first) first.focus();
      return;
    }

    const { nombre, correo, mensaje } = form.elements;
    const subject = `Mensaje de ${nombre.value.trim()} desde micavita`;
    const body = `${mensaje.value.trim()}\n\n— ${nombre.value.trim()}\n${correo.value.trim()}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    status.textContent = "¡Gracias! Abrimos tu correo para que envíes el mensaje.";
    form.reset();
    inputs.forEach((i) => i.setAttribute("aria-invalid", "false"));
  });
})();
