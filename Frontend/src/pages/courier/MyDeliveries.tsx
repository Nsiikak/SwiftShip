import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { useToast } from '../../hooks/use-toast';
import { updateParcelStatus } from '../../utils/api';
import ParcelStatusBadge from '../../components/shared/ParcelStatusBadge';
import { Truck, Package, CheckCircle, AlertCircle } from 'lucide-react';

interface Delivery {
  id: string;
  trackingId: string;
  customerName: string;
  pickupAddress: string;
  deliveryAddress: string;
  status: string;
  assignedAt: string;
}

const MyDeliveries = () => {
  const [activeDeliveries, setActiveDeliveries] = useState<Delivery[]>([]);
  const [completedDeliveries, setCompletedDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, we would fetch data from an API
    // For now, let's create mock data
    const mockActiveDeliveries: Delivery[] = [
      {
        id: '1',
        trackingId: 'SW-567890',
        customerName: 'Alex Johnson',
        pickupAddress: '123 Main St, New York, NY',
        deliveryAddress: '456 Elm St, Boston, MA',
        status: 'in_transit',
        assignedAt: '2023-04-10T09:15:00Z',
      },
      {
        id: '2',
        trackingId: 'SW-123456',
        customerName: 'Maria Rodriguez',
        pickupAddress: '789 Oak St, Chicago, IL',
        deliveryAddress: '101 Pine St, San Francisco, CA',
        status: 'picked_up',
        assignedAt: '2023-04-12T14:30:00Z',
      },
    ];

    const mockCompletedDeliveries: Delivery[] = [
      {
        id: '3',
        trackingId: 'SW-789012',
        customerName: 'John Smith',
        pickupAddress: '555 Cedar St, Miami, FL',
        deliveryAddress: '777 Beach Rd, Los Angeles, CA',
        status: 'delivered',
        assignedAt: '2023-04-05T10:00:00Z',
      },
      {
        id: '4',
        trackingId: 'SW-345678',
        customerName: 'Emily Brown',
        pickupAddress: '222 Maple Ave, Seattle, WA',
        deliveryAddress: '333 Birch Blvd, Portland, OR',
        status: 'delivered',
        assignedAt: '2023-04-07T11:45:00Z',
      },
    ];

    setActiveDeliveries(mockActiveDeliveries);
    setCompletedDeliveries(mockCompletedDeliveries);
    setLoading(false);
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      // In a real app, this would call the API
      // await updateParcelStatus(id, newStatus);
      
      // For demo, we'll just update the local state
      if (newStatus === 'delivered') {
        setActiveDeliveries(prev => prev.filter(d => d.id !== id));
        setCompletedDeliveries(prev => [
          ...prev,
          {
            ...activeDeliveries.find(d => d.id === id)!,
            status: 'delivered',
          },
        ]);
      } else {
        setActiveDeliveries(prev => prev.map(d => 
          d.id === id ? { ...d, status: newStatus } : d
        ));
      }
      
      toast({
        title: "Status Updated",
        description: `Parcel status has been updated to ${newStatus.replace('_', ' ')}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Deliveries</h1>
        <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
          <Truck className="h-5 w-5 text-swiftship-600" />
          <span className="text-sm font-medium">Courier Dashboard</span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex flex-col items-center pt-6">
            <div className="bg-amber-50 p-3 rounded-full">
              <Truck className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="mt-3 text-2xl font-bold">{activeDeliveries.length}</h3>
            <p className="text-sm text-gray-500">Active Deliveries</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center pt-6">
            <div className="bg-green-50 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mt-3 text-2xl font-bold">{completedDeliveries.length}</h3>
            <p className="text-sm text-gray-500">Completed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center pt-6">
            <div className="bg-red-50 p-3 rounded-full">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="mt-3 text-2xl font-bold">0</h3>
            <p className="text-sm text-gray-500">Issues</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Deliveries</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Deliveries</CardTitle>
              <CardDescription>Manage your current delivery assignments</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-swiftship-600"></div>
                </div>
              ) : activeDeliveries.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No active deliveries</h3>
                  <p className="mt-1 text-sm text-gray-500">You don't have any active deliveries right now.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tracking ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Delivery Address</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activeDeliveries.map((delivery) => (
                        <TableRow key={delivery.id}>
                          <TableCell className="font-medium">{delivery.trackingId}</TableCell>
                          <TableCell>{delivery.customerName}</TableCell>
                          <TableCell>{delivery.deliveryAddress}</TableCell>
                          <TableCell>
                            <ParcelStatusBadge status={delivery.status} />
                          </TableCell>
                          <TableCell>
                            {delivery.status === 'pending' && (
                              <Button 
                                size="sm" 
                                onClick={() => handleUpdateStatus(delivery.id, 'picked_up')}
                              >
                                Mark as Picked Up
                              </Button>
                            )}
                            {delivery.status === 'picked_up' && (
                              <Button 
                                size="sm" 
                                onClick={() => handleUpdateStatus(delivery.id, 'in_transit')}
                              >
                                Start Delivery
                              </Button>
                            )}
                            {delivery.status === 'in_transit' && (
                              <Button 
                                size="sm" 
                                onClick={() => handleUpdateStatus(delivery.id, 'delivered')}
                              >
                                Mark as Delivered
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Deliveries</CardTitle>
              <CardDescription>Review your delivery history</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-swiftship-600"></div>
                </div>
              ) : completedDeliveries.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No completed deliveries</h3>
                  <p className="mt-1 text-sm text-gray-500">You haven't completed any deliveries yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tracking ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Completed On</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {completedDeliveries.map((delivery) => (
                        <TableRow key={delivery.id}>
                          <TableCell className="font-medium">{delivery.trackingId}</TableCell>
                          <TableCell>{delivery.customerName}</TableCell>
                          <TableCell>{formatDate(delivery.assignedAt)}</TableCell>
                          <TableCell>
                            <ParcelStatusBadge status={delivery.status} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyDeliveries;