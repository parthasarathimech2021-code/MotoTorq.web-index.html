import React from 'react';
import { ShieldCheck, Truck, Gauge, Wrench, CheckCircle2 } from 'lucide-react';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: '100% Fitment Guarantee',
    description: 'Every part number is mapped directly to OEM technical service manuals. If a verified part does not bolt straight onto your chassis, we refund 100% and cover return freight.',
    metric: '99.8% Accuracy'
  },
  {
    icon: Truck,
    title: '24-Hour Rapid Dispatch',
    description: 'All in-stock spares reside in our temperature-controlled regional distribution depots. Orders placed before 16:30 dispatch the exact same day.',
    metric: 'Same-Day Air'
  },
  {
    icon: Gauge,
    title: 'Track-Tested Metallurgy',
    description: 'We subject friction materials, CNC rearsets, and drive chains to high-stress dyno and track endurance protocols before authorizing them for catalogue listing.',
    metric: '650°C Rated'
  },
  {
    icon: Wrench,
    title: 'Certified OEM Traceability',
    description: 'Direct relationships with tier-1 manufacturers ensure every bearing, spark plug, and gasket carries genuine factory serials and holograms.',
    metric: 'Zero Counterfeits'
  }
];

export const TrustFeatures: React.FC = () => {
  return (
    <section className="bg-neutral-900/60 border-y border-neutral-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider mb-1">
            ENGINEERED WITHOUT COMPROMISE
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Why Race Teams & Independent Garages Rely on MotoTorq
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            In motorcycle performance, precision fitment is not optional — it is safety critical.
          </p>
        </div>

        {/* Feature Cards Grid adhering to anti-slop rules (unboxed metadata, clean typography) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="bg-neutral-950 border border-neutral-800/80 rounded-xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider mb-1">
                    {feat.metric}
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {feat.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Depot Quality Verified</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
