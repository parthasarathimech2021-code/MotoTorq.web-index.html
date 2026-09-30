import React, { useState } from 'react';
import { Wrench, Shield, Check, ArrowRight, Building, Award, Terminal } from 'lucide-react';
import { formatINR, formatINRLakhs } from '../utils/formatCurrency';

export const WorkshopFleetSection: React.FC = () => {
  const [monthlySpend, setMonthlySpend] = useState<number>(75000);
  const [submitted, setSubmitted] = useState(false);
  const [workshopName, setWorkshopName] = useState('');
  const [email, setEmail] = useState('');

  // Calculate discount tier in INR
  const discountTier = 
    monthlySpend >= 200000 ? { tier: 'Pro Racing Paddock', discount: 25, term: 'Net 30 Days (GST ITC)' } :
    monthlySpend >= 75000 ? { tier: 'Silver Garages', discount: 18, term: 'Net 14 Days' } :
    { tier: 'Bronze Technician', discount: 12, term: 'Prepaid + Free Road Freight' };

  const annualSavings = monthlySpend * 12 * (discountTier.discount / 100);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workshopName || !email) return;
    setSubmitted(true);
  };

  return (
    <section id="workshop-fleet" className="py-16 bg-neutral-900/50 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Workshop Program Copy & Benefits */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 bg-neutral-950 border border-neutral-800 rounded-full px-3 py-1 text-xs text-amber-400 font-mono">
              <Wrench className="w-3.5 h-3.5" />
              <span>B2B TRADE & RACE PADDOCK PROGRAM</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Fuel Your Workshop With Wholesale Spares & Direct Bin Replenishment
            </h2>

            <p className="text-sm text-neutral-300 leading-relaxed">
              Eliminate motorcycle bay downtime. MotoTorq provides certified repair garages, custom builders, and racing paddocks with wholesale account privileges, priority next-morning courier dispatch, and live ERP stock synchronization.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="text-xs text-neutral-300">
                  <strong className="text-white">Live Inventory Restock Alerts:</strong> Automatic notification when critical wear items (brake pads, DID chains, spark plugs) fall below safety levels.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="text-xs text-neutral-300">
                  <strong className="text-white">No Minimum Order Restrictions:</strong> Order a single master link or 50 sets of sintered rotors with trade margin applied automatically.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="text-xs text-neutral-300">
                  <strong className="text-white">Direct OEM Technical Schematics:</strong> Download exploded chassis diagrams and torque specs directly through your trade dashboard.
                </div>
              </div>
            </div>

            {/* Garage Workshop Image Banner */}
            <div className="relative rounded-xl overflow-hidden border border-neutral-800 shadow-xl mt-4">
              <img 
                src="/src/assets/images/workshop_mechanic_tuning_1790745274755.jpg" 
                alt="Motorcycle race technician tuning sportbike in workshop bay" 
                referrerPolicy="no-referrer"
                className="w-full aspect-[16/9] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-3 text-[11px] font-mono text-neutral-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>CERTIFIED WORKSHOP & PADDOCK PARTNER NETWORK</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Volume Tier Calculator & Application */}
          <div className="lg:col-span-6">
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
              
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-neutral-400">
                    Interactive Margin Calculator
                  </span>
                  <span className="text-xs font-mono text-amber-400 font-bold">
                    Tier: {discountTier.tier}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  Estimate Your Monthly Workshop Spares Savings
                </h3>
              </div>

              {/* Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400">Estimated Monthly Spares Spend:</span>
                  <span className="text-base font-black font-mono text-amber-400">
                    {formatINR(monthlySpend)} / mo
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="500000"
                  step="5000"
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                  <span>₹10,000 (Solo Tech)</span>
                  <span>₹75,000 (3-Bay Garage)</span>
                  <span>₹5,00,000+ (Superbike Dealership)</span>
                </div>
              </div>

              {/* Calculated Tier Output */}
              <div className="grid grid-cols-3 gap-2 bg-neutral-900 p-3.5 rounded-xl border border-neutral-800 text-center font-mono">
                <div>
                  <span className="block text-[10px] text-neutral-400 uppercase">Margin Discount</span>
                  <span className="text-xl font-black text-emerald-400">
                    {discountTier.discount}% OFF
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-neutral-400 uppercase">Est. Annual Savings</span>
                  <span className="text-xl font-black text-white">
                    {formatINRLakhs(annualSavings)}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-neutral-400 uppercase">Credit Terms</span>
                  <span className="text-xs font-bold text-amber-400 mt-1 block">
                    {discountTier.term}
                  </span>
                </div>
              </div>

              {/* Instant Application Form */}
              {submitted ? (
                <div className="p-4 bg-emerald-950/60 border border-emerald-800/60 rounded-xl text-center space-y-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <div className="font-bold text-white text-sm">Wholesale Application Received</div>
                  <p className="text-xs text-neutral-300">
                    We have provisioned a provisional trade account for <strong>{workshopName}</strong>. Our depot representative will verify your tax ID within 2 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-3 pt-2">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-[10px] text-neutral-500 mb-1">Workshop / Business Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Speedline MotoWorks"
                        value={workshopName}
                        onChange={(e) => setWorkshopName(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-500 mb-1">Business Email</label>
                      <input
                        type="email"
                        required
                        placeholder="service@speedline.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Activate {discountTier.discount}% Wholesale Trade Account</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
