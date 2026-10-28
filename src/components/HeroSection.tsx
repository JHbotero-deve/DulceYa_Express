import React, { useState } from 'react';
import { Play, Sparkles, Clock, ShieldCheck, ChevronRight, Gift, Truck, Check, MessageCircle, Flame } from 'lucide-react';
import { CAMPAIGN_VIDEOS } from '../data/campaigns';

interface HeroSectionProps {
  onExploreCatalog: () => void;
  onOpenBoxBuilder: () => void;
  onOpenVideoModal: (fileName: string) => void;
  onOpenC2PAModal: (fileName: string) => void;
  onOpenWhatsAppDirect: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalog,
  onOpenBoxBuilder,
  onOpenVideoModal,
  onOpenC2PAModal,
  onOpenWhatsAppDirect
}) => {
  const [isPlayingHeroVideo, setIsPlayingHeroVideo] = useState(false);
  const officialSpot = CAMPAIGN_VIDEOS[0];

  return (
    <section className="relative overflow-hidden pt-8 pb-14 lg:pt-12 lg:pb-20 border-b border-stone-200 bg-[#FAF7F2]">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-200/40 via-rose-200/20 to-transparent -z-10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Medellín Local Tagline from official flyer */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 border border-rose-300 text-rose-900 text-xs font-bold shadow-xs">
              <span>🤍 MEDELLÍN</span>
              <span className="text-stone-400">·</span>
              <span>Tus dulces favoritos en la ciudad más chimba</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-900 leading-[1.08]">
              🤤 ¿ANTOJADO? <br />
              <span className="text-amber-600 italic underline decoration-rose-500 decoration-wavy decoration-2">
                Te desembalamos en minutos.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              En <strong>DulceYa Express Medellín</strong> traemos los auténticos dulces mexicanos, chamoy artesanal, mango con Tajín, Takis Fuego, gomitas enchiladas y Duvalín directo a tu puerta o parche en minutos.
            </p>

            {/* 4 Official Guarantees from flyer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/70 border border-emerald-200/80 shadow-xs">
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-stone-800">Pedido por WhatsApp</span>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/70 border border-emerald-200/80 shadow-xs">
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-stone-800">Dulces y mecatos picantes</span>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/70 border border-emerald-200/80 shadow-xs">
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-stone-800">Entrega Express en Medellín</span>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/70 border border-emerald-200/80 shadow-xs">
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-stone-800">Sin filas ni complicaciones</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-3">
              {/* WhatsApp Call to Action matching the flyer button */}
              <button
                onClick={onOpenWhatsAppDirect}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-700/30 transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-xs">
                  <MessageCircle className="w-4 h-4 fill-emerald-600" />
                </div>
                <span>📲 PEDIR POR WHATSAPP</span>
              </button>

              <button
                onClick={onExploreCatalog}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-stone-900 hover:bg-black text-white font-bold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Ver Mecatos & Vasos Locos</span>
              </button>

              <button
                onClick={onOpenBoxBuilder}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white hover:bg-rose-50 text-rose-800 font-bold text-sm border border-rose-200 hover:border-rose-300 shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Gift className="w-4 h-4 text-rose-600" />
                <span>Armar Caja Antojo</span>
              </button>
            </div>

            {/* Trust numbers */}
            <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-stone-600">
              <div className="flex items-center gap-1.5 font-semibold text-stone-800">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>En minutos en El Poblado, Laureles, Envigado, Belén y Estadio</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold text-stone-800">
                <Truck className="w-4 h-4 text-rose-600" />
                <span>Mochila Térmica Climatizada #DulceYa</span>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Video Spot & Poster Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-800/20 bg-stone-950 text-white group">
              {/* Video Player or Poster Thumbnail */}
              {isPlayingHeroVideo ? (
                <div className="relative aspect-video w-full bg-black">
                  <video
                    src={officialSpot.previewVideoUrl}
                    poster={officialSpot.posterUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                    onEnded={() => setIsPlayingHeroVideo(false)}
                  />
                </div>
              ) : (
                <div className="relative aspect-video w-full bg-stone-950 cursor-pointer" onClick={() => setIsPlayingHeroVideo(true)}>
                  <img
                    src={officialSpot.posterUrl}
                    alt="DulceYa Express Spot Comercial"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

                  {/* Center Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPlayingHeroVideo(true);
                      }}
                      className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer"
                      aria-label="Reproducir spot oficial"
                    >
                      <Play className="w-7 h-7 fill-white ml-1" />
                    </button>
                  </div>
                </div>
              )}

              {/* Badges on top of card */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <span className="px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-white/10 flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Spot Oficial DulceYa Express (10s)
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenC2PAModal(officialSpot.fileName);
                  }}
                  className="pointer-events-auto px-2.5 py-1 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-[11px] font-bold text-emerald-300 border border-emerald-500/40 flex items-center gap-1 backdrop-blur-md transition-colors cursor-pointer"
                  title="Ver credenciales C2PA / Canva AI"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>C2PA Verificado</span>
                </button>
              </div>

              {/* Bottom Card Bar */}
              <div className="p-3.5 bg-stone-900 border-t border-stone-800 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">
                    "¿Antojado? Te desembalamos en minutos."
                  </div>
                  <div className="text-[11px] text-stone-400 truncate">
                    Takis, vasos locos de mango con chamoy, Duvalín y motorizado en Medellín
                  </div>
                </div>

                <button
                  onClick={() => onOpenVideoModal(officialSpot.fileName)}
                  className="px-3 py-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 hover:bg-stone-800 rounded-xl transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <span>Pantalla Completa</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Campaign quick cards (Una sorpresa para la familia & Un antojo entre amigos) */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                onClick={() => onOpenVideoModal('Una sorpresa para la familia.mp4')}
                className="p-3 rounded-2xl bg-white border border-stone-200 hover:border-amber-400 hover:shadow-md transition-all text-left group cursor-pointer"
              >
                <div className="font-bold text-stone-900 group-hover:text-amber-800 flex items-center justify-between">
                  <span>Sorpresa Familiar</span>
                  <Play className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-600 fill-current" />
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                  Caja sorpresa con mecatos para la familia
                </div>
              </button>

              <button
                onClick={() => onOpenC2PAModal('Un antojo entre amigos.png')}
                className="p-3 rounded-2xl bg-white border border-stone-200 hover:border-rose-400 hover:shadow-md transition-all text-left group cursor-pointer"
              >
                <div className="font-bold text-stone-900 group-hover:text-rose-800 flex items-center justify-between">
                  <span>Antojo Amigos</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-400 group-hover:text-rose-600" />
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                  Campaña C2PA (UUID 7afd0e3c)
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
