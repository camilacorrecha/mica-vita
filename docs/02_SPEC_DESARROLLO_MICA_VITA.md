# Mica Vita — Spec de diseño y desarrollo

## 1. Alcance técnico

- Sitio web estático y responsive de 3 páginas: `index.html` (Home), `menu.html` (Menú), `contacto.html` (Contáctanos)
- Stack sugerido: HTML semántico + CSS con variables + JavaScript mínimo para carruseles, menú móvil y validación del formulario
- Contenido de productos centralizado en un archivo de datos (`data/menu.json`, `data/merch.json`) para editar precios sin tocar el maquetado
- Fuera de alcance mientras no se defina: carrito funcional, checkout, pagos, envío real del formulario

Estructura de archivos:

```
/
├── index.html
├── menu.html
├── contacto.html
├── css/
│   ├── tokens.css
│   ├── base.css
│   └── components.css
├── js/
│   ├── carousel.js
│   ├── nav.js
│   └── contact-form.js
├── data/
│   ├── menu.json
│   └── merch.json
├── fonts/
│   ├── BukhariScript.woff2
│   ├── Utendo-Regular.woff2
│   ├── Utendo-SemiBold.woff2
│   └── Utendo-Bold.woff2
└── img/
    ├── brand/
    ├── home/
    ├── menu/
    ├── merch/
    └── illustrations/
```

## 2. Design tokens

### Color

```css
:root {
  /* Primario */
  --color-primary: #7A1C27;
  --color-primary-dark: #4C0E17;
  --color-primary-light: #A2434C;

  /* Secundario */
  --color-beige: #EFE3CE;
  --color-tan: #D2B48C;

  /* Neutros */
  --color-black: #000000;
  --color-text: #5A4642;
  --color-bg: #F8F2E7;

  /* Promociones */
  --color-promo: #EFE3CE;

  /* Estados */
  --color-success: #2E6B3F;
  --color-error: #B3261E;
}
```

Uso:

- `--color-bg`: fondo general de página
- `--color-beige`: bloques "Hecho para disfrutar", cuadros informativos de tarjetas, SECCIÓN Z, campos de formulario, chips de etiquetas
- `--color-primary`: botones, bloques de categoría, banners, títulos H1/H2, círculo del carrito, flechas de carrusel, bordes de tarjeta
- `--color-primary-dark`: hover y estado presionado de botones y flechas
- `--color-primary-light`: precios, etiquetas dietarias, foco de inputs
- `--color-tan`: sombra desplazada de tarjetas y bordes secundarios
- `--color-text`: texto de cuerpo
- `--color-success` / `--color-error`: mensajes y bordes de validación del formulario

### Tipografía

Fuentes cargadas con `@font-face` desde `/fonts` con `font-display: swap`.

```css
:root {
  --font-script: "Bukhari Script", "Brush Script MT", cursive;
  --font-sans: "Utendo", "Helvetica Neue", Arial, sans-serif;
}

h1 { font: 400 72px/1 var(--font-script); color: var(--color-primary); }
h2 { font: 400 48px/1.1 var(--font-script); color: var(--color-primary); }
h3 { font: 700 28px/1.2 var(--font-sans); text-transform: uppercase; }
body { font: 400 17px/1.6 var(--font-sans); color: var(--color-text); }
.btn { font: 600 15px/1 var(--font-sans); text-transform: uppercase; letter-spacing: 0.12em; }

@media (max-width: 767px) {
  h1 { font-size: 48px; }
  h2 { font-size: 36px; }
  h3 { font-size: 22px; }
  body { font-size: 16px; }
}
```

> Bukhari Script y Utendo son fuentes comerciales: hay que verificar que la licencia permita uso web antes de publicar.

### Espaciado, radios y sombras

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 40px;
  --space-6: 64px;

  --radius-sm: 8px;    /* inputs, chips */
  --radius-md: 16px;   /* tarjetas, bloques */
  --radius-pill: 999px; /* botones, círculos */

  --shadow-retro: 3px 3px 0 var(--color-tan);

  --container: 1200px;
}
```

### Breakpoints

- Móvil: `< 768px`
- Tablet: `768px – 1023px`
- Escritorio: `≥ 1024px`

## 3. Componentes

### `SiteHeader` (SECCIÓN A)

- `<header>` con logo (`<a href="index.html">`) a la izquierda y `<nav>` a la derecha
- Enlaces: `MENÚ` → `menu.html`, `CONTÁCTANOS` → `contacto.html`, `ABOUT US` → `index.html#about`, `UBICACIÓN` → `#ubicacion` (SECCIÓN Z)
- `CartButton`: botón circular `--color-primary` con ícono de carrito e indicador de cantidad; `aria-label="Carrito"`
- Línea divisoria fina bajo el header
- Enlace activo según la página actual
- Móvil: la navegación se colapsa en un botón hamburguesa; el logo y el carrito siguen visibles

