import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DessertCatalog } from './components/DessertCatalog';
import { CustomBoxBuilder } from './components/CustomBoxBuilder';
import { CampaignShowcase } from './components/CampaignShowcase';
import { ExpressTracker } from './components/ExpressTracker';
import { FamilyStories } from './components/FamilyStories';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { VideoCampaignModal } from './components/VideoCampaignModal';
import { C2PAMetadataModal } from './components/C2PAMetadataModal';
import { CartItem, DessertItem, BoxCustomization } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [selectedVideoFile, setSelectedVideoFile] = useState<string>('DulceYa Express.mp4');
  const [isC2PAModalOpen, setIsC2PAModalOpen] = useState<boolean>(false);
  const [selectedC2PAFile, setSelectedC2PAFile] = useState<string>('DulceYa Express.mp4');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (item: DessertItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.id === item.id);
      if (existing) {
        return prev.map((ci) => (ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci));
      }
      return [
        ...prev,
        {
          id: item.id,
          type: 'dessert',
          name: item.name,
          price: item.price,
          quantity: 1,
          imageUrl: item.imageUrl,
          details: `${item.servings} · Entrega Express`
        }
      ];
    });
    showToast(`🍰 ¡${item.name} añadido a tu pedido express!`);
  };

  const handleAddCustomBoxToCart = (boxData: BoxCustomization) => {
    const treatsSum = boxData.selectedDesserts.reduce(
      (sum, t) => sum + t.item.price * t.quantity,
      0
    );
    const addonsSum = boxData.addons
      .filter((a) => a.selected)
      .reduce((sum, a) => sum + a.price, 0);
    const totalPrice = boxData.boxType.price + treatsSum + addonsSum;

    const newCartItem: CartItem = {
      id: `custom-box-${Date.now()}`,
      type: 'custom_box',
      name: `Caja Sorpresa Familiar: ${boxData.boxType.name}`,
      price: totalPrice,
      quantity: 1,
      imageUrl: boxData.boxType.imageUrl,
      details: `Para: ${boxData.greetingCard.recipient} · ${boxData.selectedDesserts.length} postres`,
      customBoxData: boxData
    };

    setCartItems((prev) => [newCartItem, ...prev]);
    setIsCartOpen(true);
    showToast('🎁 ¡Caja Sorpresa Familiar personalizada añadida con éxito!');
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenVideoModal = (fileName: string) => {
    setSelectedVideoFile(fileName);
    setIsVideoModalOpen(true);
  };

  const handleOpenC2PAModal = (fileName: string) => {
    setSelectedC2PAFile(fileName);
    setIsC2PAModalOpen(true);
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(
      section === 'catalogo'
        ? 'catalogo-postres'
        : section === 'caja-sorpresa'
        ? 'caja-sorpresa-familiar'
        : section === 'videos-campana'
        ? 'videos-campanas-c2pa'
        : section === 'rastreador'
        ? 'rastreador-express'
        : 'root'
    );
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-900 selection:bg-rose-200 selection:text-rose-900">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-stone-700 text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenC2PAModal={handleOpenC2PAModal}
        onOpenVideoModal={handleOpenVideoModal}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onExploreCatalog={() => handleNavigate('catalogo')}
          onOpenBoxBuilder={() => handleNavigate('caja-sorpresa')}
          onOpenVideoModal={handleOpenVideoModal}
          onOpenC2PAModal={handleOpenC2PAModal}
        />

        {/* Dessert Catalog */}
        <DessertCatalog onAddToCart={handleAddToCart} />

        {/* Custom Box Builder ("Una sorpresa para la familia") */}
        <CustomBoxBuilder onAddCustomBoxToCart={handleAddCustomBoxToCart} />

        {/* Campaign Showreel & C2PA Provenance */}
        <CampaignShowcase
          onOpenVideoModal={handleOpenVideoModal}
          onOpenC2PAModal={handleOpenC2PAModal}
        />

        {/* Live Express Delivery Tracker */}
        <ExpressTracker />

        {/* Family Testimonials & Stories */}
        <FamilyStories />
      </main>

      {/* Footer */}
      <footer className="mt-auto">
        <Footer onOpenC2PAModal={handleOpenC2PAModal} onNavigate={handleNavigate} />
      </footer>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Video Player Modal */}
      <VideoCampaignModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        initialVideoFile={selectedVideoFile}
        onOpenC2PAModal={(file) => {
          setIsVideoModalOpen(false);
          handleOpenC2PAModal(file);
        }}
      />

      {/* C2PA Provenance Metadata Modal */}
      <C2PAMetadataModal
        isOpen={isC2PAModalOpen}
        onClose={() => setIsC2PAModalOpen(false)}
        selectedFile={selectedC2PAFile}
      />
    </div>
  );
}
