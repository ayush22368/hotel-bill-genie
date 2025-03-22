
import { Outlet, Link, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">HOTEL BITTO</Link>
          <nav className="flex space-x-6">
            <Link 
              to="/" 
              className={`${location.pathname === '/' ? 'text-primary border-b-2 border-primary' : 'text-gray-700'}`}
            >
              Home
            </Link>
            <Link 
              to="/menu" 
              className={`${location.pathname === '/menu' ? 'text-primary border-b-2 border-primary' : 'text-gray-700'}`}
            >
              Menu
            </Link>
            <Link 
              to="/history" 
              className={`${location.pathname === '/history' ? 'text-primary border-b-2 border-primary' : 'text-gray-700'}`}
            >
              History
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="py-8">
        <Outlet />
      </main>
      
      <footer className="border-t border-gray-200 py-4 text-center text-gray-500 text-sm">
        © 2023 HOTEL BITTO. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
