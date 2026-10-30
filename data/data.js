/* ==========================================================
   Mica Vita — Contenido editable
   Cambia aquí nombres, descripciones, precios (COP) y etiquetas.
   Etiquetas válidas: "VG" (vegano), "SA" (sin azúcar),
   "PRO" (proteico), "SG" (sin gluten).
   Las imágenes se buscan automáticamente con el nombre en
   minúsculas y sin tildes, p. ej. "Sándwich de pavo" →
   img/menu/sandwich-de-pavo.webp
   ========================================================== */

window.MICA_DATA = {
  menu: [
    {
      category: "Smoothies",
      items: [
        { name: "Mango", description: "Mango, agua, estevia y limón.", price: 12000, tags: ["VG"] },
        { name: "Frutos rojos", description: "Fresa, frambuesas y arándanos + estevia.", price: 12000, tags: ["VG"] },
        { name: "Sandía", description: "Sandía, agua y limón.", price: 12000, tags: ["SA"] }
      ]
    },
    {
      category: "Jugos",
      items: [
        { name: "Naranja", description: "Zumo de naranja.", price: 10000, tags: ["VG", "SA"] },
        { name: "Jugo verde", description: "Manzana, espinaca y limón.", price: 15000, tags: ["VG"] },
        { name: "Maracuyá", description: "Maracuyá, agua y estevia.", price: 12000, tags: ["VG"] }
      ]
    },
    {
      category: "Cafés",
      items: [
        { name: "Tinto", description: "Espresso y agua.", price: 5000, tags: [] },
        { name: "Latte", description: "Espresso y leche.", price: 10000, tags: [] },
        { name: "Iced latte", description: "Espresso, leche y hielo.", price: 12000, tags: [] }
      ]
    },
    {
      category: "Especiales",
      items: [
        { name: "Matcha", description: "Matcha y leche de preferencia.", price: 15000, tags: [] },
        { name: "Batido proteico", description: "Proteína, leche de preferencia y banano.", price: 20000, tags: ["PRO"] },
        { name: "Mocha", description: "Espresso, chocolate y leche de preferencia.", price: 13000, tags: [] }
      ]
    },
    {
      category: "Comida",
      items: [
        { name: "Wafle", description: "Masa de banano, avena y leche + toppings.", price: 18000, tags: [] },
        { name: "Sándwich de pavo", description: "Pan integral, pavo, queso y vegetales.", price: 20000, tags: [] },
        { name: "Avocado toast", description: "Tostada de arroz, aguacate y huevo.", price: 14000, tags: [] }
      ]
    }
  ],

  merch: [
    { name: "Samba 1.1", price: 180000 },
    { name: "New Balance 1.1", price: 200000 },
    { name: "Medias antideslizantes", price: 18000 }
  ]
};
