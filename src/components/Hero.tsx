import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Truck, 
  Layers, 
  ChevronRight, 
  Flame, 
  Boxes, 
  Sparkles,
  ArrowDown
} from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { BikeFitmentSelector } from './BikeFitmentSelector';
import { formatINRLakhs } from '../utils/formatCurrency';

export const Hero: React.FC = () => {
  const { inventoryStats, setIsAdminOpen } = useInventory();

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden bg-tech-grid">
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 radial-glow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top announcement kicker */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-full px-3 py-1 text-xs text-neutral-300">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="font-medium text-white">2026 Race Season Ready</span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-400">All OEM & High-Performance Spares Inspected</span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs text-neutral-400 font-mono">
            <span>DISPATCH CUTOFF: <strong className="text-amber-400">16:30 TODAY</strong></span>
            <span>·</span>
            <span>SHIPPING: <strong className="text-neutral-200">SAME-DAY AIR / GROUND</strong></span>
          </div>
        </div>

        {/* Hero Grid: Marketing copy on left, Dynamic Inventory Glance on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          
          <div className="lg:col-span-7 space-y-5">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
              Precision Bike Spares. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-orange-500">
                Guaranteed Fitment.
              </span> <br />
              Live In Stock.
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl font-normal leading-relaxed">
              MotoTorq powers professional race teams, independent moto workshops, and track enthusiasts with direct-from-depot spare parts. Track real-time inventory count, warehouse bay locations, and chassis compatibility down to the bolt torque.
            </p>

            {/* Value pillars */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Fitment Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>24-Hour Dispatch from 3 Depots</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                <Layers className="w-4 h-4 text-sky-400 shrink-0" />
                <span>OEM & Track-Grade Compounds</span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#catalog"
                className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-5 py-3 rounded-lg text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
              >
                <span>Browse Spare Parts Catalogue</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </a>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/80 font-medium px-4 py-3 rounded-lg text-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Boxes className="w-4 h-4 text-amber-400" />
                <span>Test Dynamic Stock Engine</span>
              </button>
            </div>
          </div>

          {/* Right Hero Graphic / Live Depot Inventory Monitor */}
          <div className="lg:col-span-5 space-y-4">
            {/* Visual Hero Image Showcase */}
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl group">
              <img 
                src="/src/assets/images/hero_spares_banner_1790745226070.jpg" 
                alt="Motorcycle spare parts and racing superbike on paddock stand in workshop" 
                referrerPolicy="no-referrer"
                className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-neutral-800 text-neutral-200">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span className="font-mono text-[11px] font-bold">CENTRAL DEPOT BAY 01</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400 bg-neutral-950/80 backdrop-blur-md px-2 py-1 rounded border border-neutral-800">
                  100% OEM & TRACK SPEC
                </span>
              </div>
            </div>

            <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-neutral-300 font-bold uppercase tracking-wider">
                    Central Hub Inventory Feed
                  </span>
                </div>
                <span className="text-[11px] font-mono text-neutral-400">SYNC: 100% OK</span>
              </div>

              {/* Dynamic stats metrics */}
              <div className="grid grid-cols-2 gap-3 my-4">
                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800/80">
                  <div className="text-[11px] text-neutral-400 uppercase font-mono">Available Stock</div>
                  <div className="text-2xl font-black text-white font-mono mt-0.5">
                    {inventoryStats.totalUnits} <span className="text-xs text-neutral-500 font-sans font-normal">units</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                    <span>98.6% Fill Rate</span>
                  </div>
                </div>

                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800/80">
                  <div className="text-[11px] text-neutral-400 uppercase font-mono">Monitored SKUs</div>
                  <div className="text-2xl font-black text-amber-400 font-mono mt-0.5">
                    {inventoryStats.totalSkus} <span className="text-xs text-neutral-500 font-sans font-normal">lines</span>
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-1">
                    Braking, Suspension, Drive
                  </div>
                </div>

                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800/80">
                  <div className="text-[11px] text-neutral-400 uppercase font-mono">Low Stock Alerts</div>
                  <div className="text-2xl font-black text-amber-500 font-mono mt-0.5">
                    {inventoryStats.lowStockCount} <span className="text-xs text-neutral-500 font-sans font-normal">critical</span>
                  </div>
                  <div className="text-[10px] text-amber-400/80 mt-1">Auto-reorder staged</div>
                </div>

                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800/80">
                  <div className="text-[11px] text-neutral-400 uppercase font-mono">Stock Valuation</div>
                  <div className="text-2xl font-black text-neutral-200 font-mono mt-0.5">
                    {formatINRLakhs(inventoryStats.inventoryValue)}
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-1">Real-time assets</div>
                </div>
              </div>

              {/* Dynamic ticker message */}
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-xs">
                <div className="flex items-center justify-between text-neutral-400 mb-1">
                  <span className="font-mono text-[10px] uppercase">Warehouse Automated Dispatch</span>
                  <span className="text-amber-400 text-[10px] font-mono">BAY 3 ACTIVE</span>
                </div>
                <p className="text-neutral-300 font-mono text-[11px] truncate">
                  ⚡ Auto-binned: Brembo Z04 & Öhlins STX46 ready for 4:30 PM courier pickup
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Bike Fitment Matcher Widget */}
        <div className="mt-4">
          <BikeFitmentSelector />
        </div>

      </div>
    </section>
  );
};
