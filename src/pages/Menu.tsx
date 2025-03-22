
import { useState } from "react";
import MenuItem from "../components/MenuItem";
import BillItem from "../components/BillItem";
import { menuItems } from "../data/menuItems";
import { useBill } from "../context/BillContext";
import { toast } from "sonner";
import { generateBillPDF } from "../utils/pdfGenerator";
import { Download } from "lucide-react";

const MenuPage = () => {
  const { 
    currentBill, 
    setCustomerName, 
    setTableNumber, 
    addToBill, 
    removeFromBill, 
    clearBill,
    generateBill
  } = useBill();
  
  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredItems = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => {
        if (activeCategory === "non-veg") return item.category === "non-veg";
        if (activeCategory === "veg") return item.category === "veg";
        if (activeCategory === "drinks") return item.category === "drinks";
        return true;
      });
  
  const handleAddItem = (id: string, quantity: number) => {
    const menuItem = menuItems.find(item => item.id === id);
    if (menuItem) {
      addToBill({
        id: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        quantity
      });
      toast.success(`Added ${quantity} ${menuItem.name} to bill`);
    }
  };
  
  const handleRemoveItem = (id: string) => {
    removeFromBill(id);
    toast.info("Item removed from bill");
  };
  
  const handleClearBill = () => {
    clearBill();
    toast.info("Bill cleared");
  };
  
  const handleGenerateBill = () => {
    if (!currentBill.customerName) {
      toast.error("Please enter customer name");
      return;
    }
    
    if (!currentBill.tableNumber) {
      toast.error("Please enter table number");
      return;
    }
    
    if (currentBill.items.length === 0) {
      toast.error("Please add items to the bill");
      return;
    }
    
    const bill = generateBill();
    if (bill) {
      generateBillPDF(bill);
      toast.success("Bill generated and downloaded");
      clearBill();
    }
  };
  
  const calculateSubtotal = () => {
    return currentBill.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };
  
  const calculateTax = () => {
    return Math.round(calculateSubtotal() * 0.05);
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };
  
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">HOTEL BITTO</h1>
        <p className="text-gray-600">Annabhau Sathe, Near Kalash Lawns, Kopargaon, Pincode 423603</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-bold mb-4">Menu</h2>
          
          <div className="mb-6 border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button 
                className={`menu-tab ${activeCategory === "all" ? "active" : ""}`}
                onClick={() => setActiveCategory("all")}
              >
                All Items
              </button>
              <button 
                className={`menu-tab ${activeCategory === "non-veg" ? "active" : ""}`}
                onClick={() => setActiveCategory("non-veg")}
              >
                Non-Veg Items
              </button>
              <button 
                className={`menu-tab ${activeCategory === "veg" ? "active" : ""}`}
                onClick={() => setActiveCategory("veg")}
              >
                Veg Items
              </button>
              <button 
                className={`menu-tab ${activeCategory === "drinks" ? "active" : ""}`}
                onClick={() => setActiveCategory("drinks")}
              >
                Drink Items
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredItems.map(item => (
              <MenuItem
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                onAdd={handleAddItem}
              />
            ))}
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-4">Bill Summary</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter customer name"
                value={currentBill.customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Table Number</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter table number"
                value={currentBill.tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
              />
            </div>
            
            {currentBill.items.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-500 mb-2">No items added yet</p>
                <p className="text-gray-400 text-sm">Add items from the menu to create a bill</p>
              </div>
            ) : (
              <>
                <div className="max-h-64 overflow-y-auto mb-4">
                  {currentBill.items.map(item => (
                    <BillItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{calculateSubtotal()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span>₹{calculateTax()}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>
              </>
            )}
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={handleClearBill}
              >
                Clear
              </button>
              <button
                className="py-2 px-4 bg-primary text-white rounded-md hover:bg-blue-600 flex items-center justify-center gap-1"
                onClick={handleGenerateBill}
              >
                <Download size={16} />
                Generate Bill
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
