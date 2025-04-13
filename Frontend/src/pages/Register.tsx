import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/use-toast';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Package } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { handleApiResponse } from '../utils/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      // Call the register API
      const response = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: formData.role as 'customer' | 'courier' | 'admin',
      });

      // Handle the API response
      const data = await handleApiResponse(response);

      // Log the response for debugging
      console.log('API Response:', data);

      // Log in the user after successful registration
      login(data.token, {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
      });

      // Display success toast
      toast({
        title: 'Success',
        description: 'Your account has been created successfully!',
      });

      // Redirect the user based on their role
      switch (data.user.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'courier':
          navigate('/courier/dashboard');
          break;
        default:
          navigate('/customer/dashboard');
      }
    } catch (error) {
      console.error('Registration error:', error);

      // Display error toast
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create account',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md px-4 py-8">
        <Card className="w-full">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <div className="flex items-center justify-center mb-2">
              <Package className="h-10 w-10 text-swiftship-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Swift<span className="text-delivery-600">Ship</span>
            </CardTitle>
            <CardDescription className="text-center">
              Create an account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <span className="text-xs text-red-500">{errors.name}</span>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <span className="text-xs text-red-500">{errors.email}</span>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'border-red-500' : ''}
                />
                {errors.password && (
                  <span className="text-xs text-red-500">{errors.password}</span>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'border-red-500' : ''}
                />
                {errors.confirmPassword && (
                  <span className="text-xs text-red-500">{errors.confirmPassword}</span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Account Type</label>
                <RadioGroup 
                  defaultValue={formData.role} 
                  className="flex space-x-4 mt-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem 
                      id="customer" 
                      value="customer" 
                      name="role"
                      checked={formData.role === "customer"}
                      onChange={handleChange}
                    />
                    <Label htmlFor="customer">Customer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem 
                      id="courier" 
                      value="courier"
                      name="role" 
                      checked={formData.role === "courier"}
                      onChange={handleChange}
                    />
                    <Label htmlFor="courier">Courier</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full bg-swiftship-600 hover:bg-swiftship-700" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <span className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-swiftship-600 hover:underline">
                Sign in
              </Link>
            </span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
