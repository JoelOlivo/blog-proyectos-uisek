/* ==========================================================================
   UISEK · Comportamiento del layout (header, menú, búsqueda, footer)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Header con efecto al hacer scroll --- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* --- Menú móvil (drawer) --- */
  const navToggle = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  if (navToggle && drawer) {
    navToggle.addEventListener('click', () => {
      const open = drawer.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      drawer.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      document.body.style.overflow = '';
    }));
  }

  /* --- Búsqueda desplegable del header --- */
  const searchToggle = document.querySelector('.search-toggle');
  const searchFlyout = document.querySelector('.search-flyout');
  if (searchToggle && searchFlyout) {
    const searchInput = searchFlyout.querySelector('input');
    searchToggle.addEventListener('click', () => {
      const open = searchFlyout.classList.toggle('is-open');
      if (open) setTimeout(() => searchInput && searchInput.focus(), 200);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') searchFlyout.classList.remove('is-open');
    });
    const headerSearchForm = searchFlyout.querySelector('form');
    if (headerSearchForm) {
      headerSearchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const q = searchInput.value.trim();
        window.location.href = `proyectos.html${q ? '?q=' + encodeURIComponent(q) : ''}`;
      });
    }
  }

  /* --- Año dinámico en el footer --- */
  document.querySelectorAll('.current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* --- Resalta el enlace de navegación activo --- */
  const page = document.body.dataset.page;
  if (page) {
    document.querySelectorAll(`.main-nav a, .mobile-drawer a`).forEach(a => {
      if (a.dataset.page === page) a.classList.add('active');
    });
  }
});
