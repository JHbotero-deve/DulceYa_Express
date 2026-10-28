import React from 'react';
import { Sparkles, Heart, ShieldCheck, Clock, MapPin, Phone, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  onOpenC2PAModal: (fileName: string) => void;
  onNavigate: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenC2PAModal, onNavigate }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center text-white font-bold shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif-display text-2xl font-bold text-white">DulceYa</span>
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase bg-rose-600 text-white rounded">
                  Express
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Postres artesanales de alta pastelería y cajas sorpresa personalizadas para celebrar a la familia. Entregas express en menos de 60 minutos con dedicatorias de puño y letra.
            </p>

            <div className="flex items-center gap-3 pt-1 text-stone-400">
              <span className="text-xs font-medium">Síguenos:</span>
              <a href="#instagram" className="hover:text-amber-400 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" className="hover:text-amber-400 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Menú & Experiencias
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('catalogo')}
                  className="hover:text-white transition-colors"
                >
                  Tortas Húmedas & Cheesecakes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('caja-sorpresa')}
                  className="hover:text-white transition-colors text-rose-400 font-semibold"
                >
                  Crea tu Caja Sorpresa Familiar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalogo')}
                  className="hover:text-white transition-colors"
                >
                  Fresas Bañadas en Chocolate & Oro
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rastreador')}
                  className="hover:text-white transition-colors"
                >
                  Seguimiento de Repartidor Express
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('videos-campana')}
                  className="hover:text-white transition-colors"
                >
                  Campañas Audiovisuales Oficiales
                </button>
              </li>
            </ul>
          </div>

          {/* Operating hours & zones (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Horario Express
            </h4>
            <div className="space-y-1.5 text-xs text-stone-400">
              <div className="flex items-center gap-1.5 text-stone-300">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Lunes a Domingo</span>
              </div>
              <p className="pl-5 text-stone-400">8:00 AM – 10:00 PM</p>
              <p className="text-[11px] text-emerald-400 font-semibold pt-1">
                ● Taller Dulce & Despachos Activos
              </p>
            </div>
          </div>

          {/* Transparency & C2PA note (3 cols) */}
          <div className="lg:col-span-3 space-y-3 bg-stone-900/80 p-4 rounded-2xl border border-stone-800">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Transparencia C2PA 2026</span>
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Nuestras piezas audiovisuales <em>"DulceYa Express.mp4"</em> y <em>"Una sorpresa para la familia.mp4"</em> cuentan con manifiestos criptográficos C2PA/XMP emitidos en 2026.
            </p>
            <button
              onClick={() => onOpenC2PAModal('Una sorpresa para la familia.mp4')}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 underline block"
            >
              Consultar metadatos técnicos y hashes →
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <div>
            © {new Date().getFullYear()} DulceYa Express. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Hecho con amor y azúcar para reunir a las familias.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
