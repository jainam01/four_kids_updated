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
import { useCart } from "@/context/CartContext";
import { useWatchlist } from "@/context/WatchlistContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [location] = useLocation();
  const [, navigate] = useLocation();
  const { cartItems } = useCart();
  const { watchlistItems } = useWatchlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const topLinks = [
    { name: "Support", path: "/support", icon: HelpCircle },
    { name: "Wholesale", path: "/wholesale", icon: Building2 },
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
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Check if the current location is '/login' or '/admin'
  const hideMainNav = location === "/login" || location === "/admin";

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
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px]">
                <form onSubmit={handleSearch} className="mb-4">
                  <div className="relative">
                    <Input
                      type="search"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      variant="ghost"
                      className="absolute right-0 top-0 h-full"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
                <nav className="space-y-2">
                  {mainNavLinks.map(({ name, path }) => (
                    <Link
                      key={path}
                      href={path}
                      className="block px-2 py-2 text-sm rounded hover:bg-gray-100"
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
                      className="flex items-center px-2 py-2 text-sm hover:bg-gray-100"
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
          <Link href="/" className="mx-auto md:mx-0">
            <img
              src="/logo/fourkids-logo.svg"
              alt="FourKids"
              className="h-10 md:h-12"
            />
          </Link>

          {/* Right Icons */}
          <div className="flex gap-3 items-center">
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 pr-10 text-xs"
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 h-full"
              >
                <Search className="w-4 h-4" />
              </Button>
            </form>

            {/* User, Watchlist, Cart Icons */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/login")}
            >
              <User className="w-5 h-5" />
            </Button>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/watchlist")}
              >
                <Heart className="w-5 h-5" />
              </Button>
              {watchlistItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs h-4 w-4 rounded-full flex items-center justify-center">
                  {watchlistItems.length}
                </span>
              )}
            </div>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/cart")}
              >
                <ShoppingBag className="w-5 h-5" />
              </Button>
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-green-600 text-white text-xs h-4 w-4 rounded-full flex items-center justify-center">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - Only visible if not on /login or /admin */}
      {!hideMainNav && (
        <div className="bg-black hidden md:block">
          <div className="container mx-auto px-4">
            <nav className="flex justify-center space-x-4 text-white text-sm font-medium font-poppins">
              {mainNavLinks.map((link) => (
                <div key={link.name} className="relative group">
                  <Link
                    href={link.path}
                    className="px-4 py-3 inline-block relative text-white transition duration-300 hover:text-yellow-400 after:content-[''] after:absolute after:left-1/2 after:bottom-1 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-2/3"
                  >
                    {link.name}
                  </Link>

                  {link.subMenus && (
                    <div className="absolute left-0 top-full mt-0.5 w-48 bg-white text-black rounded-md shadow-md opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transform transition-all duration-200 origin-top z-50">
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
