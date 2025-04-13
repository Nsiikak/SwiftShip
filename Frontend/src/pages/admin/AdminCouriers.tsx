/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { getAllUsers, toggleUserStatus } from '../../utils/api';
import { Search, UserCheck, UserX, Truck, MapPin } from 'lucide-react';

interface Courier {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  deliveriesCount: number;
  currentLocation: string;
  rating: number;
}

const AdminCouriers: React.FC = () => {
  const [couriers, setCouriers] = useState<Courier[]>([]);
  const [filteredCouriers, setFilteredCouriers] = useState<Courier[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCouriers = async () => {
      try {
        await getAllUsers();
        
        // For demo purposes, create mock data
        const mockCouriers: Courier[] = [
          { id: '1', name: 'Alex Johnson', email: 'alex@example.com', status: 'active', deliveriesCount: 156, currentLocation: 'Downtown', rating: 4.8 },
          { id: '2', name: 'Sam Williams', email: 'sam@example.com', status: 'active', deliveriesCount: 89, currentLocation: 'Westside', rating: 4.5 },
          { id: '3', name: 'Jordan Smith', email: 'jordan@example.com', status: 'inactive', deliveriesCount: 42, currentLocation: 'N/A', rating: 3.9 },
          { id: '4', name: 'Casey Miller', email: 'casey@example.com', status: 'active', deliveriesCount: 201, currentLocation: 'Northside', rating: 4.9 },
          { id: '5', name: 'Taylor Brown', email: 'taylor@example.com', status: 'active', deliveriesCount: 118, currentLocation: 'Eastside', rating: 4.7 },
          { id: '6', name: 'Morgan Wilson', email: 'morgan@example.com', status: 'inactive', deliveriesCount: 73, currentLocation: 'N/A', rating: 4.2 },
        ];
        
        setCouriers(mockCouriers);
        setFilteredCouriers(mockCouriers);
      } catch (error) {
        console.error('Error fetching couriers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCouriers();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = couriers.filter(
        courier => 
          courier.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          courier.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCouriers(filtered);
    } else {
      setFilteredCouriers(couriers);
    }
  }, [searchTerm, couriers]);

  const handleToggleStatus = async (courierId: string) => {
    try {
      await toggleUserStatus(courierId);
      
      // Update local state
      setCouriers(prevCouriers => 
        prevCouriers.map(courier => 
          courier.id === courierId 
            ? { ...courier, status: courier.status === 'active' ? 'inactive' : 'active' }
            : courier
        )
      );
    } catch (error) {
      console.error('Error toggling courier status:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-swiftship-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Couriers Management</h1>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search couriers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full sm:w-[300px]"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Couriers</CardTitle>
          <CardDescription>Manage courier accounts and monitor performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deliveries</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCouriers.length > 0 ? (
                  filteredCouriers.map((courier) => (
                    <TableRow key={courier.id}>
                      <TableCell className="font-medium">{courier.name}</TableCell>
                      <TableCell>{courier.email}</TableCell>
                      <TableCell>
                        <Badge variant={courier.status === 'active' ? 'success' : 'destructive'}>
                          {courier.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>{courier.deliveriesCount}</TableCell>
                      <TableCell>
                        {courier.currentLocation !== 'N/A' ? (
                          <div className="flex items-center">
                            <MapPin className="h-3.5 w-3.5 mr-1 text-gray-500" />
                            {courier.currentLocation}
                          </div>
                        ) : (
                          courier.currentLocation
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className={`${courier.rating >= 4.5 ? 'text-green-600' : courier.rating >= 4.0 ? 'text-amber-600' : 'text-red-600'} font-medium`}>
                            {courier.rating.toFixed(1)}
                          </span>
                          <span className="text-gray-400 ml-1">/5.0</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(courier.id)}
                        >
                          {courier.status === 'active' ? (
                            <UserX className="h-4 w-4" />
                          ) : (
                            <UserCheck className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No couriers found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCouriers;
