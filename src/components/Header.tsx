import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Wrench, 
  Search, 
  ShoppingCart, 
  SlidersHorizontal, 
  Radio, 
  CheckCircle2, 
  ChevronDown, 
  X, 
  Menu,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Bike,
  Tag,
  CornerDownLeft
} from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { formatINR } from '../utils/formatCurrency';

export const Header: React.FC = () => {
  const { 
    parts,
    cart, 
    selectedBike, 
    setSelectedBike, 
    searchQuery, 
    setSearchQuery,
    isLiveSimulationActive,
    setIsLiveSimulationActive,
    setIsCartOpen,
    setIsAdminOpen,
    inventoryStats,
    resetToDefaultInventory,
    setSelectedPart,
    setActiveModal
  } = useInventory();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileSearchContainerRef = useRef<HTMLDivElement>(null);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current && 
        !searchContainerRef.current.contains(event.target as Node) &&
        mobileSearchContainerRef.current && 
        !mobileSearchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute live search matches for autocomplete dropdown
  const searchMatches = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    const qClean = q.replace(/[-\s_]/g, '');

    return parts.filter(p => {
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
  }, [parts, searchQuery]);

  const handleSelectSearchResult = (part: typeof parts[0]) => {
    setSelectedPart(part);
    setActiveModal('part-detail');
    setSearchFocused(false);
  };

  const handleJumpToCatalog = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSearchFocused(false);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickSearchSuggestions = [
    { label: 'Yamaha MT-07', type: 'bike' },
    { label: 'BRK-BRE-320S', type: 'sku' },
    { label: 'Ninja ZX-6R', type: 'bike' },
    { label: 'Öhlins STX46', type: 'part' },
    { label: 'KTM 390 Duke', type: 'bike' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md">
      {/* Top Engineering & Stock Status Ribbon */}
      <div className="border-b border-neutral-800/80 bg-neutral-900/60 text-xs text-neutral-400 px-4 py-1.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Live stock engine status */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <span className={`inline-block w-2 h-2 rounded-full ${isLiveSimulationActive ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-600'}`} />
              <span className="font-mono text-[11px]">
                {isLiveSimulationActive ? 'LIVE INVENTORY SYNC: ACTIVE' : 'INVENTORY SYNC: PAUSED'}
              </span>
            </span>
            <span className="hidden sm:inline text-neutral-600">·</span>
            <span className="hidden sm:inline text-neutral-400">
              Central Depot: <strong className="text-neutral-200">{inventoryStats.totalUnits} Units In Stock</strong> across {inventoryStats.totalSkus} SKUs
            </span>
          </div>

          {/* Quick controls: demo admin toggle & simulation switch */}
          <div className="flex items-center gap-3 ml-auto text-[11px]">
            <button
              onClick={() => setIsLiveSimulationActive(!isLiveSimulationActive)}
              className="text-neutral-400 hover:text-neutral-200 transition-colors flex items-center gap-1 cursor-pointer"
              title="Toggle simulated customer order dispatch"
            >
              <Radio className={`w-3 h-3 ${isLiveSimulationActive ? 'text-amber-400' : 'text-neutral-500'}`} />
              <span>{isLiveSimulationActive ? 'Sim Running' : 'Sim Paused'}</span>
            </button>
            <span className="text-neutral-700">|</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 cursor-pointer transition-colors"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Stock Manager Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded bg-amber-500 flex items-center justify-center text-neutral-950 font-black shadow-md shadow-amber-500/20 group-hover:bg-amber-400 transition-colors">
                <Wrench className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-black text-lg tracking-wider text-white">MOTO<span className="text-amber-400">TORQ</span></span>
                  <span className="text-[10px] font-mono uppercase bg-neutral-800 text-neutral-300 px-1 py-0.5 rounded">PRO-SPEC</span>
                </div>
                <span className="text-[10px] text-neutral-400 tracking-tight mt-0.5 font-medium">PRECISION BIKE SPARES</span>
              </div>
            </a>
          </div>

          {/* Interactive Header Search Bar with SKU, Part Name & Bike Model Filtering */}
          <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-xl mx-2 relative">
            <form onSubmit={handleJumpToCatalog} className="w-full relative">
              <div className={`relative w-full transition-all rounded-lg bg-neutral-900 border ${
                searchFocused ? 'border-amber-500 ring-1 ring-amber-500/50 bg-neutral-950' : 'border-neutral-800 hover:border-neutral-700'
              }`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search by part name, SKU, or bike model (e.g. Brembo, MT-07, BRK-BRE)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  className="w-full pl-9 pr-24 py-2 text-xs text-neutral-100 placeholder-neutral-500 bg-transparent rounded-lg focus:outline-none"
                />

                {/* Right controls inside search bar */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 gap-1.5">
                  {searchQuery ? (
                    <>
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 border border-amber-800/60 px-1.5 py-0.5 rounded">
                        {searchMatches.length} found
                      </span>
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="text-neutral-500 hover:text-neutral-300 p-1"
                        title="Clear search"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : (
                    <span className="text-[10px] font-mono text-neutral-500 bg-neutral-800/80 px-1.5 py-0.5 rounded border border-neutral-700/50">
                      /
                    </span>
                  )}
                </div>
              </div>
            </form>

            {/* Live Autocomplete / Matching Results Dropdown */}
            {searchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden z-50 animate-fade-in">
                {/* Search Header / Context */}
                <div className="p-2.5 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-neutral-400">
                    {searchQuery.trim() ? (
                      <>Matches for "<strong className="text-amber-400">{searchQuery}</strong>" ({searchMatches.length} spare parts)</>
                    ) : (
                      <>Quick Search by Bike Compatibility or Part SKU</>
                    )}
                  </span>
                  {searchQuery.trim() && (
                    <button 
                      onClick={() => handleJumpToCatalog()}
                      className="text-amber-400 hover:text-amber-300 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                    >
                      <span>Filter in Catalog</span>
                      <CornerDownLeft className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Quick Suggestion Chips (shown when input is focused) */}
                {!searchQuery.trim() && (
                  <div className="p-3 bg-neutral-950/50 border-b border-neutral-800/60">
                    <div className="text-[10px] font-mono uppercase text-neutral-500 mb-2">Popular Searches:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {quickSearchSuggestions.map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onMouseDown={() => {
                            setSearchQuery(item.label);
                            handleJumpToCatalog();
                          }}
                          className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded-md text-xs text-neutral-300 hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          {item.type === 'bike' ? (
                            <Bike className="w-3 h-3 text-amber-400" />
                          ) : (
                            <Tag className="w-3 h-3 text-sky-400" />
                          )}
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Live Matching Items List */}
                {searchQuery.trim() && (
                  <div className="max-h-72 overflow-y-auto divide-y divide-neutral-800/60">
                    {searchMatches.slice(0, 5).map(part => {
                      const isLow = part.stock > 0 && part.stock <= part.minStockAlert;
                      const isOut = part.stock === 0;

                      return (
                        <div
                          key={part.id}
                          onMouseDown={() => handleSelectSearchResult(part)}
                          className="p-3 hover:bg-neutral-850 cursor-pointer transition-colors flex items-center justify-between gap-3 group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={part.image}
                              alt={part.name}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 rounded object-cover border border-neutral-800 shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="font-bold text-xs text-neutral-100 group-hover:text-amber-400 transition-colors truncate">
                                {part.name}
                              </div>
                              <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono mt-0.5">
                                <span>{part.sku}</span>
                                <span>·</span>
                                <span className="text-neutral-500">{part.brand}</span>
                                <span>·</span>
                                <span className={isOut ? 'text-red-400' : isLow ? 'text-amber-400' : 'text-emerald-400'}>
                                  {part.stock} in stock
                                </span>
                              </div>
                              {/* Compatible bikes tag */}
                              <div className="text-[10px] text-neutral-500 truncate mt-0.5">
                                Fits: {part.compatibleBikes.map(cb => `${cb.make} ${cb.model}`).slice(0, 3).join(', ')}
                              </div>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="font-mono text-xs font-bold text-white">
                              {formatINR(part.price)}
                            </div>
                            <span className="text-[10px] text-neutral-500 font-mono">
                              {part.warehouseLocation}
                            </span>
                          </div>
                        </div>
                      );
                    })}

                    {searchMatches.length === 0 && (
                      <div className="p-6 text-center text-xs text-neutral-400">
                        <p>No spare parts found matching "{searchQuery}"</p>
                        <p className="text-[11px] text-neutral-500 mt-1">
                          Try searching for bike makes like "Yamaha", "Kawasaki", "KTM", or parts like "Brembo", "Chain".
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Footer in dropdown */}
                {searchMatches.length > 5 && (
                  <div className="p-2.5 bg-neutral-950 border-t border-neutral-800 text-center">
                    <button
                      onMouseDown={() => handleJumpToCatalog()}
                      className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center justify-center gap-1.5 w-full cursor-pointer"
                    >
                      <span>View all {searchMatches.length} matching parts in catalog</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Active Garage / Bike Matcher Indicator */}
          <div className="hidden lg:flex items-center">
            {selectedBike.make ? (
              <div className="flex items-center gap-2 bg-neutral-900/90 border border-neutral-700/80 rounded-lg px-3 py-1.5 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <div className="leading-tight">
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Fitted Garage</div>
                  <div className="font-semibold text-neutral-200">
                    {selectedBike.make} {selectedBike.model} {selectedBike.year ? `'${String(selectedBike.year).slice(-2)}` : ''}
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedBike({ make: '', model: '', year: null })}
                  className="ml-1 text-neutral-500 hover:text-red-400 transition-colors p-0.5"
                  title="Clear bike filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <a
                href="#garage-selector"
                className="text-xs text-neutral-300 hover:text-amber-400 flex items-center gap-1.5 border border-neutral-800 hover:border-neutral-700 rounded-lg px-3 py-1.5 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Select Bike to Check Fit</span>
                <ChevronDown className="w-3 h-3 text-neutral-500" />
              </a>
            )}
          </div>

          {/* Right Action Icons: Stock Controller & Cart */}
          <div className="flex items-center gap-3">
            {/* Quick stock manager trigger */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="hidden sm:flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-medium px-3 py-2 rounded-lg border border-neutral-800 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
              <span>Inventory Control</span>
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs px-3.5 py-2 rounded-lg transition-colors cursor-pointer shadow-sm shadow-amber-500/10"
              aria-label="View parts cart and quote"
            >
              <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline font-bold">Parts Order</span>
              {totalCartCount > 0 && (
                <span className="bg-neutral-950 text-amber-400 font-mono text-[11px] font-black px-1.5 py-0.5 rounded">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar with Auto-Filter */}
        <div ref={mobileSearchContainerRef} className="md:hidden pb-3 relative">
          <form onSubmit={handleJumpToCatalog}>
            <div className="relative w-full rounded-lg bg-neutral-900 border border-neutral-800">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search part name, SKU, or bike model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs text-neutral-100 placeholder-neutral-500 bg-transparent rounded-lg focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-neutral-500 hover:text-neutral-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </form>

          {/* Mobile match counter indicator */}
          {searchQuery && (
            <div className="text-[11px] text-amber-400 font-mono mt-1 flex justify-between items-center px-1">
              <span>{searchMatches.length} matching parts</span>
              <a href="#catalog" className="underline">View in Catalog</a>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-neutral-950 px-4 py-4 space-y-3">
          <div className="text-xs text-neutral-400 font-medium">QUICK SECTIONS</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <a 
              href="#catalog" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-neutral-900 text-neutral-200 hover:text-amber-400"
            >
              Parts Catalogue
            </a>
            <a 
              href="#garage-selector" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-neutral-900 text-neutral-200 hover:text-amber-400"
            >
              Bike Fitment
            </a>
            <a 
              href="#workshop-fleet" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-neutral-900 text-neutral-200 hover:text-amber-400"
            >
              Workshop Wholesale
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-neutral-900 text-neutral-200 hover:text-amber-400"
            >
              FAQ & Shipping
            </a>
          </div>

          <div className="pt-2 border-t border-neutral-800 flex justify-between items-center text-xs">
            <button
              onClick={() => {
                setIsAdminOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-amber-400 font-medium flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Open Stock Manager Demo</span>
            </button>
            <button
              onClick={resetToDefaultInventory}
              className="text-neutral-400 hover:text-neutral-200 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
