import React,{useState} from "react";
import {CreditCard,LoaderCircle} from "lucide-react";
import {CartItem} from "../types";
type CheckoutConfig={currency:string;amountInCents:number;reference:string;publicKey:string;signature:{integrity:string};redirectUrl:string};
declare global{interface Window{WidgetCheckout?:new(config:CheckoutConfig)=>{open:(callback?:(result:unknown)=>void)=>void}}}
interface Props{cartItems:CartItem[];selectedNeighborhood:string;deliveryAddress:string;recipientName:string;recipientPhone:string;isSurpriseDelivery:boolean;specialInstructions:string}
async function loadWidget(){
 if(window.WidgetCheckout)return;
 await new Promise<void>((resolve,reject)=>{
  const existing=document.querySelector<HTMLScriptElement>('script[src="https://checkout.wompi.co/widget.js"]');
  if(existing){existing.addEventListener("load",()=>resolve(),{once:true});existing.addEventListener("error",()=>reject(new Error("No se pudo cargar Wompi.")),{once:true});return}
  const script=document.createElement("script");script.src="https://checkout.wompi.co/widget.js";script.onload=()=>resolve();script.onerror=()=>reject(new Error("No se pudo cargar Wompi."));document.head.appendChild(script);
 });
 if(!window.WidgetCheckout)throw new Error("El checkout de Wompi no está disponible.");
}
export const WompiButton:React.FC<Props>=({cartItems,selectedNeighborhood,deliveryAddress,recipientName,recipientPhone,isSurpriseDelivery,specialInstructions})=>{
 const[email,setEmail]=useState("");const[busy,setBusy]=useState(false);const[error,setError]=useState("");
 const handlePay=async()=>{
  setBusy(true);setError("");
  try{
   const items=cartItems.map(item=>item.type==="custom_box"&&item.customBoxData?{type:"custom_box",boxId:item.customBoxData.boxType.id,quantity:1,desserts:item.customBoxData.selectedDesserts.map(({item:d,quantity})=>({id:d.id,quantity})),toppings:item.customBoxData.extraToppings.filter(t=>t.selected).map(t=>t.id)}:{type:"dessert",id:item.id==="default-1"?"vaso-loco-mango-chamoy":item.id,quantity:item.quantity});
   const response=await fetch("/api/wompi/checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items,customer:{email,phone:recipientPhone,recipientName,address:deliveryAddress,neighborhood:selectedNeighborhood,notes:specialInstructions,surprise:isSurpriseDelivery}})});
   const data=await response.json();if(!response.ok)throw new Error(data.error||"No se pudo iniciar el pago.");
   await loadWidget();const checkout=new window.WidgetCheckout!({currency:data.currency,amountInCents:data.amountInCents,reference:data.reference,publicKey:data.publicKey,signature:{integrity:data.signature},redirectUrl:data.redirectUrl});checkout.open();
  }catch(err){setError(err instanceof Error?err.message:"Error iniciando el pago.")}finally{setBusy(false)}
 };
 return <div className="space-y-2">
  <label className="block text-[11px] text-stone-600 font-bold">Correo para el comprobante de pago</label>
  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="correo@ejemplo.com" required className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-white"/>
  {error&&<p role="alert" className="text-xs text-rose-700">{error}</p>}
  <button type="button" onClick={handlePay} disabled={busy||!email.trim()||cartItems.length===0||!deliveryAddress.trim()||!recipientName.trim()||recipientPhone.replace(/\D/g,"").length<7} className="w-full py-3 rounded-2xl bg-indigo-700 hover:bg-indigo-800 disabled:opacity-50 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all">{busy?<LoaderCircle className="w-4 h-4 animate-spin"/>:<CreditCard className="w-4 h-4"/>} Pagar de forma segura con Wompi</button>
  <p className="text-[10px] text-stone-500 text-center">El total se calcula en el servidor. El pedido se confirma solo al verificar el pago.</p>
 </div>;
};
