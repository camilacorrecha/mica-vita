# Sitio Mica Vita

## Cómo verlo

Abre `index.html` con doble clic. No necesita instalar nada ni servidor.

## Estructura

- `index.html`: Home
- `menu.html`: Menú
- `contacto.html`: Contáctanos
- `about.html`: About us
- `ubicacion.html`: Ubicación (Blume Estudio, zona de Colina)
- `css/tokens.css`: colores, tipografías y medidas de la marca
- `css/base.css`: estilos generales y botones
- `css/components.css`: header, footer, tarjetas, carruseles, formulario
- `data/data.js`: **productos, descripciones, precios y etiquetas** (edita aquí el menú y la merch)
- `js/main.js`: menú móvil, carrito (conteo) y avisos
- `js/carousel.js`: arma los carruseles a partir de `data/data.js`
- `js/contact-form.js`: validación del formulario

## Fuentes

Copia los archivos de la marca en `fonts/` con estos nombres:

- `BukhariScript.woff2`
- `Utendo-Regular.woff2`
- `Utendo-SemiBold.woff2`
- `Utendo-Bold.woff2`

Mientras no estén, el sitio usa Pacifico y Outfit (ya incluidas en `fonts/`), las alternativas que indica el manual de marca.

## Imágenes

Cada imagen busca primero una foto y, si no la encuentra, usa la ilustración `.svg`. Para poner una foto real, copia el archivo en la misma carpeta con el mismo nombre en `.jpg`, `.png` o `.webp` (por ejemplo `img/menu/mango.jpg`). No hay que tocar el código.

`img/home/`

- `hero`: imagen grande del inicio
- `hecho-para-disfrutar`
- `wafle`, `iced-latte`, `smoothie`: Best Sellers

`img/menu/`

- `mango`, `frutos-rojos`, `sandia`
- `naranja`, `jugo-verde`, `maracuya`
- `tinto`, `latte`, `iced-latte`
- `matcha`, `batido-proteico`, `mocha`
- `wafle`, `sandwich-de-pavo`, `avocado-toast`

`img/merch/`

- `samba-1-1`, `new-balance-1-1`, `medias-antideslizantes`

Si agregas un producto en `data/data.js`, su imagen se busca con el nombre en minúsculas, sin tildes y con guiones.

Las fotos de `about.html` y la foto principal de `ubicacion.html` se cargan desde Unsplash (licencia libre de Unsplash). Autores: Sara Cervera, Vicky Ng, Shoeib Abolhassani, Taylor Friehl, Brenda Godinez, nameless 3791 y Kris Atomic. Para usar fotos propias, reemplaza las direcciones `https://images.unsplash.com/...` por la ruta de tu imagen.

## Pendientes

- Confirmar el correo de la marca: cambiarlo en el footer de las 5 páginas (en `build.py` o en cada `.html`) y en `js/contact-form.js` (`CONTACT_EMAIL`)
- El formulario abre el correo de quien escribe con el mensaje listo; para recibirlo directo se necesita un servicio de formularios (p. ej. Formspree)
- El carrito solo cuenta productos; falta definir si el pedido se cierra por WhatsApp, página de carrito o pago en línea
- Mapa de `ubicacion.html`: cuando se confirme la dirección exacta, reemplazar el contenido de `.map-frame` por el iframe de Google Maps (hay un comentario en el código que indica dónde)
- El footer dice "Colina Campestre, Bogotá D.C."; confirmar si debe mencionar Blume Estudio
- Botón de Home: dice "Conócenos" y lleva al Menú (el documento decía "Contáctenos")
