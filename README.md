# Proyectos UISEK — Blog / Portafolio de proyectos académicos

Sitio 100% estático (HTML5 + CSS3 + JavaScript, sin frameworks) para la Universidad
Internacional SEK. Todo el contenido se carga en tiempo de ejecución desde archivos
JSON en `/data`, por lo que no requiere backend, autenticación ni base de datos.

## Cómo verlo

Los navegadores bloquean `fetch()` sobre `file://`, así que el sitio debe abrirse
a través de un servidor local.

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
cd blog-proyectos-uisek
```

### 2. Descargar los archivos multimedia con Git LFS

Los videos del proyecto se almacenan mediante **Git LFS (Large File Storage)** debido
al tamaño de los archivos.

Después de clonar el repositorio, ejecutar:

```bash
git lfs install
git lfs pull
```

Si los videos no se descargan correctamente mediante `git lfs pull`, ejecutar:

```bash
git lfs fetch --all
git lfs checkout
```

### 3. Iniciar el servidor local

En Windows:

```bash
py -m http.server 8080
```

En Linux/macOS:

```bash
python3 -m http.server 8080
```

### 4. Abrir el sitio

Una vez iniciado el servidor, abrir en el navegador:

```text
http://localhost:8080
```

> **Importante:** No abrir directamente los archivos HTML mediante `file://`, ya que
> el sitio utiliza `fetch()` para cargar los archivos JSON.

## Comandos adicionales

### Actualización del proyecto

Para obtener los últimos cambios realizados en el repositorio:

```bash
git pull
```

Si existen nuevos archivos multimedia administrados mediante Git LFS:

```bash
git lfs pull
```

Si Git LFS presenta problemas al descargar los archivos:

```bash
git lfs fetch --all
git lfs checkout
```

## Estructura de carpetas

```text
blog-proyectos-uisek/
├── index.html                  Inicio (hero, destacados, categorías, últimas publicaciones)
├── proyectos.html             Todos los proyectos (buscador + filtros por categoría)
├── proyecto.html              Detalle de un proyecto (?id=slug-del-proyecto)
├── acerca.html                Página institucional "Acerca de"
├── contacto.html              Formulario de contacto
│
├── css/
│   └── styles.css             Sistema de diseño completo (variables, componentes)
│
├── js/
│   ├── utils.js               Carga de JSON + helpers de formato + generación de tarjetas
│   ├── layout.js              Header sticky, menú móvil, buscador y footer
│   ├── home.js                Lógica exclusiva de index.html
│   ├── proyectos.js           Lógica exclusiva de proyectos.html (filtros/búsqueda)
│   ├── proyecto-detalle.js    Lógica exclusiva de proyecto.html (render + lightbox)
│   └── contacto.js            Validación del formulario
│
├── data/
│   ├── proyectos.json         Fuente de datos de todos los proyectos
│   └── categorias.json        Categorías disponibles para filtros/menús
│
└── assets/
    ├── icons/                 Logotipos e iconos institucionales
    ├── img/                   Portadas e imágenes de las capacitaciones
    ├── videos/                Videos de las capacitaciones (gestionados con Git LFS)
    └── docs/                  Documentos y materiales descargables
        ├── excel-para-todos/
        ├── ventas/
        ├── ventas-y-atencion/
        ├── gestion-para-negocios/
        └── ...
```

## Cómo agregar un proyecto nuevo

Edita `data/proyectos.json` y agrega un objeto con esta forma. Todos los campos
utilizados aquí se reflejan automáticamente en el listado, las tarjetas y el
detalle de cada capacitación:

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
  "descripcion": [
    "Párrafo 1…",
    "Párrafo 2…"
  ],
  "galeria": [
    {
      "src": "ruta/imagen.jpg",
      "alt": "Descripción"
    }
  ],
  "videos": [
    {
      "titulo": "Nombre del video",
      "url": "assets/videos/nombre-proyecto/video.mp4"
    }
  ],
  "documentos": [
    {
      "nombre": "Material de capacitación",
      "archivo": "assets/docs/nombre-proyecto/documento.pdf",
      "tipo": "PDF",
      "tamano": ""
    }
  ],
  "enlaces": [
    {
      "texto": "Enlace relacionado",
      "url": "https://..."
    }
  ],
  "tags": [
    "Etiqueta1",
    "Etiqueta2"
  ]
}
```

El campo `categoria` debe coincidir con un `slug` de `data/categorias.json`.

No es necesario modificar ningún archivo HTML ni JavaScript para agregar una nueva
capacitación, ya que las páginas leen la información dinámicamente desde los archivos
JSON.

## Videos

Los videos de las capacitaciones se encuentran organizados dentro de:

```text
assets/videos/
```

Cada capacitación puede disponer de su propia carpeta:

```text
assets/videos/nombre-del-proyecto/video.mp4
```

Debido al tamaño de estos archivos, los videos son administrados mediante
**Git LFS (Large File Storage)**.

Por esta razón, después de clonar el repositorio es necesario ejecutar:

```bash
git lfs install
git lfs pull
```

Si Git LFS no descarga correctamente los videos:

```bash
git lfs fetch --all
git lfs checkout
```

## Documentos descargables

Los documentos y materiales de apoyo de las capacitaciones se encuentran
organizados dentro de:

```text
assets/docs/
```

Cada capacitación dispone de su propia carpeta para mantener los documentos
organizados:

```text
assets/docs/nombre-del-proyecto/documento.pdf
```

Las rutas de los documentos se configuran desde `data/proyectos.json`.

Ejemplo:

```json
"documentos": [
  {
    "nombre": "Presentación de la capacitación",
    "archivo": "assets/docs/ventas/presentacion.pdf",
    "tipo": "PDF",
    "tamano": ""
  }
]
```

Los documentos configurados aparecen automáticamente en la sección
**Documentos descargables** de cada capacitación y pueden ser descargados
por los usuarios.

## Notas de diseño

- **Colores institucionales**: azul `#004896` y amarillo `#F0B700`, definidos
  como variables CSS en `:root` (`css/styles.css`) para reutilizarlos en todo el sitio.

- **Tipografía**: Space Grotesk (títulos), Inter (texto) e IBM Plex Mono
  (fechas, categorías y etiquetas).

- **Elemento de identidad**: las esquinas tipo plano técnico (▛ ▟) en tarjetas
  y el panel del hero, junto con la grilla de fondo tipo blueprint, refuerzan
  el carácter técnico/académico del contenido.

- Las portadas e imágenes de las capacitaciones se almacenan dentro de
  `assets/img/` y sus rutas se configuran desde `data/proyectos.json`.

- Los videos se almacenan dentro de `assets/videos/` y son administrados
  mediante Git LFS.

- Los documentos descargables se almacenan dentro de `assets/docs/`,
  organizados en carpetas según cada capacitación.

## Integrantes

```text
- Steven Gallegos
- José Moya
- Joel Olivo
```