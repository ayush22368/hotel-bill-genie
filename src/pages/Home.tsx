
import { Link } from "react-router-dom";
import { FileText, History } from "lucide-react";
import AdminPanel from "../components/AdminPanel";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">HOTEL BITTO</h1>
        <p className="text-gray-600">Annabhau Sathe, Near Kalash Lawns, Kopargaon, Pincode 423603</p>
        <p className="text-blue-500 mt-2">Simple & Elegant Billing System for Restaurant Management</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link to="/menu" className="bg-white rounded-lg border border-gray-200 p-8 flex flex-col items-center transition-all hover:shadow-md">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FileText className="text-blue-500" size={24} />
          </div>
          <h2 className="text-xl font-semibold mb-2">Create New Bill</h2>
          <p className="text-gray-600 text-center">
            Create and generate bills with ease. Add items, set quantities, and download as PDF.
          </p>
        </Link>
        
        <Link to="/history" className="bg-white rounded-lg border border-gray-200 p-8 flex flex-col items-center transition-all hover:shadow-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <History className="text-green-500" size={24} />
          </div>
          <h2 className="text-xl font-semibold mb-2">View History</h2>
          <p className="text-gray-600 text-center">
            Access your billing history. View past bills, download again, or manage your records.
          </p>
        </Link>
      </div>
      
      <AdminPanel />
    </div>
  );
};

export default HomePage;
