import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { calculateOrder } from "./catalog.js";
import { createIntegritySignature, normalizeCustomer, verifyWompiEvent } from "./wompi.js";
test("calcula el total del servidor y el envío", () => {
 const order=calculateOrder([{type:"dessert",id:"takis-fuego-clasicos",quantity:4}]);
 assert.equal(order.subtotalCop,48000); assert.equal(order.deliveryFeeCop,5000); assert.equal(order.amountInCents,5300000);
 assert.equal(calculateOrder([{type:"dessert",id:"combo-la-chimba-amigos",quantity:1}]).deliveryFeeCop,0);
});
test("rechaza productos desconocidos y cantidades inválidas", () => {
 assert.throws(()=>calculateOrder([{type:"dessert",id:"inventado",quantity:1}]));
 assert.throws(()=>calculateOrder([{type:"dessert",id:"takis-fuego-clasicos",quantity:0}]));
 assert.equal(calculateOrder([{type:"dessert",id:"takis-fuego-clasicos",quantity:1,price:1}]).subtotalCop,12000);
});
test("recalcula las cajas personalizadas con precios del servidor", () => {
 assert.equal(calculateOrder([{type:"custom_box",boxId:"caja-roja-express",quantity:1,desserts:[{id:"takis-fuego-clasicos",quantity:1}],toppings:["chamoy-extra-pote"]}]).subtotalCop,23500);
});
test("genera la firma de integridad del checkout", () => {
 assert.equal(createIntegritySignature("REF123",1500000,"secret"),createHash("sha256").update("REF1231500000COPsecret").digest("hex"));
});
test("valida checksum del webhook y rechaza cambios", () => {
 const event={event:"transaction.updated",data:{transaction:{id:"tx-1",status:"APPROVED"}},timestamp:123456,signature:{properties:["transaction.id","transaction.status"],checksum:""}};
 event.signature.checksum=createHash("sha256").update("tx-1APPROVED123456secret").digest("hex");
 assert.equal(verifyWompiEvent(event,"secret",event.signature.checksum),true);
 assert.equal(verifyWompiEvent(event,"secret","0".repeat(64)),false);
 event.data.transaction.status="DECLINED"; assert.equal(verifyWompiEvent(event,"secret"),false);
});
test("valida correo y datos de entrega", () => {
 assert.throws(()=>normalizeCustomer({email:"incorrecto"}));
 assert.equal(normalizeCustomer({email:"cliente@ejemplo.com",phone:"3001234567",address:"Calle 1",neighborhood:"Centro",recipientName:"Cliente"}).email,"cliente@ejemplo.com");
});
