# Mica Vita — Spec de producto

## 1. ¿Qué es?

Sitio web informativo de **Mica Vita**, cafetería de productos saludables ubicada en Colina Campestre, Bogotá D.C. El sitio presenta la marca, muestra el menú con sus precios y etiquetas nutricionales, exhibe productos de merch y ofrece un formulario de contacto.

- Tipo de producto: sitio web de 3 páginas (Home, Menú, Contáctanos)
- Objetivo principal: que la visitante conozca la oferta, encuentre su próximo producto favorito y sepa cómo llegar o comunicarse con la cafetería
- Objetivo secundario: dar visibilidad a la línea de merch (calzado y medias antideslizantes)
- Mensaje de marca: "Saludable, pero no aburrido."

## 2. ¿Para quién?

- Mujeres de todas las edades con una vida deportiva activa
- Practicantes de pilates, barre y jumping
- Personas que buscan opciones saludables (veganas, sin azúcar, proteicas, sin gluten) sin renunciar al sabor
- Clientes que quieren comunicarse con la marca: preguntas, solicitudes de catering o contacto general

Necesidades que el sitio resuelve:

- Identificar rápido qué productos se ajustan a su dieta, mediante las etiquetas `VG`, `SA`, `PRO` y `SG`
- Conocer precios antes de visitar el local
- Encontrar dirección, horarios y canales de contacto desde cualquier página
- Ver y adquirir la merch relacionada con su actividad deportiva

## 3. ¿Qué debe tener?

### Componentes globales

#### SECCIÓN A — Encabezado

Presente en las 3 páginas.

- Izquierda: logotipo de Mica Vita, que enlaza a Home
- Derecha: navegación con `MENÚ`, `CONTÁCTANOS`, `ABOUT US`, `UBICACIÓN`
- Al final de la navegación: ícono de carrito de compras dentro de un círculo vinotinto, con un indicador de cantidad

> Pendiente: el documento no define páginas para `ABOUT US` ni `UBICACIÓN`. Se propone que `ABOUT US` lleve al bloque "Hecho para disfrutar" de Home y `UBICACIÓN` a la SECCIÓN Z, hasta que existan páginas propias.

> Pendiente: el comportamiento del carrito (página de carrito, checkout o pedido por WhatsApp) no está definido.

#### SECCIÓN Z — Ficha de contacto

Presente al final de las 3 páginas.

- Izquierda: bloque vinotinto con el logo de Mica Vita en letras beige
- Centro, columna 1:
  - DIRECCIÓN: Colina Campestre, Bogotá D.C
  - HORARIO: Lunes a viernes: 2 pm a 8 pm · Sábados y domingos: 8 am a 1 pm
- Derecha, columna 2:
  - INSTAGRAM: @micavita
  - WHATSAPP: +57 317 4681666 · +57 311 4394285
  - CORREO: dirección de correo de la marca

> Pendiente: el documento indica `@micavita@gmail.com` (formato inválido) y el diseño de Figma muestra otra dirección personal. Hay que confirmar el correo definitivo.

### Página 1 — Home

En orden vertical:

1. SECCIÓN A
2. **Hero**: imagen grande a todo el ancho del contenedor, con fotografía de clientas disfrutando productos Mica Vita
3. **Bloque "Hecho para disfrutar"**
   - Izquierda: imagen de producto
   - Derecha: título "HECHO PARA" en Utendo seguido de "disfrutar" en Bukhari Script
   - Texto: "Creamos bebidas y sabores pensados para acompañar tus días, desde una pausa tranquila hasta ese momento en el que simplemente quieres algo rico."
   - Botón redondeado vinotinto
   > Pendiente: el documento dice "Contáctenos" y el diseño de Figma muestra "Conócenos →". Hay que definir el texto y el destino del botón.
4. **Best Sellers** — título "Best Sellers" con subtítulo "Lo más pedido". Tres tarjetas, cada una con imagen y nombre vertical sobre la imagen, más un cuadro informativo debajo:
   - Wafle → "WAFLE SALUDABLE — Masa de banano, avena y leche, con cubierta de frutas y salsa a escoger."
   - Iced Latte → "ICED LATTE — Café frío a base de expreso, leche y hielo."
   - Smoothie → "SMOOTHIE DE FRUTOS ROJOS — Delicioso batido a base de fresa, frambuesas y arándanos, endulzado con estevia."
5. **Banner de marca**: bloque vinotinto con ilustraciones transparentes de fondo y la frase "Saludable, pero no aburrido."
6. **Merch**
   - Izquierda: bloque vinotinto con "Merch" escrito en vertical
   - Carrusel de 3 tarjetas visibles con flechas izquierda y derecha en círculos vinotinto
   - Productos:
     - Samba 1.1 — $180.000 COP
     - New Balance 1.1 — $200.000 COP
     - Medias antideslizantes — $18.000 COP
   - Cada tarjeta lleva imagen, cuadro informativo con nombre, precio en color de acento y botón `+`
7. SECCIÓN Z

### Página 2 — Menú

