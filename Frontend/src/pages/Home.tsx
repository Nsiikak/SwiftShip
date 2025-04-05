import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package, Truck, User, ChevronRight, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const Home: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header - Apple-style minimal nav with improved mobile layout */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Package className="h-5 w-5 text-swiftship-600 mr-1.5" />
            <span className="text-lg font-medium text-swiftship-700">Swift<span className="text-delivery-600">Ship</span></span>
          </div>
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6">
              <Link to="/customer/track" className="text-sm font-medium text-gray-700 hover:text-swiftship-600 transition-colors">Track</Link>
              <Link to="/" className="text-sm font-medium text-gray-700 hover:text-swiftship-600 transition-colors">Services</Link>
              <Link to="/" className="text-sm font-medium text-gray-700 hover:text-swiftship-600 transition-colors">About</Link>
              <Link to="/" className="text-sm font-medium text-gray-700 hover:text-swiftship-600 transition-colors">Support</Link>
            </nav>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm" asChild className="rounded-full px-4">
                <Link to="/login">Login</Link>
              </Button>
              <Button size="sm" className="bg-swiftship-600 hover:bg-swiftship-700 rounded-full px-4" asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Apple-style with improved typography and layout */}
      <section className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white pointer-events-none -z-10"></div>
        
        <div className="container mx-auto px-4 pt-16 md:pt-24 lg:pt-32 pb-16">
          <div className="max-w-5xl mx-auto">
            {/* Hero Text */}
            <div className="text-center mb-10 md:mb-16 animate-fade-in">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6">
                Delivery that
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-swiftship-600 to-delivery-600 block">simply works.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Swift. Reliable. Effortless.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="bg-gray-900 hover:bg-black text-white rounded-full px-8 transition-all duration-300 min-w-[180px]" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 border-gray-300 text-gray-800 hover:bg-gray-100 transition-all duration-300 min-w-[180px]" asChild>
                  <Link to="/customer/track" className="flex items-center justify-center gap-2">
                    Track Shipment <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Product Showcase */}
            <div className="relative mt-8 md:mt-20 mb-16 md:mb-32">
              {/* Main Device/App Showcase */}
              <div className="rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-4xl transform transition-all duration-700 hover:scale-[1.02]">
                <div className="aspect-[16/9] relative bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                  {/* Device Frame */}
                  <div className="absolute inset-0 p-1">
                    {/* Status Bar */}
                    <div className="h-6 w-full bg-black/90 rounded-t-xl flex items-center px-4">
                      <div className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1.5"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <div className="ml-auto flex space-x-2">
                        <div className="w-4 h-1.5 bg-white/20 rounded-full"></div>
                        <div className="w-4 h-1.5 bg-white/30 rounded-full"></div>
                        <div className="w-4 h-1.5 bg-white/40 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Content Area */}
                    <div className="h-[calc(100%-1.5rem)] w-full bg-black/80 rounded-b-xl flex overflow-hidden">
                      {/* Left side - Map view */}
                      <div className="w-2/3 relative">
                        {/* Stylized map with depth effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#232936] to-[#141824] opacity-95"></div>
                        
                        {/* Map Grid Lines */}
                        <div className="absolute inset-0 overflow-hidden">
                          <div className="absolute inset-0 opacity-10">
                            <div className="absolute left-0 right-0 top-0 bottom-0" 
                                 style={{
                                   backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                                   backgroundSize: '20px 20px'
                                 }}>
                            </div>
                          </div>
                        </div>
                        
                        {/* City Blocks */}
                        <div className="absolute inset-0">
                          <div className="absolute top-1/4 left-1/4 w-20 h-12 bg-gray-700/30 rounded-sm"></div>
                          <div className="absolute top-1/3 left-1/2 w-32 h-16 bg-gray-700/30 rounded-sm"></div>
                          <div className="absolute top-2/3 left-1/6 w-24 h-12 bg-gray-700/30 rounded-sm"></div>
                          <div className="absolute top-1/2 left-2/3 w-16 h-24 bg-gray-700/30 rounded-sm"></div>
                        </div>
                        
                        {/* Roads */}
                        <div className="absolute inset-0">
                          <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-600/20"></div>
                          <div className="absolute top-0 bottom-0 left-1/3 w-1.5 bg-gray-600/20"></div>
                          <div className="absolute top-0 bottom-0 left-2/3 w-1.5 bg-gray-600/20"></div>
                          <div className="absolute top-1/4 left-0 right-0 h-1.5 bg-gray-600/20"></div>
                          <div className="absolute top-3/4 left-0 right-0 h-1.5 bg-gray-600/20"></div>
                        </div>
                        
                        {/* Route Path */}
                        <div className="absolute top-1/2 left-[15%] right-[15%] h-3 bg-gradient-to-r from-swiftship-500/80 via-swiftship-400/60 to-delivery-500/80 rounded-full filter blur-[1px] animate-pulse"></div>
                        
                        {/* Glowing Delivery Points */}
                        <div className="absolute top-1/2 left-[15%] w-4 h-4 rounded-full bg-swiftship-500 shadow-[0_0_15px_rgba(14,165,233,0.9)] -translate-x-1/2 -translate-y-1/2 z-10"></div>
                        <div className="absolute top-1/2 left-[85%] w-4 h-4 rounded-full bg-delivery-500 shadow-[0_0_15px_rgba(22,163,74,0.9)] -translate-x-1/2 -translate-y-1/2 z-10"></div>
                        
                        {/* Moving Truck */}
                        <div className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 z-20">
                          <div className="w-6 h-6 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.9)] flex items-center justify-center animate-pulse">
                            <Truck className="h-3 w-3 text-swiftship-600" />
                          </div>
                        </div>
                        
                        {/* Location Labels */}
                        <div className="absolute top-[46%] left-[15%] -translate-x-1/2 text-xs text-white/80 font-medium">Origin</div>
                        <div className="absolute top-[46%] left-[85%] -translate-x-1/2 text-xs text-white/80 font-medium">Destination</div>
                      </div>
                      
                      {/* Right side - Tracking info with improved UI */}
                      <div className="w-1/3 bg-black/70 backdrop-blur-md p-5 text-white">
                        <div className="h-full flex flex-col">
                          {/* Tracking Header */}
                          <div className="mb-6">
                            <div className="text-xs text-white/60 mb-1">Package ID</div>
                            <div className="text-base font-medium text-white/90">SW1123456789</div>
                          </div>
                          
                          {/* Status Indicators */}
                          <div className="flex-1 space-y-6">
                            {/* Status 1 - Completed */}
                            <div className="relative pl-6">
                              <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-delivery-500 shadow-[0_0_8px_rgba(22,163,74,0.7)]"></div>
                              <div className="absolute left-1.25 top-4 bottom-0 w-0.5 bg-gray-700"></div>
                              <div>
                                <div className="text-xs text-white/60">Apr 5, 10:30 AM</div>
                                <div className="text-sm font-medium text-white/90">Order Confirmed</div>
                              </div>
                            </div>
                            
                            {/* Status 2 - Completed */}
                            <div className="relative pl-6">
                              <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-delivery-500 shadow-[0_0_8px_rgba(22,163,74,0.7)]"></div>
                              <div className="absolute left-1.25 top-4 bottom-0 w-0.5 bg-gray-700"></div>
                              <div>
                                <div className="text-xs text-white/60">Apr 6, 08:15 AM</div>
                                <div className="text-sm font-medium text-white/90">Pickup Complete</div>
                              </div>
                            </div>
                            
                            {/* Status 3 - In Progress */}
                            <div className="relative pl-6">
                              <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-delivery-500 shadow-[0_0_8px_rgba(22,163,74,0.7)] animate-pulse"></div>
                              <div className="absolute left-1.25 top-4 bottom-0 w-0.5 bg-gray-700"></div>
                              <div>
                                <div className="text-xs text-white/60">Apr 6, 02:45 PM</div>
                                <div className="text-sm font-medium text-white/90">In Transit</div>
                              </div>
                            </div>
                            
                            {/* Status 4 - Upcoming */}
                            <div className="relative pl-6">
                              <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-gray-600"></div>
                              <div>
                                <div className="text-xs text-white/40">Apr 7, 12:00 PM</div>
                                <div className="text-sm font-medium text-white/60">Estimated Arrival</div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Action Button */}
                          <div className="mt-4">
                            <button className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-swiftship-600 to-swiftship-500 text-white text-sm font-medium hover:from-swiftship-700 hover:to-swiftship-600 transition-all duration-300 flex items-center justify-center">
                              View Details
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
              {/* Floating Cards */}
              <div className="absolute -right-4 md:right-0 lg:right-12 -bottom-16 md:-bottom-10 z-10 transform translate-y-0 md:-translate-y-16">
                <div className="w-64 bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-all duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-sm">Real-Time Updates</span>
                    <span className="p-2 rounded-full bg-swiftship-100">
                      <Package className="h-4 w-4 text-swiftship-600" />
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    Get instant notifications about your package status. Know exactly where your delivery is at all times.
                  </p>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full">
                    <div className="h-1.5 w-4/5 bg-swiftship-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -left-4 md:left-0 lg:left-12 -bottom-12 md:-bottom-8 z-10 transform translate-y-0 md:-translate-y-4">
                <div className="w-64 bg-white rounded-2xl shadow-2xl p-6 transform -rotate-2 hover:rotate-0 transition-all duration-500">
                  <div className="flex items-start mb-4">
                    <span className="p-2 rounded-full bg-delivery-100">
                      <Truck className="h-5 w-5 text-delivery-600" />
                    </span>
                    <div className="ml-3">
                      <p className="text-xs text-gray-500">Estimated Arrival</p>
                      <p className="font-medium">Apr 7, 2025</p>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full mb-1">
                    <div className="h-1.5 w-3/4 bg-delivery-500 rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>In Transit</span>
                    <span>Delivered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Improved with more spacing and visual hierarchy */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-swiftship-600 font-medium mb-3">FEATURES</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Brilliantly simple.</h2>
            <p className="text-xl text-gray-600">
              SwiftShip connects the dots for a delivery experience that feels magical from start to finish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            {/* Feature Card 1 */}
            <Card className="border-0 bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="h-14 w-14 rounded-full bg-swiftship-100 flex items-center justify-center mb-6">
                  <User className="h-7 w-7 text-swiftship-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Customer Portal</h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  Request deliveries, track your parcels in real-time, and manage your entire shipment history in one elegant interface.
                </p>
                <Link to="/register" className="group text-swiftship-600 hover:text-swiftship-800 inline-flex items-center font-medium">
                  Get Started 
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>

            {/* Feature Card 2 */}
            <Card className="border-0 bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="h-14 w-14 rounded-full bg-delivery-100 flex items-center justify-center mb-6">
                  <Truck className="h-7 w-7 text-delivery-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Courier App</h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  Accept delivery requests, manage your schedule, and update customers with real-time delivery status updates.
                </p>
                <Link to="/register" className="group text-delivery-600 hover:text-delivery-800 inline-flex items-center font-medium">
                  Join Our Fleet 
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>

            {/* Feature Card 3 */}
            <Card className="border-0 bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="h-14 w-14 rounded-full bg-amber-100 flex items-center justify-center mb-6">
                  <Package className="h-7 w-7 text-amber-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Admin Dashboard</h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  Oversee all operations, manage users and couriers, and access comprehensive system analytics at a glance.
                </p>
                <Link to="/login" className="group text-amber-600 hover:text-amber-800 inline-flex items-center font-medium">
                  Admin Login 
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial Section - New section with Apple-style design */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-swiftship-600 font-medium mb-3">TESTIMONIALS</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">People love SwiftShip.</h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it. Here's what our users have to say.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "As a business owner, reliable shipping is crucial. SwiftShip has transformed our logistics with their seamless platform."
              </p>
              <div>
                <p className="font-semibold text-gray-900">Sarah Thompson</p>
                <p className="text-sm text-gray-500">E-commerce Store Owner</p>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "The real-time tracking is incredible. I never have to wonder where my packages are, and the delivery estimates are spot-on."
              </p>
              <div>
                <p className="font-semibold text-gray-900">Michael Chen</p>
                <p className="text-sm text-gray-500">Frequent Shopper</p>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "As a courier, the app makes route planning and delivery confirmation so easy. Best delivery platform I've worked with."
              </p>
              <div>
                <p className="font-semibold text-gray-900">James Wilson</p>
                <p className="text-sm text-gray-500">Professional Courier</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action - Improved with more contrast and visual appeal */}
      <section className="py-20 bg-gradient-to-br from-swiftship-700 to-swiftship-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your delivery experience?</h2>
              <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
                Join thousands of satisfied users who trust SwiftShip for their delivery needs.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-5">
                <Button size="lg" className="bg-white text-swiftship-700 hover:bg-gray-100 rounded-full px-8 py-6 h-auto text-base" asChild>
                  <Link to="/register">Sign Up Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-swiftship-600 rounded-full px-8 py-6 h-auto text-base" asChild>
                  <Link to="/login">Log In</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Responsive improvements */}
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
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-4">Services</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Tracking</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1 mt-8 md:mt-0">
                <h3 className="text-white font-medium mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>&copy; 2025 SwiftShip. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

