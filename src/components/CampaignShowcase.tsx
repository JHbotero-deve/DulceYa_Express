import React, { useState } from 'react';
import { Play, ShieldCheck, Film, Sparkles, Check, Copy, ExternalLink, Cpu } from 'lucide-react';
import { CAMPAIGN_VIDEOS } from '../data/campaigns';

interface CampaignShowcaseProps {
  onOpenVideoModal: (fileName: string) => void;
  onOpenC2PAModal: (fileName: string) => void;
}

export const CampaignShowcase: React.FC<CampaignShowcaseProps> = ({
  onOpenVideoModal,
  onOpenC2PAModal
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="videos-campanas-c2pa" className="py-14 sm:py-20 bg-stone-950 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold mb-2">
              <Film className="w-3.5 h-3.5" />
              <span>Campañas Oficiales DulceYa Express 2026</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-black text-white tracking-tight">
              Campañas Audiovisuales & Procedencia C2PA
            </h2>
            <p className="mt-1 text-sm text-stone-400 max-w-2xl">
              Revisa los spots oficiales creados para DulceYa Express Medellín con Takis, chamoy, vasos locos y entrega en moto. Cada pieza cuenta con manifiesto digital firmado bajo el estándar C2PA / XMP.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenC2PAModal(CAMPAIGN_VIDEOS[0].fileName)}
              className="px-4 py-2.5 text-xs font-bold bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Inspeccionar Manifiestos C2PA</span>
            </button>
          </div>
        </div>

        {/* Campaign Media Cards Grid (3 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {CAMPAIGN_VIDEOS.map((video, idx) => (
            <div
              key={video.fileName}
              className="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-amber-500/40 transition-colors"
            >
              <div>
                {/* Media thumbnail with play trigger */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-black">
                  <img
                    src={video.posterUrl}
                    alt={video.title}
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/campaigns/DulceYa Express.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

                  {/* Play / View Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => onOpenVideoModal(video.fileName)}
                      className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
                      aria-label={`Ver ${video.title}`}
                    >
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </button>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 text-[10px] font-bold bg-black/70 backdrop-blur-md rounded-lg text-amber-300 border border-white/10">
                      {idx === 0 ? 'Spot Principal Oficial' : `Campaña ${idx + 1}`}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-400 rounded-md border border-emerald-500/30 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      C2PA Valid
                    </span>
                  </div>

                  <span className="absolute bottom-3 right-3 px-2 py-0.5 text-[11px] font-mono font-bold bg-black/80 rounded-md text-white">
                    {video.duration}
                  </span>
                </div>

                {/* Content description */}
                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                    {video.title}
                  </h3>
                  <p className="text-xs text-amber-400/90 font-medium line-clamp-1">"{video.tagline}"</p>
                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">{video.description}</p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 bg-stone-950/80 border-t border-stone-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenVideoModal(video.fileName)}
                  className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Ver Spot</span>
                </button>

                <button
                  onClick={() => onOpenC2PAModal(video.fileName)}
                  className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white font-semibold text-xs flex items-center gap-1 transition-colors border border-stone-700 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>C2PA / XMP</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Provenance Comparison Table */}
        <div className="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-6">
            <Cpu className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-lg font-bold text-white">
                Cuadro Comparativo de Atributos & Procedencia Digital C2PA / XMP
              </h3>
              <p className="text-xs text-stone-400">
                Información técnica verificada registrada en los metadatos de las piezas oficiales DulceYa Express
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-800 text-stone-400 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 font-semibold">Atributo</th>
                  <th className="py-3 px-4 font-semibold text-amber-400">DulceYa Express Spot</th>
                  <th className="py-3 px-4 font-semibold text-amber-400">Una sorpresa para la familia</th>
                  <th className="py-3 px-4 font-semibold text-amber-400">Un antojo entre amigos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60 font-mono text-[11px] sm:text-xs">
                <tr>
                  <td className="py-3 px-4 font-sans font-medium text-stone-300">Fecha de creación</td>
                  <td className="py-3 px-4 text-stone-300">2026-10-28</td>
                  <td className="py-3 px-4 text-stone-300">2026-10-28</td>
                  <td className="py-3 px-4 text-stone-300">2026-10-28</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-medium text-stone-300">Herramienta de creación</td>
                  <td className="py-3 px-4 text-amber-300">Canva AI (Metal Engine, Jorge botero)</td>
                  <td className="py-3 px-4 text-amber-300">Canva AI (Canva engine=jc)</td>
                  <td className="py-3 px-4 text-amber-300">Canva AI (Canva engine=jc)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-medium text-stone-300">Contenido generado por IA</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Sí (ContainsAiGeneratedContent: Yes)</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Sí (ContainsAiGeneratedContent: Yes)</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Sí (ContainsAiGeneratedContent: Yes)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-medium text-stone-300">ID Ext (XMP Attrib)</td>
                  <td className="py-3 px-4 text-stone-300 break-all select-all">
                    <span>metal-01917294-c72f-4887-8884-f3ffbea1a6ca</span>
                  </td>
                  <td className="py-3 px-4 text-stone-300 break-all select-all">
                    <span>metal-ffe2fa2f-9a32-41e9-95af-f728c5d84818</span>
                  </td>
                  <td className="py-3 px-4 text-stone-300 break-all select-all">
                    <span className="text-amber-300 font-bold">7afd0e3c-db7f-4074-8fbd-995c4a3b7bc7</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-medium text-stone-300">C2PA Claim ID</td>
                  <td className="py-3 px-4 text-amber-300/90 break-all select-all">
                    <span>urn:c2pa:b12117a7-4f7c-4786-8166-cb968c72396e</span>
                  </td>
                  <td className="py-3 px-4 text-amber-300/90 break-all select-all">
                    <span>urn:c2pa:b72ead5d-9609-4e1c-81bb-e00eaad9ca2f</span>
                  </td>
                  <td className="py-3 px-4 text-amber-300/90 break-all select-all">
                    <span>urn:c2pa:ffc43bd0-5313-4324-affc-107dc6319be2</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-medium text-stone-300">C2PA Instance ID</td>
                  <td className="py-3 px-4 text-stone-400 break-all select-all">
                    <span>xmp:iid:ed0bb428-8004-49cc-95c2-0f38c7767c1c</span>
                  </td>
                  <td className="py-3 px-4 text-stone-400 break-all select-all">
                    <span>xmp:iid:1285b9e2-1046-43c5-965d-33db88c76d7c</span>
                  </td>
                  <td className="py-3 px-4 text-stone-400 break-all select-all">
                    <span>xmp:iid:9937cc2d-ce6b-446c-b4f9-0278d030f2f5</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
