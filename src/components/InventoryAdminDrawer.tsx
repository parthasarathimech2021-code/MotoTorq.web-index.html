import React, { useState } from 'react';
import { 
  X, 
  SlidersHorizontal, 
  RotateCcw, 
  Radio, 
  PackagePlus, 
  ArrowUpRight, 
  ArrowDownRight, 
  Boxes, 
  Activity, 
  Check, 
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { useInventory } from '../context/InventoryContext';

export const InventoryAdminDrawer: React.FC = () => {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    parts, 
    updateStock, 
    restockIncoming, 
    isLiveSimulationActive, 
    setIsLiveSimulationActive, 
    recentLogs,
    inventoryStats,
    resetToDefaultInventory
  } = useInventory();

  const [selectedPartId, setSelectedPartId] = useState(parts[0]?.id || '');
  const [stockInput, setStockInput] = useState<number>(parts[0]?.stock || 10);
  const [activeTab, setActiveTab] = useState<'adjust' | 'audit' | 'bulk'>('adjust');

  if (!isAdminOpen) return null;

  const currentPart = parts.find(p => p.id === selectedPartId) || parts[0];

  const handleSelectPart = (id: string) => {
    setSelectedPartId(id);
    const p = parts.find(item => item.id === id);
    if (p) setStockInput(p.stock);
  };

  const handleSaveStock = () => {
    if (!currentPart) return;
    updateStock(currentPart.id, stockInput, 'Admin Manual Stock Adjustment');
  };

  const handleSimulateBulkOrder = (id: string, qty: number) => {
    const p = parts.find(item => item.id === id);
    if (!p) return;
    const newQty = Math.max(0, p.stock - qty);
    updateStock(p.id, newQty, `Simulated Workshop Bulk Order (-${qty})`);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-neutral-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-xl bg-neutral-900 border-l border-neutral-800 h-full flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                <span>Dynamic Inventory Control Room</span>
                <span className="text-[10px] font-mono bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded">
                  DEMO ENGINE
                </span>
              </h3>
              <p className="text-[11px] text-neutral-400">
                Directly manipulate depot stock levels & observe live reactive UI updates.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Live Ticker & Stats Summary */}
        <div className="grid grid-cols-3 gap-2 p-3 bg-neutral-950/60 border-b border-neutral-800 text-xs font-mono">
          <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
            <span className="block text-[10px] text-neutral-400 uppercase">Total Units</span>
            <span className="font-bold text-white text-sm">{inventoryStats.totalUnits}</span>
          </div>
          <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
            <span className="block text-[10px] text-neutral-400 uppercase">Critical Low</span>
            <span className="font-bold text-amber-400 text-sm">{inventoryStats.lowStockCount} SKUs</span>
          </div>
          <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
            <span className="block text-[10px] text-neutral-400 uppercase">Live Simulation</span>
            <button
              onClick={() => setIsLiveSimulationActive(!isLiveSimulationActive)}
              className="font-bold text-xs flex items-center gap-1 text-emerald-400 hover:text-emerald-300 cursor-pointer mt-0.5"
            >
              <Radio className={`w-3 h-3 ${isLiveSimulationActive ? 'animate-pulse' : ''}`} />
              <span>{isLiveSimulationActive ? 'Active' : 'Paused'}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-neutral-800 bg-neutral-950 px-4 text-xs font-medium">
          <button
            onClick={() => setActiveTab('adjust')}
            className={`py-3 px-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'adjust' 
                ? 'border-amber-400 text-amber-400 font-semibold' 
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Adjust Stock by SKU
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`py-3 px-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'audit' 
                ? 'border-amber-400 text-amber-400 font-semibold' 
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Real-Time Audit Log ({recentLogs.length})
          </button>
          <button
            onClick={() => setActiveTab('bulk')}
            className={`py-3 px-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'bulk' 
                ? 'border-amber-400 text-amber-400 font-semibold' 
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Depot Inward Actions
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          
          {/* TAB 1: Single Part Stock Adjustment */}
          {activeTab === 'adjust' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                  Select Part to Modify
                </label>
                <select
                  value={selectedPartId}
                  onChange={(e) => handleSelectPart(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  {parts.map(p => (
                    <option key={p.id} value={p.id}>
                      [{p.sku}] {p.name.slice(0, 38)}... ({p.stock} in stock)
                    </option>
                  ))}
                </select>
              </div>

              {currentPart && (
                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-neutral-800">
                    <span className="font-mono text-neutral-400">{currentPart.sku}</span>
                    <span className="text-amber-400 font-mono">{currentPart.warehouseLocation}</span>
                  </div>

                  <div className="font-bold text-white text-sm">
                    {currentPart.name}
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                    <div>
                      <span className="block text-neutral-500">Current Depot Stock:</span>
                      <span className="font-mono text-lg font-black text-white">{currentPart.stock} units</span>
                    </div>
                    <div>
                      <span className="block text-neutral-500">Min Alert Threshold:</span>
                      <span className="font-mono text-neutral-300 font-semibold">{currentPart.minStockAlert} units</span>
                    </div>
                  </div>

                  {/* Stock Input Stepper */}
                  <div className="pt-2">
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                      Set New Stock Level
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="999"
                        value={stockInput}
                        onChange={(e) => setStockInput(parseInt(e.target.value, 10) || 0)}
                        className="bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm font-mono text-white w-28 focus:outline-none focus:border-amber-500"
                      />
                      <button
                        onClick={handleSaveStock}
                        className="flex-1 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer"
                      >
                        Apply Stock Level
                      </button>
                    </div>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="flex items-center gap-2 pt-2 text-xs">
                    <span className="text-[10px] text-neutral-500 uppercase font-mono">Test Presets:</span>
                    <button
                      onClick={() => { setStockInput(0); updateStock(currentPart.id, 0, 'Forced Out of Stock Test'); }}
                      className="px-2 py-1 bg-red-950/80 text-red-300 border border-red-800/50 rounded text-[11px] cursor-pointer"
                    >
                      Set 0 (Out)
                    </button>
                    <button
                      onClick={() => { setStockInput(2); updateStock(currentPart.id, 2, 'Forced Low Stock Alert'); }}
                      className="px-2 py-1 bg-amber-950/80 text-amber-300 border border-amber-800/50 rounded text-[11px] cursor-pointer"
                    >
                      Set 2 (Low Alert)
                    </button>
                    <button
                      onClick={() => { setStockInput(25); updateStock(currentPart.id, 25, 'Replenished Depot Buffer'); }}
                      className="px-2 py-1 bg-emerald-950/80 text-emerald-300 border border-emerald-800/50 rounded text-[11px] cursor-pointer"
                    >
                      Set 25 (Full Stock)
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Live Audit Log */}
          {activeTab === 'audit' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-400 pb-1">
                <span>Timestamp & Event</span>
                <span>Delta</span>
              </div>
              <div className="space-y-1.5 max-h-96 overflow-y-auto">
                {recentLogs.map(log => (
                  <div key={log.id} className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 text-xs">
                    <div className="flex items-center justify-between font-mono text-[11px] text-neutral-400">
                      <span>[{log.timestamp}] {log.location}</span>
                      <span className={`font-bold ${log.change < 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {log.change < 0 ? `${log.change} units` : `+${log.change} units`}
                      </span>
                    </div>
                    <div className="font-semibold text-neutral-200 mt-1 truncate">
                      {log.partName}
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-0.5 flex justify-between">
                      <span>{log.reason}</span>
                      <span className="font-mono text-neutral-400">New Bal: {log.newStock}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Depot Bulk Inbound Actions */}
          {activeTab === 'bulk' && (
            <div className="space-y-4 text-xs">
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold">
                  <PackagePlus className="w-4 h-4 text-emerald-400" />
                  <span>Receive Pending Shipments</span>
                </div>
                <p className="text-neutral-400 text-xs">
                  Scan and inward incoming factory containers with a single click:
                </p>

                <div className="space-y-2 pt-1">
                  {parts.filter(p => p.incomingShipment).map(p => (
                    <div key={p.id} className="flex items-center justify-between bg-neutral-900 p-2.5 rounded-lg border border-neutral-800">
                      <div>
                        <div className="font-bold text-neutral-200">{p.brand} · {p.name.slice(0, 30)}...</div>
                        <div className="text-[11px] text-neutral-400 font-mono">
                          +{p.incomingShipment?.quantity} units expected on {p.incomingShipment?.expectedDate}
                        </div>
                      </div>
                      <button
                        onClick={() => restockIncoming(p.id)}
                        className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold px-3 py-1.5 rounded text-xs transition-colors cursor-pointer"
                      >
                        Inward Now
                      </button>
                    </div>
                  ))}
                  {parts.filter(p => p.incomingShipment).length === 0 && (
                    <div className="text-neutral-500 text-xs italic">
                      All inbound shipments have been received and racked in warehouse bins.
                    </div>
                  )}
                </div>
              </div>

              {/* Fast Simulated Dispatch */}
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Activity className="w-4 h-4 text-amber-400" />
                  <span>Simulate Workshop High-Demand Run</span>
                </div>
                <p className="text-neutral-400 text-xs">
                  Trigger an instantaneous wholesale run to stress-test low-stock threshold triggers.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => handleSimulateBulkOrder('prt-001', 5)}
                    className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 rounded text-xs cursor-pointer"
                  >
                    -5 Brembo Z04 Pads
                  </button>
                  <button
                    onClick={() => handleSimulateBulkOrder('prt-002', 4)}
                    className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 rounded text-xs cursor-pointer"
                  >
                    -4 D.I.D Chain Kits
                  </button>
                  <button
                    onClick={() => handleSimulateBulkOrder('prt-009', 10)}
                    className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 rounded text-xs cursor-pointer"
                  >
                    -10 Motul 300V Oils
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer: Reset Database to Default */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-xs">
          <button
            onClick={resetToDefaultInventory}
            className="text-neutral-400 hover:text-red-400 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Inventory</span>
          </button>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg font-medium transition-colors cursor-pointer"
          >
            Close Controller
          </button>
        </div>

      </div>
    </div>
  );
};
