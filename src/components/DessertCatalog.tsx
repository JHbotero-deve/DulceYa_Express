import React, { useState } from 'react';
import { DessertItem, CandyCategory, SpicyLevel } from '../types';
import { DESSERT_ITEMS } from '../data/desserts';
import { Plus, Flame, Sparkles, MessageCircle, Info, X, Check } from 'lucide-react';

const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D/g, '');
const FALLBACK_IMAGE = '/assets/campaigns/DulceYa Express.png';

interface DessertCatalogProps {
  onAddToCart: (item: DessertItem) => void;
  onDirectWhatsAppItem?: (item: DessertItem) => void;
}

const CATEGORIES: { id: 'todos' | CandyCategory; label: string }[] = [
  { id: 'todos', label: 'Todos los Antojos' },
  { id: 'combos_desembalaje', label: '🔥 Combos Desembalaje' },
  { id: 'vasos_locos', label: '🥭 Vasos Locos con Mango' },
  { id: 'enchilados', label: '🍬 Gomitas con Chamoy' },
  { id: 'botanas_picantes', label: '🌶️ Takis & Crujientes' },
  { id: 'tamarindos', label: '🍭 Skwinkles & Tamarindos' },
  { id: 'dulces_mexicanos', label: '🍫 Duvalín & Chocolates' }
];

