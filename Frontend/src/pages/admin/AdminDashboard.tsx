import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { getAllUsers, getAllParcels } from '../../utils/api';
import { Package, Users, Truck, BarChart4 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Progress } from '../../components/ui/progress';

// Chart imports
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line } from 'recharts';

interface DashboardStats {
  totalParcels: number;
  totalUsers: number;
  totalCouriers: number;
  activeDeliveries: number;
  deliverySuccess: number;
  parcelsPerDay: { name: string; parcels: number }[];
  statusDistribution: { name: string; value: number }[];
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([getAllUsers(), getAllParcels()]);
        
        // For demo purposes, we'll create mock data
        const mockStats: DashboardStats = {
          totalParcels: 247,
          totalUsers: 152,
          totalCouriers: 18,
          activeDeliveries: 34,
          deliverySuccess: 92,
          parcelsPerDay: [
            { name: 'Mon', parcels: 28 },
            { name: 'Tue', parcels: 32 },
            { name: 'Wed', parcels: 45 },
            { name: 'Thu', parcels: 39 },
            { name: 'Fri', parcels: 53 },
            { name: 'Sat', parcels: 37 },
            { name: 'Sun', parcels: 13 },
          ],
          statusDistribution: [
            { name: 'Pending', value: 35 },
            { name: 'Picked Up', value: 42 },
            { name: 'In Transit', value: 58 },
            { name: 'Delivered', value: 112 },
          ],
        };
        
        setStats(mockStats);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-swiftship-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <div className="bg-swiftship-50 p-3 rounded-full">
              <Package className="h-6 w-6 text-swiftship-600" />
            </div>
            <h3 className="mt-3 text-2xl font-bold">{stats?.totalParcels}</h3>
            <p className="text-sm text-gray-500">Total Parcels</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <div className="bg-amber-50 p-3 rounded-full">
              <Users className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="mt-3 text-2xl font-bold">{stats?.totalUsers}</h3>
            <p className="text-sm text-gray-500">Total Users</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <div className="bg-delivery-50 p-3 rounded-full">
              <Truck className="h-6 w-6 text-delivery-600" />
            </div>
            <h3 className="mt-3 text-2xl font-bold">{stats?.totalCouriers}</h3>
            <p className="text-sm text-gray-500">Active Couriers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <div className="bg-purple-50 p-3 rounded-full">
              <BarChart4 className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mt-3 text-2xl font-bold">{stats?.deliverySuccess}%</h3>
            <p className="text-sm text-gray-500">Delivery Success</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Parcels Chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Parcels Per Day</CardTitle>
            <CardDescription>Shipment volume over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.parcelsPerDay} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="parcels" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Parcel Status Distribution</CardTitle>
            <CardDescription>Current status of all parcels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.statusDistribution.map(status => (
                <div key={status.name} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{status.name}</span>
                    <span className="text-sm text-gray-500">{status.value} parcels</span>
                  </div>
                  <Progress 
                    value={(status.value / stats.totalParcels) * 100} 
                    className="h-2" 
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Active Deliveries */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Active Deliveries</CardTitle>
            <CardDescription>
              Parcels currently being delivered: {stats?.activeDeliveries}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { hour: '8AM', deliveries: 5 },
                    { hour: '10AM', deliveries: 12 },
                    { hour: '12PM', deliveries: 18 },
                    { hour: '2PM', deliveries: 24 },
                    { hour: '4PM', deliveries: 31 },
                    { hour: '6PM', deliveries: 28 },
                    { hour: '8PM', deliveries: 21 },
                  ]}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="deliveries" 
                    stroke="#15803d" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
