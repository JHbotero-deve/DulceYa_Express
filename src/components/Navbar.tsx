import React from 'react';
import { ShoppingBag, Sparkles, Clock, ShieldCheck, HeartHandshake, PhoneCall, Gift, Search } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenC2PAModal: (fileName: string) => void;
  onOpenVideoModal: (fileName: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  activeSection,
  onNavigate,
  onOpenC2PAModal,
  onOpenVideoModal
}) => {
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-stone-200/80 transition-shadow duration-200">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-amber-50 text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-amber-300" />
          <strong>¡DulceYa Express!</strong> Entregas en menos de 60 min en tu ciudad
        </span>
        <span className="hidden md:inline text-amber-400">·</span>
        <span className="hidden md:inline">Cajas sorpresa personalizadas con tarjeta caligráfica y dedicatoria familiar</span>
        <span className="hidden lg:inline text-amber-400">·</span>
        <button
          onClick={() => onOpenC2PAModal('DulceYa Express.mp4')}
          className="hidden lg:inline-flex items-center gap-1 text-amber-300 underline hover:text-white"
        >
          <ShieldCheck className="w-3 h-3" />
          Ver Credenciales C2PA de la Campaña 2026
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            onClick={() => onNavigate('inicio')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-rose-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif-display text-2xl font-bold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors">
                  DulceYa
                </span>
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-rose-600 text-white rounded-md shadow-sm">
                  Express
                </span>
              </div>
              <p className="text-[11px] font-medium text-stone-500 tracking-wide">
                Postres Artesanales & Sorpresas para la Familia
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => onNavigate('inicio')}
              className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeSection === 'inicio'
                  ? 'text-amber-900 bg-amber-100/70 font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Inicio
            </button>

            <button
              onClick={() => onNavigate('catalogo')}
              className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeSection === 'catalogo'
                  ? 'text-amber-900 bg-amber-100/70 font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Catálogo de Postres
            </button>

            <button
              onClick={() => onNavigate('caja-sorpresa')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeSection === 'caja-sorpresa'
                  ? 'text-white bg-rose-600 shadow-md shadow-rose-600/20'
                  : 'text-rose-700 bg-rose-50 hover:bg-rose-100'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Crea tu Caja Sorpresa</span>
            </button>

            <button
              onClick={() => onNavigate('videos-campana')}
              className={`flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeSection === 'videos-campana'
                  ? 'text-amber-900 bg-amber-100/70 font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <span>Campañas en Video</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </button>

            <button
              onClick={() => onNavigate('rastreador')}
              className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeSection === 'rastreador'
                  ? 'text-amber-900 bg-amber-100/70 font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Rastrear Pedido Express
            </button>
          </nav>

          {/* Action Buttons: C2PA Badge + Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* C2PA quick link */}
            <button
              onClick={() => onOpenC2PAModal('DulceYa Express.mp4')}
              title="Verificar procedencia C2PA de nuestros videos"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-2 text-xs font-medium text-stone-600 hover:text-amber-800 bg-stone-100/80 hover:bg-amber-50 rounded-xl transition-colors border border-stone-200/80"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="hidden xl:inline">Metadatos C2PA</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-medium text-xs shadow-md shadow-amber-950/20 active:scale-95 transition-all"
              aria-label="Abrir carrito"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline font-semibold">Tu Pedido</span>
              {totalCartCount > 0 && (
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-rose-600 text-[11px] font-bold text-white shadow">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile secondary quick-bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-stone-200/60 text-xs">
          <button
            onClick={() => onNavigate('catalogo')}
            className={`font-semibold py-1 px-2 rounded ${activeSection === 'catalogo' ? 'text-amber-900 font-bold' : 'text-stone-600'}`}
          >
            Postres
          </button>
          <button
            onClick={() => onNavigate('caja-sorpresa')}
            className={`font-semibold py-1 px-2 rounded text-rose-600 flex items-center gap-1 ${activeSection === 'caja-sorpresa' ? 'bg-rose-50 font-bold' : ''}`}
          >
            <Gift className="w-3.5 h-3.5" />
            Caja Sorpresa
          </button>
          <button
            onClick={() => onNavigate('videos-campana')}
            className={`font-semibold py-1 px-2 rounded ${activeSection === 'videos-campana' ? 'text-amber-900 font-bold' : 'text-stone-600'}`}
          >
            Videos (C2PA)
          </button>
          <button
            onClick={() => onNavigate('rastreador')}
            className={`font-semibold py-1 px-2 rounded ${activeSection === 'rastreador' ? 'text-amber-900 font-bold' : 'text-stone-600'}`}
          >
            Rastreo
          </button>
        </div>
      </div>
    </header>
  );
};
