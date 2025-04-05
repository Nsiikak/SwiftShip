import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/use-toast';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../components/ui/card';
import { Package } from 'lucide-react';
import { handleApiResponse } from '../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const { toast } = useToast();

  // Define valid test credentials
  const credentials = {
    'admin@swiftship.com': { id: '1', name: 'Admin User', role: 'admin' },
    'courier@swiftship.com': { id: '2', name: 'Courier User', role: 'courier' },
    'customer@swiftship.com': { id: '3', name: 'Customer User', role: 'customer' }
  } as const;

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';

    if (!password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    try {
      // Check if email matches one of the mock users
      if (!(email in credentials) || password !== 'password') {
        throw new Error('Invalid email or password');
      }

      // Optionally simulate real API call
      // const response = await login({ email, password });
      // const data = await handleApiResponse(response);

      // Skip API for mock login
      const data = { token: 'demo-token' };

      const user = credentials[email as keyof typeof credentials];

      authLogin(data.token, {
        email,
        ...user,
        role: user.role // explicitly add the role
      });

      navigate(`/${user.role}/dashboard`);

      toast({
        title: 'Success',
        description: 'You have been logged in'
      });
    } catch (error) {
      console.error('Login error', error);
      toast({
        title: 'Error',
        description: 'Invalid email or password',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md px-4">
        <Card className="w-full">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <div className="flex items-center justify-center mb-2">
              <Package className="h-10 w-10 text-swiftship-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Swift<span className="text-delivery-600">Ship</span>
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <span className="text-xs text-red-500">{errors.email}</span>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-xs text-swiftship-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? 'border-red-500' : ''}
                />
                {errors.password && (
                  <span className="text-xs text-red-500">{errors.password}</span>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-swiftship-600 hover:bg-swiftship-700"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <span className="text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-swiftship-600 hover:underline">
                Sign up
              </Link>
            </span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;