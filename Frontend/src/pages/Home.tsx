import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package, Truck, User, ChevronRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Package className="h-6 w-6 text-swiftship-600 mr-2" />
            <span className="text-xl font-semibold text-swiftship-700">Swift<span className="text-delivery-600">Ship</span></span>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button className="bg-swiftship-600 hover:bg-swiftship-700" asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-swiftship-50 to-delivery-50">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Fast & Reliable Parcel Delivery 
              <span className="text-swiftship-600"> Made Easy</span>
            </h1>
            <p className="text-lg mb-8 text-gray-700">
              SwiftShip connects customers with trusted couriers to ensure your packages arrive safely and on time. Track your deliveries in real-time with our easy-to-use platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-swiftship-600 hover:bg-swiftship-700" asChild>
                <Link to="/register">Create Account</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/customer/track">Track a Package</Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <img 
              src="https://images.unsplash.com/photo-1606293459322-d3e680c88218?auto=format&fit=crop&q=80&w=2370" 
              alt="Delivery Service" 
              className="rounded-lg shadow-lg w-full h-auto" 
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How SwiftShip Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform connects customers, couriers, and administrators to streamline the delivery process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center shadow-sm">
              <div className="bg-swiftship-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="h-8 w-8 text-swiftship-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customer</h3>
              <p className="text-gray-600 mb-6">
                Request deliveries, track your parcels in real-time, and manage your shipment history in one place.
              </p>
              <Link to="/register" className="text-swiftship-600 hover:text-swiftship-800 inline-flex items-center">
                Ship a Package <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center shadow-sm">
              <div className="bg-delivery-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-8 w-8 text-delivery-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Courier</h3>
              <p className="text-gray-600 mb-6">
                Accept delivery requests, manage your schedule, and update customers with real-time delivery status.
              </p>
              <Link to="/register" className="text-delivery-600 hover:text-delivery-800 inline-flex items-center">
                Become a Courier <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center shadow-sm">
              <div className="bg-amber-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Admin</h3>
              <p className="text-gray-600 mb-6">
                Oversee all operations, manage users and couriers, and access comprehensive system analytics.
              </p>
              <Link to="/login" className="text-amber-600 hover:text-amber-800 inline-flex items-center">
                Admin Login <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16 bg-swiftship-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied users who trust SwiftShip for their delivery needs
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" variant="outline" className="bg-white hover:bg-gray-100 text-swiftship-700 border-white" asChild>
              <Link to="/register">Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="ghost" className="text-white hover:bg-swiftship-600" asChild>
              <Link to="/login">Log In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <Package className="h-6 w-6 text-swiftship-400 mr-2" />
                <span className="text-xl font-semibold text-white">Swift<span className="text-delivery-400">Ship</span></span>
              </div>
              <p className="max-w-xs">
                Fast, reliable parcel delivery services connecting customers and couriers.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-medium mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">About Us</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                  <li><a href="#" className="hover:text-white">Careers</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-4">Services</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">Shipping</a></li>
                  <li><a href="#" className="hover:text-white">Tracking</a></li>
                  <li><a href="#" className="hover:text-white">Returns</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>&copy; 2023 SwiftShip. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
