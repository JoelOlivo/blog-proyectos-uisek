/* ==========================================================================
   UISEK · Página de inicio
   ========================================================================== */

(async function initHome() {
  try {
    const [proyectos, categorias] = await Promise.all([
      cargarDatos('proyectos'),
      cargarDatos('categorias')
    ]);

    const porFecha = [...proyectos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    const destacados = proyectos.filter(p => p.destacado);
    const destacadosFinales = (destacados.length ? destacados : porFecha).slice(0, 3);

    // Contador del hero
    document.getElementById('stat-proyectos').textContent = proyectos.length;

    // Panel "ficha técnica" del hero — usa el proyecto destacado más reciente
    const heroProyecto = destacadosFinales[0] || porFecha[0];
    if (heroProyecto) {
      document.getElementById('hero-destacado').innerHTML = `
        <span class="corner corner-tl"></span><span class="corner corner-br"></span>
        <img src="${heroProyecto.portada}" alt="Portada de ${heroProyecto.titulo}">
        <span class="spec-label">${formatearFecha(heroProyecto.fecha)} · ${nombreCategoria(heroProyecto.categoria, categorias)}</span>
        <h3>${heroProyecto.titulo}</h3>
        <div class="spec-meta">
          <span>${heroProyecto.carrera}</span>
        </div>
        <a class="btn btn-accent btn-sm" style="margin-top:18px;" href="proyecto.html?id=${heroProyecto.id}">Ver capacitación</a>
      `;
    }

    // Grid de proyectos destacados
    document.getElementById('grid-destacados').innerHTML =
      destacadosFinales.map(p => tarjetaProyecto(p, categorias)).join('');

    // Grid de categorías con conteo de proyectos
    document.getElementById('grid-categorias').innerHTML = categorias.map(c => {
      const total = proyectos.filter(p => p.categoria === c.slug).length;
      return `
      <a class="category-card" href="proyectos.html?categoria=${c.slug}">
        <span class="ico">${c.icono}</span>
        <strong>${c.nombre}</strong>
        <span>${total} capacitación${total === 1 ? '' : 'es'}</span>
      </a>`;
    }).join('');

    // Últimas publicaciones (las 4 más recientes)
    document.getElementById('lista-recientes').innerHTML =
      porFecha.slice(0, 4).map(p => filaPublicacion(p, categorias)).join('');

  } catch (err) {
    console.error(err);
    document.getElementById('grid-destacados').innerHTML =
      `<div class="state-block" style="grid-column:1/-1;">
        <h3>No se pudieron cargar las capacitaciones</h3>
        <p>Verifica que los archivos en /data estén disponibles.</p>
      </div>`;
  }
})();
