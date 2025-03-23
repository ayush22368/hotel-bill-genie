
import { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { MenuItem } from "../types/bill";
import { menuItems } from "../data/menuItems";
import { toast } from "sonner";
import { Settings, Plus, Trash2, X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

// Function to update menuItems array
const updateMenuItems = (newItems: MenuItem[]) => {
  // In a real app, this would be an API call
  // For now, we're modifying the exported array directly
  menuItems.length = 0;
  menuItems.push(...newItems);
  localStorage.setItem("menuItems", JSON.stringify(newItems));
  return true;
};

const AdminPanel = () => {
  const { isAdmin, toggleAdmin, gstPercentage, setGstPercentage } = useAdmin();
  const [items, setItems] = useState<MenuItem[]>(menuItems);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: "",
    description: "",
    price: 0,
    category: "veg"
  });

  const handleDeleteItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    updateMenuItems(updatedItems);
    toast.success("Item deleted successfully");
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.description || !newItem.price) {
      toast.error("Please fill all fields");
      return;
    }

    const id = `${newItem.category?.charAt(0) || "v"}${Date.now().toString().slice(-5)}`;
    const itemToAdd: MenuItem = {
      id,
      name: newItem.name || "",
      description: newItem.description || "",
      price: newItem.price || 0,
      category: newItem.category as MenuItem["category"] || "veg"
    };

    const updatedItems = [...items, itemToAdd];
    setItems(updatedItems);
    updateMenuItems(updatedItems);
    setIsAddingItem(false);
    setNewItem({
      name: "",
      description: "",
      price: 0,
      category: "veg"
    });
    toast.success("Item added successfully");
  };

  if (!isAdmin) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        className="fixed bottom-4 right-4 z-50 opacity-50 hover:opacity-100"
        onClick={toggleAdmin}
      >
        <Settings size={16} className="mr-1" /> Admin
      </Button>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-lg border border-gray-200 p-4 z-50 max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <Button variant="ghost" size="sm" onClick={toggleAdmin}>
          <X size={18} />
        </Button>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">GST Settings</h3>
        <div className="flex items-center gap-4">
          <Input
            type="number"
            min="0"
            max="30"
            value={gstPercentage}
            onChange={(e) => setGstPercentage(Number(e.target.value))}
            className="w-24"
          />
          <span>% GST</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Menu Items</h3>
          <Button 
            size="sm" 
            onClick={() => setIsAddingItem(true)}
            disabled={isAddingItem}
          >
            <Plus size={16} className="mr-1" /> Add Item
          </Button>
        </div>

        {isAddingItem && (
          <div className="p-4 border border-gray-200 rounded-lg mb-4 bg-gray-50">
            <h4 className="font-medium mb-2">Add New Item</h4>
            <div className="grid gap-3">
              <Input
                placeholder="Item Name"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              />
              <Input
                placeholder="Description"
                value={newItem.description}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  placeholder="Price"
                  value={newItem.price}
                  onChange={(e) => setNewItem({...newItem, price: Number(e.target.value)})}
                />
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value as MenuItem["category"]})}
                >
                  <option value="veg">Veg</option>
                  <option value="non-veg">Non-Veg</option>
                  <option value="drinks">Drinks</option>
                  <option value="snacks">Snacks</option>
                  <option value="roti">Roti</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsAddingItem(false)}>Cancel</Button>
                <Button onClick={handleAddItem}>Add Item</Button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2 mt-4 max-h-[40vh] overflow-y-auto p-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-2 border border-gray-200 rounded hover:bg-gray-50">
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500">₹{item.price} - {item.category}</div>
              </div>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleDeleteItem(item.id)}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
