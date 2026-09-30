import React, { useState } from 'react';
import { 
  Check, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Plus, 
  Eye, 
  Star,
  CheckCircle2,
  XCircle,
  Truck
} from 'lucide-react';
import { SparePart } from '../types';
import { useInventory } from '../context/InventoryContext';
import { formatINR } from '../utils/formatCurrency';

interface PartCardProps {
  part: SparePart;
}

export const PartCard: React.FC<PartCardProps> = ({ part }) => {
  const { 
    setSelectedPart, 
    setActiveModal, 
    addToCart, 
    checkCompatibility, 
    selectedBike 
  } = useInventory();

  const [addedFlash, setAddedFlash] = useState(false);

  const compatibilityStatus = checkCompatibility(part);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (part.stock <= 0) return;
    const ok = addToCart(part, 1);
    if (ok) {
      setAddedFlash(true);
      setTimeout(() => setAddedFlash(false), 1200);
    }
  };

  const handleOpenDetail = () => {
    setSelectedPart(part);
    setActiveModal('part-detail');
  };

  // Stock status determination
  const isOutOfStock = part.stock === 0;
  const isLowStock = !isOutOfStock && part.stock <= part.minStockAlert;

  return (
    <div 
      onClick={handleOpenDetail}
      className="group relative bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:shadow-xl hover:shadow-black/40 cursor-pointer"
    >
      {/* Compatibility Banner (if user selected a bike) */}
      {compatibilityStatus !== 'none_selected' && (
        <div className={`px-3 py-1.5 text-[11px] font-semibold flex items-center justify-between border-b ${
          compatibilityStatus === 'guaranteed'
            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/40'
            : 'bg-neutral-900 text-neutral-400 border-neutral-800'
        }`}>
          <div className="flex items-center gap-1.5">
            {compatibilityStatus === 'guaranteed' ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Fits {selectedBike.make} {selectedBike.model}</span>
              </>
            ) : (
              <>
                <XCircle className="w-3.5 h-3.5 text-neutral-500" />
                <span>Not listed for {selectedBike.make} {selectedBike.model}</span>
              </>
            )}
          </div>
          {compatibilityStatus === 'guaranteed' && (
            <span className="text-[10px] text-emerald-400 font-mono">100% VERIFIED</span>
          )}
        </div>
      )}

      {/* Product Image Area with Tech Overlay */}
      <div className="relative aspect-[16/10] bg-neutral-950 overflow-hidden">
        <img 
          src={part.image} 
          alt={part.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />

        {/* Quick View Floating Hint */}
        <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-neutral-900/90 border border-neutral-700 text-neutral-100 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg backdrop-blur-sm">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Inspect Part & Specs</span>
          </span>
        </div>

        {/* Quiet Brand Stamp */}
        <div className="absolute top-2 left-2 bg-neutral-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-mono text-neutral-300 border border-neutral-800">
          {part.brand}
        </div>

        {/* OEM or Track badge */}
        {part.isHighPerformance && (
          <div className="absolute top-2 right-2 bg-amber-500/90 text-neutral-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
            TRACK SPEC
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Metadata row adhering to Zero-Pill discipline (unboxed clean text) */}
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1.5 font-mono">
            <span>{part.sku}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>{part.weightKg} kg</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-400">{part.warehouseLocation}</span>
          </div>

          {/* Part Name */}
          <h4 className="font-bold text-neutral-100 text-base group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
            {part.name}
          </h4>

          {/* Quiet OEM cross-ref */}
          <div className="text-[11px] text-neutral-500 font-mono mt-1">
            OEM Ref: {part.oemNumber}
          </div>

          {/* Key Tech Specs Snippet */}
          <div className="mt-2.5 pt-2.5 border-t border-neutral-800/60 text-xs text-neutral-400 space-y-1">
            {Object.entries(part.specifications).slice(0, 2).map(([key, val]) => (
              <div key={key} className="flex justify-between items-center text-[11px]">
                <span className="text-neutral-400">{key}:</span>
                <span className="font-mono text-neutral-300 font-medium">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stock & Pricing Footer */}
        <div className="mt-4 pt-3 border-t border-neutral-800">
          {/* Dynamic Stock Indicator */}
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-1.5">
              {isOutOfStock ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-red-400 font-medium">Out of Stock</span>
                </>
              ) : isLowStock ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-amber-400 font-medium">
                    Low Stock: {part.stock} left
                  </span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-emerald-400 font-medium">
                    {part.stock} units ready to dispatch
                  </span>
                </>
              )}
            </div>

            {part.incomingShipment && (
              <span className="text-[10px] text-neutral-400 font-mono">
                +{part.incomingShipment.quantity} on {part.incomingShipment.expectedDate}
              </span>
            )}
          </div>

          {/* Pricing & Add to Cart button */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-lg font-black text-white font-mono leading-none">
                {formatINR(part.price)}
              </div>
              {part.msrp && (
                <div className="text-[11px] text-neutral-500 line-through mt-0.5">
                  MSRP {formatINR(part.msrp)}
                </div>
              )}
            </div>

            <button
              onClick={handleQuickAdd}
              disabled={isOutOfStock}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                addedFlash
                  ? 'bg-emerald-500 text-neutral-950 font-bold'
                  : 'bg-neutral-800 hover:bg-amber-500 text-neutral-200 hover:text-neutral-950'
              }`}
              title={isOutOfStock ? 'Currently out of stock' : 'Add 1 unit to parts order'}
            >
              {addedFlash ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Added</span>
                </>
              ) : isOutOfStock ? (
                <span>Backorder</span>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
