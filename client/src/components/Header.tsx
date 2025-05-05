import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Search, Heart, ShoppingBag, Menu, User, Globe 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useWatchlist } from '@/context/WatchlistContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';

const Header = () => {
  const [, navigate] = useLocation();
  const { cartItems } = useCart();
  const { watchlistItems } = useWatchlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const topLinks = [
    { name: 'Support', path: '/support' },
    { name: 'Wholesale', path: '/category/wholesale' },
    { name: 'About Us', path: '/about' },
  ];

  const mainNavLinks = [
    { name: 'FEATURED', path: '/' },
    { name: 'PANTS', path: '/category/pants' },
    { name: 'CARGO', path: '/category/cargo' },
    { name: 'CAPRIS', path: '/category/capris' },
    { name: 'SHORTS', path: '/category/shorts' },
    { name: 'MOM FIT', path: '/category/mom-fit' },
    { name: 'ACCESSORIES', path: '/category/accessories' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-sm">
            {/* Language Selector - Left Side */}
            <div className="flex items-center">
              <div className="flex items-center mr-2">
                <Globe className="h-4 w-4 mr-1" />
                <span>INR</span>
              </div>
            </div>

            {/* Top Links - Center */}
            <div className="hidden md:flex space-x-6">
              {topLinks.map((link) => (
                <Link 
                  key={link.path} 
                  href={link.path} 
                  className="text-gray-600 hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="mt-8">
                  {/* Search in Mobile Menu */}
                  <form onSubmit={handleSearch} className="mb-6">
                    <div className="relative">
                      <Input
                        type="search"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pr-10"
                      />
                      <Button 
                        type="submit"
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-0 top-0 h-full"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                  
                  <nav className="flex flex-col space-y-1">
                    {mainNavLinks.map((link) => (
                      <Link 
                        key={link.path} 
                        href={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="py-2 px-4 hover:bg-gray-100 rounded-md"
                      >
                        {link.name}
                      </Link>
                    ))}
                    <div className="h-px bg-gray-200 my-2"></div>
                    {topLinks.map((link) => (
                      <Link 
                        key={link.path} 
                        href={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="py-2 px-4 hover:bg-gray-100 rounded-md"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="py-3 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo - Centered on the page */}
            <div className="flex-1 flex justify-start md:justify-end">
              <div className="md:w-60"></div> {/* Spacer for centering */}
            </div>
            
            <Link href="/" className="flex items-center justify-center">
              <img src="/logo/fourkids-logo.svg" alt="FourKids" className="h-12" />
            </Link>
            
            {/* Search and icons - Right side */}
            <div className="flex-1 flex items-center justify-end">
              <div className="relative hidden md:block mr-4">
                <form onSubmit={handleSearch} className="flex items-center">
                  <Input
                    type="search"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-60 h-9 pr-10 rounded-full bg-gray-50"
                  />
                  <Button 
                    type="submit"
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-0 top-0 h-full rounded-full"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
              </div>

              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigate('/admin')}
                  className="hover:bg-transparent"
                >
                  <User className="h-5 w-5" />
                  <span className="sr-only">Sign In</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigate('/watchlist')}
                  className="hover:bg-transparent relative"
                >
                  <Heart className="h-5 w-5" />
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
                  className="hover:bg-transparent relative"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                  <span className="sr-only">Cart</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-black text-white">
        <div className="container mx-auto px-4">
          <nav className="hidden md:flex justify-center">
            {mainNavLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path} 
                className="text-white hover:text-primary font-medium px-6 py-3 text-sm"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
