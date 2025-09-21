import { useParams, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Download, 
  Share2, 
  Heart,
  Camera,
  Utensils,
  Bed,
  Car
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import GoogleMap from '@/components/GoogleMap';

const ItineraryView = () => {
  const { id } = useParams();
  const location = useLocation();
  const [isSaved, setIsSaved] = useState(false);
  
  // Mock itinerary data - in real app this would come from API
  const itinerary = {
    id,
    title: 'Golden Triangle Adventure',
    destination: 'Delhi → Agra → Jaipur',
    duration: '7 Days, 6 Nights',
    budget: '₹35,000',
    travelers: '2 People',
    interests: 'Heritage & Culture',
    days: [
      {
        day: 1,
        date: '2024-03-15',
        city: 'Delhi',
        title: 'Arrival & Delhi Exploration',
        activities: [
          {
            time: '10:00 AM',
            title: 'Red Fort Visit',
            type: 'sightseeing',
            duration: '2 hours',
            cost: '₹600',
            description: 'Explore the magnificent Mughal architecture'
          },
          {
            time: '1:00 PM',
            title: 'Lunch at Karim\'s',
            type: 'dining',
            duration: '1 hour', 
            cost: '₹800',
            description: 'Famous for authentic Mughlai cuisine'
          },
          {
            time: '3:00 PM',
            title: 'India Gate & Rajpath',
            type: 'sightseeing',
            duration: '1.5 hours',
            cost: 'Free',
            description: 'War memorial and ceremonial boulevard'
          },
          {
            time: '6:00 PM',
            title: 'Hotel Check-in',
            type: 'accommodation',
            duration: '30 mins',
            cost: '₹3,500',
            description: 'Rest and freshen up'
          }
        ]
      },
      {
        day: 2,
        date: '2024-03-16',
        city: 'Delhi to Agra',
        title: 'Journey to Agra',
        activities: [
          {
            time: '8:00 AM',
            title: 'Travel to Agra by Car',
            type: 'transport',
            duration: '3 hours',
            cost: '₹2,500',
            description: 'Scenic drive via Yamuna Expressway'
          },
          {
            time: '12:00 PM',
            title: 'Agra Fort',
            type: 'sightseeing',
            duration: '2 hours',
            cost: '₹650',
            description: 'UNESCO World Heritage Mughal fort'
          },
          {
            time: '3:00 PM',
            title: 'Taj Mahal Sunset Visit',
            type: 'sightseeing',
            duration: '2.5 hours',
            cost: '₹1,100',
            description: 'Marvel at the symbol of love during golden hour'
          },
          {
            time: '7:00 PM',
            title: 'Hotel Check-in Agra',
            type: 'accommodation',
            duration: '30 mins',
            cost: '₹4,000',
            description: 'Comfortable stay near Taj Mahal'
          }
        ]
      },
      {
        day: 3,
        date: '2024-03-17',
        city: 'Agra to Jaipur',
        title: 'The Pink City Awaits',
        activities: [
          {
            time: '9:00 AM',
            title: 'Travel to Jaipur',
            type: 'transport',
            duration: '4 hours',
            cost: '₹3,000',
            description: 'Journey through Rajasthan countryside'
          },
          {
            time: '2:00 PM',
            title: 'City Palace Complex',
            type: 'sightseeing',
            duration: '2 hours',
            cost: '₹700',
            description: 'Royal residence with museums and courtyards'
          },
          {
            time: '5:00 PM',
            title: 'Hawa Mahal Photo Stop',
            type: 'sightseeing',
            duration: '30 mins',
            cost: '₹200',
            description: 'Palace of Winds - iconic Jaipur landmark'
          },
          {
            time: '7:00 PM',
            title: 'Hotel Check-in Jaipur',
            type: 'accommodation',
            duration: '30 mins',
            cost: '₹4,500',
            description: 'Heritage hotel in the Pink City'
          }
        ]
      }
    ],
    totalCost: '₹34,850',
    highlights: [
      'UNESCO World Heritage Sites',
      'Authentic Mughlai Cuisine', 
      'Royal Palaces & Forts',
      'Cultural Experiences'
    ]
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'sightseeing': return Camera;
      case 'dining': return Utensils;
      case 'accommodation': return Bed;
      case 'transport': return Car;
      default: return MapPin;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'sightseeing': return 'text-primary';
      case 'dining': return 'text-secondary';
      case 'accommodation': return 'text-accent';
      case 'transport': return 'text-muted-foreground';
      default: return 'text-foreground';
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const handleDownload = () => {
    // Mock download functionality
    console.log('Download PDF');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{itinerary.title}</h1>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{itinerary.destination}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{itinerary.duration}</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleSave}>
                <Heart className={`h-4 w-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Trip Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Budget</p>
                  <p className="font-semibold">{itinerary.budget}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-sm text-muted-foreground">Travelers</p>
                  <p className="font-semibold">{itinerary.travelers}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">{itinerary.duration}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <Camera className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-semibold">{itinerary.interests}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Content */}
        <Tabs defaultValue="timeline" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="timeline">Day-by-Day</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-6">
            {itinerary.days.map((day) => (
              <Card key={day.day} className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        {day.day}
                      </div>
                      <span>{day.title}</span>
                    </CardTitle>
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary">{day.city}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(day.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {day.activities.map((activity, index) => {
                      const Icon = getActivityIcon(activity.type);
                      return (
                        <div key={index} className="flex space-x-4 p-4 rounded-lg bg-muted/50">
                          <div className="flex flex-col items-center">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-background border-2 border-current ${getActivityColor(activity.type)}`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            {index < day.activities.length - 1 && (
                              <div className="h-8 w-0.5 bg-border mt-2" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-medium text-foreground">{activity.title}</h4>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                  <div className="flex items-center space-x-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{activity.time}</span>
                                  </div>
                                  <span>•</span>
                                  <span>{activity.duration}</span>
                                  <span>•</span>
                                  <span className="font-medium text-primary">{activity.cost}</span>
                                </div>
                              </div>
                              <Badge variant="outline" className="capitalize">
                                {activity.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Trip Highlights</CardTitle>
                  <CardDescription>What makes this trip special</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {itinerary.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span className="text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cost Breakdown</CardTitle>
                  <CardDescription>Estimated expenses per person</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Accommodation</span>
                      <span className="text-sm font-medium">₹12,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Transportation</span>
                      <span className="text-sm font-medium">₹5,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Activities & Sightseeing</span>
                      <span className="text-sm font-medium">₹3,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Meals</span>
                      <span className="text-sm font-medium">₹4,000</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium">Total per person</span>
                      <span className="font-bold text-primary">{itinerary.totalCost}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="map">
            <Card>
              <CardHeader>
                <CardTitle>Route Map</CardTitle>
                <CardDescription>Visual representation of your journey</CardDescription>
              </CardHeader>
              <CardContent>
                <GoogleMap 
                  locations={[
                    { city: 'Delhi' },
                    { city: 'Agra' },
                    { city: 'Jaipur' }
                  ]}
                  className="aspect-video"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ItineraryView;