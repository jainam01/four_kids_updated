import { Link, useLocation } from "wouter";
import { Home, Search, Heart, ShoppingBag, User, List } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWatchlist } from "@/context/WatchlistContext";

const MobileNavigation = () => {
  const [location] = useLocation();
  const { cartItems } = useCart();
  const { watchlistItems } = useWatchlist();
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="flex justify-around">
        <Link href="/" className="flex flex-col items-center py-2 px-4">
          <Home className={`h-5 w-5 ${location === '/' ? 'text-primary' : 'text-gray-600'}`} />
          <span className="text-xs mt-1 font-medium">Home</span>
        </Link>
        
        <Link href="/category/pants" className="flex flex-col items-center py-2 px-4">
          <List className={`h-5 w-5 ${location.includes('/category') ? 'text-primary' : 'text-gray-600'}`} />
          <span className="text-xs mt-1 font-medium">Categories</span>
        </Link>
        
        <Link href="/search" className="flex flex-col items-center py-2 px-4">
          <Search className={`h-5 w-5 ${location === '/search' ? 'text-primary' : 'text-gray-600'}`} />
          <span className="text-xs mt-1 font-medium">Search</span>
        </Link>
        
        <Link href="/watchlist" className="flex flex-col items-center py-2 px-4 relative">
          <Heart className={`h-5 w-5 ${location === '/watchlist' ? 'text-primary' : 'text-gray-600'}`} />
          {watchlistItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {watchlistItems.length}
            </span>
          )}
          <span className="text-xs mt-1 font-medium">Wishlist</span>
        </Link>
        
        <Link href="/cart" className="flex flex-col items-center py-2 px-4 relative">
          <ShoppingBag className={`h-5 w-5 ${location === '/cart' ? 'text-primary' : 'text-gray-600'}`} />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
          <span className="text-xs mt-1 font-medium">Cart</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNavigation;
