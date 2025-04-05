import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { getAllParcels } from '../../utils/api';
import { useToast } from '../../hooks/use-toast';
import ParcelStatusBadge from '../../components/shared/ParcelStatusBadge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Search } from 'lucide-react';

interface Parcel {
  id: string;
  trackingId: string;
  status: string;
  createdAt: string;
  customerId: string;
  customerName: string;
  courierId: string;
  courierName: string;
  pickupAddress: string;
  deliveryAddress: string;
}

const AdminParcels: React.FC = () => {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [filteredParcels, setFilteredParcels] = useState<Parcel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const response = await getAllParcels();
        // For demo purposes, we'll create mock data
        const mockParcels = [
          {
            id: '1',
            trackingId: 'SW-123456',
            status: 'delivered',
            createdAt: '2023-04-01T10:00:00Z',
            customerId: 'c1',
            customerName: 'John Doe',
            courierId: 'co1',
            courierName: 'Mike Smith',
            pickupAddress: '123 Main St, New York, NY',
            deliveryAddress: '456 Elm St, Boston, MA',
          },
          {
            id: '2',
            trackingId: 'SW-789012',
            status: 'in_transit',
            createdAt: '2023-04-02T11:30:00Z',
            customerId: 'c2',
            customerName: 'Jane Smith',
            courierId: 'co2',
            courierName: 'Dave Johnson',
            pickupAddress: '789 Oak St, Chicago, IL',
            deliveryAddress: '101 Pine St, San Francisco, CA',
          },
          {
            id: '3',
            trackingId: 'SW-345678',
            status: 'pending',
            createdAt: '2023-04-03T09:15:00Z',
            customerId: 'c3',
            customerName: 'Bob Johnson',
            courierId: null,
            courierName: null,
            pickupAddress: '555 Cedar St, Miami, FL',
            deliveryAddress: '777 Beach Rd, Los Angeles, CA',
          },
          {
            id: '4',
            trackingId: 'SW-901234',
            status: 'picked_up',
            createdAt: '2023-04-03T14:20:00Z',
            customerId: 'c1',
            customerName: 'John Doe',
            courierId: 'co1',
            courierName: 'Mike Smith',
            pickupAddress: '888 Maple St, Seattle, WA',
            deliveryAddress: '999 Pine Ave, Portland, OR',
          },
          {
            id: '5',
            trackingId: 'SW-567890',
            status: 'delivered',
            createdAt: '2023-04-02T16:45:00Z',
            customerId: 'c4',
            customerName: 'Alice Brown',
            courierId: 'co3',
            courierName: 'Sarah Lee',
            pickupAddress: '111 Oak St, Dallas, TX',
            deliveryAddress: '222 Elm Rd, Houston, TX',
          },
        ];
        
        setParcels(mockParcels);
        setFilteredParcels(mockParcels);
      } catch (error) {
        console.error('Error fetching parcels:', error);
        toast({
          title: 'Error',
          description: 'Failed to load parcels',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchParcels();
  }, [toast]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredParcels(parcels);
      return;
    }
    
    const searchTermLower = searchTerm.toLowerCase();
    const filtered = parcels.filter(parcel => 
      parcel.trackingId.toLowerCase().includes(searchTermLower) ||
      parcel.customerName?.toLowerCase().includes(searchTermLower) ||
      parcel.courierName?.toLowerCase().includes(searchTermLower) ||
      parcel.deliveryAddress.toLowerCase().includes(searchTermLower)
    );
    
    setFilteredParcels(filtered);
  }, [searchTerm, parcels]);

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
        <h1 className="text-2xl font-bold">All Parcels</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search parcels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Parcel List</CardTitle>
          <CardDescription>
            {filteredParcels.length} total parcels
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-swiftship-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="pb-2 text-sm font-medium text-gray-500">Tracking ID</th>
                    <th className="pb-2 text-sm font-medium text-gray-500">Created</th>
                    <th className="pb-2 text-sm font-medium text-gray-500">Customer</th>
                    <th className="pb-2 text-sm font-medium text-gray-500">Courier</th>
                    <th className="pb-2 text-sm font-medium text-gray-500">Status</th>
                    <th className="pb-2 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredParcels.map((parcel) => (
                    <tr key={parcel.id}>
                      <td className="py-3 text-sm">{parcel.trackingId}</td>
                      <td className="py-3 text-sm">{formatDate(parcel.createdAt)}</td>
                      <td className="py-3 text-sm">{parcel.customerName}</td>
                      <td className="py-3 text-sm">{parcel.courierName || 'Not assigned'}</td>
                      <td className="py-3 text-sm">
                        <ParcelStatusBadge status={parcel.status} />
                      </td>
                      <td className="py-3 text-sm">
                        <Button variant="outline" size="sm">
                          View Details
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

export default AdminParcels;
