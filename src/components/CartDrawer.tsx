import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Clock, MapPin, Gift, MessageCircle, Send, CheckCircle2, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';
import { MEDELLIN_NEIGHBORHOODS } from '../data/desserts';
import { WompiButton } from './WompiButton';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>(MEDELLIN_NEIGHBORHOODS[0]);
  const [recipientName, setRecipientName] = useState<string>('Familia Botero');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('Calle 10 # 43D-20');
  const [recipientPhone, setRecipientPhone] = useState<string>('300 123 4567');
  const [isSurpriseDelivery, setIsSurpriseDelivery] = useState<boolean>(true);
  const [specialInstructions, setSpecialInstructions] = useState<string>('No llamar antes de timbrar, tocar campana');
  const [showWhatsAppPreview, setShowWhatsAppPreview] = useState<boolean>(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= 50000 ? 0 : 5000; // Free delivery over $50k COP
  const grandTotal = subtotal + deliveryFee;

  const generateWhatsAppMessage = () => {
    let msg = `🤤 *¡HOLA DULCEYA EXPRESS MEDELLÍN! Quiero hacer un pedido por favor:*\n\n`;

    msg += `📦 *MIS ANTOJOS Y MECATOS:*\n`;
    cartItems.forEach((item, index) => {
      msg += `${index + 1}. *${item.name}* (x${item.quantity}) - $${(item.price * item.quantity).toLocaleString('es-CO')} COP\n`;
      if (item.customBoxData) {
        msg += `   • *Caja:* ${item.customBoxData.boxType.name}\n`;
        msg += `   • *Para:* ${item.customBoxData.greetingCard.recipient}\n`;
        msg += `   • *Picor:* ${item.customBoxData.spicyLevel.toUpperCase()}\n`;
        msg += `   • *Dedicatoria:* "${item.customBoxData.greetingCard.message}"\n`;
      }
    });

    msg += `\n💰 *Subtotal:* $${subtotal.toLocaleString('es-CO')} COP`;
    msg += `\n🛵 *Envío Express Medellín:* ${deliveryFee === 0 ? '¡GRATIS (Supera $50.000)!' : `$${deliveryFee.toLocaleString('es-CO')} COP`}`;
    msg += `\n✨ *TOTAL A PAGAR:* $${grandTotal.toLocaleString('es-CO')} COP\n\n`;

    msg += `📍 *DATOS DE ENTREGA EN MEDELLÍN:*\n`;
    msg += `• *Barrio:* ${selectedNeighborhood}\n`;
    msg += `• *Dirección:* ${deliveryAddress || 'Pendiente'}\n`;
    msg += `• *Destinatario:* ${recipientName || 'Pendiente'}\n`;
    msg += `• *Celular:* ${recipientPhone || 'Pendiente'}\n`;
    msg += `• *¿Entrega Sorpresa?:* ${isSurpriseDelivery ? 'SÍ (Tocar campana y no avisar por chat)' : 'No'}\n`;
    if (specialInstructions) {
      msg += `• *Instrucción:* ${specialInstructions}\n`;
    }
    msg += `\n¿Me confirman tiempo estimado en minutos para desembalar? 🚀`;

    return msg;
  };

  const handleCheckoutWhatsApp = () => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 }
    });

    const rawMessage = generateWhatsAppMessage();
    const waUrl = `https://wa.me/573001234567?text=${encodeURIComponent(rawMessage)}`;
    
    // Open preview or real tab
    setShowWhatsAppPreview(true);
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/70 backdrop-blur-xs animate-fade-in">
      <div
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-[#FAF7F2] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              🤤
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-serif-display text-lg font-black text-stone-900">Tu Pedido Express</h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-200 text-amber-900 rounded-md">
                  Medellín
                </span>
              </div>
              <p className="text-xs text-stone-500">
                {cartItems.length} {cartItems.length === 1 ? 'antojo' : 'antojos'} listos para desembalar
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-800 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Cerrar pedido"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart items scrollable body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {cartItems.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto text-2xl shadow-xs">
                🌶️
              </div>
              <h4 className="text-base font-bold text-stone-800">No has agregado dulces aún</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Antójate con nuestros vasos locos con mango y tajín, Takis Fuego o diseña tu caja sorpresa para el parche.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 text-xs font-bold bg-amber-900 text-white rounded-xl shadow-md cursor-pointer hover:bg-amber-950 transition-colors"
              >
                Ver Menú de Mecatos
              </button>
            </div>
          ) : (
            <>
              {/* Product items list */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-stone-500 uppercase tracking-wider">
                  <span>Antojos Seleccionados</span>
                  <button
                    onClick={onClearCart}
                    className="text-stone-400 hover:text-rose-600 font-semibold normal-case text-xs cursor-pointer"
                  >
                    Vaciar todo
                  </button>
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex gap-3 items-center justify-between"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/campaigns/DulceYa Express.png';
                      }}
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-stone-900 truncate">{item.name}</h4>
                      {item.customBoxData ? (
                        <p className="text-[11px] text-rose-700 font-semibold line-clamp-1">
                          🎁 Para: {item.customBoxData.greetingCard.recipient} · {item.customBoxData.spicyLevel.toUpperCase()}
                        </p>
                      ) : (
                        <p className="text-[11px] text-stone-500 line-clamp-1">{item.details}</p>
                      )}
                      <span className="text-xs font-bold font-mono text-amber-900">
                        ${item.price.toLocaleString('es-CO')} COP
                      </span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-stone-200 shrink-0">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-lg text-stone-600 hover:bg-stone-100 flex items-center justify-center cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-bold font-mono text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-lg text-stone-600 hover:bg-stone-100 flex items-center justify-center cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-stone-400 hover:text-rose-600 p-1.5 cursor-pointer"
                      aria-label="Eliminar item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Delivery Details Form in Medellín */}
              <div className="space-y-3 pt-3 border-t border-stone-200">
                <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-600" />
                  <span>Datos de Entrega Express en Medellín:</span>
                </span>

                <div>
                  <label className="block text-[11px] text-stone-600 font-bold mb-1">
                    Barrio / Sector:
                  </label>
                  <select
                    value={selectedNeighborhood}
                    onChange={(e) => setSelectedNeighborhood(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold bg-stone-50 border border-stone-300 rounded-xl"
                  >
                    {MEDELLIN_NEIGHBORHOODS.map((nb) => (
                      <option key={nb} value={nb}>
                        {nb} (Entrega express en moto)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-stone-600 font-bold mb-1">
                    Dirección exacta:
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Ej. Calle 10 # 43D-20 Apto 402"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-stone-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-stone-600 font-bold mb-1">
                      Destinatario:
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Nombre o Familia"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-stone-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-stone-600 font-bold mb-1">
                      Celular WhatsApp:
                    </label>
                    <input
                      type="text"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      placeholder="300 123 4567"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-stone-50"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="surpriseCheckbox"
                    checked={isSurpriseDelivery}
                    onChange={(e) => setIsSurpriseDelivery(e.target.checked)}
                    className="w-4 h-4 text-rose-600 rounded cursor-pointer"
                  />
                  <label htmlFor="surpriseCheckbox" className="text-xs text-stone-700 font-medium cursor-pointer">
                    🤫 Es entrega sorpresa (No arruinar la sorpresa por teléfono)
                  </label>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout Actions */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-[#FAF7F2] space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal mecatos</span>
                <span className="font-mono font-bold">${subtotal.toLocaleString('es-CO')} COP</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Envío express en moto</span>
                <span className="font-mono font-bold">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold">¡GRATIS!</span>
                  ) : (
                    `$${deliveryFee.toLocaleString('es-CO')} COP`
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-900">
                <span>Total a Pagar:</span>
                <span className="font-mono text-xl text-stone-900 font-black">
                  ${grandTotal.toLocaleString('es-CO')} <span className="text-xs font-sans font-semibold text-stone-500">COP</span>
                </span>
              </div>
            </div>

            <WompiButton cartItems={cartItems} selectedNeighborhood={selectedNeighborhood} deliveryAddress={deliveryAddress} recipientName={recipientName} recipientPhone={recipientPhone} isSurpriseDelivery={isSurpriseDelivery} specialInstructions={specialInstructions} />
            {/* Primary Action Button: WhatsApp Order */}
            <button
              onClick={handleCheckoutWhatsApp}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-sm tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-emerald-700/20 transition-all cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>📲 ENVIAR PEDIDO POR WHATSAPP AHORA</span>
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 font-medium">
              <span>Pagos: Nequi · Bancolombia · Efectivo Contra Entrega</span>
            </div>
          </div>
        )}

      </div>

      {/* WhatsApp Dialog Simulator / Live preview */}
      {showWhatsAppPreview && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-[#0b141a] text-white rounded-3xl overflow-hidden shadow-2xl border border-stone-800 flex flex-col">
            {/* Top WhatsApp Bar */}
            <div className="p-3.5 bg-[#202c33] flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  DY
                </div>
                <div>
                  <div className="text-xs font-bold text-white">DulceYa Express Medellín</div>
                  <div className="text-[10px] text-emerald-400">En línea · Despacho Activo</div>
                </div>
              </div>
              <button
                onClick={() => setShowWhatsAppPreview(false)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Body */}
            <div className="p-4 bg-[#0b141a] space-y-3 max-h-96 overflow-y-auto">
              <div className="p-3 bg-[#005c4b] rounded-2xl rounded-tr-none text-xs text-white leading-relaxed whitespace-pre-line shadow-xs font-mono">
                {decodeURIComponent(generateWhatsAppMessage())}
              </div>

              {/* Simulated Auto-Reply */}
              <div className="p-3 bg-[#202c33] rounded-2xl rounded-tl-none text-xs text-stone-200 leading-relaxed shadow-xs">
                ¡Listo! 🎉 Tu pedido ha sido confirmado. En minutos nuestro motorizado estará en camino con la mochila climatizada. 🚀🏍️
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="p-3 bg-[#202c33] flex items-center justify-between gap-2 border-t border-stone-800">
              <button
                onClick={() => {
                  window.open(`https://wa.me/573001234567?text=${encodeURIComponent(generateWhatsAppMessage())}`, '_blank');
                }}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Abrir en WhatsApp Web / App</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
