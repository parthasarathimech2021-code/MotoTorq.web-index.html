import React, { useState } from 'react';
import { Wrench, Mail, Shield, Check, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';

export const Footer: React.FC = () => {
  const { setActiveCategory } = useInventory();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 text-xs border-t border-neutral-800">
      
      {/* Newsletter / Restock Bulletin Strip */}
      <div className="border-b border-neutral-800 py-10 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
                DISPATCH BULLETIN & RESTOCK ALERTS
              </div>
              <h3 className="text-xl font-black text-white">
                Get notified the second factory shipments arrive at our depot
              </h3>
              <p className="text-neutral-400 mt-1 max-w-xl">
                Zero spam. Receive instant notifications on high-demand Brembo pad arrivals, Öhlins stock runs, and exclusive workshop clearance codes.
              </p>
            </div>

            <div className="w-full lg:w-auto">
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 font-medium bg-emerald-950/60 border border-emerald-800 px-4 py-2.5 rounded-xl">
                  <Check className="w-4 h-4" />
                  <span>Subscribed to Central Depot Dispatch Bulletins</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter workshop or rider email..."
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="bg-neutral-900 border border-neutral-700/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 flex-1 min-w-[220px]"
                  />
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center text-neutral-950 font-black">
                <Wrench className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-black text-lg tracking-wider text-white">
                MOTO<span className="text-amber-400">TORQ</span>
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              MotoTorq is an engineering-driven marketplace and dynamic inventory distribution network for high-performance motorcycle and bicycle spare parts. Built for technicians, racers, and track day enthusiasts.
            </p>

            {/* Regional Depot Statuses */}
            <div className="space-y-1.5 pt-2 text-[11px] font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>DEPOT 01 (Pune / Chakan Auto Hub, West): ACTIVE · CUTOFF 16:30 IST</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>DEPOT 02 (Chennai / Guindy Hub, South): ACTIVE · CUTOFF 17:00 IST</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>DEPOT 03 (Gurugram / Manesar Hub, North): ACTIVE · CUTOFF 16:00 IST</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <div className="font-mono text-white text-xs font-bold uppercase tracking-wider mb-3">
              Spare Parts Catalog
            </div>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => { setActiveCategory('brakes'); document.getElementById('catalog')?.scrollIntoView(); }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Brakes, Pads & Rotors
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveCategory('drivetrain'); document.getElementById('catalog')?.scrollIntoView(); }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Chains & Sprockets
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveCategory('suspension'); document.getElementById('catalog')?.scrollIntoView(); }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Monoshocks & Fork Seals
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveCategory('exhaust'); document.getElementById('catalog')?.scrollIntoView(); }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Titanium Exhausts
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveCategory('engine'); document.getElementById('catalog')?.scrollIntoView(); }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Synthetic Lubricants & Air Filters
                </button>
              </li>
            </ul>
          </div>

          {/* Fitment Guides */}
          <div>
            <div className="font-mono text-white text-xs font-bold uppercase tracking-wider mb-3">
              Motorcycle Fitment
            </div>
            <ul className="space-y-2">
              <li><a href="#garage-selector" className="hover:text-amber-400 transition-colors">Yamaha (R7, MT-07, MT-09)</a></li>
              <li><a href="#garage-selector" className="hover:text-amber-400 transition-colors">Kawasaki (Ninja 400, ZX-6R, Z900)</a></li>
              <li><a href="#garage-selector" className="hover:text-amber-400 transition-colors">Honda (CBR600RR, Africa Twin)</a></li>
              <li><a href="#garage-selector" className="hover:text-amber-400 transition-colors">KTM (390 Duke, 890 Duke R)</a></li>
              <li><a href="#garage-selector" className="hover:text-amber-400 transition-colors">BMW Motorrad (S1000RR, R1250GS)</a></li>
            </ul>
          </div>

          {/* Trade & Policies */}
          <div>
            <div className="font-mono text-white text-xs font-bold uppercase tracking-wider mb-3">
              Trade & Technical
            </div>
            <ul className="space-y-2">
              <li><a href="#workshop-fleet" className="hover:text-amber-400 transition-colors">B2B Wholesale Accounts</a></li>
              <li><a href="#faq" className="hover:text-amber-400 transition-colors">100% Fitment Policy</a></li>
              <li><a href="#faq" className="hover:text-amber-400 transition-colors">Same-Day Courier Rates</a></li>
              <li><a href="#faq" className="hover:text-amber-400 transition-colors">Warranty & Returns</a></li>
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">Depot Inventory API</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-mono">
          <div>
            © 2026 MotoTorq Dynamics Inc. All rights reserved. ISO 9001:2015 Certified Depot.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-neutral-400">All OEM trademarks belong to their respective manufacturers.</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
