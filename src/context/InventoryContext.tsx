import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { SparePart, CartItem, PartCategory, StockStatus, InventoryStats, BikeModelOption } from '../types';
import { INITIAL_PARTS } from '../data/partsData';

interface BikeFilter {
  make: string;
  model: string;
  year: number | null;
}

interface InventoryLog {
  id: string;
  timestamp: string;
  sku: string;
  partName: string;
  change: number;
  newStock: number;
  reason: string;
  location: string;
}

interface InventoryContextType {
  parts: SparePart[];
  cart: CartItem[];
  selectedPart: SparePart | null;
  selectedBike: BikeFilter;
  activeCategory: PartCategory | 'all';
  searchQuery: string;
  stockStatusFilter: StockStatus | 'all';
  selectedBrand: string;
  isHighPerfOnly: boolean;
  isOemOnly: boolean;
  sortBy: 'featured' | 'price_asc' | 'price_desc' | 'stock_desc' | 'rating_desc';
  isLiveSimulationActive: boolean;
  recentLogs: InventoryLog[];
  inventoryStats: InventoryStats;
  isCartOpen: boolean;
  isAdminOpen: boolean;
  activeModal: 'part-detail' | 'order-success' | 'quick-quote' | null;
  lastOrderedOrderNumber: string | null;

  // Actions
  setSelectedPart: (part: SparePart | null) => void;
  setSelectedBike: (bike: BikeFilter) => void;
  setActiveCategory: (cat: PartCategory | 'all') => void;
  setSearchQuery: (q: string) => void;
  setStockStatusFilter: (status: StockStatus | 'all') => void;
  setSelectedBrand: (brand: string) => void;
  setIsHighPerfOnly: (val: boolean) => void;
  setIsOemOnly: (val: boolean) => void;
  setSortBy: (sort: 'featured' | 'price_asc' | 'price_desc' | 'stock_desc' | 'rating_desc') => void;
  setIsLiveSimulationActive: (active: boolean) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsAdminOpen: (open: boolean) => void;
  setActiveModal: (modal: 'part-detail' | 'order-success' | 'quick-quote' | null) => void;

