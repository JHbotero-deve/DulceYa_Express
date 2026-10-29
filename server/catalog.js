export const PRODUCTS = Object.freeze({
  "vaso-loco-mango-chamoy": 18000,
  "gomitas-enchiladas-artesanales": 16000,
  "takis-fuego-clasicos": 12000,
  "takis-blue-heat": 14000,
  "aros-manzana-tajin": 15000,
  "skwinkles-salsagheti-sandia": 8500,
  "pelon-pelo-rico-tamarindo": 11000,
  "pulparindo-clasico-extra": 9500,
  "paletas-vero-mango-elote": 10000,
  "duvalin-bisabor-pack": 10000,
  "trufas-chocolate-avellana-mani": 14000,
  "rollito-chamoy-tajin": 7500,
  "combo-desembalaje-fuego": 45000,
  "combo-la-chimba-amigos": 52000,
  "caja-sorpresa-familiar-dulces": 58000
});
export const BOXES = Object.freeze({
  "caja-roja-express": 8000,
  "caja-fuego-extremo": 9000,
  "caja-amigos-parche": 7500,
  "caja-regalo-sorpresa": 10000
});
export const TOPPINGS = Object.freeze({
  "chamoy-extra-pote": 3500,
  "tajin-limon-polvo": 2000,
  "miguelito-dulce-chile": 2000,
  "cuñas-limon-fresco": 1500,
  "salsa-habanero-extrema": 3000,
  "duvalin-adicional": 2500
});
export function calculateOrder(items) {
  if (!Array.isArray(items) || items.length < 1 || items.length > 30) throw new Error("Carrito inválido.");
  let subtotal = 0;
  const normalized = items.map((entry) => {
    if (!entry || !Number.isInteger(entry.quantity) || entry.quantity < 1 || entry.quantity > 20) throw new Error("Cantidad inválida.");
    if (entry.type === "dessert") {
      if (!Object.hasOwn(PRODUCTS, entry.id)) throw new Error("Producto no válido.");
      subtotal += PRODUCTS[entry.id] * entry.quantity;
      return { type: "dessert", id: entry.id, quantity: entry.quantity, unitPriceCop: PRODUCTS[entry.id] };
    }
    if (entry.type === "custom_box") {
      if (entry.quantity !== 1 || !Object.hasOwn(BOXES, entry.boxId) || !Array.isArray(entry.desserts) || entry.desserts.length < 1 || entry.desserts.length > 20 || !Array.isArray(entry.toppings) || entry.toppings.length > Object.keys(TOPPINGS).length) throw new Error("Caja personalizada inválida.");
      let boxTotal = BOXES[entry.boxId];
      const selected = entry.desserts.map((dessert) => {
        if (!dessert || !Object.hasOwn(PRODUCTS, dessert.id) || !Number.isInteger(dessert.quantity) || dessert.quantity < 1 || dessert.quantity > 20) throw new Error("Producto de caja inválido.");
        boxTotal += PRODUCTS[dessert.id] * dessert.quantity;
        return { id: dessert.id, quantity: dessert.quantity, unitPriceCop: PRODUCTS[dessert.id] };
      });
      const toppingIds = new Set();
      for (const id of entry.toppings) {
        if (!Object.hasOwn(TOPPINGS, id) || toppingIds.has(id)) throw new Error("Adicional inválido.");
        toppingIds.add(id);
        boxTotal += TOPPINGS[id];
      }
      subtotal += boxTotal;
      return { type: "custom_box", boxId: entry.boxId, quantity: 1, desserts: selected, toppings: [...toppingIds], unitPriceCop: boxTotal };
    }
    throw new Error("Tipo de artículo inválido.");
  });
  if (!Number.isSafeInteger(subtotal) || subtotal < 1 || subtotal > 100000000) throw new Error("Total del pedido inválido.");
  const deliveryFee = subtotal >= 50000 ? 0 : 5000;
  return { items: normalized, subtotalCop: subtotal, deliveryFeeCop: deliveryFee, totalCop: subtotal + deliveryFee, amountInCents: (subtotal + deliveryFee) * 100 };
}
