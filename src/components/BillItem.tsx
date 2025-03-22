
import { Trash2 } from "lucide-react";

interface BillItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  onRemove: (id: string) => void;
}

const BillItem = ({ id, name, price, quantity, onRemove }: BillItemProps) => {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100">
      <div className="flex-1">
        <div className="flex justify-between">
          <span className="font-medium">{name}</span>
          <span className="text-gray-700">₹{price} × {quantity}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>₹{price * quantity}</span>
        </div>
      </div>
      <button 
        className="ml-2 text-gray-400 hover:text-red-500"
        onClick={() => onRemove(id)}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default BillItem;
