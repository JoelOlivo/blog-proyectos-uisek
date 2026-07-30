/* ==========================================================================
   UISEK · Utilidades compartidas
   Carga de datos JSON + helpers de formato y render de tarjetas
   ========================================================================== */

const DATA = {
  proyectos: null,
  categorias: null
};

/** Descarga y cachea un JSON del directorio /data */
async function cargarDatos(nombre) {
  if (DATA[nombre]) return DATA[nombre];
  const res = await fetch(`data/${nombre}.json`);
  if (!res.ok) throw new Error(`No se pudo cargar data/${nombre}.json`);
  DATA[nombre] = await res.json();
  return DATA[nombre];
}

/** Formatea "2026-05-14" -> "14 may 2026" */
function formatearFecha(iso) {
  const meses = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${meses[m - 1]} ${y}`;
}

function nombreCategoria(slug, categorias) {
  const c = categorias.find(c => c.slug === slug);
  return c ? c.nombre : slug;
}

/** Devuelve iniciales para el avatar de autor, p.ej. "María José Andrade" -> "MA" */
function iniciales(nombre) {
  return nombre.split(' ').filter(Boolean).slice(0, 2).map(p => p[0]).join('').toUpperCase();
}

const ICONO_FLECHA = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
const ICONO_FLECHA_DIAG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>`;

/** Genera el HTML de una tarjeta de proyecto (grid grande) */
function tarjetaProyecto(p, categorias) {
  const cat = nombreCategoria(p.categoria, categorias);
  return `
  <article class="project-card">
    <a href="proyecto.html?id=${p.id}" aria-label="Ver capacitación: ${p.titulo}">
      <div class="card-media">
        <img src="${p.portada}" alt="Portada de la capacitación ${p.titulo}" loading="lazy">
        <span class="card-cat">${cat}</span>
        <span class="card-corners"><i></i><i></i><i></i><i></i></span>
      </div>
    </a>
    <div class="card-body">
      <div class="card-meta">
        <span>${formatearFecha(p.fecha)}</span>
        <span class="dot"></span>
        <span>${p.carrera}</span>
      </div>
      <h3><a href="proyecto.html?id=${p.id}">${p.titulo}</a></h3>
      <p>${p.resumen}</p>
      <div class="card-foot">
        <a class="card-link" href="proyecto.html?id=${p.id}">Ver capacitación ${ICONO_FLECHA}</a>
        <div class="card-tags">${(p.tags || []).slice(0, 1).map(t => `<span class="tag">${t}</span>`).join('')}</div>
      </div>
    </div>
  </article>`;
}

/** Genera el HTML de una fila de publicación (lista compacta) */
function filaPublicacion(p, categorias) {
  const cat = nombreCategoria(p.categoria, categorias);
  return `
  <a class="post-row" href="proyecto.html?id=${p.id}">
    <div class="thumb"><img src="${p.portada}" alt="" loading="lazy"></div>
    <div>
      <div class="card-meta" style="margin-bottom:6px;">
        <span>${cat}</span><span class="dot"></span><span>${formatearFecha(p.fecha)}</span>
      </div>
      <h3>${p.titulo}</h3>
      <p>${p.resumen}</p>
    </div>
    <span class="go">${ICONO_FLECHA_DIAG}</span>
  </a>`;
}

function skeletonCards(n, alto) {
  return Array.from({ length: n }).map(() =>
    `<div class="skeleton" style="height:${alto}"></div>`
  ).join('');
}
