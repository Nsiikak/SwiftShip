import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { getAvailableParcels, acceptParcel } from '../../utils/api';
import { useToast } from '../../hooks/use-toast';
import { Button } from '../../components/ui/button';
import { Package } from 'lucide-react';

interface Parcel {
  id: string;
  trackingId: string;
  createdAt: string;
  pickupAddress: string;
  deliveryAddress: string;
  recipientName: string;
  weight: number;
  description: string;
  distance: number;
  estimatedTime: number;
}

const AvailableParcels: React.FC = () => {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [loading, setLoading] = useState(true);
  const [acceptingId, setAcceptingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const response = await getAvailableParcels();
        // For demo purposes, we'll create mock data
        const mockParcels = [
          {
            id: '3',
            trackingId: 'SW-345678',
            createdAt: '2023-04-03T09:15:00Z',
            pickupAddress: '555 Cedar St, Miami, FL',
            deliveryAddress: '777 Beach Rd, Miami, FL',
            recipientName: 'Bob Johnson',
            weight: 1.5,
            description: 'Books and magazines',
            distance: 5.2,
            estimatedTime: 15,
          },
          {
            id: '4',
            trackingId: 'SW-901234',
            createdAt: '2023-04-03T14:20:00Z',
            pickupAddress: '888 Maple St, Miami, FL',
            deliveryAddress: '999 Palm Ave, Miami, FL',
            recipientName: 'Alice Brown',
            weight: 3.2,
            description: 'Home decor items',
            distance: 8.7,
            estimatedTime: 25,
          },
          {
            id: '5',
            trackingId: 'SW-567890',
            createdAt: '2023-04-03T16:45:00Z',
            pickupAddress: '111 Pine St, Miami, FL',
            deliveryAddress: '222 Oak Rd, Miami, FL',
            recipientName: 'Charlie Wilson',
            weight: 0.8,
            description: 'Small electronics',
            distance: 3.4,
            estimatedTime: 10,
          },
        ];
        setParcels(mockParcels);
      } catch (error) {
        console.error('Error fetching available parcels:', error);
        toast({
          title: 'Error',
          description: 'Failed to load available parcels',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchParcels();
  }, [toast]);

  const handleAcceptParcel = async (parcelId: string) => {
    setAcceptingId(parcelId);
    try {
      await acceptParcel(parcelId);
      
      // Remove the accepted parcel from the list
      setParcels(parcels.filter(parcel => parcel.id !== parcelId));
      
      toast({
        title: 'Success',
        description: 'You have accepted this delivery',
      });
    } catch (error) {
      console.error('Error accepting parcel:', error);
      toast({
        title: 'Error',
        description: 'Failed to accept the parcel',
        variant: 'destructive',
      });
    } finally {
      setAcceptingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Available Parcels</h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-swiftship-600"></div>
        </div>
      ) : parcels.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center py-12">
            <Package className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700">No Available Parcels</h3>
            <p className="text-gray-500 mt-2">
              Check back later for new delivery opportunities
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {parcels.map((parcel) => (
            <Card key={parcel.id} className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{parcel.trackingId}</CardTitle>
                  <span className="text-sm font-medium px-2 py-1 bg-gray-100 rounded-full">
                    {parcel.weight} kg
                  </span>
                </div>
                <CardDescription>Created {formatDate(parcel.createdAt)}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Pickup</h4>
                    <p className="mt-1">{parcel.pickupAddress}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Delivery</h4>
                    <p className="mt-1">{parcel.deliveryAddress}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Recipient</h4>
                    <p className="mt-1">{parcel.recipientName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Package Info</h4>
                    <p className="mt-1 text-sm">{parcel.description}</p>
                  </div>

                  <div className="flex justify-between text-sm text-gray-500 border-t pt-4">
                    <div>
                      <span className="font-medium">{parcel.distance} km</span>
                      <span className="ml-1">distance</span>
                    </div>
                    <div>
                      <span className="font-medium">{parcel.estimatedTime} min</span>
                      <span className="ml-1">estimated</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <div className="p-4 pt-0">
                <Button
                  className="w-full bg-swiftship-600 hover:bg-swiftship-700"
                  onClick={() => handleAcceptParcel(parcel.id)}
                  disabled={acceptingId === parcel.id}
                >
                  {acceptingId === parcel.id ? 'Accepting...' : 'Accept Delivery'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableParcels;
