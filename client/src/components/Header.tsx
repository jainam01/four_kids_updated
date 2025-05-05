import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Search, Heart, ShoppingBag, Menu, 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useWatchlist } from '@/context/WatchlistContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const [, navigate] = useLocation();
  const { cartItems } = useCart();
  const { watchlistItems } = useWatchlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationLinks = [
    { name: 'Home', path: '/' },
    { name: 'New Arrivals', path: '/category/new-arrivals' },
    { name: 'Collections', path: '/collections' },
    { name: 'Sale', path: '/category/sale' },
    { name: 'Support', path: '/support' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Mobile menu button */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navigationLinks.map((link) => (
                  <Link 
                    key={link.path} 
                    href={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xl font-semibold py-2 hover:text-primary"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link 
                  href="/admin" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xl font-semibold py-2 text-muted-foreground hover:text-primary mt-6"
                >
                  Admin Login
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Brand Logo */}
          <div className="flex items-center justify-center flex-grow lg:flex-grow-0">
            <Link href="/" className="flex items-center">
              <span className="text-3xl font-bold text-primary">Four<span className="text-secondary">Kids</span></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path} 
                className="text-foreground hover:text-primary font-semibold"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search, Cart, Favorites */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/search')}
              className="rounded-full hover:bg-muted"
            >
              <Search className="h-6 w-6" />
              <span className="sr-only">Search</span>
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/watchlist')}
              className="rounded-full hover:bg-muted relative"
            >
              <Heart className="h-6 w-6" />
              {watchlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {watchlistItems.length}
                </span>
              )}
              <span className="sr-only">Favorites</span>
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/cart')}
              className="rounded-full hover:bg-muted relative"
            >
              <ShoppingBag className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
            
            <Button 
              onClick={() => navigate('/admin')}
              className="hidden md:block ml-4 bg-primary text-white font-bold rounded-xl hover:bg-opacity-90 transition"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
