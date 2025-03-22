
import { useBill } from "../context/BillContext";
import { generateBillPDF } from "../utils/pdfGenerator";
import { toast } from "sonner";
import { Download, Trash2 } from "lucide-react";

const HistoryPage = () => {
  const { savedBills, removeSavedBill } = useBill();
  
  const handleDownload = (billId: string) => {
    const bill = savedBills.find(b => b.id === billId);
    if (bill) {
      generateBillPDF(bill);
      toast.success("Bill downloaded successfully");
    }
  };
  
  const handleDelete = (billId: string) => {
    if (confirm("Are you sure you want to delete this bill?")) {
      removeSavedBill(billId);
      toast.success("Bill deleted successfully");
    }
  };
  
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Billing History</h1>
        <p className="text-gray-600">View and manage your previous bills</p>
      </div>
      
      {savedBills.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-gray-600 mb-2">No Bills Found</h2>
          <p className="text-gray-500">Once you create bills, they will appear here</p>
        </div>
      ) : (
        <div className="space-y-6">
          {savedBills.map(bill => (
            <div key={bill.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold">Bill #{bill.id}</h2>
                  <p className="text-gray-600">
                    {new Date(bill.date).toLocaleString()}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <p className="font-medium">Customer: {bill.customerName}</p>
                  <p className="text-gray-600">Table: {bill.tableNumber}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 py-4">
                <h3 className="font-medium mb-2">Items</h3>
                <div className="space-y-2">
                  {bill.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.name} × {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{bill.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span>₹{bill.tax}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{bill.total}</span>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-4">
                <button
                  className="py-2 px-4 border border-gray-300 rounded-md text-red-600 hover:bg-red-50 flex items-center gap-1"
                  onClick={() => handleDelete(bill.id)}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
                <button
                  className="py-2 px-4 bg-primary text-white rounded-md hover:bg-blue-600 flex items-center gap-1"
                  onClick={() => handleDownload(bill.id)}
                >
                  <Download size={16} />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
