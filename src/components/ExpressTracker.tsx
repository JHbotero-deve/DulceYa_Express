import React, { useState } from 'react';
import { Search, MapPin, Truck, CheckCircle2, Clock, Phone, MessageCircle } from 'lucide-react';

export const ExpressTracker: React.FC = () => {
  const [trackingCode, setTrackingCode] = useState<string>('DULCEYA-MED-2026');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [orderState, setOrderState] = useState<number>(3); // 3 = en camino

  const steps = [
    {
      id: 1,
      title: 'Pedido Confirmado por WhatsApp',
      time: '01:10 PM',
      desc: 'Ingresó a taller de mecatos DulceYa Express Medellín.'
    },
    {
      id: 2,
      title: 'Armado de Caja, Escarchado & Chamoy',
      time: '01:22 PM',
      desc: 'Takis crujientes, vasos locos con tajín, dulces empacados y sellado térmico.'
    },
    {
      id: 3,
      title: 'En Ruta Express por Medellín',
      time: '01:38 PM',
      desc: 'Motorizado en mochila térmica roja a 10-15 minutos de tu ubicación.'
    },
    {
      id: 4,
      title: '¡Te Desembalamos! Entrega en Puerta',
      time: 'Estimado 01:50 PM',
      desc: 'Entrega rápida sin filas ni complicaciones para disfrutar en el parche.'
    }
  ];

  const handleSimulateSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 400);
  };

  return (
    <section id="rastreador-express" className="py-14 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <Clock className="w-3.5 h-3.5 text-emerald-700" />
            <span>Seguimiento GPS en Tiempo Real · Medellín</span>
          </div>
          
          <h2 className="font-serif-display text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Rastreo DulceYa Express Medellín
          </h2>
          
          <p className="mt-1.5 text-xs sm:text-sm text-stone-600">
            Sigue minuto a minuto el recorrido del motorizado que viaja con tus dulces mexicanos y chamoy fresco.
          </p>

          {/* Code Search Input */}
          <form onSubmit={handleSimulateSearch} className="mt-5 flex items-center max-w-md mx-auto gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="Código de pedido (ej. DULCEYA-MED-2026 o 7afd0e3c)"
                className="w-full pl-9 pr-3 py-2.5 text-xs font-mono uppercase bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 focus:bg-white"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold bg-amber-900 hover:bg-amber-950 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              {isSearching ? 'Consultando...' : 'Consultar'}
            </button>
          </form>
        </div>

        {/* Live Order Card */}
        <div className="max-w-4xl mx-auto bg-stone-50 rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden">
          
          {/* Header Info */}
          <div className="p-6 bg-gradient-to-r from-stone-900 via-amber-950 to-rose-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-amber-300 font-bold">ORDEN #{trackingCode}</span>
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-rose-600 text-white rounded-md">
                  Mecatos Express Medellín
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold mt-1">
                Combo Desembalaje Fuego + Vaso Loco Mango Tajín
              </h3>
              <p className="text-xs text-stone-300 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Destino: Laureles / Av. Nutibara (Medellín)</span>
              </p>
            </div>

            <div className="sm:text-right bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 shrink-0">
              <div className="text-[11px] text-stone-300 font-medium">Tiempo Estimado de Llegada</div>
              <div className="text-2xl font-black font-mono text-amber-300">10 - 15 MIN</div>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Timeline (7 cols) */}
            <div className="md:col-span-7 space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-4">
                Progreso del Desembalaje Express
              </h4>

              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-stone-200">
                {steps.map((st) => {
                  const isDone = st.id <= orderState;
                  const isCurrent = st.id === orderState;
                  return (
                    <div key={st.id} className="relative flex items-start gap-4">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 text-xs font-bold transition-all ${
                          isCurrent
                            ? 'bg-rose-600 text-white ring-4 ring-rose-100 shadow-md'
                            : isDone
                            ? 'bg-amber-900 text-white'
                            : 'bg-white border-2 border-stone-300 text-stone-400'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : st.id}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5
                            className={`text-xs font-bold ${
                              isCurrent ? 'text-rose-700' : isDone ? 'text-stone-900' : 'text-stone-400'
                            }`}
                          >
                            {st.title}
                          </h5>
                          <span className="text-[11px] font-mono text-stone-500">{st.time}</span>
                        </div>
                        <p className="text-xs text-stone-600 mt-0.5">{st.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* State switcher for demo preview */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
                <span>Simulador de trayecto:</span>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => setOrderState(num)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        orderState === num
                          ? 'bg-amber-900 text-white'
                          : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                      }`}
                    >
                      Paso {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Courier & Map representation (5 cols) */}
            <div className="md:col-span-5 space-y-4">
              
              {/* Courier Card with official red backpack motif */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                    🏍️
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-rose-700">
                      Motorizado Express Medellín
                    </span>
                    <h5 className="text-sm font-bold text-stone-900">Mateo Giraldo C.</h5>
                    <p className="text-xs text-stone-500">Mochila Térmica Climatizada #DulceYa 04</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-900 leading-tight">
                  🛵 <strong>En ruta:</strong> "Rodando por la 70 hacia Laureles. Llevo los Takis crujientes y el chamoy refrigerado para desembalar en minutos."
                </div>

                <div className="pt-1 flex items-center justify-between text-xs">
                  <span className="text-stone-500">Chat con despacho:</span>
                  <a
                    href="https://wa.me/573001234567?text=Hola%20DulceYa%20Express,%20quiero%20saber%20el%20estado%20de%20mi%20pedido%20DULCEYA-MED-2026"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-emerald-700 font-bold hover:underline"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-emerald-600" />
                    <span>WhatsApp Express</span>
                  </a>
                </div>
              </div>

              {/* Map Representation of Medellín */}
              <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-stone-900 border border-stone-300 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80"
                  alt="Ruta de entrega en Medellín"
                  className="w-full h-full object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-stone-950/40" />

                {/* Animated delivery route pin */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-11 h-11 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-2xl animate-bounce">
                    <Truck className="w-5 h-5" />
                  </div>
                  <span className="mt-1.5 px-3 py-1 text-[11px] font-extrabold bg-white text-stone-900 rounded-full shadow-lg border border-stone-200">
                    En ruta Medellín · 1.2 km de tu puerta
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
