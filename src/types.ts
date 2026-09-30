export type PartCategory = 
  | 'drivetrain' 
  | 'brakes' 
  | 'suspension' 
  | 'engine' 
  | 'electrical' 
  | 'controls' 
  | 'exhaust' 
  | 'cooling';

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'incoming';

export interface CompatibleBike {
  make: string;
  model: string;
  yearStart: number;
  yearEnd: number;
  displacement?: string;
}

export interface SparePart {
  id: string;
  sku: string;
  oemNumber: string;
  name: string;
  category: PartCategory;
  brand: string;
  description: string;
  price: number;
  msrp?: number;
  stock: number;
  minStockAlert: number;
  warehouseLocation: string; // e.g. "Zone A - Bin 14B"
  image: string;
  rating: number;
  reviewCount: number;
  weightKg: number;
  material: string;
  warranty: string;
  isHighPerformance: boolean;
  isOemGenuine: boolean;
  specifications: Record<string, string>;
  compatibleBikes: CompatibleBike[];
  incomingShipment?: {
    expectedDate: string;
    quantity: number;
  };
  tags: string[];
}

export interface BikeModelOption {
  make: string;
  models: {
    name: string;
    years: number[];
    type: 'sport' | 'adventure' | 'naked' | 'cruiser' | 'touring' | 'dirt';
  }[];
}

export interface CartItem {
  part: SparePart;
  quantity: number;
}

export interface InventoryStats {
  totalSkus: number;
  totalUnits: number;
  inStockCount: number;
  lowStockCount: number;
  outOfStockCount: number;
  inventoryValue: number;
}
