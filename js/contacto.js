/* ==========================================================================
   UISEK · Formulario de contacto
   Validación básica en cliente. Sitio estático: no hay envío a servidor.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    success.classList.add('is-visible');
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    form.reset();
  });
});
