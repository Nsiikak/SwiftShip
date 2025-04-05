import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAvailableParcels } from '@/utils/api';
import { Package, Truck, Clock } from 'lucide-react';
import ParcelStatusBadge from '@/components/shared/ParcelStatusBadge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Parcel {
  id: string;
  trackingId: string;
  status: string;
  createdAt: string;
  pickupAddress: string;
  deliveryAddress: string;
  recipientName: string;
  description: string;
}

const CourierDashboard: React.FC = () => {
  const [activeDeliveries, setActiveDeliveries] = useState<Parcel[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await getAvailableParcels();
        // For demo purposes, we'll create mock data
        const mockDeliveries = [
          {
            id: '1',
            trackingId: 'SW-123456',
            status: 'picked_up',
            createdAt: '2023-04-01T10:00:00Z',
            pickupAddress: '123 Main St, New York, NY',
            deliveryAddress: '456 Elm St, Boston, MA',
            recipientName: 'John Doe',
            description: 'Fragile electronics',
          },
          {
            id: '2',
            trackingId: 'SW-789012',
            status: 'in_transit',
            createdAt: '2023-04-02T11:30:00Z',
            pickupAddress: '789 Oak St, Chicago, IL',
            deliveryAddress: '101 Pine St, San Francisco, CA',
            recipientName: 'Jane Smith',
            description: 'Clothing items',
          },
        ];
        setActiveDeliveries(mockDeliveries);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Courier Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex flex-col items-center pt-6">
            <div className="bg-swiftship-50 p-3 rounded-full">
              <Truck className="h-6 w-6 text-swiftship-600" />
            </div>
            <h3 className="mt-3 text-2xl font-bold">{activeDeliveries.length}</h3>
            <p className="text-sm text-gray-500">Active Deliveries</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center pt-6">
            <div className="bg-amber-50 p-3 rounded-full">
              <Package className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="mt-3 text-2xl font-bold">12</h3>
            <p className="text-sm text-gray-500">Available Parcels</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center pt-6">
            <div className="bg-delivery-50 p-3 rounded-full">
              <Clock className="h-6 w-6 text-delivery-600" />
            </div>
            <h3 className="mt-3 text-2xl font-bold">
              3.5
            </h3>
            <p className="text-sm text-gray-500">Avg Delivery Time (hrs)</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Deliveries */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Active Deliveries</CardTitle>
            <CardDescription>
              Parcels you are currently delivering
            </CardDescription>
          </div>
          <Button 
            onClick={() => navigate('/courier/available')} 
            className="bg-swiftship-600 hover:bg-swiftship-700"
          >
            Find Available Parcels
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-swiftship-600"></div>
            </div>
          ) : activeDeliveries.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No active deliveries. Find available parcels to deliver!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="pb-2 text-sm font-medium text-gray-500">Tracking ID</th>
                    <th className="pb-2 text-sm font-medium text-gray-500">Recipient</th>
                    <th className="pb-2 text-sm font-medium text-gray-500">Delivery Address</th>
                    <th className="pb-2 text-sm font-medium text-gray-500">Status</th>
                    <th className="pb-2 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {activeDeliveries.map((delivery) => (
                    <tr key={delivery.id}>
                      <td className="py-3 text-sm">{delivery.trackingId}</td>
                      <td className="py-3 text-sm">{delivery.recipientName}</td>
                      <td className="py-3 text-sm">{delivery.deliveryAddress}</td>
                      <td className="py-3 text-sm">
                        <ParcelStatusBadge status={delivery.status} />
                      </td>
                      <td className="py-3 text-sm">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/courier/deliveries/${delivery.id}`)}
                        >
                          Update Status
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CourierDashboard;
