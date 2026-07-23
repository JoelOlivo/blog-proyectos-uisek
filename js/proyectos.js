/* ==========================================================================
   UISEK · Página "Todos los proyectos"
   Buscador visual + filtros por categoría
   ========================================================================== */

(async function initListado() {
  const grid = document.getElementById('grid-proyectos');
  const filtros = document.getElementById('filtros-categoria');
  const buscador = document.getElementById('buscador-proyectos');
  const sinResultados = document.getElementById('sin-resultados');
  const contador = document.getElementById('contador-resultados');
  const btnLimpiar = document.getElementById('btn-limpiar-filtros');

  const params = new URLSearchParams(window.location.search);
  let categoriaActiva = params.get('categoria') || 'todos';
  let termino = (params.get('q') || '').toLowerCase();

  try {
    const [proyectos, categorias] = await Promise.all([
      cargarDatos('proyectos'),
      cargarDatos('categorias')
    ]);

    if (buscador) buscador.value = termino;

    // Construir chips de filtro
    filtros.innerHTML = `<button class="filter-chip" data-filtro="todos">Todos</button>` +
      categorias.map(c => `<button class="filter-chip" data-filtro="${c.slug}">${c.nombre}</button>`).join('') +
      `<span class="filter-count" id="contador-resultados"></span>`;

    function marcarChipActivo() {
      filtros.querySelectorAll('.filter-chip').forEach(chip => {
        chip.classList.toggle('active', chip.dataset.filtro === categoriaActiva);
      });
    }

    function render() {
      const porFecha = [...proyectos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      const resultado = porFecha.filter(p => {
        const coincideCategoria = categoriaActiva === 'todos' || p.categoria === categoriaActiva;
        const texto = `${p.titulo} ${p.resumen} ${p.carrera} ${(p.autores || []).join(' ')} ${(p.tags || []).join(' ')}`.toLowerCase();
        const coincideTexto = !termino || texto.includes(termino);
        return coincideCategoria && coincideTexto;
      });

      const contadorEl = document.getElementById('contador-resultados');
      if (contadorEl) contadorEl.textContent = `${resultado.length} proyecto${resultado.length === 1 ? '' : 's'}`;

      if (!resultado.length) {
        grid.style.display = 'none';
        sinResultados.style.display = 'block';
        return;
      }
      grid.style.display = 'grid';
      sinResultados.style.display = 'none';
      grid.innerHTML = resultado.map(p => tarjetaProyecto(p, categorias)).join('');
    }

    marcarChipActivo();
    render();

    filtros.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-chip');
      if (!btn) return;
      categoriaActiva = btn.dataset.filtro;
      marcarChipActivo();
      render();
    });

    let debounce;
    if (buscador) {
      buscador.addEventListener('input', () => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          termino = buscador.value.trim().toLowerCase();
          render();
        }, 180);
      });
    }

    if (btnLimpiar) {
      btnLimpiar.addEventListener('click', () => {
        categoriaActiva = 'todos';
        termino = '';
        if (buscador) buscador.value = '';
        marcarChipActivo();
        render();
      });
    }

  } catch (err) {
    console.error(err);
    grid.innerHTML = `<div class="state-block" style="grid-column:1/-1;">
      <h3>No se pudieron cargar los proyectos</h3>
      <p>Verifica que los archivos en /data estén disponibles.</p>
    </div>`;
  }
})();
