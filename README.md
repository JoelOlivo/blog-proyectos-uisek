# Proyectos UISEK — Blog / Portafolio de proyectos académicos

Sitio 100% estático (HTML5 + CSS3 + JavaScript, sin frameworks) para la Universidad
Internacional SEK. Todo el contenido se carga en tiempo de ejecución desde archivos
JSON en `/data`, por lo que no requiere backend, autenticación ni base de datos.

## Cómo verlo

Los navegadores bloquean `fetch()` sobre `file://`, así que el sitio debe abrirse
a través de un servidor local (cualquiera sirve):

```bash
cd uisek
python3 -m http.server 8080
# abrir http://localhost:8080
```

## Estructura de carpetas

```
uisek/
├── index.html              Inicio (hero, destacados, categorías, últimas publicaciones)
├── proyectos.html           Todos los proyectos (buscador + filtros por categoría)
├── proyecto.html             Detalle de un proyecto (?id=slug-del-proyecto)
├── acerca.html               Página institucional "Acerca de"
├── contacto.html              Formulario de contacto
├── css/
│   └── styles.css             Sistema de diseño completo (variables, componentes)
├── js/
│   ├── utils.js                Carga de JSON + helpers de formato + generación de tarjetas
│   ├── layout.js                Header sticky, menú móvil, buscador, footer
│   ├── home.js                   Lógica exclusiva de index.html
│   ├── proyectos.js               Lógica exclusiva de proyectos.html (filtros/búsqueda)
│   ├── proyecto-detalle.js         Lógica exclusiva de proyecto.html (render + lightbox)
│   └── contacto.js                  Validación del formulario
├── data/
│   ├── proyectos.json           Fuente de datos de todos los proyectos (editar aquí)
│   └── categorias.json           Categorías disponibles para filtros/menús
└── assets/
    ├── icons/logo-uisek.svg      Logotipo institucional (usado en header y footer)
    └── img/                        Portadas y galerías de ejemplo en SVG
```

## Cómo agregar un proyecto nuevo

Edita `data/proyectos.json` y agrega un objeto con esta forma (todos los campos
que uses aquí se reflejan automáticamente en el listado, las tarjetas y el detalle):

```json
{
  "id": "slug-unico-del-proyecto",
  "titulo": "Título del proyecto",
  "resumen": "Descripción corta para tarjetas (1-2 líneas).",
  "categoria": "tecnologia",
  "carrera": "Nombre de la carrera",
  "autores": ["Nombre Apellido"],
  "docente": "Nombre del docente guía",
  "fecha": "2026-07-01",
  "destacado": false,
  "portada": "assets/img/cover-tecnologia.svg",
  "descripcion": ["Párrafo 1…", "Párrafo 2…"],
  "galeria": [{ "src": "ruta/imagen.jpg", "alt": "Descripción" }],
  "videos": [{ "titulo": "Nombre del video", "url": "https://www.youtube.com/embed/ID" }],
  "documentos": [{ "nombre": "Informe", "archivo": "ruta/archivo.pdf", "tipo": "PDF", "tamano": "2 MB" }],
  "enlaces": [{ "texto": "Repositorio", "url": "https://..." }],
  "tags": ["Etiqueta1", "Etiqueta2"]
}
```

El campo `categoria` debe coincidir con un `slug` de `data/categorias.json`.
No es necesario tocar ningún archivo HTML ni JS: todas las páginas leen estos
JSON dinámicamente.

## Notas de diseño

- **Colores institucionales**: azul `#004896` y amarillo `#F0B700`, definidos
  como variables CSS en `:root` (`css/styles.css`) para reutilizarlos en todo el sitio.
- **Tipografía**: Space Grotesk (títulos), Inter (texto) e IBM Plex Mono (fechas,
  categorías, etiquetas — el detalle "ficha técnica" que distingue el sitio).
- **Elemento de identidad**: las esquinas tipo plano técnico (▛ ▟) en tarjetas y
  el panel del hero, junto con la grilla de fondo tipo blueprint, refuerzan el
  carácter técnico/académico del contenido.
- Las portadas e imágenes de galería son SVG de ejemplo generados para esta
  maqueta — reemplázalas por fotografías reales de cada proyecto sin cambiar
  el código, solo actualizando las rutas en `proyectos.json`.
- Los enlaces de "Documentos descargables" apuntan a rutas de ejemplo dentro de
  `assets/docs/` (no incluidas). Coloca ahí los PDF reales y actualiza `archivo`
  en el JSON correspondiente.
## Integrantes
Steven Gallegos
José Moya
Joel Olivo
