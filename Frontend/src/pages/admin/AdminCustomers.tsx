import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { getAllUsers, toggleUserStatus } from '../../utils/api';
import { Search, UserCheck, UserX, User } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  parcelsCount: number;
  joinedDate: string;
}

const AdminCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        await getAllUsers();
        
        // For demo purposes, create mock data
        const mockCustomers: Customer[] = [
          { id: '1', name: 'John Doe', email: 'john@example.com', status: 'active', parcelsCount: 12, joinedDate: '2024-01-15' },
          { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'active', parcelsCount: 8, joinedDate: '2024-02-23' },
          { id: '3', name: 'Michael Johnson', email: 'michael@example.com', status: 'inactive', parcelsCount: 3, joinedDate: '2024-03-10' },
          { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', status: 'active', parcelsCount: 15, joinedDate: '2023-11-05' },
          { id: '5', name: 'Robert Brown', email: 'robert@example.com', status: 'active', parcelsCount: 6, joinedDate: '2024-01-30' },
          { id: '6', name: 'Emily Davis', email: 'emily@example.com', status: 'inactive', parcelsCount: 2, joinedDate: '2024-02-14' },
          { id: '7', name: 'Daniel Wilson', email: 'daniel@example.com', status: 'active', parcelsCount: 9, joinedDate: '2023-12-19' },
          { id: '8', name: 'Olivia Miller', email: 'olivia@example.com', status: 'active', parcelsCount: 11, joinedDate: '2024-03-02' },
        ];
        
        setCustomers(mockCustomers);
        setFilteredCustomers(mockCustomers);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = customers.filter(
        customer => 
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers(customers);
    }
  }, [searchTerm, customers]);

  const handleToggleStatus = async (customerId: string) => {
    try {
      await toggleUserStatus(customerId);
      
      // Update local state
      setCustomers(prevCustomers => 
        prevCustomers.map(customer => 
          customer.id === customerId 
            ? { ...customer, status: customer.status === 'active' ? 'inactive' : 'active' }
            : customer
        )
      );
    } catch (error) {
      console.error('Error toggling customer status:', error);
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
        <h1 className="text-2xl font-bold">Customers Management</h1>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full sm:w-[300px]"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>Manage and monitor customer accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Parcels</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>
                        <Badge variant={customer.status === 'active' ? 'success' : 'destructive'}>
                          {customer.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>{customer.parcelsCount}</TableCell>
                      <TableCell>{new Date(customer.joinedDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(customer.id)}
                        >
                          {customer.status === 'active' ? (
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
                    <TableCell colSpan={6} className="text-center py-8">
                      No customers found matching your search.
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

export default AdminCustomers;