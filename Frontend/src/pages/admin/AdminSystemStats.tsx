
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Progress } from '../../components/ui/progress';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { Clock, Users, Truck, Package, BarChart4, Calendar, Check, AlertCircle, Server } from 'lucide-react';

const AdminSystemStats: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const serverUsage = [
    { name: 'CPU', usage: 42 },
    { name: 'Memory', usage: 68 },
    { name: 'Disk', usage: 37 },
    { name: 'Network', usage: 25 },
  ];

  const getUserData = () => {
    switch (selectedPeriod) {
      case 'weekly':
        return [
          { name: 'Mon', customers: 25, couriers: 8 },
          { name: 'Tue', customers: 30, couriers: 10 },
          { name: 'Wed', customers: 28, couriers: 12 },
          { name: 'Thu', customers: 35, couriers: 15 },
          { name: 'Fri', customers: 40, couriers: 14 },
          { name: 'Sat', customers: 22, couriers: 7 },
          { name: 'Sun', customers: 20, couriers: 5 },
        ];
      case 'monthly':
        return [
          { name: 'Week 1', customers: 120, couriers: 35 },
          { name: 'Week 2', customers: 145, couriers: 42 },
          { name: 'Week 3', customers: 132, couriers: 38 },
          { name: 'Week 4', customers: 158, couriers: 45 },
        ];
      case 'yearly':
        return [
          { name: 'Jan', customers: 350, couriers: 95 },
          { name: 'Feb', customers: 420, couriers: 105 },
          { name: 'Mar', customers: 390, couriers: 100 },
          { name: 'Apr', customers: 480, couriers: 120 },
          { name: 'May', customers: 520, couriers: 125 },
          { name: 'Jun', customers: 490, couriers: 115 },
          { name: 'Jul', customers: 550, couriers: 130 },
          { name: 'Aug', customers: 580, couriers: 135 },
          { name: 'Sep', customers: 620, couriers: 140 },
          { name: 'Oct', customers: 680, couriers: 150 },
          { name: 'Nov', customers: 720, couriers: 155 },
          { name: 'Dec', customers: 800, couriers: 160 },
        ];
      default:
        return [];
    }
  };

  const getDeliveryData = () => {
    switch (selectedPeriod) {
      case 'weekly':
        return [
          { name: 'Mon', completed: 45, failed: 3 },
          { name: 'Tue', completed: 52, failed: 4 },
          { name: 'Wed', completed: 49, failed: 2 },
          { name: 'Thu', completed: 58, failed: 5 },
          { name: 'Fri', completed: 65, failed: 3 },
          { name: 'Sat', completed: 42, failed: 1 },
          { name: 'Sun', completed: 35, failed: 0 },
        ];
      case 'monthly':
        return [
          { name: 'Week 1', completed: 220, failed: 12 },
          { name: 'Week 2', completed: 245, failed: 15 },
          { name: 'Week 3', completed: 232, failed: 10 },
          { name: 'Week 4', completed: 258, failed: 14 },
        ];
      case 'yearly':
        return [
          { name: 'Jan', completed: 950, failed: 45 },
          { name: 'Feb', completed: 1020, failed: 55 },
          { name: 'Mar', completed: 980, failed: 50 },
          { name: 'Apr', completed: 1180, failed: 60 },
          { name: 'May', completed: 1240, failed: 65 },
          { name: 'Jun', completed: 1150, failed: 55 },
          { name: 'Jul', completed: 1290, failed: 70 },
          { name: 'Aug', completed: 1310, failed: 65 },
          { name: 'Sep', completed: 1380, failed: 80 },
          { name: 'Oct', completed: 1450, failed: 75 },
          { name: 'Nov', completed: 1560, failed: 85 },
          { name: 'Dec', completed: 1680, failed: 90 },
        ];
      default:
        return [];
    }
  };

  const getRevenueData = () => {
    switch (selectedPeriod) {
      case 'weekly':
        return [
          { name: 'Mon', revenue: 2450 },
          { name: 'Tue', revenue: 3120 },
          { name: 'Wed', revenue: 2980 },
          { name: 'Thu', revenue: 3560 },
          { name: 'Fri', revenue: 4250 },
          { name: 'Sat', revenue: 3450 },
          { name: 'Sun', revenue: 2150 },
        ];
      case 'monthly':
        return [
          { name: 'Week 1', revenue: 15800 },
          { name: 'Week 2', revenue: 17900 },
          { name: 'Week 3', revenue: 16500 },
          { name: 'Week 4', revenue: 19200 },
        ];
      case 'yearly':
        return [
          { name: 'Jan', revenue: 58000 },
          { name: 'Feb', revenue: 65000 },
          { name: 'Mar', revenue: 62000 },
          { name: 'Apr', revenue: 72000 },
          { name: 'May', revenue: 78000 },
          { name: 'Jun', revenue: 73000 },
          { name: 'Jul', revenue: 83000 },
          { name: 'Aug', revenue: 85000 },
          { name: 'Sep', revenue: 92000 },
          { name: 'Oct', revenue: 98000 },
          { name: 'Nov', revenue: 105000 },
          { name: 'Dec', revenue: 120000 },
        ];
      default:
        return [];
    }
  };

  const getParcelTypeData = () => {
    return [
      { name: 'Standard', value: 65 },
      { name: 'Express', value: 25 },
      { name: 'Premium', value: 10 },
    ];
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-swiftship-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">System Statistics</h1>
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <div className="bg-purple-50 p-3 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mt-3 text-2xl font-bold">152</h3>
            <p className="text-sm text-gray-500">Total Users</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <div className="bg-blue-50 p-3 rounded-full">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mt-3 text-2xl font-bold">247</h3>
            <p className="text-sm text-gray-500">Total Parcels</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <div className="bg-green-50 p-3 rounded-full">
              <Truck className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mt-3 text-2xl font-bold">18</h3>
            <p className="text-sm text-gray-500">Active Couriers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <div className="bg-amber-50 p-3 rounded-full">
              <BarChart4 className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="mt-3 text-2xl font-bold">92%</h3>
            <p className="text-sm text-gray-500">Delivery Success</p>
          </CardContent>
        </Card>
      </div>

      {/* User Registration */}
      <Card>
        <CardHeader>
          <CardTitle>User Registration</CardTitle>
          <CardDescription>New customer and courier registrations over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getUserData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="customers" name="Customers" fill="#8884d8" />
                <Bar dataKey="couriers" name="Couriers" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delivery Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Performance</CardTitle>
            <CardDescription>Completed vs failed deliveries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getDeliveryData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="completed" name="Completed" stroke="#4ade80" strokeWidth={2} />
                  <Line type="monotone" dataKey="failed" name="Failed" stroke="#f87171" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Total revenue generated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getRevenueData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parcel Type Distribution */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Parcel Types</CardTitle>
            <CardDescription>Distribution of parcel types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getParcelTypeData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {getParcelTypeData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Current server resource usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {serverUsage.map((resource) => (
                <div key={resource.name} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Server className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm font-medium">{resource.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{resource.usage}%</span>
                  </div>
                  <Progress 
                    value={resource.usage} 
                    className={`h-2 ${
                      resource.usage < 50 
                        ? "bg-green-500" 
                        : resource.usage < 80 
                        ? "bg-amber-500" 
                        : "bg-red-500"
                    }`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSystemStats;
