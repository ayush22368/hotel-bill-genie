
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Bill, BillItem } from "../types/bill";
import { useAdmin } from "./AdminContext";

interface BillContextType {
  currentBill: {
    customerName: string;
    tableNumber: string;
    items: BillItem[];
  };
  setCustomerName: (name: string) => void;
  setTableNumber: (table: string) => void;
  addToBill: (item: BillItem) => void;
  removeFromBill: (id: string) => void;
  clearBill: () => void;
  generateBill: () => Bill | null;
  savedBills: Bill[];
  removeSavedBill: (id: string) => void;
}

const BillContext = createContext<BillContextType | undefined>(undefined);

export const BillProvider = ({ children }: { children: ReactNode }) => {
  const { gstPercentage } = useAdmin();
  const [currentBill, setCurrentBill] = useState({
    customerName: "",
    tableNumber: "",
    items: [] as BillItem[]
  });
  
  const [savedBills, setSavedBills] = useState<Bill[]>([]);
  
  // Load saved bills from localStorage
  useEffect(() => {
    const savedBillsData = localStorage.getItem("hotelBills");
    if (savedBillsData) {
      setSavedBills(JSON.parse(savedBillsData));
    }
  }, []);
  
  // Save bills to localStorage when they change
  useEffect(() => {
    localStorage.setItem("hotelBills", JSON.stringify(savedBills));
  }, [savedBills]);
  
  const setCustomerName = (name: string) => {
    setCurrentBill(prev => ({ ...prev, customerName: name }));
  };
  
  const setTableNumber = (table: string) => {
    setCurrentBill(prev => ({ ...prev, tableNumber: table }));
  };
  
  const addToBill = (item: BillItem) => {
    setCurrentBill(prev => {
      // Check if item already exists
      const existingItemIndex = prev.items.findIndex(i => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const newItems = [...prev.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + item.quantity
        };
        return { ...prev, items: newItems };
      } else {
        // Add new item
        return { ...prev, items: [...prev.items, item] };
      }
    });
  };
  
  const removeFromBill = (id: string) => {
    setCurrentBill(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };
  
  const clearBill = () => {
    setCurrentBill({
      customerName: "",
      tableNumber: "",
      items: []
    });
  };
  
  const generateBill = (): Bill | null => {
    if (!currentBill.customerName || !currentBill.tableNumber || currentBill.items.length === 0) {
      return null;
    }
    
    const subtotal = currentBill.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * (gstPercentage / 100));
    const total = subtotal + tax;
    
    const newBill: Bill = {
      id: `BILL-${Date.now().toString().slice(-6)}`,
      customerName: currentBill.customerName,
      tableNumber: currentBill.tableNumber,
      items: [...currentBill.items],
      subtotal,
      tax,
      total,
      date: new Date().toISOString()
    };
    
    setSavedBills(prev => [newBill, ...prev]);
    return newBill;
  };
  
  const removeSavedBill = (id: string) => {
    setSavedBills(prev => prev.filter(bill => bill.id !== id));
  };
  
  return (
    <BillContext.Provider
      value={{
        currentBill,
        setCustomerName,
        setTableNumber,
        addToBill,
        removeFromBill,
        clearBill,
        generateBill,
        savedBills,
        removeSavedBill
      }}
    >
      {children}
    </BillContext.Provider>
  );
};

export const useBill = () => {
  const context = useContext(BillContext);
  if (context === undefined) {
    throw new Error("useBill must be used within a BillProvider");
  }
  return context;
};
