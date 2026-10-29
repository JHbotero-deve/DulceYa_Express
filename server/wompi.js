import { createHash, randomUUID, timingSafeEqual } from "node:crypto";
export function createReference() { return `DY${Date.now().toString(36).toUpperCase()}${randomUUID().replaceAll("-", "").slice(0, 16).toUpperCase()}`; }
export function createIntegritySignature(reference, amountInCents, secret) {
  if (!reference || !Number.isSafeInteger(amountInCents) || amountInCents < 1 || !secret) throw new Error("Datos de firma inválidos.");
  return createHash("sha256").update(`${reference}${amountInCents}COP${secret}`, "utf8").digest("hex");
}
function getPathValue(object, path) { return path.split(".").reduce((value, key) => value == null ? undefined : value[key], object); }
export function verifyWompiEvent(event, secret, headerChecksum) {
  try {
    const signature = event?.signature;
    if (!secret || !Array.isArray(signature?.properties) || !Number.isFinite(event?.timestamp) || typeof signature?.checksum !== "string") return false;
    const expected = createHash("sha256").update(signature.properties.map((path) => {
      const value = getPathValue(event.data, path);
      if (value === undefined || value === null) throw new Error("Propiedad de firma ausente.");
      return String(value);
    }).join("") + String(event.timestamp) + secret, "utf8").digest("hex");
    const received = String(headerChecksum || signature.checksum).toLowerCase();
    if (!/^[a-f0-9]{64}$/.test(received) || received !== signature.checksum.toLowerCase()) return false;
    const a = Buffer.from(expected, "hex"), b = Buffer.from(received, "hex");
    return a.length === b.length && timingSafeEqual(a, b);
  } catch { return false; }
}
export function normalizeCustomer(input = {}) {
  const customer = { name: String(input.name || "").trim().slice(0,120), email: String(input.email || "").trim().toLowerCase().slice(0,254), phone: String(input.phone || "").replace(/[^0-9+]/g,"").slice(0,20), recipientName: String(input.recipientName || "").trim().slice(0,120), address: String(input.address || "").trim().slice(0,250), neighborhood: String(input.neighborhood || "").trim().slice(0,100), notes: String(input.notes || "").trim().slice(0,500), surprise: input.surprise === true };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) throw new Error("Ingresa un correo electrónico válido.");
  if (!customer.address || !customer.neighborhood || !customer.recipientName || customer.phone.replace(/\D/g,"").length < 7) throw new Error("Completa los datos de entrega.");
  return customer;
}
