import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ShieldCheck, 
  MapPin, 
  Truck, 
  Clock, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  Share2, 
  Plus, 
  Minus,
  Sparkles,
  Layers,
  Wrench,
  Boxes
} from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { formatINR } from '../utils/formatCurrency';

export const PartDetailModal: React.FC = () => {
  const { 
    selectedPart, 
    setSelectedPart, 
    activeModal, 
    setActiveModal, 
    addToCart, 
    checkCompatibility, 
    selectedBike,
    updateStock,
    setIsCartOpen
  } = useInventory();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'fitment' | 'warehouse'>('specs');
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (activeModal !== 'part-detail' || !selectedPart) return null;

  const isOut = selectedPart.stock === 0;
  const isLow = selectedPart.stock > 0 && selectedPart.stock <= selectedPart.minStockAlert;
  const compat = checkCompatibility(selectedPart);

  const handleIncrement = () => {
    if (quantity < selectedPart.stock) {
      setQuantity(q => q + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  const handleAddToCart = () => {
    if (isOut) return;
    const ok = addToCart(selectedPart, quantity);
    if (ok) {
      setAddedSuccess(true);
      setTimeout(() => {
        setAddedSuccess(false);
        setActiveModal(null);
        setIsCartOpen(true);
      }, 700);
    }
  };

  const handleCopySku = () => {
    navigator.clipboard.writeText(`${selectedPart.sku} - ${selectedPart.name}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 z-10 p-2 text-neutral-400 hover:text-white bg-neutral-950/80 hover:bg-neutral-800 rounded-full border border-neutral-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          
          {/* Left Column: Image & Warehouse Bin */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
              <img 
                src={selectedPart.image} 
                alt={selectedPart.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-3 left-3 bg-neutral-950/90 backdrop-blur-md px-2.5 py-1 rounded text-xs font-mono font-bold text-amber-400 border border-neutral-800">
                {selectedPart.brand}
              </div>
              {selectedPart.isHighPerformance && (
                <div className="absolute top-3 right-3 bg-amber-500 text-neutral-950 text-[10px] font-black uppercase px-2 py-1 rounded">
                  TRACK SPEC
                </div>
              )}
            </div>

            {/* Warehouse Dispatch Location Card */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 text-xs">
              <div className="flex items-center justify-between text-neutral-400 font-mono text-[11px] mb-2 pb-2 border-b border-neutral-800/80">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>REGIONAL CENTRAL DEPOT</span>
                </span>
                <span className="font-bold text-white">{selectedPart.warehouseLocation}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-400">
                <div>
                  <span className="block text-neutral-400">Unit Mass:</span>
                  <span className="font-mono text-neutral-200 font-medium">{selectedPart.weightKg} kg net</span>
                </div>
                <div>
                  <span className="block text-neutral-400">Warranty:</span>
                  <span className="text-neutral-200 font-medium">{selectedPart.warranty}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Part Details & Interactive Purchase / Stock Actions */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-5">
            <div>
              {/* Fitment Banner if bike selected */}
              {compat !== 'none_selected' && (
                <div className={`p-2.5 rounded-lg text-xs font-medium mb-3 flex items-center justify-between border ${
                  compat === 'guaranteed'
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                }`}>
                  <div className="flex items-center gap-2">
                    {compat === 'guaranteed' ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Guaranteed 100% Fitment for <strong>{selectedBike.make} {selectedBike.model}</strong></span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Verify fitment for {selectedBike.make} {selectedBike.model}</span>
                      </>
                    )}
                  </div>
                  <span className="font-mono text-[10px] text-neutral-400">CHASSIS PASS</span>
                </div>
              )}

              {/* Title & Part Numbers */}
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-1">
                <span>SKU: {selectedPart.sku}</span>
                <span>·</span>
                <span>OEM REF: {selectedPart.oemNumber}</span>
                <button
                  onClick={handleCopySku}
                  className="text-amber-400 hover:text-amber-300 ml-1 text-[11px] underline cursor-pointer"
                >
                  {copiedLink ? 'Copied!' : 'Copy SKU'}
                </button>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                {selectedPart.name}
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
                {selectedPart.description}
              </p>

              {/* Real-time Dynamic Stock Tracker */}
              <div className="mt-4 p-3 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className={`w-3 h-3 rounded-full shrink-0 ${
                    isOut ? 'bg-red-500' : isLow ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'
                  }`} />
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{isOut ? 'Currently Out of Stock' : `${selectedPart.stock} Units Ready in Depot`}</span>
                      <span className="text-[10px] text-neutral-400 font-mono">({selectedPart.warehouseLocation})</span>
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      {isOut 
                        ? 'Next batch in transit — pre-orders accepted' 
                        : 'Ships today if ordered before 16:30 PM'}
                    </div>
                  </div>
                </div>

                {selectedPart.incomingShipment && (
                  <div className="text-right text-xs border-l border-neutral-800 pl-3">
                    <span className="block text-[10px] text-neutral-400 uppercase font-mono">Inbound Batch</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      +{selectedPart.incomingShipment.quantity} on {selectedPart.incomingShipment.expectedDate}
                    </span>
                  </div>
                )}
              </div>

              {/* Tabs for Technical Deep Dive */}
              <div className="mt-5">
                <div className="flex items-center border-b border-neutral-800 gap-4 text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-2 transition-colors cursor-pointer border-b-2 ${
                      activeTab === 'specs' 
                        ? 'border-amber-400 text-amber-400' 
                        : 'border-transparent text-neutral-400 hover:text-white'
                    }`}
                  >
                    Technical Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('fitment')}
                    className={`pb-2 transition-colors cursor-pointer border-b-2 ${
                      activeTab === 'fitment' 
                        ? 'border-amber-400 text-amber-400' 
                        : 'border-transparent text-neutral-400 hover:text-white'
                    }`}
                  >
                    Verified Compatible Bikes ({selectedPart.compatibleBikes.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('warehouse')}
                    className={`pb-2 transition-colors cursor-pointer border-b-2 ${
                      activeTab === 'warehouse' 
                        ? 'border-amber-400 text-amber-400' 
                        : 'border-transparent text-neutral-400 hover:text-white'
                    }`}
                  >
                    Shipping & Guarantee
                  </button>
                </div>

                {/* Tab 1: Specs */}
                {activeTab === 'specs' && (
                  <div className="pt-3 grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(selectedPart.specifications).map(([key, value]) => (
                      <div key={key} className="bg-neutral-950/60 p-2.5 rounded border border-neutral-800/80">
                        <span className="block text-[10px] text-neutral-400 uppercase font-mono">{key}</span>
                        <span className="font-mono font-semibold text-neutral-200 mt-0.5 block">{value}</span>
                      </div>
                    ))}
                    <div className="bg-neutral-950/60 p-2.5 rounded border border-neutral-800/80">
                      <span className="block text-[10px] text-neutral-400 uppercase font-mono">Material Composition</span>
                      <span className="font-semibold text-neutral-200 mt-0.5 block">{selectedPart.material}</span>
                    </div>
                    <div className="bg-neutral-950/60 p-2.5 rounded border border-neutral-800/80">
                      <span className="block text-[10px] text-neutral-400 uppercase font-mono">Certification & Quality</span>
                      <span className="font-semibold text-neutral-200 mt-0.5 block">ISO 9001 / Race Track Tested</span>
                    </div>
                  </div>
                )}

                {/* Tab 2: Fitment */}
                {activeTab === 'fitment' && (
                  <div className="pt-3 max-h-48 overflow-y-auto space-y-1.5">
                    {selectedPart.compatibleBikes.map((bike, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-neutral-950/60 px-3 py-2 rounded text-xs border border-neutral-800/80">
                        <div className="font-semibold text-neutral-200">
                          {bike.make} {bike.model}
                        </div>
                        <div className="font-mono text-neutral-400 text-[11px]">
                          Years {bike.yearStart} - {bike.yearEnd}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tab 3: Shipping */}
                {activeTab === 'warehouse' && (
                  <div className="pt-3 space-y-2 text-xs text-neutral-300">
                    <div className="flex items-center gap-2 text-neutral-200">
                      <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Same-day priority air & road freight for orders before 4:30 PM.</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-200">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>100% Fitment Guarantee: If it doesn't bolt on seamlessly, free return & replacement.</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-200">
                      <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>{selectedPart.warranty} against thermal cracking and manufacturing defects.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Price & Quantity Add to Cart */}
            <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-2xl font-black text-white font-mono leading-none">
                  {formatINR(selectedPart.price * quantity)}
                </div>
                <div className="text-xs text-neutral-400 mt-1">
                  {formatINR(selectedPart.price)} each · Incl. 18% GST (Input Tax Credit Eligible)
                </div>
              </div>

              {/* Quantity Stepper & Add Button */}
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-lg p-1">
                  <button
                    onClick={handleDecrement}
                    disabled={quantity <= 1 || isOut}
                    className="p-1.5 text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-mono font-bold text-white min-w-[32px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    disabled={quantity >= selectedPart.stock || isOut}
                    className="p-1.5 text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isOut}
                  className={`px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                    addedSuccess
                      ? 'bg-emerald-500 text-neutral-950'
                      : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-lg shadow-amber-500/20'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Added to Dispatch Queue</span>
                    </>
                  ) : isOut ? (
                    <span>Backorder Request</span>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>Add {quantity} to Order</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
