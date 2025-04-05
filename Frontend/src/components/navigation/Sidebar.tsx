import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { Package, Truck, Home, Users, List, User, LogOut, Package as ParcelIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  // Different navigation items based on user role
  const getNavItems = () => {
    switch(user?.role) {
      case 'customer':
        return [
          { name: 'Dashboard', href: '/customer/dashboard', icon: Home },
          { name: 'Create Shipment', href: '/customer/create-shipment', icon: Package },
          { name: 'My Parcels', href: '/customer/parcels', icon: List },
          { name: 'Track Parcel', href: '/customer/track', icon: Truck },
          { name: 'Profile', href: '/customer/profile', icon: User },
        ];
      case 'courier':
        return [
          { name: 'Dashboard', href: '/courier/dashboard', icon: Home },
          { name: 'Available Parcels', href: '/courier/available', icon: Package },
          { name: 'My Deliveries', href: '/courier/deliveries', icon: Truck },
          { name: 'Profile', href: '/courier/profile', icon: User },
        ];
      case 'admin':
        return [
          { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
          { name: 'All Parcels', href: '/admin/parcels', icon: Package },
          { name: 'Customers', href: '/admin/customers', icon: Users },
          { name: 'Couriers', href: '/admin/couriers', icon: Truck },
          { name: 'System Stats', href: '/admin/stats', icon: List },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-20 h-screen transition-transform",
          "bg-white border-r border-gray-200 p-4 w-64 sm:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center">
            <ParcelIcon className="h-6 w-6 mr-2 text-swiftship-600" />
            <span className="text-xl font-semibold text-swiftship-700">Swift<span className="text-delivery-600">Ship</span></span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-2 py-2 rounded-md",
                "hover:bg-gray-100 transition-colors duration-200",
                location.pathname === item.href
                  ? "bg-swiftship-50 text-swiftship-700 font-medium"
                  : "text-gray-700"
              )}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        
        {/* Logout button at bottom */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <Button
            variant="ghost"
            className="flex items-center w-full text-gray-700 hover:bg-gray-100"
            onClick={logout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
