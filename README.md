# SEAJUSTE · sitio corporativo

Sitio de **SEAJUSTE S.A. Ajustadores de Siniestros**, desarrollado a partir del brochure corporativo de 42 páginas suministrado por la empresa.

## Desarrollo local

Requisitos: Node.js 20.9 o superior y npm.

```bash
npm ci
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). La raíz dirige a la versión española `/es`; la versión inglesa está en `/en`.

## Contenido y navegación

| Página | Español | Inglés |
| --- | --- | --- |
| Inicio | `/es` | `/en` |
| Nosotros | `/es/nosotros` | `/en/about` |
| Servicios | `/es/servicios` | `/en/services` |
| Experiencia | `/es/experiencia` | `/en/experience` |
| Equipo | `/es/equipo` | `/en/team` |
| Respaldo | `/es/acreditaciones` | `/en/credentials` |
| Contacto | `/es/contacto` | `/en/contact` |

Además, cada idioma tiene **9 páginas de especialidad** y **12 páginas de casos**. El selector de idioma mantiene la página o el caso actual y utiliza su ruta traducida.

- Trayectoria profesional y empresarial, filosofía, misión y visión.
- Cinco especialidades centrales y cuatro áreas técnicas complementarias.
- Metodología de inspección, investigación, valoración e informe.
- Casos históricos, montos de indemnización, fichas técnicas y galerías ampliables.
- Los 15 profesionales y las 17 empresas e instituciones del brochure.
- Los 16 ramos de autorización, con la fecha documental del 27/08/2024.
- Objeto social, RUC y catálogo completo de actividades y productos RUP, con búsqueda por código o descripción.
- Oficinas, teléfono, WhatsApp, correo y descarga del brochure íntegro.

## Contacto

La página de contacto ofrece dos pestañas: **Consulta profesional** y **Agendar reunión**. Los botones del hero abren la opción correspondiente mediante `#consulta` o `#reunion`. La pestaña de reunión permite indicar teléfono, fecha y hora preferidas (hora de Ecuador continental), modalidad y motivo; la consulta recoge la especialidad y el contexto del caso. Los datos escritos se conservan al cambiar de pestaña mientras se permanece en la página.

Ambos formularios validan los campos y utilizan un único botón **«Continuar por WhatsApp»**, que abre un mensaje con los datos de la solicitud correspondiente. El visitante lo revisa y envía desde WhatsApp. Los formularios no envían correos y el sitio no almacena las solicitudes. La reunión se coordina con el equipo a partir de las preferencias indicadas.

Los enlaces de ubicación abren búsquedas de las direcciones reales en Google Maps. La referencia de LinkedIn abre una búsqueda de Carlos Quevedo / SEAJUSTE, tal como se identifica en el brochure.

## Recursos del brochure

Las imágenes están alojadas localmente, recortadas del documento original y optimizadas en WebP. Los logotipos mantienen su identidad original. El archivo `public/images/brochure-assets.json` contiene la página y las coordenadas de cada recurso extraído.

Para volver a generar los recursos desde el PDF:

```bash
npm run assets:extract -- "BROCHURE actualizado 28-09-2026 rev 2.pdf"
```

El script utiliza PDF.js, Canvas y Sharp. Genera los recursos, el favicon, las páginas documentales y la copia descargable `public/documents/seajuste-brochure.pdf`. El PDF fuente en la raíz queda fuera de Git para evitar duplicarlo.

## Estructura

```text
src/app/[locale]/          # Layout y rutas bilingües
src/components/            # Páginas, navegación e interacciones
src/lib/content.ts         # Información corporativa, especialidades, casos y equipo
src/lib/copy.ts            # Textos de interfaz en español e inglés
src/lib/i18n.ts            # Idiomas, rutas y equivalencias de páginas
src/lib/seo.ts             # Metadatos y datos estructurados
src/app/globals.css        # Sistema visual y adaptación responsive
public/images/             # Fotografías, retratos, marcas y trazabilidad
public/documents/          # Brochure completo y referencias documentales
scripts/                   # Extracción reproducible de recursos
tests/                     # Verificación funcional y de accesibilidad
docs/site-direction.md     # Dirección de diseño y mapa de contenido del brochure
```

## Publicación y SEO

Configura `NEXT_PUBLIC_SITE_URL` con el dominio real del sitio antes de compilar para producción. `.env.example` documenta esta variable.

```bash
npm run build
npm start
```

El sitio incluye páginas prerenderizadas, URLs canónicas, equivalencias `hreflang`, sitemap, robots, tarjetas Open Graph por idioma y datos estructurados de la empresa. Las fuentes Barlow Condensed, Manrope e IBM Plex Mono se sirven desde el propio sitio mediante `next/font`.

## Ajustar la tipografía

La escala se configura en el bloque `:root` al inicio de `src/app/globals.css`. Los tamaños utilizan `rem` y respetan la preferencia de tamaño de fuente del navegador.

| Variable | Uso | Tamaño predeterminado* |
| --- | --- | --- |
| `--text-body` | Párrafos y formularios | 18 px |
| `--text-small` | Texto secundario, menús y enlaces | 16 px |
| `--text-caption` | Etiquetas, notas y tablas compactas | 14 px |
| `--text-heading` / `--text-display` | Títulos de sección y de página | Adaptable al ancho |
| `--weight-regular` / `--weight-medium` / `--weight-bold` | Peso del texto, títulos y énfasis | 500 / 600 / 700 |

\* Con el tamaño base habitual del navegador de 16 px.

Para ampliar toda la tipografía un 10 % adicional, cambia únicamente `--type-scale: 1;` por `--type-scale: 1.1;`. Para ajustar solo una categoría, modifica su variable; por ejemplo, `--text-body: calc(1.25rem * var(--type-scale));` establece el texto principal en 20 px con la escala predeterminada. Después de un ajuste, comprueba los saltos de línea y los componentes compactos en móvil.

## Verificación

```bash
npm run lint
npm run build
npm run test:e2e
```

Las pruebas comprueban rutas y recursos, traducciones, filtros, búsqueda de registros, galería con teclado, validación y preparación del mensaje de contacto, menú móvil, desbordamiento horizontal y accesibilidad WCAG mediante axe. También generan capturas de los diseños en escritorio y móvil en `test-results/`.

En Windows se utiliza Microsoft Edge instalado. En otros sistemas instala Chromium para Playwright con `npx playwright install chromium`. Puedes seleccionar otro canal mediante `PLAYWRIGHT_CHANNEL`. Las pruebas arrancan y cierran el servidor de producción en el puerto 3100.

## Tecnologías

Next.js 16, React 19, TypeScript, Tailwind CSS 4, CSS personalizado, Lucide, Playwright y axe. La documentación correspondiente a la versión de Next.js instalada está en `node_modules/next/dist/docs/`.
