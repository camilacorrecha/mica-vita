# Mica Vita

Sitio web de **Mica Vita**, cafetería saludable en Colina Campestre, Bogotá. *Saludable, pero no aburrido.*

## Páginas

- `index.html`: Inicio (portada, Hecho para disfrutar, Best Sellers, Merch)
- `menu.html`: Menú (smoothies, jugos, cafés, especiales y comida)
- `contacto.html`: Contáctanos
- `about.html`: About us (historia, esencia de la marca)
- `ubicacion.html`: Ubicación (Blume Estudio, zona de Colina)
- `pago.html`: Pago (datos, entrega, método de pago y confirmación)

## Carrito y pago

- Al tocar **+** en un producto se agrega al carrito y aparece el aviso **Ver carrito**.
- El ícono del carrito abre un panel lateral: sumar o restar cantidades, eliminar productos, ver el subtotal e **Ir a pagar**.
- En `pago.html` se puede seguir editando el pedido, elegir efectivo o tarjeta al recoger y confirmar. La confirmación arma el mensaje del pedido para enviarlo por WhatsApp.
- El pago es al recoger en Blume Estudio; para cobrar en línea se necesita una pasarela de pago.

## Cómo verlo

Abre `index.html` en el navegador. No necesita instalación.

Para publicarlo en internet: **Settings → Pages → Branch: `main` / `(root)` → Save**. El sitio queda en `https://camilacorrecha.github.io/mica-vita/`.

## Estructura

- `css/`: estilos y colores de marca (`tokens.css`)
- `js/`: menú móvil, carrito (`cart.js`), pago (`checkout.js`), carruseles y formulario
- `data/data.js`: productos, descripciones y precios (edita aquí el menú)
- `img/`: fotos e ilustraciones
- `fonts/`: tipografías
- `docs/`: spec de producto y spec de diseño y desarrollo

Más detalles y pendientes en [`LEEME.md`](LEEME.md).
