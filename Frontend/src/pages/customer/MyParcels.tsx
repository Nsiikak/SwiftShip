import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/use-toast';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import ParcelStatusBadge from '../../components/shared/ParcelStatusBadge';
import { Package, Search, Calendar, Clock } from 'lucide-react';
import { getCustomerParcels } from '../../utils/api';

interface Parcel {
  id: string;
  trackingId: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  pickupAddress: string;
  deliveryAddress: string;
  description: string;
}

const formatDate = (dateString?: string) => {
  return dateString
    ? new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'N/A';
};

const MyParcels = () => {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        if (!user) {
          toast({
            title: 'Error',
            description: 'User is not authenticated',
            variant: 'destructive',
          });
          return;
        }

        const response = await getCustomerParcels(Number(user.id));
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch parcels');
        }

        setParcels(data.data || []);
      } catch (error: unknown) {
        console.error('Error fetching parcels:', error);
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'An error occurred while fetching parcels',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchParcels();
  }, [user, toast]);

  const filteredParcels = parcels.filter((parcel) => {
    const query = searchQuery.toLowerCase();
    return (
      (parcel.trackingId || '').toLowerCase().includes(query) ||
      (parcel.deliveryAddress || '').toLowerCase().includes(query) ||
      (parcel.description || '').toLowerCase().includes(query)
    );
  });
  

  const activeParcels = filteredParcels.filter((parcel) =>
    ['pending', 'picked_up', 'in_transit'].includes(parcel.status)
  );

  const deliveredParcels = filteredParcels.filter(
    (parcel) => parcel.status === 'delivered'
  );

  const navigateToTrack = (id: string) => {
    navigate(`/customer/track?id=${id}`);
  };

  const renderParcelTable = (data: Parcel[], isDelivered = false) => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tracking ID</TableHead>
            <TableHead>Created</TableHead>
            {isDelivered && <TableHead>Delivered</TableHead>}
            <TableHead>Delivery Address</TableHead>
            {!isDelivered && <TableHead>Status</TableHead>}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((parcel) => (
            <TableRow key={parcel.id}>
              <TableCell className="font-medium">{parcel.trackingId}</TableCell>
              <TableCell>{formatDate(parcel.createdAt)}</TableCell>
              {isDelivered && <TableCell>{formatDate(parcel.updatedAt)}</TableCell>}
              <TableCell>{parcel.deliveryAddress}</TableCell>
              {!isDelivered && (
                <TableCell>
                  <ParcelStatusBadge status={parcel.status} />
                </TableCell>
              )}
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateToTrack(parcel.trackingId)}
                >
                  {isDelivered ? 'Details' : 'Track'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const renderEmpty = (message: string) => (
    <div className="text-center py-8">
      <Package className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No parcels found</h3>
      <p className="mt-1 text-sm text-gray-500">{message}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Parcels</h1>
        <Button
          onClick={() => navigate('/customer/create-shipment')}
          className="bg-swiftship-600 hover:bg-swiftship-700"
        >
          <Package className="mr-2 h-4 w-4" />
          New Shipment
        </Button>
      </div>

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
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="mt-3 text-2xl font-bold">{activeParcels.length}</h3>
            <p className="text-sm text-gray-500">Active Shipments</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center pt-6">
            <div className="bg-green-50 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mt-3 text-2xl font-bold">{deliveredParcels.length}</h3>
            <p className="text-sm text-gray-500">Delivered</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-2 max-w-md mb-4">
        <Search className="h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search parcels by tracking ID, address or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Shipments</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Shipments</CardTitle>
              <CardDescription>Track your parcels that are currently in transit</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-swiftship-600" />
                </div>
              ) : activeParcels.length === 0 ? (
                renderEmpty(
                  searchQuery
                    ? 'No results match your search criteria.'
                    : 'All of your parcels have been delivered.'
                )
              ) : (
                renderParcelTable(activeParcels)
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivered">
          <Card>
            <CardHeader>
              <CardTitle>Delivered Parcels</CardTitle>
              <CardDescription>History of your completed deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-swiftship-600" />
                </div>
              ) : deliveredParcels.length === 0 ? (
                renderEmpty(
                  searchQuery
                    ? 'No results match your search criteria.'
                    : "You don't have any delivered parcels yet."
                )
              ) : (
                renderParcelTable(deliveredParcels, true)
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyParcels;
