/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { InventoryProvider } from './context/InventoryContext';
import { Header } from './components/Header';
import { InventoryLiveTicker } from './components/InventoryLiveTicker';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { InventoryCatalog } from './components/InventoryCatalog';
import { TrustFeatures } from './components/TrustFeatures';
import { PartnerBrands } from './components/PartnerBrands';
import { WorkshopFleetSection } from './components/WorkshopFleetSection';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { PartDetailModal } from './components/PartDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { InventoryAdminDrawer } from './components/InventoryAdminDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';

export default function App() {
  return (
    <InventoryProvider>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-neutral-950">
        
        {/* Navigation & Live Ticker */}
        <Header />
        <InventoryLiveTicker />

        {/* Marketing Hero with Dynamic Stock Glance & Bike Fitment Matcher */}
        <main className="flex-1">
          <Hero />

          {/* Category Filter Strip */}
          <CategoryNav />

          {/* Dynamic Inventory Spare Parts Catalog (Grid & Table views) */}
          <InventoryCatalog />

          {/* Engineering & Trust Guarantees */}
          <TrustFeatures />

          {/* OEM Component Manufacturers & Partners */}
          <PartnerBrands />

          {/* Workshop & Fleet B2B Program with Interactive Margin Calculator */}
          <WorkshopFleetSection />

          {/* Real Customer & Technician Reviews */}
          <Testimonials />

          {/* Logistics & Technical FAQs */}
          <FaqSection />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Interactive Modals and Slide-Over Drawers */}
        <PartDetailModal />
        <CartDrawer />
        <InventoryAdminDrawer />
        <OrderSuccessModal />

      </div>
    </InventoryProvider>
  );
}
