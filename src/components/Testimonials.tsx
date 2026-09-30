import React from 'react';
import { Star, ShieldCheck, Wrench } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Marcus Brody',
    role: 'Chief Race Mechanic',
    team: 'Velocity Superbike Team (MotoAmerica)',
    bike: 'Yamaha YZF-R7 & ZX-6R',
    text: 'When we blew a rear monoshock seal during Thursday free practice at Road America, MotoTorq overnighted an Öhlins STX46 right to the paddock gate before 9:00 AM Friday. The live inventory count was 100% truthful — no ghost stock.',
    rating: 5,
  },
  {
    name: 'Elena Rostova',
    role: 'Founder & Master Technician',
    team: 'TorqueCraft MotoWorks (Austin, TX)',
    bike: 'KTM 890 Duke R & MT-09',
    text: 'We handle 40+ motorcycle servicing jobs a week. The OEM cross-referencing on MotoTorq cuts down our parts lookup time by half. Brembo pads and D.I.D 525 kits are always delivered boxed and authentic with factory barcodes intact.',
    rating: 5,
  },
  {
    name: 'David Chen',
    role: 'Track Day Enthusiast & DIY Builder',
    team: 'Bay Area Sportbike Club',
    bike: 'Honda CBR600RR (2022)',
    text: 'The vehicle compatibility matcher saved me from ordering the wrong rotor diameter. Galfer wave floating discs bolted right up to my stock calipers with zero clearance issues. Best spares website hands down.',
    rating: 5,
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider mb-1">
            TESTED ON TRACK & TARMAC
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Verified Feedback from Motorcycle Technicians & Racers
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            Real riders who push hardware to redline every weekend.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, idx) => (
            <div 
              key={idx}
              className="bg-neutral-900/70 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              {/* Author Info adhering to Zero-Pill rule */}
              <div className="mt-5 pt-4 border-t border-neutral-800">
                <div className="font-bold text-white text-sm">
                  {rev.name}
                </div>
                {/* Clean unboxed metadata with separators */}
                <div className="text-xs text-neutral-400 flex flex-wrap items-center gap-1.5 mt-0.5 font-mono text-[11px]">
                  <span>{rev.role}</span>
                  <span aria-hidden="true" className="text-neutral-600">·</span>
                  <span className="text-amber-400">{rev.team}</span>
                </div>
                <div className="text-[11px] text-neutral-500 font-mono mt-1">
                  Ride: {rev.bike}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
