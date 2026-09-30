import React from 'react';
import { useInventory } from '../context/InventoryContext';

const BRANDS = [
  { name: 'Brembo', spec: 'Braking Systems & Radial Master Cylinders' },
  { name: 'Öhlins', spec: 'Factory Monoshocks & Cartridge Kits' },
  { name: 'Akrapovič', spec: 'Titanium & Carbon Exhaust Systems' },
  { name: 'D.I.D Chain', spec: 'Pro-Street X-Ring & Gold Drive Links' },
  { name: 'NGK Spark', spec: 'Laser Iridium & Racing Electrics' },
  { name: 'K&N Engineering', spec: 'High-Flow Washable Air Filtration' },
  { name: 'Renthal', spec: '7010-T6 Handlebars & Twinwall Bars' },
  { name: 'Motul 300V', spec: 'Ester Core Synthetic Track Lubricants' },
  { name: 'Galfer', spec: 'Laser-Cut Floating Wave Brake Rotors' },
  { name: 'Samco Sport', spec: 'Reinforced Multi-Ply Silicone Hoses' },
];

export const PartnerBrands: React.FC = () => {
  const { setSelectedBrand } = useInventory();

  const handleBrandClick = (brandName: string) => {
    setSelectedBrand(brandName);
    const element = document.getElementById('catalog');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 border-b border-neutral-800 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
            AUTHENTIC TIER-1 COMPONENT PARTNERS
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            Factory Authorized Spares for Street, Superbike & Enduro
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {BRANDS.map(brand => (
            <button
              key={brand.name}
              onClick={() => handleBrandClick(brand.name)}
              className="bg-neutral-900/80 hover:bg-neutral-850 border border-neutral-800 hover:border-neutral-700 rounded-xl p-4 text-left transition-all group cursor-pointer"
            >
              <div className="font-black text-sm text-neutral-200 group-hover:text-amber-400 font-mono transition-colors">
                {brand.name}
              </div>
              <div className="text-[11px] text-neutral-500 line-clamp-1 mt-1 leading-tight">
                {brand.spec}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
