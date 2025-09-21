import { Link } from "react-router-dom";
import { Home, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl travel-gradient shadow-[var(--shadow-premium)] mb-6">
            <span className="text-4xl font-bold text-white">404</span>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Looks like you've wandered off the beaten path! The page you're looking for 
            doesn't exist, but your next adventure is just a click away.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="lg" className="floating-button rounded-2xl">
              <Link to="/">
                <Home className="h-5 w-5" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-2xl">
              <Link to="/destinations">
                <Sparkles className="h-5 w-5" />
                Explore Destinations
              </Link>
            </Button>
          </div>
          
          <div className="pt-8">
            <p className="text-sm text-muted-foreground">
              Need help? Our AI assistant is always ready to help you plan your perfect trip.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-2 h-2 rounded-full bg-primary/20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-3 h-3 rounded-full bg-secondary/20 animate-pulse delay-75"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full bg-accent/20 animate-pulse delay-150"></div>
      </div>
    </div>
  );
};

export default NotFound;