### `SiteFooter` (SECCIÓN Z)

- `<footer id="ubicacion">` con fondo `--color-beige`
- `BrandBlock`: rectángulo `--color-primary` con `--radius-md` y logo en beige
- Dos columnas de datos con rótulos en `--color-primary` (Utendo, mayúsculas) y valores en `--color-text`
- WhatsApp como enlaces `https://wa.me/573174681666` y `https://wa.me/573114394285`
- Instagram como enlace a `https://instagram.com/micavita`
- Correo como `mailto:` (pendiente de confirmar la dirección)
- Móvil: el bloque de logo pasa arriba y las columnas se apilan

### `Button`

- Variante primaria: fondo `--color-primary`, texto beige, `--radius-pill`, flecha opcional `→`
- Hover: `--color-primary-dark`
- Foco: `outline: 2px solid var(--color-primary-light); outline-offset: 2px`

### `CategoryRail`

- Bloque vertical `--color-primary` con `--radius-md`
- Texto en Bukhari Script color beige, rotado 90° (`writing-mode: vertical-rl; transform: rotate(180deg)`)
- Se usa en: Merch, Smoothies, Jugos, Cafés, Especiales, Comida

### `ProductCard`

- Contenedor de imagen: fondo blanco o crema, borde 1px `--color-primary`, `--radius-md`
- Etiqueta dietaria (`VG`, `SA`, `PRO`, `SG`) en la esquina inferior derecha de la imagen, color `--color-primary-light`
- Cuadro informativo: fondo `--color-beige`, borde 1px, `--radius-md`, `--shadow-retro`
  - Nombre en Utendo SemiBold mayúsculas
  - Descripción en Body pequeño
  - Precio en `--color-primary-light`, formato `$12.000 cop`
  - `AddButton` circular `+` en la esquina inferior derecha, sobresaliendo del borde; `aria-label="Agregar {producto}"`

Props:

```
name: string
description?: string
price: number        // en COP, sin decimales
image: string
imageAlt: string
tags?: ("VG" | "SA" | "PRO" | "SG")[]
```

### `ProductCarousel`

- Estructura: `CategoryRail` + flecha izquierda + pista de tarjetas + flecha derecha
- 3 tarjetas visibles en escritorio, 2 en tablet, 1,2 en móvil (con desplazamiento táctil)
- Flechas: círculo con borde `--color-primary` e ícono de triángulo; se deshabilitan al llegar al inicio o al final
- Implementación: `overflow-x: auto` + `scroll-snap-type: x mandatory`; las flechas llaman `scrollBy` con el ancho de una tarjeta
- Accesible por teclado; `aria-label` en cada flecha ("Anterior", "Siguiente")

### `BestSellerCard`

- Imagen con fondo `--color-tan` y `--radius-md`
- Nombre del producto en Bukhari Script, vertical, color beige, sobre el lado derecho de la imagen
- Cuadro informativo debajo con título H3 pequeño en `--color-primary` y descripción

### `BrandBanner`

- Bloque `--color-primary` a todo el ancho del contenedor
- Patrón de ilustraciones como `background-image` (SVG) con opacidad 8–12 %
- Variante Home: frase "Saludable, pero no aburrido." en Bukhari Script beige, levemente inclinada, con subrayado de trazo
- Variante Menú: recuadro beige inclinado (~-4°) con "Nuestra comida" en Bukhari Script vinotinto

### `TagChip`

- Fondo `--color-beige`, borde 1px `--color-primary-light`, `--radius-pill`
- Texto en Utendo mayúsculas 12–13 px, `--color-primary`
- Solo informativo (no filtra)

### `ContactForm`

- Campos: `nombre` (text), `correo` (email), `mensaje` (textarea)
- Rótulos visibles en Utendo mayúsculas sobre cada campo, vinculados con `for`/`id`
- Estilo de campo: fondo `--color-beige`, borde 1px `--color-primary`, `--radius-sm`, `--shadow-retro`
- Estados:
  - Reposo: borde `--color-primary`
  - Foco: borde 2px `--color-primary-light` y cursor visible (según Figma)
  - Error: borde `--color-error` y mensaje debajo del campo
  - Enviado: mensaje de confirmación en `--color-success`
- Validación: los 3 campos son obligatorios y `correo` debe tener formato válido
- Pendiente: botón de envío y destino de los mensajes (`mailto:`, servicio de formularios o WhatsApp)

