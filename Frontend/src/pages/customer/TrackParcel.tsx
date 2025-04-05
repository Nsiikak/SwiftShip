import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { trackParcel } from '../../utils/api';
import { useToast } from '../../hooks/use-toast';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Package, CheckCircle, Truck } from 'lucide-react';
import ParcelStatusBadge from '../../components/shared/ParcelStatusBadge';

interface TrackingEvent {
  id: string;
  status: string;
  location: string;
  timestamp: string;
  description: string;
}

interface TrackingResult {
  trackingId: string;
  status: string;
  events: TrackingEvent[];
  estimatedDelivery: string;
  originAddress: string;
  destinationAddress: string;
}

const TrackParcel: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [trackingId, setTrackingId] = useState(searchParams.get('id') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingId.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a tracking number',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await trackParcel(trackingId);
      // For demo purposes, we'll create mock data
      const mockResult = {
        trackingId: trackingId,
        status: 'in_transit',
        estimatedDelivery: '2023-04-05T15:00:00Z',
        originAddress: '123 Main St, New York, NY',
        destinationAddress: '456 Elm St, Boston, MA',
        events: [
          {
            id: '1',
            status: 'pending',
            location: 'New York, NY',
            timestamp: '2023-04-01T10:00:00Z',
            description: 'Shipment created',
          },
          {
            id: '2',
            status: 'picked_up',
            location: 'New York, NY',
            timestamp: '2023-04-02T11:30:00Z',
            description: 'Picked up by courier',
          },
          {
            id: '3',
            status: 'in_transit',
            location: 'Hartford, CT',
            timestamp: '2023-04-03T09:15:00Z',
            description: 'In transit to destination',
          },
        ],
      };
      
      setTrackingResult(mockResult);
      setSearchParams({ id: trackingId });
    } catch (error) {
      console.error('Error tracking parcel:', error);
      toast({
        title: 'Error',
        description: 'Invalid tracking number or shipment not found',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
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
      <h1 className="text-2xl font-bold">Track Shipment</h1>

      <Card>
        <CardHeader>
          <CardDescription>
            Enter your tracking number to see the current status of your shipment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-grow">
              <Input
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter tracking number (e.g., SW-123456)"
                className="w-full"
              />
            </div>
            <Button 
              type="submit" 
              className="bg-swiftship-600 hover:bg-swiftship-700"
              disabled={isLoading}
            >
              {isLoading ? 'Tracking...' : 'Track Parcel'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {trackingResult && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Tracking #{trackingResult.trackingId}</CardTitle>
                  <CardDescription>Estimated delivery: {formatDate(trackingResult.estimatedDelivery)}</CardDescription>
                </div>
                <ParcelStatusBadge status={trackingResult.status} className="text-sm" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-500">From</h3>
                  <p className="mt-1">{trackingResult.originAddress}</p>
                </div>
                <div className="hidden md:flex items-center justify-center">
                  <div className="w-24 h-px bg-gray-300 relative">
                    <Truck className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-swiftship-500 h-5 w-5" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-500">To</h3>
                  <p className="mt-1">{trackingResult.destinationAddress}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tracking History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trackingResult.events.map((event, index) => (
                  <div 
                    key={event.id} 
                    className={`relative pl-8 ${
                      index !== trackingResult.events.length - 1 ? 'pb-6' : ''
                    }`}
                  >
                    {/* Timeline connector */}
                    {index !== trackingResult.events.length - 1 && (
                      <div className="absolute left-3 top-2 bottom-0 w-px bg-gray-200"></div>
                    )}
                    
                    {/* Status icon */}
                    <div className="absolute left-0 top-0">
                      {event.status === 'delivered' ? (
                        <CheckCircle className="h-6 w-6 text-delivery-500" />
                      ) : (
                        <div className={`h-6 w-6 rounded-full border-2 ${
                          event.status === 'in_transit' ? 'border-swiftship-500 bg-swiftship-50' : 'border-gray-300 bg-white'
                        } flex items-center justify-center`}>
                          <Package className="h-3 w-3 text-gray-500" />
                        </div>
                      )}
                    </div>
                    
                    {/* Event details */}
                    <div>
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <h4 className="font-medium">
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1).replace('_', ' ')}
                        </h4>
                        <span className="text-gray-500 text-sm">
                          {formatDate(event.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {event.description} at {event.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TrackParcel;
