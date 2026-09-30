import React, { useState, useMemo } from 'react';
import { 
  LayoutGrid, 
  List, 
  Filter, 
  Search, 
  ArrowUpDown, 
  Check, 
  RotateCcw, 
  ShieldCheck, 
  SlidersHorizontal,
  Flame,
  CheckCircle2,
  X
} from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { PartCard } from './PartCard';
import { PartTableView } from './PartTableView';
import { StockStatus } from '../types';

export const InventoryCatalog: React.FC = () => {
  const { 
    parts, 
    activeCategory, 
    searchQuery, 
    setSearchQuery, 
    stockStatusFilter, 
    setStockStatusFilter,
    selectedBrand,
    setSelectedBrand,
    isHighPerfOnly,
    setIsHighPerfOnly,
    isOemOnly,
    setIsOemOnly,
    sortBy,
    setSortBy,
    selectedBike,
    checkCompatibility,
    setSelectedBike,
    setActiveCategory
  } = useInventory();

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [onlyGuaranteedFits, setOnlyGuaranteedFits] = useState(false);

  // Extract unique brands for brand filter
  const brands = useMemo(() => {
    const list = Array.from(new Set(parts.map(p => p.brand)));
    return list.sort();
  }, [parts]);

  // Filter and sort parts
  const filteredParts = useMemo(() => {
    let result = [...parts];

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Search query filter (part name, sku, oem, tags, and bike model compatibility)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const qClean = q.replace(/[-\s_]/g, '');

      result = result.filter(p => {
        const nameMatch = p.name.toLowerCase().includes(q);
        const skuMatch = p.sku.toLowerCase().includes(q) || p.sku.toLowerCase().replace(/[-\s_]/g, '').includes(qClean);
        const oemMatch = p.oemNumber.toLowerCase().includes(q) || p.oemNumber.toLowerCase().replace(/[-\s_]/g, '').includes(qClean);
        const brandMatch = p.brand.toLowerCase().includes(q);
        const tagMatch = p.tags.some(t => t.toLowerCase().includes(q));

        // Bike model compatibility check
        const bikeMatch = p.compatibleBikes.some(cb => {
          const makeClean = cb.make.toLowerCase().replace(/[-\s_]/g, '');
          const modelClean = cb.model.toLowerCase().replace(/[-\s_]/g, '');
          const fullClean = `${makeClean}${modelClean}`;
          const fullNormal = `${cb.make} ${cb.model}`.toLowerCase();

          return (
            fullNormal.includes(q) ||
            fullClean.includes(qClean) ||
            cb.make.toLowerCase().includes(q) ||
            cb.model.toLowerCase().includes(q) ||
            (cb.yearStart && `${cb.yearStart}`.includes(q)) ||
            (cb.yearEnd && `${cb.yearEnd}`.includes(q))
          );
        });

        return nameMatch || skuMatch || oemMatch || brandMatch || tagMatch || bikeMatch;
      });
    }

    // Brand filter
    if (selectedBrand !== 'all') {
      result = result.filter(p => p.brand === selectedBrand);
    }

    // High performance only
    if (isHighPerfOnly) {
      result = result.filter(p => p.isHighPerformance);
    }

    // OEM only
    if (isOemOnly) {
      result = result.filter(p => p.isOemGenuine);
    }

    // Stock status filter
    if (stockStatusFilter === 'in_stock') {
      result = result.filter(p => p.stock > 0);
    } else if (stockStatusFilter === 'low_stock') {
      result = result.filter(p => p.stock > 0 && p.stock <= p.minStockAlert);
    } else if (stockStatusFilter === 'out_of_stock') {
      result = result.filter(p => p.stock === 0);
    } else if (stockStatusFilter === 'incoming') {
      result = result.filter(p => Boolean(p.incomingShipment));
    }

    // Bike compatibility filter
    if (onlyGuaranteedFits && selectedBike.make) {
      result = result.filter(p => checkCompatibility(p) === 'guaranteed');
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'stock_desc') return b.stock - a.stock;
      if (sortBy === 'rating_desc') return b.rating - a.rating;
      return 0; // featured / default
    });

    return result;
  }, [
    parts, 
    activeCategory, 
    searchQuery, 
    selectedBrand, 
    isHighPerfOnly, 
    isOemOnly, 
    stockStatusFilter, 
    onlyGuaranteedFits, 
    selectedBike, 
    checkCompatibility, 
    sortBy
  ]);

  const resetAllFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setSelectedBrand('all');
    setIsHighPerfOnly(false);
    setIsOemOnly(false);
    setStockStatusFilter('all');
    setOnlyGuaranteedFits(false);
  };

  const hasActiveFilters = 
    activeCategory !== 'all' || 
    searchQuery !== '' || 
    selectedBrand !== 'all' || 
    isHighPerfOnly || 
    isOemOnly || 
    stockStatusFilter !== 'all' || 
    onlyGuaranteedFits;

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Section Title & View Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-neutral-800">
        <div>
          <div className="text-xs font-mono uppercase text-amber-400 font-semibold tracking-wider">
            DYNAMIC PARTS INVENTORY
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Engineered Spares & Replacement Hardware
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Displaying live stock counts directly connected to our regional distribution vaults.
          </p>
        </div>

        {/* View Toggle & Count */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <span className="text-xs text-neutral-400 font-mono">
            <strong className="text-white font-bold">{filteredParts.length}</strong> parts matched
          </span>

          <div className="flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewMode === 'grid' 
                  ? 'bg-neutral-800 text-amber-400 shadow-sm' 
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Grid Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewMode === 'table' 
                  ? 'bg-neutral-800 text-amber-400 shadow-sm' 
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Workshop Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Control Bar: Filters & Sort (Segmented Controls respecting anti-slop rules) */}
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4 mb-8 space-y-4">
        
        {/* Row 1: Stock Status Segmented Control & Bike Fit Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Segmented Stock Status Controls */}
          <div className="flex items-center gap-1 p-1 bg-neutral-950 border border-neutral-800 rounded-lg overflow-x-auto max-w-full">
            <button
              onClick={() => setStockStatusFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer whitespace-nowrap ${
                stockStatusFilter === 'all'
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              All Availability ({parts.length})
            </button>
            <button
              onClick={() => setStockStatusFilter('in_stock')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                stockStatusFilter === 'in_stock'
                  ? 'bg-emerald-950/80 text-emerald-300 font-semibold border border-emerald-800/50'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>In Stock Only</span>
            </button>
            <button
              onClick={() => setStockStatusFilter('low_stock')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                stockStatusFilter === 'low_stock'
                  ? 'bg-amber-950/80 text-amber-300 font-semibold border border-amber-800/50'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Low Stock Alerts</span>
            </button>
            <button
              onClick={() => setStockStatusFilter('incoming')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                stockStatusFilter === 'incoming'
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <span>Incoming Shipments</span>
            </button>
          </div>

          {/* Bike Fit Lock Toggle */}
          {selectedBike.make && (
            <button
              onClick={() => setOnlyGuaranteedFits(!onlyGuaranteedFits)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                onlyGuaranteedFits 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' 
                  : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Only 100% Fits My {selectedBike.make}</span>
            </button>
          )}
        </div>

        {/* Row 2: Secondary Dropdowns (Brand, Performance Spec, Sort) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-neutral-800/60">
          
          {/* Brand select */}
          <div>
            <label className="block text-[10px] uppercase font-mono text-neutral-400 mb-1">
              Filter Brand
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="all">All Manufacturers & Tuners</option>
              {brands.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Sort selector */}
          <div>
            <label className="block text-[10px] uppercase font-mono text-neutral-400 mb-1">
              Sort Sequence
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="featured">Featured Precision Ranking</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="stock_desc">Highest Stock Quantity</option>
              <option value="rating_desc">Highest Workshop Rating</option>
            </select>
          </div>

          {/* Performance Tier Toggles */}
          <div className="flex items-center gap-2 pt-4 sm:pt-0 sm:self-end">
            <button
              onClick={() => setIsHighPerfOnly(!isHighPerfOnly)}
              className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg border transition-colors cursor-pointer text-center ${
                isHighPerfOnly
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
            >
              Track / High-Perf
            </button>
            <button
              onClick={() => setIsOemOnly(!isOemOnly)}
              className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg border transition-colors cursor-pointer text-center ${
                isOemOnly
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
            >
              OEM Standard
            </button>
          </div>

          {/* Reset Filters button */}
          <div className="flex items-end">
            {hasActiveFilters ? (
              <button
                onClick={resetAllFilters}
                className="w-full py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Reset All Filters</span>
              </button>
            ) : (
              <div className="w-full py-2 px-3 bg-neutral-950 border border-neutral-800/60 rounded-lg text-neutral-400 text-xs text-center font-mono">
                No active filter locks
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Parts Listing (Grid vs Table) */}
      {filteredParts.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredParts.map(part => (
              <PartCard key={part.id} part={part} />
            ))}
          </div>
        ) : (
          <PartTableView parts={filteredParts} />
        )
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-neutral-900/50 border border-dashed border-neutral-800 rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-neutral-800 text-amber-400 flex items-center justify-center mx-auto mb-4">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No spare parts match your exact criteria</h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto mt-1">
            Try broadening your search, clearing the brand filter, or removing the bike fitment requirement to view universal components.
          </p>
          <div className="mt-5">
            <button
              onClick={resetAllFilters}
              className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer"
            >
              Reset Filters & Show All Spares
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
