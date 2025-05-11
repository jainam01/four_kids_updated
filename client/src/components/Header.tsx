// Header.tsx
import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  User,
  HelpCircle,
  Building2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext"; // Assuming you have these contexts
import { useWatchlist } from "@/context/WatchlistContext"; // Assuming you have these contexts
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [currentLocation] = useLocation(); // Renamed to avoid conflict
  const [, navigate] = useLocation();
  const { cartItems } = useCart();
  const { watchlistItems } = useWatchlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const topLinks = [
    { name: "Support", path: "/support", icon: HelpCircle },
    { name: "Wholesale", path: "/Wholesale", icon: Building2 },
    { name: "About Us", path: "/about", icon: Users },
  ];

  const mainNavLinks = [
    {
      name: "FEATURED",
      path: "/",
      subMenus: [
        { name: "New Arrivals", path: "/category/new-arrivals" },
        { name: "Best Sellers", path: "/category/best-sellers" },
        { name: "Sale Items", path: "/category/sale" },
      ],
    },
    {
      name: "PANTS",
      path: "/category/pants",
      subMenus: [
        { name: "Regular Fit", path: "/category/pants/regular-fit" },
        { name: "Slim Fit", path: "/category/pants/slim-fit" },
        { name: "Wide Leg", path: "/category/pants/wide-leg" },
      ],
    },
    // ... (keep your other mainNavLinks)
    {
      name: "CARGO",
      path: "/category/cargo",
      subMenus: [
        { name: "Utility Cargo", path: "/category/cargo/utility" },
        { name: "Fashion Cargo", path: "/category/cargo/fashion" },
      ],
    },
    {
      name: "CAPRIS",
      path: "/category/capris",
      subMenus: [
        { name: "Three Quarter", path: "/category/capris/three-quarter" },
        { name: "Pedal Pushers", path: "/category/capris/pedal-pushers" },
      ],
    },
    {
      name: "SHORTS",
      path: "/category/shorts",
      subMenus: [
        { name: "Bermuda", path: "/category/shorts/bermuda" },
        { name: "Denim Shorts", path: "/category/shorts/denim" },
        { name: "Sport Shorts", path: "/category/shorts/sport" },
      ],
    },
    {
      name: "MOM FIT",
      path: "/category/mom-fit",
      subMenus: [
        { name: "Mom Jeans", path: "/category/mom-fit/jeans" },
        { name: "Mom Pants", path: "/category/mom-fit/pants" },
      ],
    },
    {
      name: "ACCESSORIES",
      path: "/category/accessories",
      subMenus: [
        { name: "Belts", path: "/category/accessories/belts" },
        { name: "Hats", path: "/category/accessories/hats" },
        { name: "Bags", path: "/category/accessories/bags" },
      ],
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      setSearchQuery(""); // Optionally clear search input after submission
      if (isMenuOpen) {
        setIsMenuOpen(false); // Close mobile menu if open
      }
    }
  };

  const hideMainNav =
    currentLocation === "/login" || currentLocation === "/admin";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Header */}
      <div className="py-3 border-b border-gray-200">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Top Links */}
          <div className="hidden md:flex gap-4 text-xs text-gray-600 font-poppins">
            {topLinks.map(({ name, path, icon: Icon }) => (
              <Link
                key={path}
                href={path}
                className="flex items-center hover:text-black transition"
              >
                <Icon className="w-3.5 h-3.5 mr-1.5" />
                {name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-4">
                <form onSubmit={handleSearch} className="mb-4">
                  <div className="relative">
                    <Input
                      type="search"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10 h-10"
                      aria-label="Search products"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      variant="ghost"
                      className="absolute right-0 top-0 h-full px-3"
                      aria-label="Submit search"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
                <nav className="space-y-1">
                  {mainNavLinks.map(({ name, path }) => (
                    <Link
                      key={path}
                      href={path}
                      className="block px-3 py-2 text-sm rounded hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {name}
                    </Link>
                  ))}
                  <div className="border-t my-2"></div>
                  {topLinks.map(({ name, path, icon: Icon }) => (
                    <Link
                      key={path}
                      href={path}
                      className="flex items-center px-3 py-2 text-sm hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="mx-auto md:mx-0"
            aria-label="Go to homepage"
          >
            <img
              src="/logo/fourkids-logo.svg" // Ensure this path is correct
              alt="FourKids"
              className="h-10 md:h-12"
            />
          </Link>

          {/* Right Icons */}
          <div className="flex gap-2 sm:gap-3 items-center">
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 sm:w-48 pr-10 text-xs h-9" // Adjusted size
                aria-label="Search products on desktop"
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 h-full px-3"
                aria-label="Submit search on desktop"
              >
                <Search className="w-4 h-4" />
              </Button>
            </form>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/login")}
              aria-label="Login or view account"
            >
              <User className="w-5 h-5" />
            </Button>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/watchlist")}
                aria-label="View watchlist"
              >
                <Heart className="w-5 h-5" />
              </Button>
              {watchlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] h-4 w-4 rounded-full flex items-center justify-center pointer-events-none">
                  {watchlistItems.length}
                </span>
              )}
            </div>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/cart")}
                aria-label="View shopping cart"
              >
                <ShoppingBag className="w-5 h-5" />
              </Button>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] h-4 w-4 rounded-full flex items-center justify-center pointer-events-none">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      {!hideMainNav && (
        <div className="bg-black hidden md:block">
          <div className="container mx-auto px-4">
            <nav className="flex justify-center">
              {mainNavLinks.map((link) => (
                <div key={link.name} className="relative group">
                  <Link
                    href={link.path}
                    className="inline-block px-3 py-3 text-white text-sm font-medium font-poppins hover:text-yellow-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                  {link.subMenus && link.subMenus.length > 0 && (
                    <div className="absolute left-0 top-full mt-0 w-56 bg-white text-black rounded-b-md shadow-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transform transition-all duration-200 ease-in-out origin-top z-50 pointer-events-none group-hover:pointer-events-auto">
                      <div className="py-2">
                        {link.subMenus.map((sub) => (
                          <Link
                            key={sub.path}
                            href={sub.path}
                            className="block px-4 py-2 hover:bg-gray-100 text-sm"
                          >
                            {sub.name}
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
      )}
    </header>
  );
};

export default Header;
