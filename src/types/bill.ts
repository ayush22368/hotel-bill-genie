
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'veg' | 'non-veg' | 'drinks' | 'snacks' | 'roti';
}

export interface BillItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Bill {
  id: string;
  customerName: string;
  tableNumber: string;
  items: BillItem[];
  subtotal: number;
  tax: number;
  total: number;
  date: string;
}
