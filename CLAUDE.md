# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es este proyecto

Sitio web estático de 5 páginas para el **Centro Médico de Especialidades Santa Clara** (Lázaro Cárdenas, Michoacán). Es una web demo/comercial: HTML + CSS + JavaScript vanilla, sin build, sin dependencias, sin backend. Todo el texto de la interfaz está en español y debe seguir así (con acentos correctos).

## Ejecutar y previsualizar

No hay build, ni tests, ni linter. Basta con abrir `index.html` en el navegador, o levantar un servidor estático para que el `iframe` del mapa y `fetch` se comporten como en producción:

```bash
python -m http.server 8000     # luego http://localhost:8000
```

El despliegue es copiar la carpeta tal cual a cualquier hosting estático (Netlify, Vercel, GitHub Pages).

## Arquitectura

**Regla principal: los datos viven en `js/config.js` y `js/data.js`; el HTML no debe llevar datos duplicados.** Cambiar teléfono, dirección, correo, WhatsApp, mapa, horarios o médicos se hace editando solo esos dos archivos.

- `js/config.js` — objeto global `CONFIG` (datos de contacto de la clínica, horario general, clave de Web3Forms, URL del mapa) y la función `waLink(mensaje)` que arma enlaces `wa.me` con texto pre-llenado. Cargado el primero en todas las páginas.
- `js/data.js` — arreglo global `MEDICOS` (nombre, especialidad, cédula, horarios). Es la única fuente del directorio de médicos, de los destacados del inicio y de las opciones del `<select>` de especialidades en el formulario.
- `js/main.js` — se ejecuta en las 5 páginas: menú móvil, año del pie de página, animaciones `.reveal` con IntersectionObserver y, sobre todo, la **hidratación desde CONFIG**:
  - `data-cfg="clave"` → escribe `CONFIG[clave]` como `textContent` del elemento.
  - `data-cfg-href="tel" | "mailto" | "wa" | "mapa"` → escribe el `href` correspondiente.
  - `data-horario-general` → renderiza la lista `CONFIG.horarioGeneral`.

  Al añadir cualquier dato de contacto nuevo en el HTML, usar estos atributos en lugar de escribir el valor a mano.

  `main.js` también **inyecta dos elementos que no están en ningún HTML**: el botón flotante de WhatsApp (`.wa-float`, solo escritorio) y la barra de acciones fija Llamar / WhatsApp / Cómo llegar (`.action-bar`, solo ≤760 px). El CSS las alterna: en móvil se oculta el flotante y aparece la barra, y `body` recibe `padding-bottom` para que la barra no tape el pie de página.
- `js/medicos.js` — genera las tarjetas de médicos desde `MEDICOS`. Renderiza los primeros 3 en `#medicosDestacados` (index) y el directorio completo con chips de filtro por especialidad en `#medicosGrid` + `#filtrosEspecialidad` (medicos.html).
- `js/contacto.js` — formulario con doble canal: envío por correo vía Web3Forms (`POST https://api.web3forms.com/submit`) y envío por WhatsApp con mensaje armado. Mientras `CONFIG.web3formsKey` valga `'TU_ACCESS_KEY'`, el botón de correo se deshabilita solo y queda únicamente WhatsApp; ese es el estado por defecto hasta que el cliente dé de alta su clave gratuita en web3forms.com.

Orden de carga de los scripts en cada página (es obligatorio, dependen de globales): `config.js` → `data.js` → `main.js` → (`medicos.js` o `contacto.js` según la página).

`css/styles.css` es un único archivo con variables CSS en `:root` (paleta verde/teal: `--c-primary`, `--c-teal`, `--c-wa`, radios y sombras). Usar esas variables en vez de colores literales.

El encabezado, la navegación y el pie de página están **duplicados en las 5 páginas** (no hay plantillas). Un cambio en el nav o el footer hay que replicarlo en `index.html`, `servicios.html`, `nosotros.html`, `medicos.html` y `contacto.html`, marcando la clase `active` en el enlace de la página actual.

## SEO y compartir el enlace

Estas tres cosas son la excepción a la regla de "los datos solo viven en config.js", porque los rastreadores de Google, WhatsApp y Facebook **no ejecutan JavaScript** y necesitan el dato escrito en el HTML:

- **`TU-DOMINIO.com` es un marcador que hay que reemplazar al publicar.** Aparece en las metaetiquetas `og:url` / `og:image` / `canonical` de las 5 páginas, en el JSON-LD de `index.html`, en `robots.txt` y en `sitemap.xml`. Sin URL absoluta, WhatsApp no muestra la imagen de previsualización al compartir el enlace. Se sustituye de golpe con:
  ```bash
  grep -rl "TU-DOMINIO.com" . | xargs sed -i "s|TU-DOMINIO.com|midominio.com|g"
  ```
- **`assets/og-image.jpg` (1200×630)** es la tarjeta que se ve al compartir el enlace. Se generó con un script de Pillow; si cambia el nombre o la marca de la clínica hay que regenerarla.
- **El JSON-LD `MedicalClinic` de `index.html` duplica teléfono, dirección y correo.** Es el único lugar del sitio donde esos datos se repiten fuera de `config.js`: al cambiarlos en uno, cambiarlos en el otro. Igual con el JSON-LD `FAQPage` y la sección de FAQ visible.

## Datos pendientes de confirmar con el cliente

`js/config.js` está poblado con datos tomados de la ficha de Facebook (desactualizada) y los médicos de `js/data.js` son **de muestra**. Antes de publicar hay que confirmar teléfono, número de WhatsApp, correo, el listado real de médicos y las respuestas de la sección de preguntas frecuentes de `index.html`.

**No inventar datos.** En particular, el campo `cedula` de `data.js` dice "Cédula profesional verificada" a propósito: un número de cédula inventado puede coincidir con el de un médico real. Se escribe el número únicamente cuando el cliente lo proporcione. Si falta cualquier otro dato, dejar el marcador y avisar en vez de rellenarlo.