En orden vertical:

1. SECCIÓN A
2. **Banner "Nuestra comida"**: bloque vinotinto con ilustraciones animadas de comidas y un recuadro beige inclinado con el texto "Nuestra comida"
3. **Introducción**
   - "Tú próximo favorito" en Bukhari Script
   - "ELIGE POR ANTOJO, LO SALUDABLE YA VIENE INCLUIDO."
4. **Leyenda de etiquetas**: 4 cuadros (chips) con `VG – VEGANO`, `SA: SIN AZÚCAR`, `PRO: PROTEICO` y `SG: SIN GLUTEN`
5. **Categorías del menú**: misma estructura que Merch (bloque vinotinto con el nombre de la categoría en vertical, más un carrusel con flechas). Cada tarjeta lleva imagen, etiqueta dietaria en la esquina inferior derecha de la imagen, nombre, descripción, precio y botón `+`.
   - **Smoothies** (todos a $12.000 COP)
     - Mango — Mango, agua, estevia y limón · `VG`
     - Frutos rojos — Fresa, frambuesas y arándanos + estevia · `VG`
     - Sandía — Sandía, agua y limón · `SA`
   - **Jugos**
     - Naranja — Zumo de naranja · $10.000 COP · `VG` `SA`
     - Jugo verde — Manzana, espinaca y limón · $15.000 COP · `VG`
     - Maracuyá — Maracuyá, agua y estevia · $12.000 COP · `VG`
   - **Cafés**
     - Tinto — Espresso y agua · $5.000 COP
     - Latte — Espresso y leche · $10.000 COP
     - Iced latte — Espresso, leche y hielo · $12.000 COP
   - **Especiales**
     - Matcha — Matcha y leche de preferencia · $15.000 COP
     - Batido proteico — Proteína, leche de preferencia y banano · $20.000 COP · `PRO`
     - Mocha — Espresso, chocolate y leche de preferencia · $13.000 COP
   - **Comida**
     - Wafle — Masa de banano, avena y leche + toppings · $18.000 COP
     - Sándwich de pavo — Pan integral, pavo, queso y vegetales · $20.000 COP
     - Avocado toast — Tostada de arroz, aguacate y huevo · $14.000 COP
6. SECCIÓN Z

> Nota: descripciones y etiquetas tomadas del diseño de Figma; el documento solo define nombres y precios. Ninguno de los productos actuales lleva la etiqueta `SG`.

### Página 3 — Contáctanos

En orden vertical:

1. SECCIÓN A
2. **Bloque de contacto** en dos columnas
   - Izquierda:
     - "¡Amaríamos escucharte!" en Bukhari Script
     - Texto en Utendo: "Como cliente, usted forma parte de nuestra familia extendida. Ya sea que tenga preguntas, solicitudes de servicio de catering o simplemente quiera ponerse en contacto con nosotros, aquí estamos."
   - Derecha: formulario con 3 campos
     - Fila superior: `NOMBRE` y `CORREO`
     - Fila inferior: `MENSAJE` (área de texto amplia)
   - Estados del formulario definidos en Figma: reposo y foco de cada campo
   > Pendiente: ni el documento ni el diseño incluyen botón de envío ni definen a dónde llegan los mensajes.
3. SECCIÓN Z

## 4. Aspecto visual

### Personalidad

- Elegante, vintage y retro
- Cálida y cercana: fondos crema, vinotinto como color protagonista, script de trazo manual para los acentos
- Fotografía de producto real sobre fondo neutro y fotografía ambiental cálida en el hero

### Tipografía

- `H1` — Bukhari Script · 72 px escritorio / 48 px móvil · interlineado 100 %
- `H2` — Bukhari Script · 48 px escritorio / 36 px móvil · interlineado 110 %
- `H3` — Utendo Bold, mayúsculas · 28 px escritorio / 22 px móvil · interlineado 120 %
- `Body` — Utendo Regular · 17 px escritorio / 16 px móvil · interlineado 160 %
- `Button` — Utendo SemiBold, mayúsculas, espaciado +12 % · 15 px · interlineado 100 %

### Colores

- Primario: `#7A1C27` vinotinto (base) · `#4C0E17` vinotinto oscuro · `#A2434C` vinotinto claro
- Secundario: `#EFE3CE` beige · `#D2B48C` tan
- Neutros: `#000000` negro · `#5A4642` café grisáceo · `#F8F2E7` crema
- Promociones: `#EFE3CE`
- Estados: `#2E6B3F` éxito · `#B3261E` error

### Recursos gráficos

- Logo Mica Vita en Bukhari Script: versión vinotinto sobre claro y versión beige sobre vinotinto
- Ilustraciones de comidas animadas en línea, usadas como textura translúcida sobre bloques vinotinto
- Tarjetas con esquinas redondeadas, borde fino vinotinto y sombra desplazada que refuerza el aire retro
- Rótulos verticales en bloques vinotinto para nombrar categorías (Merch, Smoothies, Jugos, Cafés, Especiales, Comida)
