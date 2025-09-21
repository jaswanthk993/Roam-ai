import { useState } from 'react';
import { Calendar, MapPin, Users, DollarSign, Eye, Share2, Trash2, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { Link } from 'react-router-dom';

const MyTrips = () => {
  const [trips] = useState([
    {
      id: '1',
      title: 'Golden Triangle Adventure',
      destination: 'Delhi → Agra → Jaipur',
      startDate: '2024-03-15',
      endDate: '2024-03-22',
      budget: '₹35,000',
      travelers: '2 People',
      interests: 'Heritage & Culture',
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop',
      progress: 85
    },
    {
      id: '2', 
      title: 'Kerala Backwaters Retreat',
      destination: 'Kochi → Alleppey → Munnar',
      startDate: '2024-02-10',
      endDate: '2024-02-17',
      budget: '₹28,000',
      travelers: '4 People',
      interests: 'Nature & Wildlife',
      status: 'completed',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop',
      progress: 100
    },
    {
      id: '3',
      title: 'Rajasthan Royal Journey',
      destination: 'Udaipur → Jodhpur → Jaisalmer',
      startDate: '2024-01-05',
      endDate: '2024-01-12',
      budget: '₹42,000',
      travelers: '2 People', 
      interests: 'Heritage & Culture',
      status: 'completed',
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&h=300&fit=crop',
      progress: 100
    },
    {
      id: '4',
      title: 'Himachal Hill Station Tour',
      destination: 'Shimla → Manali → Dharamshala',
      startDate: '2024-04-20',
      endDate: '2024-04-28',
      budget: '₹38,000',
      travelers: '3 People',
      interests: 'Adventure & Nature',
      status: 'draft',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      progress: 45
    }
  ]);

  const handleShare = (tripId: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/itinerary/${tripId}`);
  };

  const handleDelete = (tripId: string) => {
    console.log('Delete trip:', tripId);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="travel-gradient text-white font-medium">Upcoming</Badge>;
      case 'completed':
        return <Badge className="nature-gradient text-white font-medium">Completed</Badge>;
      case 'draft':
        return <Badge variant="outline" className="font-medium">Draft</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return '🚀';
      case 'completed': return '✅';
      case 'draft': return '✏️';
      default: return '📋';
    }
  };

  const tripStats = {
    total: trips.length,
    completed: trips.filter(t => t.status === 'completed').length,
    upcoming: trips.filter(t => t.status === 'upcoming').length,
    draft: trips.filter(t => t.status === 'draft').length
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                My <span className="hero-text">Trips</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Manage your travel itineraries, track your adventures, and relive your favorite memories.
              </p>
            </div>
            <Button asChild variant="hero" size="lg" className="floating-button rounded-xl">
              <Link to="/">
                <Plus className="h-5 w-5" />
                Plan New Trip
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="premium-card rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold hero-text mb-2">{tripStats.total}</div>
              <div className="text-sm text-muted-foreground font-medium">Total Trips</div>
            </div>
            <div className="premium-card rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-accent mb-2">{tripStats.completed}</div>
              <div className="text-sm text-muted-foreground font-medium">Completed</div>
            </div>
            <div className="premium-card rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{tripStats.upcoming}</div>
              <div className="text-sm text-muted-foreground font-medium">Upcoming</div>
            </div>
            <div className="premium-card rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-secondary mb-2">{tripStats.draft}</div>
              <div className="text-sm text-muted-foreground font-medium">Drafts</div>
            </div>
          </div>
        </div>

        {trips.length === 0 ? (
          <Card className="premium-card text-center py-16 rounded-3xl border-0">
            <CardContent>
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl travel-gradient">
                <MapPin className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="mb-4 text-2xl">No trips yet</CardTitle>
              <CardDescription className="mb-8 text-lg max-w-md mx-auto">
                Start planning your first adventure with AI and create unforgettable memories
              </CardDescription>
              <Button asChild variant="hero" size="lg" className="floating-button rounded-xl">
                <Link to="/">
                  <Plus className="h-5 w-5" />
                  Plan Your First Trip
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => (
              <Card key={trip.id} className="premium-card overflow-hidden rounded-2xl group hover:scale-105 transition-[var(--transition-bounce)] border-0">
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    {getStatusBadge(trip.status)}
                  </div>
                  
                  {/* Status Emoji */}
                  <div className="absolute top-4 left-4 glass-card rounded-xl p-2">
                    <span className="text-xl">{getStatusIcon(trip.status)}</span>
                  </div>

                  {/* Progress Bar for Drafts */}
                  {trip.status === 'draft' && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="glass-card rounded-xl p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-foreground">Planning Progress</span>
                          <span className="text-xs font-bold text-foreground">{trip.progress}%</span>
                        </div>
                        <div className="w-full bg-background/30 rounded-full h-2">
                          <div 
                            className="travel-gradient h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${trip.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <CardHeader className="pb-4">
                  <CardTitle className="line-clamp-1 text-xl mb-2">{trip.title}</CardTitle>
                  <CardDescription className="flex items-center space-x-1 text-base">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{trip.destination}</span>
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(trip.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{trip.travelers}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span>{trip.budget}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                      </div>
                    </div>
                    
                    <Badge variant="outline" className="text-xs rounded-lg">
                      {trip.interests}
                    </Badge>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button asChild variant="default" size="sm" className="flex-1 rounded-xl">
                      <Link to={`/itinerary/${trip.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="rounded-xl"
                      onClick={() => handleShare(trip.id)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="rounded-xl"
                      onClick={() => handleDelete(trip.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTrips;