import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Search, Heart, ShoppingBag, Menu, User, HelpCircle, Building2, Users
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
    { name: 'Support', path: '/support', icon: HelpCircle },
    { name: 'Wholesale', path: '/category/wholesale', icon: Building2 },
    { name: 'About Us', path: '/about', icon: Users },
  ];

  const mainNavLinks = [
    { 
      name: 'FEATURED', 
      path: '/',
      subMenus: [
        { name: 'New Arrivals', path: '/category/new-arrivals' },
        { name: 'Best Sellers', path: '/category/best-sellers' },
        { name: 'Sale Items', path: '/category/sale' }
      ]
    },
    { 
      name: 'PANTS', 
      path: '/category/pants',
      subMenus: [
        { name: 'Regular Fit', path: '/category/pants/regular-fit' },
        { name: 'Slim Fit', path: '/category/pants/slim-fit' },
        { name: 'Wide Leg', path: '/category/pants/wide-leg' }
      ]
    },
    { 
      name: 'CARGO', 
      path: '/category/cargo',
      subMenus: [
        { name: 'Utility Cargo', path: '/category/cargo/utility' },
        { name: 'Fashion Cargo', path: '/category/cargo/fashion' }
      ]
    },
    { 
      name: 'CAPRIS', 
      path: '/category/capris',
      subMenus: [
        { name: 'Three Quarter', path: '/category/capris/three-quarter' },
        { name: 'Pedal Pushers', path: '/category/capris/pedal-pushers' }
      ]
    },
    { 
      name: 'SHORTS', 
      path: '/category/shorts',
      subMenus: [
        { name: 'Bermuda', path: '/category/shorts/bermuda' },
        { name: 'Denim Shorts', path: '/category/shorts/denim' },
        { name: 'Sport Shorts', path: '/category/shorts/sport' }
      ]
    },
    { 
      name: 'MOM FIT', 
      path: '/category/mom-fit',
      subMenus: [
        { name: 'Mom Jeans', path: '/category/mom-fit/jeans' },
        { name: 'Mom Pants', path: '/category/mom-fit/pants' }
      ]
    },
    { 
      name: 'ACCESSORIES', 
      path: '/category/accessories',
      subMenus: [
        { name: 'Belts', path: '/category/accessories/belts' },
        { name: 'Hats', path: '/category/accessories/hats' },
        { name: 'Bags', path: '/category/accessories/bags' }
      ]
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white header-shadow">
      {/* Main Header - Single Row with Left (support links), Middle (logo), Right (search & icons) */}
      <div className="py-4 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Left side: Support, Wholesale, About Us */}
            <div className="hidden md:flex items-center gap-4">
              {topLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link 
                    key={link.path} 
                    href={link.path} 
                    className="flex items-center text-gray-600 text-xs font-poppins top-nav-link"
                  >
                    <Icon className="h-3.5 w-3.5 mr-1.5" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
            
            {/* Mobile Menu Button (only visible on mobile) */}
            <div className="md:hidden">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
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
                          className="py-2 px-4 hover:bg-gray-100 rounded-md font-poppins text-xs"
                        >
                          {link.name}
                        </Link>
                      ))}
                      <div className="h-px bg-gray-200 my-2"></div>
                      {topLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <Link 
                            key={link.path} 
                            href={link.path}
                            onClick={() => setIsMenuOpen(false)}
                            className="py-2 px-4 hover:bg-gray-100 rounded-md flex items-center font-poppins text-xs"
                          >
                            <Icon className="h-4 w-4 mr-2" />
                            {link.name}
                          </Link>
                        );
                      })}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
            {/* Middle: FourKids logo */}
            <Link href="/" className="flex items-center justify-center mx-auto">
              <img src="/logo/fourkids-logo.svg" alt="FourKids" className="h-10 md:h-12" />
            </Link>
            
            {/* Right side: Search, Login, Watchlist, Basket */}
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <form onSubmit={handleSearch} className="flex items-center">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48 h-9 pr-10 rounded-md search-input font-poppins text-xs"
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

              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigate('/admin')}
                  className="hover:bg-transparent hover:text-inherit font-poppins p-1"
                >
                  <User className="h-5 w-5" />
                  <span className="sr-only">Sign In</span>
                </Button>
              </div>
              
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigate('/watchlist')}
                  className="hover:bg-transparent hover:text-inherit relative font-poppins p-1"
                >
                  <Heart className="h-5 w-5" />
                  {watchlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {watchlistItems.length}
                    </span>
                  )}
                  <span className="sr-only">Wishlist</span>
                </Button>
              </div>

              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigate('/cart')}
                  className="hover:bg-transparent hover:text-inherit relative font-poppins p-1"
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

      {/* Navigation Menu with Dropdowns */}
      <div className="bg-black text-white">
        <div className="container mx-auto px-4">
          <nav className="hidden md:flex justify-center">
            {mainNavLinks.map((link) => (
              <div key={link.path} className="relative group">
                <Link 
                  href={link.path} 
                  className="text-white font-medium px-5 py-2.5 text-xs tracking-wide font-poppins uppercase main-nav-link inline-block relative"
                >
                  {link.name}
                  {/* Underline hover effect */}
                  <span className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-1/2"></span>
                </Link>
                
                {/* Dropdown Menu */}
                {link.subMenus && link.subMenus.length > 0 && (
                  <div className="absolute left-0 mt-0 w-48 bg-white shadow-lg rounded-sm z-50 transform scale-0 group-hover:scale-100 transition-transform duration-150 origin-top text-black">
                    <div className="py-2">
                      {link.subMenus.map((subMenu) => (
                        <Link
                          key={subMenu.path}
                          href={subMenu.path}
                          className="block px-4 py-2 text-xs hover:bg-gray-100 font-poppins"
                        >
                          {subMenu.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
