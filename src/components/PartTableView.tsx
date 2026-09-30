import React, { useState } from 'react';
import { Plus, Check, Eye, AlertTriangle, ArrowUpDown } from 'lucide-react';
import { SparePart } from '../types';
import { useInventory } from '../context/InventoryContext';
import { formatINR } from '../utils/formatCurrency';

interface PartTableViewProps {
  parts: SparePart[];
}

export const PartTableView: React.FC<PartTableViewProps> = ({ parts }) => {
  const { setSelectedPart, setActiveModal, addToCart, checkCompatibility, selectedBike } = useInventory();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (part: SparePart, e: React.MouseEvent) => {
    e.stopPropagation();
    if (part.stock <= 0) return;
    const ok = addToCart(part, 1);
    if (ok) {
      setAddedId(part.id);
      setTimeout(() => setAddedId(null), 1200);
    }
  };

  const handleRowClick = (part: SparePart) => {
    setSelectedPart(part);
    setActiveModal('part-detail');
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-neutral-300">
          <thead className="bg-neutral-950 text-neutral-400 uppercase font-mono text-[11px] border-b border-neutral-800">
            <tr>
              <th className="py-3 px-4">Part / Spec</th>
              <th className="py-3 px-4">SKU / OEM Code</th>
              <th className="py-3 px-4">Category & Brand</th>
              <th className="py-3 px-4">Warehouse Bin</th>
              <th className="py-3 px-4">Live Inventory</th>
              {selectedBike.make && <th className="py-3 px-4">Fitment Status</th>}
              <th className="py-3 px-4 text-right">Unit Price</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/80 font-normal">
            {parts.map(part => {
              const compat = checkCompatibility(part);
              const isLow = part.stock > 0 && part.stock <= part.minStockAlert;
              const isOut = part.stock === 0;

              return (
                <tr 
                  key={part.id} 
                  onClick={() => handleRowClick(part)}
                  className="hover:bg-neutral-850 transition-colors cursor-pointer group"
                >
                  {/* Part Image & Name */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={part.image} 
                        alt={part.name} 
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded object-cover border border-neutral-800 shrink-0" 
                      />
                      <div>
                        <div className="font-bold text-neutral-100 group-hover:text-amber-400 transition-colors">
                          {part.name}
                        </div>
                        <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                          {part.material} · {part.weightKg} kg
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* SKU & OEM Code */}
                  <td className="py-3 px-4 font-mono text-neutral-300">
                    <div className="font-semibold">{part.sku}</div>
                    <div className="text-[10px] text-neutral-500">{part.oemNumber}</div>
                  </td>

                  {/* Category & Brand */}
                  <td className="py-3 px-4">
                    <div className="text-neutral-200 capitalize">{part.category}</div>
                    <div className="text-[11px] text-neutral-500">{part.brand}</div>
                  </td>

                  {/* Bin location */}
                  <td className="py-3 px-4 font-mono text-neutral-400">
                    {part.warehouseLocation}
                  </td>

                  {/* Dynamic stock indicator */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${
                        isOut ? 'bg-red-500' : isLow ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'
                      }`} />
                      <div>
                        <span className={`font-mono font-bold ${
                          isOut ? 'text-red-400' : isLow ? 'text-amber-400' : 'text-emerald-400'
                        }`}>
                          {part.stock} in stock
                        </span>
                        {part.incomingShipment && (
                          <div className="text-[10px] text-neutral-400 font-mono">
                            +{part.incomingShipment.quantity} on {part.incomingShipment.expectedDate}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Fitment check */}
                  {selectedBike.make && (
                    <td className="py-3 px-4 font-mono text-[11px]">
                      {compat === 'guaranteed' ? (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>100% Fits</span>
                        </span>
                      ) : (
                        <span className="text-neutral-500">Non-Direct</span>
                      )}
                    </td>
                  )}

                  {/* Price */}
                  <td className="py-3 px-4 text-right font-mono text-sm font-bold text-white">
                    {formatINR(part.price)}
                  </td>

                  {/* Quick Add */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={(e) => handleAdd(part, e)}
                      disabled={isOut}
                      className={`p-2 rounded-lg text-xs font-semibold transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer ${
                        addedId === part.id 
                          ? 'bg-emerald-500 text-neutral-950' 
                          : 'bg-neutral-800 hover:bg-amber-500 text-neutral-200 hover:text-neutral-950'
                      }`}
                      title="Add to order"
                    >
                      {addedId === part.id ? (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
