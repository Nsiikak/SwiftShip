import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Customer Pages
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CreateParcel from "./pages/customer/CreateParcel";
import TrackParcel from "./pages/customer/TrackParcel";
import MyParcels from "./pages/customer/MyParcels";
import Profile from "./pages/customer/Profile";

// Courier Pages
import CourierDashboard from "./pages/courier/CourierDashboard";
import AvailableParcels from "./pages/courier/AvailableParcels";
import MyDeliveries from "./pages/courier/MyDeliveries";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminParcels from "./pages/admin/AdminParcels";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminCouriers from "./pages/admin/AdminCouriers";
import AdminSystemStats from "./pages/admin/AdminSystemStats";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Customer Routes */}
            <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
              <Route path="/customer/dashboard" element={<CustomerDashboard />} />
              <Route path="/customer/create-shipment" element={<CreateParcel />} />
              <Route path="/customer/track" element={<TrackParcel />} />
              <Route path="/customer/parcels" element={<MyParcels />} />
              <Route path="/customer/profile" element={<Profile />} />
            </Route>

            {/* Courier Routes */}
            <Route element={<ProtectedRoute allowedRoles={['courier']} />}>
              <Route path="/courier/dashboard" element={<CourierDashboard />} />
              <Route path="/courier/available" element={<AvailableParcels />} />
              <Route path="/courier/deliveries" element={<MyDeliveries />} />
              <Route path="/courier/profile" element={<Profile />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/parcels" element={<AdminParcels />} />
              <Route path="/admin/customers" element={<AdminCustomers />} />
              <Route path="/admin/couriers" element={<AdminCouriers />} />
              <Route path="/admin/stats" element={<AdminSystemStats />} />
              <Route path="/admin/profile" element={<Profile />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