  // Inventory & Cart manipulations
  addToCart: (part: SparePart, quantity?: number) => boolean;
  updateCartQuantity: (partId: string, quantity: number) => void;
  removeFromCart: (partId: string) => void;
  clearCart: () => void;
  updateStock: (partId: string, newStock: number, reason?: string) => void;
  restockIncoming: (partId: string) => void;
  checkoutCart: (customerInfo: { name: string; email: string; phone: string; address: string; shippingMethod: string }) => string;
  checkCompatibility: (part: SparePart) => 'guaranteed' | 'universal' | 'incompatible' | 'none_selected';
  resetToDefaultInventory: () => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [parts, setParts] = useState<SparePart[]>(() => {
    try {
      const saved = localStorage.getItem('mototorq_parts_v3');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read saved parts:', e);
    }
    return INITIAL_PARTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mototorq_cart_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read saved cart:', e);
    }
    return [];
  });

  const [selectedPart, setSelectedPart] = useState<SparePart | null>(null);
  const [selectedBike, setSelectedBike] = useState<BikeFilter>({
    make: '',
    model: '',
    year: null,
  });

  const [activeCategory, setActiveCategory] = useState<PartCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [stockStatusFilter, setStockStatusFilter] = useState<StockStatus | 'all'>('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [isHighPerfOnly, setIsHighPerfOnly] = useState(false);
  const [isOemOnly, setIsOemOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'stock_desc' | 'rating_desc'>('featured');
  const [isLiveSimulationActive, setIsLiveSimulationActive] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'part-detail' | 'order-success' | 'quick-quote' | null>(null);
  const [lastOrderedOrderNumber, setLastOrderedOrderNumber] = useState<string | null>(null);

  const [recentLogs, setRecentLogs] = useState<InventoryLog[]>([
    {
      id: 'log-001',
      timestamp: 'Just now',
      sku: 'BRK-BRE-320S',
      partName: 'Brembo Z04 Sintered Racing Front Brake Pads',
      change: -2,
      newStock: 14,
      reason: 'Workshop Order #MT-9821 Dispatch',
      location: 'Bay 3 · Shelf B-12'
    },
    {
      id: 'log-002',
      timestamp: '4 mins ago',
      sku: 'ENG-MOT-300V4L',
      partName: 'Motul 300V Factory Line 10W-40 Synthetic Racing Oil',
      change: 12,
      newStock: 28,
      reason: 'Direct Distributor Intake Inwarded',
      location: 'Lube Depot · Pallet L-03'
    }
  ]);

  // Persist parts to local storage
  useEffect(() => {
    try {
      localStorage.setItem('mototorq_parts_v3', JSON.stringify(parts));
    } catch (e) {
      console.warn('Failed to save parts to localStorage', e);
    }
  }, [parts]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('mototorq_cart_v2', JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Dynamic live inventory simulation (simulates real-world workshop orders & dispatch)
  useEffect(() => {
    if (!isLiveSimulationActive) return;

    const interval = setInterval(() => {
      // Pick a random part with stock > 3
      const candidates = parts.filter(p => p.stock > 1);
      if (candidates.length === 0) return;

      const randomPart = candidates[Math.floor(Math.random() * candidates.length)];
      const decrement = Math.random() > 0.3 ? 1 : 2;
      const updatedStock = Math.max(0, randomPart.stock - decrement);

      setParts(prev => prev.map(p => {
        if (p.id === randomPart.id) {
          return { ...p, stock: updatedStock };
        }
        return p;
      }));

      // Add log
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setRecentLogs(prev => [
        {
          id: `log-${Date.now()}`,
          timestamp: timeStr,
          sku: randomPart.sku,
          partName: randomPart.name,
          change: -decrement,
          newStock: updatedStock,
          reason: 'Live Online Customer Order Dispatched',
          location: randomPart.warehouseLocation
        },
        ...prev.slice(0, 15) // Keep last 15 logs
      ]);
    }, 24000); // Trigger every 24 seconds for realistic dynamic feel

    return () => clearInterval(interval);
  }, [isLiveSimulationActive, parts]);

  // Derived inventory stats
  const inventoryStats: InventoryStats = useMemo(() => {
    let totalUnits = 0;
    let inStockCount = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;
    let inventoryValue = 0;

    parts.forEach(p => {
      totalUnits += p.stock;
      inventoryValue += p.stock * p.price;
      if (p.stock === 0) {
        outOfStockCount++;
      } else if (p.stock <= p.minStockAlert) {
        lowStockCount++;
        inStockCount++;
      } else {
        inStockCount++;
      }
    });

    return {
      totalSkus: parts.length,
      totalUnits,
      inStockCount,
      lowStockCount,
      outOfStockCount,
      inventoryValue
    };
  }, [parts]);

  // Check bike compatibility
  const checkCompatibility = (part: SparePart): 'guaranteed' | 'universal' | 'incompatible' | 'none_selected' => {
    if (!selectedBike.make) return 'none_selected';

    const match = part.compatibleBikes.find(cb => {
      const makeMatch = cb.make.toLowerCase() === selectedBike.make.toLowerCase();
      if (!makeMatch) return false;

      if (selectedBike.model) {
        const modelMatch = cb.model.toLowerCase() === selectedBike.model.toLowerCase();
        if (!modelMatch) return false;
      }

      if (selectedBike.year !== null) {
        if (selectedBike.year < cb.yearStart || selectedBike.year > cb.yearEnd) {
          return false;
        }
      }

      return true;
    });

    return match ? 'guaranteed' : 'incompatible';
  };

  const addToCart = (part: SparePart, quantity = 1): boolean => {
    const existing = cart.find(item => item.part.id === part.id);
    const currentQtyInCart = existing ? existing.quantity : 0;
    const requestedTotal = currentQtyInCart + quantity;

    if (requestedTotal > part.stock) {
      return false; // Insufficient stock
    }

    if (existing) {
      setCart(prev => prev.map(item => 
        item.part.id === part.id ? { ...item, quantity: requestedTotal } : item
      ));
    } else {
      setCart(prev => [...prev, { part, quantity }]);
    }

    return true;
  };

  const updateCartQuantity = (partId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(partId);
      return;
    }

    const part = parts.find(p => p.id === partId);
    if (!part) return;

    const validatedQty = Math.min(quantity, part.stock);
    setCart(prev => prev.map(item => 
      item.part.id === partId ? { ...item, quantity: validatedQty } : item
    ));
  };

  const removeFromCart = (partId: string) => {
    setCart(prev => prev.filter(item => item.part.id !== partId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateStock = (partId: string, newStock: number, reason = 'Manual Inventory Adjustment') => {
    const targetPart = parts.find(p => p.id === partId);
    if (!targetPart) return;

    const diff = newStock - targetPart.stock;
    const clampedStock = Math.max(0, newStock);

    setParts(prev => prev.map(p => p.id === partId ? { ...p, stock: clampedStock } : p));

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setRecentLogs(prev => [
      {
        id: `log-${Date.now()}`,
        timestamp: timeStr,
        sku: targetPart.sku,
        partName: targetPart.name,
        change: diff,
        newStock: clampedStock,
        reason,
        location: targetPart.warehouseLocation
      },
      ...prev.slice(0, 15)
    ]);
  };

  const restockIncoming = (partId: string) => {
    const targetPart = parts.find(p => p.id === partId);
    if (!targetPart || !targetPart.incomingShipment) return;

    const qty = targetPart.incomingShipment.quantity;
    const newStock = targetPart.stock + qty;

    setParts(prev => prev.map(p => {
      if (p.id === partId) {
        return {
          ...p,
          stock: newStock,
          incomingShipment: undefined
        };
      }
      return p;
    }));

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setRecentLogs(prev => [
      {
        id: `log-${Date.now()}`,
        timestamp: timeStr,
        sku: targetPart.sku,
        partName: targetPart.name,
        change: qty,
        newStock,
        reason: 'Inbound Pallet Received & Binned',
        location: targetPart.warehouseLocation
      },
      ...prev.slice(0, 15)
    ]);
  };

  const checkoutCart = (customerInfo: { name: string; email: string; phone: string; address: string; shippingMethod: string }): string => {
    const orderNumber = `MT-${Math.floor(100000 + Math.random() * 900000)}`;

    // Deduct stock for all cart items
    setParts(prev => {
      return prev.map(p => {
        const item = cart.find(c => c.part.id === p.id);
        if (item) {
          const updatedStock = Math.max(0, p.stock - item.quantity);
          return { ...p, stock: updatedStock };
        }
        return p;
      });
    });

    // Add inventory logs
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const newLogs: InventoryLog[] = cart.map(item => ({
      id: `log-${Date.now()}-${item.part.id}`,
      timestamp: timeStr,
      sku: item.part.sku,
      partName: item.part.name,
      change: -item.quantity,
      newStock: Math.max(0, item.part.stock - item.quantity),
      reason: `Order ${orderNumber} - Dispatched to ${customerInfo.name}`,
      location: item.part.warehouseLocation
    }));

    setRecentLogs(prev => [...newLogs, ...prev].slice(0, 20));
    setLastOrderedOrderNumber(orderNumber);
    clearCart();
    setActiveModal('order-success');

    return orderNumber;
  };

  const resetToDefaultInventory = () => {
    setParts(INITIAL_PARTS);
    localStorage.removeItem('mototorq_parts_v1');
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setRecentLogs(prev => [
      {
        id: `log-${Date.now()}`,
        timestamp: timeStr,
        sku: 'SYS-RESET',
        partName: 'All Catalog Parts',
        change: 0,
        newStock: INITIAL_PARTS.reduce((sum, p) => sum + p.stock, 0),
        reason: 'Master Database Re-synced with Central Warehouse',
        location: 'All Warehouses'
      },
      ...prev.slice(0, 15)
    ]);
  };

  return (
    <InventoryContext.Provider
      value={{
        parts,
        cart,
        selectedPart,
        selectedBike,
        activeCategory,
        searchQuery,
        stockStatusFilter,
        selectedBrand,
        isHighPerfOnly,
        isOemOnly,
        sortBy,
        isLiveSimulationActive,
        recentLogs,
        inventoryStats,
        isCartOpen,
        isAdminOpen,
        activeModal,
        lastOrderedOrderNumber,
        setSelectedPart,
        setSelectedBike,
        setActiveCategory,
        setSearchQuery,
        setStockStatusFilter,
        setSelectedBrand,
        setIsHighPerfOnly,
        setIsOemOnly,
        setSortBy,
        setIsLiveSimulationActive,
        setIsCartOpen,
        setIsAdminOpen,
        setActiveModal,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        updateStock,
        restockIncoming,
        checkoutCart,
        checkCompatibility,
        resetToDefaultInventory,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
