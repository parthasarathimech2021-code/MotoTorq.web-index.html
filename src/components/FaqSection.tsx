import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'How does the MotoTorq dynamic inventory engine prevent ghost stock?',
    a: 'Our stock levels connect in real time to RFID barcode scanners across our regional depots. When an item is added to a processing order, that inventory unit is reserved immediately with an allocation lock. We never list drop-shipped or unverified third-party distributor inventory.'
  },
  {
    q: 'What is covered under the 100% Fitment Guarantee?',
    a: 'If you select your motorcycle make, model, and year using our garage selector and purchase a verified part, we guarantee direct bolt-on installation without drilling or irreversible modification. If it does not fit, we provide immediate free return postage and a 100% refund or expedited exchange.'
  },
  {
    q: 'What is the daily cutoff for same-day dispatch?',
    a: 'Orders finalized before 16:30 (4:30 PM CST) Monday through Friday are packed and handed over to courier sorting centers that same afternoon. Priority Air delivery delivers next business morning by 10:30 AM.'
  },
  {
    q: 'Are your high-performance parts street legal (ECE/DOT)?',
    a: 'Every spare part card displays its homologation compliance in the technical specifications. Street-approved parts (like Euro-5 Akrapovič slip-ons and Galfer rotors) include certified documentation for road safety inspections.'
  },
  {
    q: 'Can workshops order in bulk with credit terms?',
    a: 'Yes. Certified repair facilities and race teams can apply for our B2B Trade Program to access 12% to 25% margins, Net-30 credit invoicing, and automated weekly replenishment for high-turnover consumables.'
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 bg-neutral-900/40 border-b border-neutral-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider mb-1">
            TECHNICAL SUPPORT & LOGISTICS
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Everything you need to know regarding depot dispatch, bolt-on fitment, and wholesale trade.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-900/50 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-neutral-100">
                    {item.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
