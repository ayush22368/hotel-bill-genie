
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  onAdd: (id: string, quantity: number) => void;
}

const MenuItem = ({ id, name, description, price, onAdd }: MenuItemProps) => {
  const [quantity, setQuantity] = useState(0);
  
  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAdd = () => {
    if (quantity > 0) {
      onAdd(id, quantity);
      setQuantity(0); // Reset quantity after adding
    }
  };
  
  return (
    <div className="bill-item p-4 border border-gray-200 rounded-lg">
      <div className="flex-1 mb-3">
        <h3 className="font-medium text-gray-900 uppercase">{name}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
      
      <div className="flex items-center justify-between mt-2">
        <div className="text-primary font-medium">₹{price}</div>
        
        <div className="flex items-center gap-3">
          <div className="quantity-control flex items-center border rounded-md">
            <button 
              className="quantity-btn p-1 hover:bg-gray-100"
              onClick={handleDecrease}
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            
            <span className="w-8 text-center">{quantity}</span>
            
            <button 
              className="quantity-btn p-1 hover:bg-gray-100"
              onClick={handleIncrease}
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
          
          <button 
            className={`px-3 py-1 rounded-md ${quantity > 0 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            onClick={handleAdd}
            disabled={quantity === 0}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
