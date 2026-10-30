import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { NotificationToast } from './components/NotificationToast';

import { HomeView } from './views/HomeView';
import { CategoryView } from './views/CategoryView';
import { ProductDetailView } from './views/ProductDetailView';
import { CheckoutView } from './views/CheckoutView';
import { AccountDashboardView } from './views/AccountDashboardView';
import { OrderTrackingView } from './views/OrderTrackingView';
import { GiftCardsView } from './views/GiftCardsView';
import { StaticPagesView } from './views/StaticPagesView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { OwnersGuideView } from './views/OwnersGuideView';

const MainContent: React.FC = () => {
  const { activeView } = useShop();

  const renderCurrentView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView />;
      case 'men':
        return <CategoryView viewType="men" />;
      case 'women':
        return <CategoryView viewType="women" />;
      case 'children':
        return <CategoryView viewType="children" />;
      case 'vip':
        return <CategoryView viewType="vip" />;
      case 'new-arrivals':
        return <CategoryView viewType="new-arrivals" />;
      case 'sale':
        return <CategoryView viewType="sale" />;
      case 'product-detail':
        return <ProductDetailView />;
      case 'checkout':
        return <CheckoutView />;
      case 'account':
      case 'orders':
        return <AccountDashboardView />;
      case 'track-order':
        return <OrderTrackingView />;
      case 'gift-cards':
        return <GiftCardsView />;
      case 'about':
        return <StaticPagesView pageType="about" />;
      case 'contact':
        return <StaticPagesView pageType="contact" />;
      case 'faq':
        return <StaticPagesView pageType="faq" />;
      case 'terms':
        return <StaticPagesView pageType="terms" />;
      case 'privacy':
        return <StaticPagesView pageType="privacy" />;
      case 'admin':
        return <AdminDashboardView />;
      case 'guide':
        return <OwnersGuideView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      <Header />
      <main className="flex-1">
        {renderCurrentView()}
      </main>
      <Footer />

      {/* Global Interactive Modals & Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <ProductQuickViewModal />
      <NotificationToast />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
