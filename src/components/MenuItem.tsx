
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
      setQuantity(0);
    }
  };
  
  return (
    <div className="bill-item">
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 uppercase">{name}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-primary font-medium">₹{price}</div>
        
        <div className="quantity-control">
          <button 
            className="quantity-btn"
            onClick={handleDecrease}
          >
            <Minus size={14} />
          </button>
          
          <span className="w-6 text-center">{quantity}</span>
          
          <button 
            className="quantity-btn"
            onClick={handleIncrease}
          >
            <Plus size={14} />
          </button>
        </div>
        
        <button 
          className="bg-primary text-white px-4 py-1 rounded-md"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
