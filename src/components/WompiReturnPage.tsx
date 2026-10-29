import React,{useEffect,useState} from "react";
import {CheckCircle2,Clock3,XCircle} from "lucide-react";
type Result={reference:string;status:string;amountInCents:number;currency:string};
export const WompiReturnPage:React.FC=()=>{
 const[result,setResult]=useState<Result|null>(null);const[error,setError]=useState("");const[loading,setLoading]=useState(true);
 useEffect(()=>{const id=new URLSearchParams(window.location.search).get("id");if(!id){setError("No recibimos el identificador de la transacción.");setLoading(false);return}
  fetch(`/api/wompi/transacciones/${encodeURIComponent(id)}`).then(async response=>{const data=await response.json();if(!response.ok)throw new Error(data.error||"No fue posible verificar el pago.");return data as Result}).then(setResult).catch((err:unknown)=>setError(err instanceof Error?err.message:"No fue posible verificar el pago.")).finally(()=>setLoading(false));
 },[]);
 const approved=result?.status==="APPROVED";const declined=["DECLINED","ERROR","VOIDED"].includes(result?.status||"");
 return <main className="min-h-screen flex items-center justify-center bg-[#FAF7F2] p-5"><section className="w-full max-w-lg rounded-3xl bg-white border border-stone-200 p-8 text-center shadow-xl space-y-4">{loading?<Clock3 className="w-12 h-12 mx-auto text-amber-600"/>:approved?<CheckCircle2 className="w-12 h-12 mx-auto text-emerald-600"/>:declined?<XCircle className="w-12 h-12 mx-auto text-rose-600"/>:<Clock3 className="w-12 h-12 mx-auto text-amber-600"/>}
 <h1 className="text-2xl font-black text-stone-900">Estado de tu pago</h1>{loading?<p>Consultando la transacción con Wompi…</p>:error?<p role="alert" className="text-rose-700">{error}</p>:<><p className="font-semibold">{approved?"Pago aprobado":declined?"El pago no fue aprobado":"Pago pendiente de confirmación"}</p><p className="text-sm text-stone-600">Referencia: {result?.reference}</p><p className="text-lg font-bold">${Math.round((result?.amountInCents||0)/100).toLocaleString("es-CO")} COP</p></>}
 <p className="text-xs text-stone-500">La redirección no confirma el pago por sí sola. El estado se consulta directamente a Wompi.</p><a href="/" className="inline-block px-5 py-3 rounded-xl bg-stone-900 text-white font-bold">Volver a DulceYa Express</a></section></main>;
};