export const DessertCatalog: React.FC<DessertCatalogProps> = ({
  onAddToCart,
  onDirectWhatsAppItem
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'todos' | CandyCategory>('todos');
  const [selectedSpicyLevel, setSelectedSpicyLevel] = useState<string>('todos');
  const [activeItemDetails, setActiveItemDetails] = useState<DessertItem | null>(null);

  // Filter items
  const filteredItems = DESSERT_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
    const matchesSpicy = selectedSpicyLevel === 'todos' || item.spicyLevel === selectedSpicyLevel;
    return matchesCategory && matchesSpicy;
  });

  const getSpicyBadge = (level: SpicyLevel) => {
    switch (level) {
      case 'sin_picante':
        return <span className="text-[11px] text-stone-500 font-medium">Dulce sin picante</span>;
      case 'suave':
        return <span className="text-[11px] text-amber-700 font-semibold">🌶️ Picor suave</span>;
      case 'medio':
        return <span className="text-[11px] text-orange-700 font-bold">🌶️🌶️ Picor medio</span>;
      case 'fuego':
        return <span className="text-[11px] text-rose-700 font-extrabold">🔥 Fuego Intenso</span>;
      case 'fuego_extremo':
        return <span className="text-[11px] text-red-900 font-black">🔥💀 Fuego Extremo</span>;
    }
  };

  const handleWhatsAppSingleItem = (item: DessertItem) => {
    if (onDirectWhatsAppItem) {
      onDirectWhatsAppItem(item);
      return;
    }
    if (!WHATSAPP_NUMBER) {
      window.alert('El número de WhatsApp del negocio no está configurado. Define VITE_WHATSAPP_NUMBER en el entorno.');
      return;
    }
    const message = encodeURIComponent(
      `¡Hola DulceYa Express Medellín! 🤤 Quiero pedir por favor:\n\n• 1x ${item.name} ($${item.price.toLocaleString('es-CO')} COP)\n\n¿Me confirman tiempo de entrega en Medellín? 🚀`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <section id="catalogo-postres" className="py-14 sm:py-20 bg-[#FAF7F2] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold mb-2">
            <Flame className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            <span>Mecatos, Dulces Mexicanos & Vasos Locos</span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
            Nuestros Dulces & Antojos Fuego
          </h2>

          <p className="mt-2 text-sm text-stone-600 leading-relaxed">
            Preparados al instante con auténtico chamoy casero espeso, limón de campo recién exprimido, Tajín y las botanas mexicanas más codiciadas en Medellín.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-amber-900 text-white shadow-md'
                      : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Secondary filter: Spicy preference */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-stone-600">
            <span className="font-semibold text-stone-500">Nivel de picor:</span>
            <div className="inline-flex bg-white p-1 rounded-xl border border-stone-200">
              {[
                { id: 'todos', label: 'Todos' },
                { id: 'sin_picante', label: 'Sin Picante' },
                { id: 'suave', label: 'Suave' },
                { id: 'medio', label: 'Medio 🌶️' },
                { id: 'fuego', label: 'Fuego 🔥' }
              ].map((sp) => (
                <button
                  key={sp.id}
                  onClick={() => setSelectedSpicyLevel(sp.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                    selectedSpicyLevel === sp.id
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {sp.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Tag Overlays */}
                <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback image if external image fails
                      const image = e.currentTarget;
                      image.onerror = null;
                      image.src = FALLBACK_IMAGE;
                    }}
                  />
                  
                  {/* Subtle Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 text-[11px] font-bold bg-white/95 backdrop-blur-md rounded-xl shadow-xs text-stone-900 border border-stone-200">
                      {item.weightOrQuantity}
                    </span>

                    {item.popular && (
                      <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide bg-rose-600 text-white rounded-xl shadow-xs flex items-center gap-1">
                        <Flame className="w-3 h-3 fill-current" />
                        Top Antojo
                      </span>
                    )}
                  </div>

                  {/* Quick Detail Trigger */}
                  <button
                    onClick={() => setActiveItemDetails(item)}
                    className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors cursor-pointer"
                    title="Ver detalles e ingredientes"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>

                {/* Body Content */}
                <div className="p-5">
                  {/* Category & Spicy Indicators */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    {getSpicyBadge(item.spicyLevel)}
                    <span className="text-[11px] text-stone-500 font-medium">
                      ★ {item.rating} ({item.reviewsCount})
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
                    {item.name}
                  </h3>

                  <p className="mt-1.5 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-lg bg-stone-100 text-[10px] font-semibold text-stone-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer with Price & Actions */}
              <div className="p-5 pt-3 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] text-stone-500 font-medium uppercase tracking-wider">Precio Express</div>
                  <div className="text-lg font-black font-mono text-stone-900">
                    ${item.price.toLocaleString('es-CO')}{' '}
                    <span className="text-xs font-semibold text-stone-500 font-sans">COP</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* WhatsApp Quick Order button */}
                  <button
                    onClick={() => handleWhatsAppSingleItem(item)}
                    className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 transition-colors cursor-pointer"
                    title="Pedir este dulce directo por WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 fill-emerald-600" />
                  </button>

                  {/* Add to In-App Cart Drawer */}
                  <button
                    onClick={() => onAddToCart(item)}
                    className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-black active:scale-95 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Añadir</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search Fallback */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 mt-6 max-w-md mx-auto p-6">
            <Flame className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-stone-900">No encontramos mecatos con ese filtro</h4>
            <p className="text-xs text-stone-500 mt-1">
              Prueba cambiando la categoría o restableciendo el nivel de picante.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('todos');
                setSelectedSpicyLevel('todos');
              }}
              className="mt-4 px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold"
            >
              Ver todos los antojos
            </button>
          </div>
        )}

      </div>

      {/* Modal Details */}
      {activeItemDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="relative aspect-16/9 w-full bg-stone-100">
              <img
                src={activeItemDetails.imageUrl}
                alt={activeItemDetails.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const image = e.currentTarget;
                      image.onerror = null;
                      image.src = FALLBACK_IMAGE;
                }}
              />
              <button
                onClick={() => setActiveItemDetails(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/90 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between">
                {getSpicyBadge(activeItemDetails.spicyLevel)}
                <span className="text-xs font-bold text-stone-500">{activeItemDetails.weightOrQuantity}</span>
              </div>

              <h3 className="text-xl font-bold text-stone-900">{activeItemDetails.name}</h3>

              <p className="text-sm text-stone-600 leading-relaxed">
                {activeItemDetails.longDescription || activeItemDetails.description}
              </p>

              <div>
                <h5 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  Ingredientes & Preparación
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {activeItemDetails.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 text-xs font-medium text-stone-700"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] text-stone-500 uppercase">Precio</div>
                  <div className="text-xl font-bold font-mono text-stone-900">
                    ${activeItemDetails.price.toLocaleString('es-CO')} COP
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      handleWhatsAppSingleItem(activeItemDetails);
                      setActiveItemDetails(null);
                    }}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Pedir por WhatsApp</span>
                  </button>

                  <button
                    onClick={() => {
                      onAddToCart(activeItemDetails);
                      setActiveItemDetails(null);
                    }}
                    className="px-4 py-2.5 bg-stone-900 hover:bg-black text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Añadir al Carrito</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
