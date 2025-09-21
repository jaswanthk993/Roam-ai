import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Plane, MapPin, Heart, Home, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'My Trips', href: '/my-trips', icon: Heart },
    { name: 'Destinations', href: '/destinations', icon: MapPin },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass-card backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl travel-gradient shadow-[var(--shadow-travel)] group-hover:shadow-[var(--shadow-glow)] transition-[var(--transition-smooth)]">
            <Plane className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold hero-text">
              RoamAI
            </span>
            <span className="text-xs text-muted-foreground font-medium -mt-1">
              Powered by AI
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center space-x-2 rounded-2xl px-6 py-3 text-sm font-medium transition-[var(--transition-smooth)] relative overflow-hidden',
                  isActive
                    ? 'travel-gradient text-white shadow-[var(--shadow-travel)]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
                {isActive && (
                  <div className="absolute inset-0 bg-white/10 rounded-2xl" />
                )}
              </Link>
            );
          })}
          
          <Button variant="hero" size="lg" className="ml-4 rounded-2xl floating-button">
            <Sparkles className="h-4 w-4" />
            Plan Trip
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className="rounded-2xl"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border/40">
          <div className="space-y-2 px-4 pb-6 pt-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center space-x-3 rounded-2xl px-4 py-3 text-base font-medium transition-[var(--transition-smooth)]',
                    isActive
                      ? 'travel-gradient text-white shadow-[var(--shadow-travel)]'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="pt-4">
              <Button variant="hero" className="w-full rounded-2xl floating-button">
                <Sparkles className="h-4 w-4" />
                Plan Trip
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;