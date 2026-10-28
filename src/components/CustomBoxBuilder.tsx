import React, { useState } from 'react';
import { BoxPresentation, DessertItem, BoxCustomization, SpicyLevel } from '../types';
import { BOX_PRESENTATIONS, DESSERT_ITEMS, EXTRA_TOPPINGS, MEDELLIN_NEIGHBORHOODS, PRESET_STICKERS } from '../data/desserts';
import { Gift, Plus, Minus, Check, MessageCircle, Sparkles, MapPin, Flame } from 'lucide-react';

interface CustomBoxBuilderProps {
  onAddCustomBoxToCart: (box: BoxCustomization) => void;
  onDirectWhatsAppBox?: (box: BoxCustomization) => void;
}

export const CustomBoxBuilder: React.FC<CustomBoxBuilderProps> = ({
  onAddCustomBoxToCart,
  onDirectWhatsAppBox
}) => {
  const [selectedBox, setSelectedBox] = useState<BoxPresentation>(BOX_PRESENTATIONS[0]);
  const [selectedDesserts, setSelectedDesserts] = useState<{ [id: string]: number }>({
    'vaso-loco-mango-chamoy': 1,
    'takis-fuego-clasicos': 1,
    'gomitas-enchiladas-artesanales': 1,
    'duvalin-bisabor-pack': 1
  });
  const [selectedToppings, setSelectedToppings] = useState<{ [id: string]: boolean }>({
    'chamoy-extra-pote': true,
    'tajin-limon-polvo': true,
    'cuñas-limon-fresco': true
  });
  const [spicyLevel, setSpicyLevel] = useState<SpicyLevel>('fuego');
  const [recipient, setRecipient] = useState<string>('Familia Botero');
  const [sender, setSender] = useState<string>('Jorge');
  const [selectedStickerTheme, setSelectedStickerTheme] = useState<'antojo' | 'fuego' | 'chimba' | 'cumple'>('antojo');
  const [customMessage, setCustomMessage] = useState<string>(
    PRESET_STICKERS[0].text
  );
  const [destinationNeighborhood, setDestinationNeighborhood] = useState<string>(MEDELLIN_NEIGHBORHOODS[0]);
  const [isSecretSurprise, setIsSecretSurprise] = useState<boolean>(true);

  // Candy items available to select
  const availableCandies = DESSERT_ITEMS.filter((i) => i.category !== 'combos_desembalaje');

  const handleUpdateItemQuantity = (id: string, delta: number) => {
    setSelectedDesserts((prev) => {
      const current = prev[id] || 0;
      const updated = Math.max(0, current + delta);
      if (updated === 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: updated };
    });
  };

  const handleToggleTopping = (id: string) => {
    setSelectedToppings((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const totalCandiesCount = Object.values(selectedDesserts).reduce((sum, q) => sum + q, 0);

  const candiesSubtotal = Object.entries(selectedDesserts).reduce((sum, [id, qty]) => {
    const item = DESSERT_ITEMS.find((d) => d.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const toppingsSubtotal = EXTRA_TOPPINGS.filter((t) => selectedToppings[t.id]).reduce(
    (sum, t) => sum + t.price,
    0
  );

  const totalBoxPrice = selectedBox.price + candiesSubtotal + toppingsSubtotal;

  const buildBoxData = (): BoxCustomization => {
    const treatsList = Object.entries(selectedDesserts).map(([id, quantity]) => {
      const item = DESSERT_ITEMS.find((d) => d.id === id)!;
      return { item, quantity };
    });

    const activeToppings = EXTRA_TOPPINGS.map((t) => ({
      ...t,
      selected: !!selectedToppings[t.id]
    }));

    return {
      boxType: selectedBox,
      selectedDesserts: treatsList,
      spicyLevel,
      extraToppings: activeToppings,
      greetingCard: {
        recipient,
        sender,
        occasion: selectedStickerTheme,
        message: customMessage,
        stickerTheme: selectedStickerTheme
      },
      destinationNeighborhood,
      isSecretSurprise
    };
  };

  const handleAddToCart = () => {
    if (totalCandiesCount === 0) {
      alert('¡Por favor selecciona al menos 1 dulce o botana para tu caja!');
      return;
    }
    onAddCustomBoxToCart(buildBoxData());
  };

  const handleDirectWhatsApp = () => {
    if (totalCandiesCount === 0) {
      alert('¡Por favor selecciona al menos 1 dulce o botana para tu caja!');
      return;
    }
    const boxData = buildBoxData();
    if (onDirectWhatsAppBox) {
      onDirectWhatsAppBox(boxData);
      return;
    }

    const treatsText = boxData.selectedDesserts
      .map((d) => `• ${d.item.name} (x${d.quantity})`)
      .join('\n');

    const toppingsText = boxData.extraToppings
      .filter((t) => t.selected)
      .map((t) => `+ ${t.name}`)
      .join('\n');

    const message = encodeURIComponent(
      `¡Hola DulceYa Express Medellín! 🤤 Quiero armar y pedir esta Caja Antojo Fuego:\n\n` +
      `🎁 Tipo: ${boxData.boxType.name}\n` +
      `📍 Barrio en Medellín: ${boxData.destinationNeighborhood}\n` +
      `🌶️ Nivel de Picor: ${boxData.spicyLevel.toUpperCase()}\n` +
      `👤 Para: ${boxData.greetingCard.recipient} (De parte de: ${boxData.greetingCard.sender})\n` +
      `📝 Mensaje dedicatoria: "${boxData.greetingCard.message}"\n\n` +
      `🍬 DULCES SELECCIONADOS:\n${treatsText}\n\n` +
      (toppingsText ? `🍋 TOPPINGS EXTRAS:\n${toppingsText}\n\n` : '') +
      `💰 Total Caja: $${totalBoxPrice.toLocaleString('es-CO')} COP\n\n` +
      `¿Me confirman tiempo de despacho? 🚀`
    );

    window.open(`https://wa.me/573001234567?text=${message}`, '_blank');
  };

  return (
    <section id="caja-sorpresa-familiar" className="py-14 sm:py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold mb-2">
            <Gift className="w-3.5 h-3.5 text-rose-600" />
            <span>Arma tu Caja Antojo Fuego Medellín</span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
            Personaliza tu Desembalaje Express
          </h2>

          <p className="mt-2 text-sm text-stone-600 leading-relaxed">
            Elige la caja oficial roja o fuego, suma tus Takis, vasos locos de mango, gomitas enchiladas y Duvalines favoritos, escoge los toppings y añade una dedicatoria personalizada.
          </p>
        </div>

        {/* Builder Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Box Style */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs">1</span>
                  <span>Selecciona el empaque de tu caja</span>
                </h3>
                <span className="text-xs font-semibold text-stone-500">
                  {selectedBox.name} (${selectedBox.price.toLocaleString('es-CO')} COP)
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {BOX_PRESENTATIONS.map((box) => {
                  const isSelected = selectedBox.id === box.id;
                  return (
                    <button
                      key={box.id}
                      onClick={() => setSelectedBox(box)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-rose-600 bg-rose-50/50 shadow-md ring-2 ring-rose-600/20'
                          : 'border-stone-200 bg-stone-50/50 hover:bg-white hover:border-stone-300'
                      }`}
                    >
                      <div className="w-full aspect-square rounded-xl bg-stone-200 overflow-hidden mb-2">
                        <img src={box.imageUrl} alt={box.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-xs font-bold text-stone-900 line-clamp-1">{box.name}</div>
                      <div className="text-[11px] font-mono font-bold text-amber-900 mt-1">
                        +${box.price.toLocaleString('es-CO')}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Candies and Spicy Treats */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs">2</span>
                  <span>Elige los dulces y mecatos para la caja</span>
                </h3>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-stone-100 text-stone-700">
                  {totalCandiesCount} seleccionados
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                {availableCandies.map((item) => {
                  const qty = selectedDesserts[item.id] || 0;
                  return (
                    <div
                      key={item.id}
                      className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                        qty > 0
                          ? 'border-amber-500/80 bg-amber-50/30'
                          : 'border-stone-200 bg-white hover:bg-stone-50/60'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/assets/campaigns/DulceYa Express.png';
                          }}
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-stone-900 truncate">{item.name}</div>
                          <div className="text-[11px] font-mono text-stone-600">
                            ${item.price.toLocaleString('es-CO')} COP
                          </div>
                        </div>
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {qty > 0 && (
                          <button
                            onClick={() => handleUpdateItemQuantity(item.id, -1)}
                            className="w-7 h-7 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 flex items-center justify-center cursor-pointer transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <span className="w-6 text-center text-xs font-bold font-mono">
                          {qty}
                        </span>

                        <button
                          onClick={() => handleUpdateItemQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-lg bg-amber-900 hover:bg-amber-950 text-white flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Extra Chamoy & Toppings */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs">3</span>
                <span>Toppings & Salsas Extras para Bañar</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {EXTRA_TOPPINGS.map((top) => {
                  const isChecked = !!selectedToppings[top.id];
                  return (
                    <label
                      key={top.id}
                      onClick={() => handleToggleTopping(top.id)}
                      className={`p-3 rounded-2xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? 'border-emerald-600 bg-emerald-50/50 shadow-2xs'
                          : 'border-stone-200 bg-white hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                            isChecked ? 'bg-emerald-600 text-white' : 'border border-stone-300'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="font-semibold text-stone-800">{top.name}</span>
                      </div>
                      <span className="font-mono font-bold text-stone-600">
                        +${top.price.toLocaleString('es-CO')}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Spicy level & Medellín Location & Dedication */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-5">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs">4</span>
                <span>Nivel de Fuego, Destino en Medellín & Dedicatoria</span>
              </h3>

              {/* Spicy level radio selector */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2">
                  ¿Qué tan picante quieres los mecatos y salsas?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['suave', 'medio', 'fuego', 'fuego_extremo'] as SpicyLevel[]).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSpicyLevel(lvl)}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-center cursor-pointer transition-all ${
                        spicyLevel === lvl
                          ? 'border-rose-600 bg-rose-600 text-white shadow-xs'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-white'
                      }`}
                    >
                      {lvl === 'suave' && '🌶️ Suave'}
                      {lvl === 'medio' && '🌶️🌶️ Medio'}
                      {lvl === 'fuego' && '🔥 Fuego'}
                      {lvl === 'fuego_extremo' && '🔥💀 Extremo'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Medellín Neighborhood */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-600" />
                  <span>Barrio de entrega en Medellín</span>
                </label>
                <select
                  value={destinationNeighborhood}
                  onChange={(e) => setDestinationNeighborhood(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs font-semibold text-stone-800 focus:bg-white focus:ring-2 focus:ring-rose-500/20"
                >
                  {MEDELLIN_NEIGHBORHOODS.map((nh) => (
                    <option key={nh} value={nh}>
                      {nh} (Entrega Express)
                    </option>
                  ))}
                </select>
              </div>

              {/* Recipient and Sender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    ¿Para quién es la sorpresa?
                  </label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Ej. Familia Botero / Los Parceros"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 focus:bg-white focus:ring-2 focus:ring-rose-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    ¿De parte de quién?
                  </label>
                  <input
                    type="text"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    placeholder="Tu nombre o apodo"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 focus:bg-white focus:ring-2 focus:ring-rose-500/20"
                  />
                </div>
              </div>

              {/* Preset message pills */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Estilo de tarjeta o sticker
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {PRESET_STICKERS.map((st) => (
                    <button
                      key={st.theme}
                      type="button"
                      onClick={() => {
                        setSelectedStickerTheme(st.theme as any);
                        setCustomMessage(st.text);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        selectedStickerTheme === st.theme
                          ? 'bg-amber-900 text-white shadow-xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>

                <textarea
                  rows={2}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Escribe aquí tu dedicatoria para la tarjeta impresa..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs bg-stone-50 focus:bg-white focus:ring-2 focus:ring-rose-500/20 leading-relaxed"
                />
              </div>
            </div>

          </div>

          {/* Sticky Summary & Order Column (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden p-6 space-y-5">
              
              {/* Header Box Overview */}
              <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
                <div className="w-16 h-16 rounded-2xl bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                  <img src={selectedBox.imageUrl} alt={selectedBox.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                    Caja Personalizada
                  </div>
                  <h4 className="text-base font-bold text-stone-900 leading-snug">{selectedBox.name}</h4>
                  <div className="text-xs text-stone-500">
                    Nivel: <span className="font-bold text-stone-800">{spicyLevel.toUpperCase()}</span>
                  </div>
                </div>
              </div>

              {/* Items Breakdown list */}
              <div className="space-y-2 text-xs">
                <div className="font-bold text-stone-700 mb-1">Mecatos en la caja ({totalCandiesCount}):</div>
                <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
                  {Object.entries(selectedDesserts).map(([id, qty]) => {
                    const item = DESSERT_ITEMS.find((d) => d.id === id);
                    if (!item) return null;
                    return (
                      <div key={id} className="flex items-center justify-between py-1 border-b border-stone-100">
                        <span className="font-medium text-stone-800 truncate mr-2">
                          {item.name} <span className="text-stone-400 font-bold">x{qty}</span>
                        </span>
                        <span className="font-mono text-stone-600 font-semibold shrink-0">
                          ${(item.price * qty).toLocaleString('es-CO')}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Toppings in list */}
                {toppingsSubtotal > 0 && (
                  <div className="pt-2">
                    <div className="font-bold text-stone-700 mb-1">Toppings extras:</div>
                    {EXTRA_TOPPINGS.filter((t) => selectedToppings[t.id]).map((t) => (
                      <div key={t.id} className="flex items-center justify-between text-stone-600 py-0.5">
                        <span>+ {t.name}</span>
                        <span className="font-mono">${t.price.toLocaleString('es-CO')}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Destination & Dedication preview */}
                <div className="pt-2 text-stone-600 space-y-0.5">
                  <div>
                    <span className="font-bold text-stone-700">Barrio:</span> {destinationNeighborhood}
                  </div>
                  <div>
                    <span className="font-bold text-stone-700">Para:</span> {recipient} ({sender ? `De: ${sender}` : 'Anónimo'})
                  </div>
                </div>
              </div>

              {/* Total Price */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-stone-500 uppercase">Total de la Caja</div>
                  <div className="text-2xl font-black font-mono text-stone-900">
                    ${totalBoxPrice.toLocaleString('es-CO')}{' '}
                    <span className="text-xs font-semibold text-stone-500 font-sans">COP</span>
                  </div>
                </div>
                <div className="text-right text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">
                  ⚡ Listo en 20-30 min
                </div>
              </div>

              {/* Order Actions */}
              <div className="space-y-2.5 pt-2">
                {/* Instant WhatsApp Order */}
                <button
                  onClick={handleDirectWhatsApp}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>📲 PEDIR ESTA CAJA POR WHATSAPP</span>
                </button>

                {/* Add to in-app Cart */}
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 px-4 bg-stone-900 hover:bg-black active:scale-95 text-white font-bold text-xs rounded-2xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Añadir al Carrito del Pedido</span>
                </button>
              </div>

              <div className="text-center text-[11px] text-stone-400">
                🔒 Empaque sellado térmico para mantener los Takis crujientes y el chamoy fresco.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