## 4. Páginas

### `index.html` — Home

```
SiteHeader
main
├── section.hero          → imagen grande, --radius-md
├── section#about         → imagen + "HECHO PARA" (Utendo) + "disfrutar" (Bukhari) + texto + Button
├── section.best-sellers  → H2 "Best Sellers" + "Lo más pedido" + 3 BestSellerCard
├── BrandBanner (home)
└── ProductCarousel (Merch, data/merch.json)
SiteFooter
```

- Hero con `<img>` y `alt` descriptivo; `fetchpriority="high"` por ser el elemento más grande
- Best Sellers: 3 columnas en escritorio, carrusel o columna única en móvil

### `menu.html` — Menú

```
SiteHeader
main
├── BrandBanner (menú)
├── section.intro   → H2 "Tú próximo favorito" + subtítulo en mayúsculas
├── div.tag-legend  → 4 TagChip
└── 5 × ProductCarousel (Smoothies, Jugos, Cafés, Especiales, Comida)
SiteFooter
```

- Cada carrusel se genera desde `data/menu.json`

### `contacto.html` — Contáctanos

```
SiteHeader
main
└── section.contact
    ├── div.contact-copy → H2 "¡Amaríamos escucharte!" + texto
    └── ContactForm
SiteFooter
```

- Escritorio: 2 columnas (40 / 60); móvil: texto arriba y formulario debajo

## 5. Datos

### `data/menu.json`

```json
[
  { "category": "Smoothies", "items": [
    { "name": "Mango", "description": "Mango, agua, estevia y limón.", "price": 12000, "tags": ["VG"] },
    { "name": "Frutos rojos", "description": "Fresa, frambuesas y arándanos + estevia.", "price": 12000, "tags": ["VG"] },
    { "name": "Sandía", "description": "Sandía, agua y limón.", "price": 12000, "tags": ["SA"] }
  ]},
  { "category": "Jugos", "items": [
    { "name": "Naranja", "description": "Zumo de naranja.", "price": 10000, "tags": ["VG", "SA"] },
    { "name": "Jugo verde", "description": "Manzana, espinaca y limón.", "price": 15000, "tags": ["VG"] },
    { "name": "Maracuyá", "description": "Maracuyá, agua y estevia.", "price": 12000, "tags": ["VG"] }
  ]},
  { "category": "Cafés", "items": [
    { "name": "Tinto", "description": "Espresso y agua.", "price": 5000, "tags": [] },
    { "name": "Latte", "description": "Espresso y leche.", "price": 10000, "tags": [] },
    { "name": "Iced latte", "description": "Espresso, leche y hielo.", "price": 12000, "tags": [] }
  ]},
  { "category": "Especiales", "items": [
    { "name": "Matcha", "description": "Matcha y leche de preferencia.", "price": 15000, "tags": [] },
    { "name": "Batido proteico", "description": "Proteína, leche de preferencia y banano.", "price": 20000, "tags": ["PRO"] },
    { "name": "Mocha", "description": "Espresso, chocolate y leche de preferencia.", "price": 13000, "tags": [] }
  ]},
  { "category": "Comida", "items": [
    { "name": "Wafle", "description": "Masa de banano, avena y leche + toppings.", "price": 18000, "tags": [] },
    { "name": "Sándwich de pavo", "description": "Pan integral, pavo, queso y vegetales.", "price": 20000, "tags": [] },
    { "name": "Avocado toast", "description": "Tostada de arroz, aguacate y huevo.", "price": 14000, "tags": [] }
  ]}
]
```

### `data/merch.json`

```json
[
  { "name": "Samba 1.1", "price": 180000 },
  { "name": "New Balance 1.1", "price": 200000 },
  { "name": "Medias antideslizantes", "price": 18000 }
]
```

Formato de precio:

```js
const formatCOP = (n) => `$${n.toLocaleString("es-CO")} cop`;
```

## 6. Calidad

- Accesibilidad: contraste AA (vinotinto `#7A1C27` sobre `#F8F2E7` y beige sobre vinotinto cumplen para texto normal); `alt` en todas las imágenes de producto; foco visible; navegación completa por teclado
- Rendimiento: imágenes en WebP/AVIF con `srcset`; `loading="lazy"` en todo lo que esté bajo el primer pantallazo; fuentes `woff2` con `preload` solo para Utendo Regular y Bukhari Script
- SEO: `<title>` y `meta description` por página; datos estructurados `CafeOrCoffeeShop` con dirección, horario y teléfonos
- `lang="es-CO"` en el `<html>`
- Compatibilidad: últimas 2 versiones de Chrome, Safari, Firefox y Edge; Safari iOS
