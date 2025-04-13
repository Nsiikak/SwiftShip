import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCustomerParcels } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../hooks/use-toast';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Package, Truck } from 'lucide-react';
import ParcelStatusBadge from '../../components/shared/ParcelStatusBadge';

interface Parcel {
  id: string;
  trackingId: string;
  status: string;
  createdAt: string;
  pickupAddress: string;
  deliveryAddress: string;
  description: string;
}

const CustomerDashboard: React.FC = () => {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParcels = async () => {
      setLoading(true);
      try {
        if (!user) {
          toast({
            title: 'Error',
            description: 'User is not authenticated',
            variant: 'destructive',
          });
          setLoading(false);
          return;
        }

        const response = await getCustomerParcels(Number(user.id)); // Fetch parcels for the logged-in user
        const data = await response.json();

        if (response.ok) {
          setParcels(data.data); // Update the parcels state with the fetched data
        } else {
          toast({
            title: 'Error',
            description: data.message || 'Failed to fetch parcels',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error fetching parcels:', error);
        toast({
          title: 'Error',
          description: 'An error occurred while fetching parcels',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchParcels();
  }, [user, toast]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customer Dashboard</h1>
        <Button
          onClick={() => navigate('/customer/create-shipment')}
          className="bg-swiftship-600 hover:bg-swiftship-700"
        >
          <Package className="mr-2 h-4 w-4" />
          New Shipment
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex flex-col items-center pt-6">
            <div className="bg-swiftship-50 p-3 rounded-full">
              <Package className="h-6 w-6 text-swiftship-600" />
            </div>
            <h3 className="mt-3 text-2xl font-bold">{parcels.length}</h3>
            <p className="text-sm text-gray-500">Total Parcels</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center pt-6">
            <div className="bg-amber-50 p-3 rounded-full">
              <Truck className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="mt-3 text-2xl font-bold">
              {parcels.filter(p => p.status === 'in_transit').length}
            </h3>
            <p className="text-sm text-gray-500">In Transit</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center pt-6">
            <div className="bg-delivery-50 p-3 rounded-full">
              <Package className="h-6 w-6 text-delivery-600" />
            </div>
            <h3 className="mt-3 text-2xl font-bold">
              {parcels.filter(p => p.status === 'delivered').length}
            </h3>
            <p className="text-sm text-gray-500">Delivered</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Parcels */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Shipments</CardTitle>
          <CardDescription>Your latest parcel shipments and their status</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-swiftship-600"></div>
            </div>
          ) : parcels.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No parcels found. Create your first shipment!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="pb-2 text-sm font-medium text-gray-500">Tracking ID</th>
                    <th className="pb-2 text-sm font-medium text-gray-500">Created</th>
                    <th className="pb-2 text-sm font-medium text-gray-500">Delivery Address</th>
                    <th className="pb-2 text-sm font-medium text-gray-500">Status</th>
                    <th className="pb-2 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {parcels.map((parcel) => (
                    <tr key={parcel.id}>
                      <td className="py-3 text-sm">{parcel.trackingId}</td>
                      <td className="py-3 text-sm">{formatDate(parcel.createdAt)}</td>
                      <td className="py-3 text-sm">{parcel.deliveryAddress}</td>
                      <td className="py-3 text-sm">
                        <ParcelStatusBadge status={parcel.status} />
                      </td>
                      <td className="py-3 text-sm">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/customer/track?id=${parcel.trackingId}`)}
                        >
                          Track
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

export default CustomerDashboard;
