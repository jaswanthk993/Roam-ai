import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, DollarSign, Users, Sparkles, ArrowRight, Star, Zap, Globe, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/Navbar';
import heroImage from '@/assets/hero-travel.jpg';

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    travelers: '',
    interests: '',
    additionalRequests: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate a mock itinerary ID and navigate
    const itineraryId = Math.random().toString(36).substring(7);
    navigate(`/itinerary/${itineraryId}`, { state: { formData } });
  };

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Planning',
      description: 'Advanced machine learning creates personalized itineraries that perfectly match your travel style and preferences.',
      gradient: 'travel-gradient'
    },
    {
      icon: Globe,
      title: 'Local Expertise',
      description: 'Discover hidden gems and authentic experiences curated by local experts and verified by our AI.',
      gradient: 'nature-gradient'
    },
    {
      icon: Zap,
      title: 'Instant Optimization',
      description: 'Real-time adjustments for weather, crowds, and availability ensure your trip stays perfect.',
      gradient: 'sunset-gradient'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Travelers' },
    { number: '200+', label: 'Destinations' },
    { number: '4.9', label: 'Average Rating' },
    { number: '24/7', label: 'AI Support' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-secondary/90 to-accent/85" />
        <img
          src={heroImage}
          alt="Beautiful travel destinations across India"
          className="h-[700px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mx-auto max-w-5xl px-4 text-center text-white">
            <div className="mb-6 inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <Star className="h-4 w-4 mr-2 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">Trusted by 50,000+ travelers</span>
            </div>
            <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
              Your Perfect Trip,{' '}
              <span className="hero-text block">
                Powered by AI
              </span>
            </h1>
            <p className="mb-8 text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Experience the future of travel planning with intelligent recommendations, 
              real-time optimization, and personalized itineraries crafted just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="lg"
                className="floating-button text-lg px-8 py-4 h-auto"
                onClick={() => document.getElementById('trip-planner')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Planning Your Adventure <ArrowRight className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 text-lg px-8 py-4 h-auto"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background relative -mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="premium-card p-6 rounded-2xl">
                  <div className="text-3xl font-bold hero-text mb-2">{stat.number}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Why Choose <span className="hero-text">RoamAI</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience the next generation of travel planning with cutting-edge AI technology 
              that understands your unique preferences and creates unforgettable journeys.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="premium-card border-0 rounded-2xl group hover:scale-105 transition-[var(--transition-bounce)]">
                  <CardHeader className="text-center pb-4">
                    <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${feature.gradient} shadow-[var(--shadow-travel)]`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trip Planner Form */}
      <section id="trip-planner" className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Plan Your Next <span className="hero-text">Adventure</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tell us your travel dreams and let our AI create a personalized itinerary 
              that's perfectly tailored to your preferences.
            </p>
          </div>
          
          <Card className="premium-card shadow-[var(--shadow-premium)] rounded-3xl border-0">
            <CardHeader className="pb-8">
              <CardTitle className="flex items-center justify-center space-x-3 text-2xl">
                <div className="travel-gradient p-2 rounded-xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span>Create Your Perfect Trip</span>
              </CardTitle>
              <CardDescription className="text-center text-lg mt-4">
                Share your travel preferences and watch the magic happen
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="origin" className="text-base font-medium">From</Label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="origin"
                        placeholder="Your current city"
                        className="pl-12 h-12 text-base rounded-xl"
                        value={formData.origin}
                        onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="destination" className="text-base font-medium">To</Label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="destination"
                        placeholder="Dream destination"
                        className="pl-12 h-12 text-base rounded-xl"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="startDate" className="text-base font-medium">Start Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="startDate"
                        type="date"
                        className="pl-12 h-12 text-base rounded-xl"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="endDate" className="text-base font-medium">End Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="endDate"
                        type="date"
                        className="pl-12 h-12 text-base rounded-xl"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="budget" className="text-base font-medium">Budget (INR)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="budget"
                        placeholder="e.g., 25,000"
                        className="pl-12 h-12 text-base rounded-xl"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="travelers" className="text-base font-medium">Number of Travelers</Label>
                    <div className="relative">
                      <Users className="absolute left-4 top-4 h-5 w-5 text-muted-foreground z-10" />
                      <Select 
                        value={formData.travelers}
                        onValueChange={(value) => setFormData({ ...formData, travelers: value })}
                      >
                        <SelectTrigger className="pl-12 h-12 text-base rounded-xl">
                          <SelectValue placeholder="Select travelers" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Person</SelectItem>
                          <SelectItem value="2">2 People</SelectItem>
                          <SelectItem value="3-4">3-4 People</SelectItem>
                          <SelectItem value="5+">5+ People</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="interests" className="text-base font-medium">Travel Interests</Label>
                  <Select
                    value={formData.interests}
                    onValueChange={(value) => setFormData({ ...formData, interests: value })}
                  >
                    <SelectTrigger className="h-12 text-base rounded-xl">
                      <SelectValue placeholder="What interests you most?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="heritage">🏛️ Heritage & Culture</SelectItem>
                      <SelectItem value="adventure">🏔️ Adventure & Sports</SelectItem>
                      <SelectItem value="nightlife">🌃 Nightlife & Entertainment</SelectItem>
                      <SelectItem value="nature">🌿 Nature & Wildlife</SelectItem>
                      <SelectItem value="food">🍜 Food & Cuisine</SelectItem>
                      <SelectItem value="mixed">✨ Mixed Experience</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="additionalRequests" className="text-base font-medium">Additional Requests (Optional)</Label>
                  <Textarea
                    id="additionalRequests"
                    placeholder="Any specific requirements, accessibility needs, or special preferences?"
                    className="min-h-24 text-base rounded-xl resize-none"
                    value={formData.additionalRequests}
                    onChange={(e) => setFormData({ ...formData, additionalRequests: e.target.value })}
                  />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full h-14 text-lg rounded-xl floating-button">
                  <Sparkles className="h-5 w-5" />
                  Generate My AI Itinerary
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;