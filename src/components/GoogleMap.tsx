import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MapPin, Save } from 'lucide-react';

/// <reference types="google.maps" />

interface GoogleMapProps {
  locations: Array<{
    city: string;
    lat?: number;
    lng?: number;
  }>;
  className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ locations, className = '' }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [apiKey, setApiKey] = useState<string>(() => 
    localStorage.getItem('google-maps-api-key') || ''
  );
  const [inputKey, setInputKey] = useState<string>(apiKey);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Default coordinates for Indian cities
  const defaultCoordinates: Record<string, { lat: number; lng: number }> = {
    'delhi': { lat: 28.6139, lng: 77.2090 },
    'agra': { lat: 27.1767, lng: 78.0081 },
    'jaipur': { lat: 26.9124, lng: 75.7873 },
    'mumbai': { lat: 19.0760, lng: 72.8777 },
    'kolkata': { lat: 22.5726, lng: 88.3639 },
    'chennai': { lat: 13.0827, lng: 80.2707 },
    'bangalore': { lat: 12.9716, lng: 77.5946 },
    'hyderabad': { lat: 17.3850, lng: 78.4867 },
    'goa': { lat: 15.2993, lng: 74.1240 },
    'udaipur': { lat: 24.5854, lng: 73.7125 }
  };

  const getCoordinates = (city: string) => {
    const normalizedCity = city.toLowerCase().split(' ')[0];
    return defaultCoordinates[normalizedCity] || { lat: 28.6139, lng: 77.2090 };
  };

  const saveApiKey = () => {
    if (inputKey.trim()) {
      localStorage.setItem('google-maps-api-key', inputKey.trim());
      setApiKey(inputKey.trim());
      setError('');
    }
  };

  useEffect(() => {
    if (!apiKey || !mapRef.current) return;

    const loader = new Loader({
      apiKey: apiKey,
      version: 'weekly',
      libraries: ['places', 'geometry']
    });

    loader.load().then(() => {
      if (!mapRef.current) return;

      const mapOptions: google.maps.MapOptions = {
        zoom: 6,
        center: getCoordinates(locations[0]?.city || 'Delhi'),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry.fill',
            stylers: [{ color: '#fefefe' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{ color: '#e6f3ff' }]
          }
        ]
      };

      const newMap = new google.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);
      setIsLoaded(true);

      // Add markers and route
      const markers: google.maps.Marker[] = [];
      const coordinates = locations.map((location, index) => {
        const coords = location.lat && location.lng 
          ? { lat: location.lat, lng: location.lng }
          : getCoordinates(location.city);

        const marker = new google.maps.Marker({
          position: coords,
          map: newMap,
          title: location.city,
          label: (index + 1).toString(),
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: 'hsl(var(--primary))',
            fillOpacity: 1,
            strokeColor: 'white',
            strokeWeight: 2
          }
        });

        markers.push(marker);
        return coords;
      });

      // Draw route if multiple locations
      if (coordinates.length > 1) {
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: 'hsl(var(--primary))',
            strokeWeight: 3,
            strokeOpacity: 0.8
          }
        });

        directionsRenderer.setMap(newMap);

        const waypoints = coordinates.slice(1, -1).map(coord => ({
          location: coord,
          stopover: true
        }));

        directionsService.route({
          origin: coordinates[0],
          destination: coordinates[coordinates.length - 1],
          waypoints: waypoints,
          travelMode: google.maps.TravelMode.DRIVING
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            directionsRenderer.setDirections(result);
          }
        });
      }

      // Fit bounds to show all markers
      if (coordinates.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        coordinates.forEach(coord => bounds.extend(coord));
        newMap.fitBounds(bounds);
      }

    }).catch((error) => {
      console.error('Error loading Google Maps:', error);
      setError('Failed to load Google Maps. Please check your API key.');
    });

  }, [apiKey, locations]);

  if (!apiKey) {
    return (
      <div className="space-y-4 p-6 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <MapPin className="h-5 w-5" />
          <h3 className="font-medium">Configure Google Maps</h3>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Enter your Google Maps API key to display the interactive route map.
          Get your API key from the{' '}
          <a 
            href="https://console.cloud.google.com/google/maps-apis" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Google Cloud Console
          </a>.
        </p>

        <div className="space-y-2">
          <Label htmlFor="api-key">Google Maps API Key</Label>
          <div className="flex space-x-2">
            <Input
              id="api-key"
              type="password"
              placeholder="Enter your Google Maps API key"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="flex-1"
            />
            <Button onClick={saveApiKey} size="sm">
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mapRef} className="w-full h-full min-h-[400px] rounded-lg" />
      {error && (
        <div className="absolute top-2 left-2 bg-destructive/90 text-destructive-foreground px-3 py-1 rounded text-sm">
          {error}
        </div>
      )}
      {!isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-lg">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;