import { useState } from 'react';
import { Search, Star, MapPin, Camera, Mountain, Waves, Building, TreePine, Filter, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';

const Destinations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const destinations = [
    {
      id: 1,
      name: 'Jaipur',
      state: 'Rajasthan',
      description: 'The Pink City with magnificent palaces, vibrant markets, and royal heritage that tells stories of India\'s glorious past.',
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&h=400&fit=crop',
      rating: 4.8,
      reviews: 2340,
      highlights: ['Amber Fort', 'City Palace', 'Hawa Mahal'],
      category: 'heritage',
      bestTime: 'Oct - Mar',
      icon: Building,
      priceRange: '₹15K-30K'
    },
    {
      id: 2,
      name: 'Kerala Backwaters',
      state: 'Kerala',
      description: 'Serene waterways through lush tropical landscapes, offering a unique houseboat experience in God\'s Own Country.',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&h=400&fit=crop',
      rating: 4.9,
      reviews: 1890,
      highlights: ['Houseboat Cruises', 'Alleppey', 'Kumarakom'],
      category: 'nature',
      bestTime: 'Nov - Feb',
      icon: Waves,
      priceRange: '₹20K-35K'
    },
    {
      id: 3,
      name: 'Manali',
      state: 'Himachal Pradesh', 
      description: 'Mountain paradise perfect for adventure seekers and nature lovers, nestled in the heart of the Himalayas.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      rating: 4.7,
      reviews: 3120,
      highlights: ['Rohtang Pass', 'Solang Valley', 'Old Manali'],
      category: 'adventure',
      bestTime: 'May - Jun, Sep - Nov',
      icon: Mountain,
      priceRange: '₹18K-40K'
    },
    {
      id: 4,
      name: 'Goa Beaches',
      state: 'Goa',
      description: 'Golden beaches, vibrant nightlife, Portuguese heritage, and a perfect blend of relaxation and excitement.',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop',
      rating: 4.6,
      reviews: 4560,
      highlights: ['Baga Beach', 'Fort Aguada', 'Dudhsagar Falls'],
      category: 'beach',
      bestTime: 'Nov - Mar',
      icon: Waves,
      priceRange: '₹12K-25K'
    },
    {
      id: 5,
      name: 'Agra',
      state: 'Uttar Pradesh',
      description: 'Home to the magnificent Taj Mahal and stunning Mughal architecture that showcases India\'s rich cultural heritage.',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=400&fit=crop',
      rating: 4.8,
      reviews: 5240,
      highlights: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri'],
      category: 'heritage',
      bestTime: 'Oct - Mar',
      icon: Building,
      priceRange: '₹10K-20K'
    },
    {
      id: 6,
      name: 'Darjeeling',
      state: 'West Bengal',
      description: 'Tea gardens, mountain railways, and breathtaking Himalayan views create an unforgettable hill station experience.',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop',
      rating: 4.5,
      reviews: 1670,
      highlights: ['Tiger Hill', 'Tea Gardens', 'Toy Train'],
      category: 'nature',
      bestTime: 'Mar - May, Sep - Nov',
      icon: TreePine,
      priceRange: '₹15K-28K'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Destinations', icon: MapPin, count: destinations.length },
    { id: 'heritage', name: 'Heritage', icon: Building, count: destinations.filter(d => d.category === 'heritage').length },
    { id: 'nature', name: 'Nature', icon: TreePine, count: destinations.filter(d => d.category === 'nature').length },
    { id: 'adventure', name: 'Adventure', icon: Mountain, count: destinations.filter(d => d.category === 'adventure').length },
    { id: 'beach', name: 'Beach', icon: Waves, count: destinations.filter(d => d.category === 'beach').length }
  ];

  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         destination.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || destination.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Explore <span className="hero-text">Destinations</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Discover incredible places across India for your next adventure. From ancient heritage sites 
            to pristine natural wonders, find your perfect destination.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search destinations..."
              className="pl-12 h-12 text-base rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="lg"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center space-x-2 rounded-xl transition-[var(--transition-smooth)] h-12"
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.name}</span>
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {category.count}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredDestinations.map((destination) => {
            const Icon = destination.icon;
            return (
              <Card key={destination.id} className="premium-card overflow-hidden rounded-2xl group hover:scale-105 transition-[var(--transition-bounce)] border-0">
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Rating */}
                  <div className="absolute top-4 right-4 glass-card rounded-xl px-3 py-2 flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-foreground">{destination.rating}</span>
                    <span className="text-xs text-muted-foreground">({destination.reviews})</span>
                  </div>
                  
                  {/* Category Icon */}
                  <div className="absolute bottom-4 left-4 glass-card rounded-xl p-3">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  
                  {/* Price Range */}
                  <div className="absolute bottom-4 right-4 glass-card rounded-xl px-3 py-2">
                    <span className="text-sm font-semibold text-foreground">{destination.priceRange}</span>
                  </div>
                </div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">{destination.name}</CardTitle>
                      <div className="flex items-center space-x-2 mb-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{destination.state}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-xl">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {destination.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3">Top Highlights</h4>
                      <div className="flex flex-wrap gap-2">
                        {destination.highlights.map((highlight, index) => (
                          <Badge key={index} variant="secondary" className="text-xs rounded-lg">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Camera className="h-4 w-4" />
                        <span>Best: {destination.bestTime}</span>
                      </div>
                    </div>
                    
                    <Button variant="default" className="w-full h-11 rounded-xl font-semibold">
                      Plan Trip Here
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-16">
            <div className="premium-card rounded-3xl p-12 max-w-md mx-auto">
              <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4">No destinations found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or category filters to discover amazing places.
              </p>
              <Button variant="outline" onClick={() => {setSearchQuery(''); setSelectedCategory('all');}}>
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;