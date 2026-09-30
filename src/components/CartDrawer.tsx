import React, { useState } from 'react';
import { 
  X, 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  FileText,
  AlertTriangle,
  Boxes
} from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { formatINR } from '../utils/formatCurrency';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart,
    checkoutCart,
    parts
  } = useInventory();

  const [shippingMethod, setShippingMethod] = useState<'ground' | 'air' | 'pickup'>('ground');
  const [formData, setFormData] = useState({
    name: 'Rajesh Kulkarni',
    email: 'rajesh@apex-tuning.in',
    phone: '+91 98230 45678',
    address: 'Plot B-14, Chakan MIDC Auto Cluster, Pune, MH 410501',
    workshopName: 'Apex Precision Moto Tuning'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCartOpen) return null;

  // Calculate totals in INR
  const subtotal = cart.reduce((sum, item) => sum + (item.part.price * item.quantity), 0);
  const totalWeight = cart.reduce((sum, item) => sum + (item.part.weightKg * item.quantity), 0);
  
  const shippingCost = 
    cart.length === 0 ? 0 :
    shippingMethod === 'pickup' ? 0 :
    shippingMethod === 'air' ? 450 :
    subtotal > 3000 ? 0 : 180;

  const grandTotal = subtotal + shippingCost;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      checkoutCart({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        shippingMethod: shippingMethod.toUpperCase()
      });
      setIsSubmitting(false);
      setIsCartOpen(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-neutral-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-lg bg-neutral-900 border-l border-neutral-800 h-full flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                Parts Order & Dispatch Queue
              </h3>
              <p className="text-xs text-neutral-400 font-mono">
                {cart.length} line items · {totalWeight.toFixed(2)} kg total mass
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-12 h-12 rounded-full bg-neutral-800 text-neutral-500 flex items-center justify-center mx-auto mb-3">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-neutral-300">Your parts queue is empty</p>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto mt-1">
                Browse our precision catalogue to add OEM and track-grade bike spares.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-4 py-2 bg-amber-500 text-neutral-950 rounded-lg text-xs font-bold hover:bg-amber-400"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs text-neutral-400 pb-1 border-b border-neutral-800 font-mono uppercase">
                  <span>Part / Depot Location</span>
                  <span>Qty & Price</span>
                </div>

                {cart.map(item => {
                  const livePart = parts.find(p => p.id === item.part.id) || item.part;
                  const isStockCritical = livePart.stock < item.quantity;

                  return (
                    <div 
                      key={item.part.id} 
                      className={`p-3 rounded-xl border transition-all ${
                        isStockCritical 
                          ? 'bg-red-950/20 border-red-800/60' 
                          : 'bg-neutral-950 border-neutral-800/90'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <img 
                            src={item.part.image} 
                            alt={item.part.name} 
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-lg object-cover border border-neutral-800 shrink-0" 
                          />
                          <div>
                            <div className="font-bold text-xs text-white line-clamp-1">
                              {item.part.name}
                            </div>
                            <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                              {item.part.sku} · {item.part.warehouseLocation}
                            </div>
                            <div className="text-[11px] text-amber-400 font-mono mt-0.5">
                              {formatINR(item.part.price)} each
                            </div>
                          </div>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => removeFromCart(item.part.id)}
                          className="text-neutral-500 hover:text-red-400 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Stock Warning if live stock fell below requested qty */}
                      {isStockCritical && (
                        <div className="mt-2 text-[11px] text-red-400 flex items-center gap-1.5 font-mono">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Only {livePart.stock} units remaining in central depot!</span>
                        </div>
                      )}

                      {/* Stepper & Line Total */}
                      <div className="mt-3 pt-2 border-t border-neutral-800/80 flex items-center justify-between">
                        <div className="flex items-center bg-neutral-900 border border-neutral-700/80 rounded-lg p-0.5">
                          <button
                            onClick={() => updateCartQuantity(item.part.id, item.quantity - 1)}
                            className="p-1 text-neutral-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold text-white min-w-[24px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.part.id, item.quantity + 1)}
                            disabled={item.quantity >= livePart.stock}
                            className="p-1 text-neutral-400 hover:text-white disabled:opacity-30"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="font-mono text-sm font-bold text-white">
                          {formatINR(item.part.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Shipping Tier Selector */}
              <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 space-y-2">
                <div className="text-xs font-mono uppercase text-neutral-400 font-semibold flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dispatch Freight Tier</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setShippingMethod('ground')}
                    className={`p-2 rounded-lg border text-left cursor-pointer transition-colors ${
                      shippingMethod === 'ground'
                        ? 'bg-amber-500/10 border-amber-500 text-white font-medium'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-[11px]">Surface Road Cargo</div>
                    <div className="text-[10px] text-neutral-400">2-4 Days</div>
                    <div className="font-mono text-[11px] text-amber-400 mt-1">
                      {subtotal > 3000 ? 'FREE' : '₹180'}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShippingMethod('air')}
                    className={`p-2 rounded-lg border text-left cursor-pointer transition-colors ${
                      shippingMethod === 'air'
                        ? 'bg-amber-500/10 border-amber-500 text-white font-medium'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-[11px]">Bluedart Air Express</div>
                    <div className="text-[10px] text-neutral-400">Next Day by 11 AM</div>
                    <div className="font-mono text-[11px] text-amber-400 mt-1">₹450</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShippingMethod('pickup')}
                    className={`p-2 rounded-lg border text-left cursor-pointer transition-colors ${
                      shippingMethod === 'pickup'
                        ? 'bg-amber-500/10 border-amber-500 text-white font-medium'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-[11px]">Depot Counter Will-Call</div>
                    <div className="text-[10px] text-neutral-400">Pune / Chennai Hub</div>
                    <div className="font-mono text-[11px] text-emerald-400 mt-1">FREE</div>
                  </button>
                </div>
              </div>

              {/* Workshop / Customer Details */}
              <form onSubmit={handleCheckout} className="space-y-3">
                <div className="text-xs font-mono uppercase text-neutral-400 font-semibold">
                  Workshop Dispatch Recipient
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="block text-[10px] text-neutral-500 mb-1">Contact Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-neutral-500 mb-1">Phone / Mobile</label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-[10px] text-neutral-500 mb-1">Delivery Address / Workshop Bay</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Price Breakdown */}
                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 space-y-1.5 text-xs">
                  <div className="flex justify-between text-neutral-400">
                    <span>Parts Subtotal:</span>
                    <span className="font-mono text-neutral-200">{formatINR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Estimated Freight:</span>
                    <span className="font-mono text-neutral-200">
                      {shippingCost === 0 ? 'FREE' : formatINR(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>GST (18% B2B Input Tax Credit Eligible):</span>
                    <span className="font-mono text-emerald-400">Included</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-neutral-800">
                    <span>Total Dispatch Value:</span>
                    <span className="font-mono text-amber-400">{formatINR(grandTotal)}</span>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
                >
                  {isSubmitting ? (
                    <span>Allocating Central Depot Stock...</span>
                  ) : (
                    <>
                      <span>Dispatch Order & Lock Stock</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
