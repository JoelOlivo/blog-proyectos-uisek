/* ==========================================================================
   UISEK · Página de detalle de proyecto
   ========================================================================== */

const ICONO_DOC = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>`;
const ICONO_DESCARGA = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16"/></svg>`;
const ICONO_LINK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.2 1.2M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.2-1.2"/></svg>`;

(async function initDetalle() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const contenedor = document.getElementById('contenido-proyecto');
  const noEncontrado = document.getElementById('no-encontrado');

  try {
    const [proyectos, categorias] = await Promise.all([
      cargarDatos('proyectos'),
      cargarDatos('categorias')
    ]);

    const p = proyectos.find(x => x.id === id);

    if (!p) {
      contenedor.style.display = 'none';
      noEncontrado.style.display = 'block';
      document.getElementById('breadcrumb-actual').textContent = 'No encontrado';
      return;
    }

    document.title = `${p.titulo} — Programas de Capacitación UISEK`;
    document.getElementById('breadcrumb-actual').textContent = p.titulo;

    const cat = nombreCategoria(p.categoria, categorias);

    const galeriaHTML = (p.galeria && p.galeria.length) ? `
      <h2>Galería de imágenes</h2>
      <div class="gallery-grid">
        ${p.galeria.map(img => `
          <figure data-full="${img.src}">
            <img src="${img.src}" alt="${img.alt || p.titulo}" loading="lazy">
          </figure>`).join('')}
      </div>` : '';

    const videosHTML = (p.videos && p.videos.length) ? `
      <h2>Video</h2>
      ${p.videos.map(v => `
        <div class="video-player">
          <video controls preload="metadata" poster="${v.poster || ''}">
            <source src="${v.url}" type="video/mp4">
            Tu navegador no soporta la reproducción de video.
          </video>
        </div>
        <p class="video-caption">${v.titulo}</p>
      `).join('')}
    ` : '';

    const docsHTML = (p.documentos && p.documentos.length) ? `
      <h2>Documentos descargables</h2>
      <div class="doc-list">
        ${p.documentos.map(d => `
          <a class="doc-item" href="${d.archivo}" download>
            <span class="doc-icon">${ICONO_DOC}</span>
            <span class="doc-info">
              <strong>${d.nombre}</strong>
              <span>${d.tipo} · ${d.tamano}</span>
            </span>
            <span class="doc-icon" aria-hidden="true">${ICONO_DESCARGA}</span>
          </a>`).join('')}
      </div>` : '';

    const enlacesHTML = (p.enlaces && p.enlaces.length) ? `
      <div class="sidebar-card">
        <h4>Enlaces relacionados</h4>
        <div class="link-list">
          ${p.enlaces.map(e => `<a href="${e.url}" target="_blank" rel="noopener">${ICONO_LINK} ${e.texto}</a>`).join('')}
        </div>
      </div>` : '';

    const autoresHTML = p.autores.map(a => `
      <div class="author-row">
        <span class="author-avatar">${iniciales(a)}</span>
        <div><strong>${a}</strong><span>Instructor / Responsable</span></div>
      </div>`).join('');

    // Proyectos relacionados: misma categoría, excluyendo el actual
    const relacionados = proyectos.filter(x => x.categoria === p.categoria && x.id !== p.id).slice(0, 3);
    const relacionadosHTML = relacionados.length ? `
      <section class="section related-strip">
        <div class="container">
          <div class="section-head">
            <div>
              <span class="eyebrow">Más de ${cat}</span>
              <h2>Capacitaciones relacionadas</h2>
            </div>
          </div>
          <div class="card-grid">
            ${relacionados.map(r => tarjetaProyecto(r, categorias)).join('')}
          </div>
        </div>
      </section>` : '';

    contenedor.innerHTML = `
      <section class="section--tight">
        <div class="container">
          <div class="project-hero">
            <div class="project-cover">
              <img src="${p.portada}" alt="Portada del proyecto ${p.titulo}">
            </div>
            <div class="project-title-block">
              <span class="eyebrow">${cat}</span>
              <h1>${p.titulo}</h1>
              <p class="lead">${p.resumen}</p>
              <div class="meta-row">
                <div class="meta-item"><span class="k">Publicado</span><span class="v">${formatearFecha(p.fecha)}</span></div>
                <div class="meta-item"><span class="k">Facultad / Carrera</span><span class="v">${p.carrera}</span></div>
                <div class="meta-item"><span class="k">Docente guía</span><span class="v">${p.docente}</span></div>
                <div class="meta-item"><span class="k">Autores</span><span class="v">${p.autores.join(', ')}</span></div>
              </div>
            </div>
          </div>

          <div class="project-layout">
            <div class="project-body">
              <h2>Descripción de la capacitación</h2>
              ${p.descripcion.map(par => `<p>${par}</p>`).join('')}
              ${galeriaHTML}
              ${videosHTML}
              ${docsHTML}
            </div>

            <aside>
              <div class="sidebar-card">
                <h4>Equipo</h4>
                ${autoresHTML}
              </div>
              <div class="sidebar-card">
                <h4>Categoría</h4>
                <a class="tag" href="proyectos.html?categoria=${p.categoria}" style="display:inline-block;">${cat}</a>
                <h4 style="margin-top:20px;">Etiquetas</h4>
                <div class="tags-block">
                  ${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
              </div>
              ${enlacesHTML}
              <a class="btn btn-primary btn-block" href="proyectos.html">Volver a las capacitaciones</a>
            </aside>
          </div>
        </div>
      </section>
      ${relacionadosHTML}
    `;

    // Lightbox de galería
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    document.querySelectorAll('.gallery-grid figure').forEach(fig => {
      fig.addEventListener('click', () => {
        lightboxImg.src = fig.dataset.full;
        lightboxImg.alt = fig.querySelector('img').alt;
        lightbox.classList.add('is-open');
      });
    });
    document.getElementById('lightbox-close').addEventListener('click', () => lightbox.classList.remove('is-open'));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('is-open'); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lightbox.classList.remove('is-open'); });

  } catch (err) {
    console.error(err);
    contenedor.style.display = 'none';
    noEncontrado.style.display = 'block';
  }
})();
