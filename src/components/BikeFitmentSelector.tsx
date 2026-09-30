import React, { useMemo } from 'react';
import { ShieldCheck, ChevronRight, RotateCcw, Check, Sparkles } from 'lucide-react';
import { POPULAR_BIKES } from '../data/bikesData';
import { useInventory } from '../context/InventoryContext';

export const BikeFitmentSelector: React.FC = () => {
  const { selectedBike, setSelectedBike } = useInventory();

  // Find models for selected make
  const availableModels = useMemo(() => {
    if (!selectedBike.make) return [];
    const found = POPULAR_BIKES.find(b => b.make.toLowerCase() === selectedBike.make.toLowerCase());
    return found ? found.models : [];
  }, [selectedBike.make]);

  // Find years for selected model
  const availableYears = useMemo(() => {
    if (!selectedBike.model || !selectedBike.make) return [];
    const modelObj = availableModels.find(m => m.name.toLowerCase() === selectedBike.model.toLowerCase());
    return modelObj ? modelObj.years : [];
  }, [availableModels, selectedBike.model, selectedBike.make]);

  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBike({
      make: e.target.value,
      model: '',
      year: null,
    });
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBike({
      ...selectedBike,
      model: e.target.value,
      year: null,
    });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBike({
      ...selectedBike,
      year: e.target.value ? parseInt(e.target.value, 10) : null,
    });
  };

  const quickPicks = [
    { make: 'Yamaha', model: 'MT-07', year: 2023 },
    { make: 'Yamaha', model: 'YZF-R7', year: 2024 },
    { make: 'Kawasaki', model: 'Ninja ZX-6R', year: 2023 },
    { make: 'KTM', model: '390 Duke', year: 2022 },
  ];

  return (
    <div id="garage-selector" className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
      {/* Background technical accent */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-neutral-800/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>100% Fitment Verification Engine</span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Lock in your bike to view guaranteed compatible spares
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Every part is cross-referenced with manufacturer schematics and chassis specifications.
          </p>
        </div>

        {selectedBike.make && (
          <div className="flex items-center gap-3 self-start lg:self-auto">
            <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/30 rounded-lg px-3 py-1.5 text-xs text-emerald-300">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                Fitment Active: <strong>{selectedBike.make} {selectedBike.model} {selectedBike.year ? `(${selectedBike.year})` : ''}</strong>
              </span>
            </div>
            <button
              onClick={() => setSelectedBike({ make: '', model: '', year: null })}
              className="text-xs text-neutral-400 hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
              title="Reset ride selection"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        )}
      </div>

      {/* Selectors grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
        {/* Make Select */}
        <div>
          <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1.5 font-medium">
            1. Manufacturer / Make
          </label>
          <div className="relative">
            <select
              value={selectedBike.make}
              onChange={handleMakeChange}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-neutral-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 appearance-none cursor-pointer"
            >
              <option value="">Select Manufacturer (e.g. Yamaha, KTM)</option>
              {POPULAR_BIKES.map(b => (
                <option key={b.make} value={b.make}>{b.make}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500">
              <ChevronRight className="w-4 h-4 rotate-90" />
            </div>
          </div>
        </div>

        {/* Model Select */}
        <div>
          <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1.5 font-medium">
            2. Model / Displacement
          </label>
          <div className="relative">
            <select
              value={selectedBike.model}
              onChange={handleModelChange}
              disabled={!selectedBike.make}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 appearance-none cursor-pointer"
            >
              <option value="">
                {selectedBike.make ? 'Select Model (e.g. MT-07)' : 'Select Make First'}
              </option>
              {availableModels.map(m => (
                <option key={m.name} value={m.name}>{m.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500">
              <ChevronRight className="w-4 h-4 rotate-90" />
            </div>
          </div>
        </div>

        {/* Year Select */}
        <div>
          <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1.5 font-medium">
            3. Model Year
          </label>
          <div className="relative">
            <select
              value={selectedBike.year || ''}
              onChange={handleYearChange}
              disabled={!selectedBike.model}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 appearance-none cursor-pointer"
            >
              <option value="">
                {selectedBike.model ? 'Select Year (e.g. 2024)' : 'Select Model First'}
              </option>
              {availableYears.map(yr => (
                <option key={yr} value={yr}>{yr}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500">
              <ChevronRight className="w-4 h-4 rotate-90" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Picks for Demo Convenience */}
      <div className="mt-4 pt-3 border-t border-neutral-800/60 flex flex-wrap items-center gap-2">
        <span className="text-[11px] text-neutral-500 uppercase font-mono tracking-wider">Quick Select:</span>
        {quickPicks.map(qp => (
          <button
            key={`${qp.make}-${qp.model}`}
            onClick={() => setSelectedBike({ make: qp.make, model: qp.model, year: qp.year })}
            className={`text-xs px-2.5 py-1 rounded transition-colors cursor-pointer border ${
              selectedBike.make === qp.make && selectedBike.model === qp.model
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-medium'
                : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border-neutral-800 hover:border-neutral-700'
            }`}
          >
            {qp.make} {qp.model} ('{String(qp.year).slice(-2)})
          </button>
        ))}
      </div>
    </div>
  );
};
