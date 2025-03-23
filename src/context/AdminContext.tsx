
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminContextType {
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  gstPercentage: number;
  setGstPercentage: (value: number) => void;
  toggleAdmin: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [gstPercentage, setGstPercentage] = useState(5);

  // Load GST percentage from localStorage
  useEffect(() => {
    const savedGstPercentage = localStorage.getItem("hotelGstPercentage");
    if (savedGstPercentage) {
      setGstPercentage(Number(savedGstPercentage));
    }
  }, []);

  // Save GST percentage to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("hotelGstPercentage", gstPercentage.toString());
  }, [gstPercentage]);

  const toggleAdmin = () => {
    setIsAdmin(prev => !prev);
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        setIsAdmin,
        gstPercentage,
        setGstPercentage,
        toggleAdmin
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
