import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createParcel } from '../../utils/api';
import { useToast } from '../../hooks/use-toast';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { ArrowLeft } from 'lucide-react';

const CreateParcel: React.FC = () => {
  const [formData, setFormData] = useState({
    pickupAddress: '',
    deliveryAddress: '',
    recipientName: '',
    recipientPhone: '',
    weight: '',
    dimensions: '',
    description: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.pickupAddress) newErrors.pickupAddress = 'Pickup address is required';
    if (!formData.deliveryAddress) newErrors.deliveryAddress = 'Delivery address is required';
    if (!formData.recipientName) newErrors.recipientName = 'Recipient name is required';
    if (!formData.recipientPhone) newErrors.recipientPhone = 'Recipient phone is required';
    if (!formData.weight) newErrors.weight = 'Weight is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    try {
      await createParcel({
        pickupAddress: formData.pickupAddress,
        deliveryAddress: formData.deliveryAddress,
        weight: parseFloat(formData.weight),
        dimensions: formData.dimensions,
        description: formData.description,
      });
      
      toast({
        title: 'Success',
        description: 'Your shipment has been created',
      });
      
      navigate('/customer/dashboard');
    } catch (error) {
      console.error('Error creating parcel:', error);
      toast({
        title: 'Error',
        description: 'Failed to create shipment',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Create New Shipment</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Shipment Details</CardTitle>
          <CardDescription>
            Enter the information for your new shipment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="pickupAddress" className="text-sm font-medium">
                  Pickup Address
                </label>
                <Input
                  id="pickupAddress"
                  name="pickupAddress"
                  placeholder="123 Main St, City, State ZIP"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  className={errors.pickupAddress ? 'border-red-500' : ''}
                />
                {errors.pickupAddress && (
                  <span className="text-xs text-red-500">{errors.pickupAddress}</span>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="deliveryAddress" className="text-sm font-medium">
                  Delivery Address
                </label>
                <Input
                  id="deliveryAddress"
                  name="deliveryAddress"
                  placeholder="456 Oak St, City, State ZIP"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  className={errors.deliveryAddress ? 'border-red-500' : ''}
                />
                {errors.deliveryAddress && (
                  <span className="text-xs text-red-500">{errors.deliveryAddress}</span>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="recipientName" className="text-sm font-medium">
                  Recipient Name
                </label>
                <Input
                  id="recipientName"
                  name="recipientName"
                  placeholder="John Doe"
                  value={formData.recipientName}
                  onChange={handleChange}
                  className={errors.recipientName ? 'border-red-500' : ''}
                />
                {errors.recipientName && (
                  <span className="text-xs text-red-500">{errors.recipientName}</span>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="recipientPhone" className="text-sm font-medium">
                  Recipient Phone
                </label>
                <Input
                  id="recipientPhone"
                  name="recipientPhone"
                  placeholder="(123) 456-7890"
                  value={formData.recipientPhone}
                  onChange={handleChange}
                  className={errors.recipientPhone ? 'border-red-500' : ''}
                />
                {errors.recipientPhone && (
                  <span className="text-xs text-red-500">{errors.recipientPhone}</span>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="weight" className="text-sm font-medium">
                  Weight (kg)
                </label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  step="0.01"
                  placeholder="1.5"
                  value={formData.weight}
                  onChange={handleChange}
                  className={errors.weight ? 'border-red-500' : ''}
                />
                {errors.weight && (
                  <span className="text-xs text-red-500">{errors.weight}</span>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="dimensions" className="text-sm font-medium">
                  Dimensions (LxWxH cm)
                </label>
                <Input
                  id="dimensions"
                  name="dimensions"
                  placeholder="30x20x15"
                  value={formData.dimensions}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Package contents and special handling instructions"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/customer/dashboard')}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-swiftship-600 hover:bg-swiftship-700"
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Shipment'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateParcel;
