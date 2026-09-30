import React from 'react';
import { 
  CheckCircle2, 
  Printer, 
  Download, 
  X, 
  MapPin, 
  Barcode, 
  Truck, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';
import { useInventory } from '../context/InventoryContext';

export const OrderSuccessModal: React.FC = () => {
  const { activeModal, setActiveModal, lastOrderedOrderNumber } = useInventory();

  if (activeModal !== 'order-success') return null;

  const orderId = lastOrderedOrderNumber || 'MT-948210';
  const trackingNumber = `TRACK-${Math.floor(100000000 + Math.random() * 900000000)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg shadow-2xl p-6 sm:p-8 relative text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-950/80 hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Success Icon */}
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
          <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
        </div>

        <div className="text-center">
          <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
            DEPOT INVENTORY ALLOCATED
          </div>
          <h3 className="text-2xl font-black text-white mt-1">
            Order & Pick Sheet Confirmed
          </h3>
          <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
            Warehouse bins have been updated in real-time. Automated barcoding assigned for same-day dispatch.
          </p>
        </div>

        {/* Manifest Sheet */}
        <div className="my-5 p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-3 font-mono text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
            <span className="text-neutral-500 uppercase">Order ID:</span>
            <span className="font-bold text-white text-sm">{orderId}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-neutral-500">Tracking Code:</span>
            <span className="text-amber-400">{trackingNumber}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-neutral-500">Dispatch Depot:</span>
            <span className="text-neutral-300">Central Hub 01 (Chakan Auto Cluster, Pune)</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-neutral-500">Estimated Delivery:</span>
            <span className="text-emerald-400 font-bold">Tomorrow by 14:00 (Bluedart Express)</span>
          </div>

          {/* Simulated barcode */}
          <div className="pt-3 border-t border-neutral-800 text-center">
            <div className="text-[28px] tracking-[6px] font-mono text-neutral-400 select-none">
              ||| | |||| || ||| ||||| | ||
            </div>
            <div className="text-[10px] text-neutral-500 mt-1">
              SCAN-VERIFIED · GST INVOICE ITC COMPLIANT
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Pick Sheet</span>
          </button>
          <button
            onClick={() => setActiveModal(null)}
            className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            Back to Catalogue
          </button>
        </div>

      </div>
    </div>
  );
};
