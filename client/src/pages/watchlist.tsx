import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { Heart, ShoppingBag, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWatchlist } from "@/context/WatchlistContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Grid, List } from "lucide-react";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { BadgeColored } from "@/components/ui/badge-colored";

const Watchlist = () => {
  const [, navigate] = useLocation();
  const { watchlistItems, removeFromWatchlist, clearWatchlist } = useWatchlist();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const handleRemoveFromWatchlist = async (productId: number) => {
    try {
      await removeFromWatchlist(productId);
      toast({
        description: "Item removed from watchlist",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item from watchlist",
        variant: "destructive",
      });
    }
  };
  
  const handleClearWatchlist = async () => {
    try {
      await clearWatchlist();
      toast({
        description: "Watchlist has been cleared",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear watchlist",
        variant: "destructive",
      });
    }
  };
  
  const handleAddToCart = async (productId: number) => {
    try {
      const product = watchlistItems.find(item => item.product.id === productId)?.product;
      if (!product) return;
      
      await addToCart({
        productId: product.id,
        quantity: 1,
        size: product.sizes[0],
        color: product.colors[0]
      });
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product to cart",
        variant: "destructive",
      });
    }
  };
  
  if (watchlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 pb-16 md:pb-8">
        <Helmet>
          <title>Your Watchlist - FourKids</title>
        </Helmet>
        
        <div className="max-w-2xl mx-auto text-center py-16">
          <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">Your watchlist is empty</h1>
          <p className="text-muted-foreground mb-8">
            Save items that you like by clicking the heart icon on products.
          </p>
          <Button 
            onClick={() => navigate("/")}
            className="bg-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-opacity-90 transition"
          >
            Browse Products
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 pb-16 md:pb-8">
      <Helmet>
        <title>Your Watchlist - FourKids</title>
      </Helmet>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Watchlist</h1>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500 hidden sm:inline">View:</span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "text-primary" : ""}
            >
              <List className="h-5 w-5" />
              <span className="sr-only">List view</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "text-primary" : ""}
            >
              <Grid className="h-5 w-5" />
              <span className="sr-only">Grid view</span>
            </Button>
          </div>
          
          {watchlistItems.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleClearWatchlist}
            >
              Clear All
            </Button>
          )}
        </div>
      </div>
      
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {watchlistItems.map((item) => (
            <ProductCard 
              key={item.id} 
              product={item.product} 
              viewMode="grid" 
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {watchlistItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition group"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-1/3">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name} 
                    className="w-full h-48 sm:h-full object-cover cursor-pointer"
                    onClick={() => navigate(`/product/${item.product.slug}`)}
                  />
                  {item.product.isNew && (
                    <div className="absolute top-0 left-0 m-2">
                      <BadgeColored variant="success">NEW</BadgeColored>
                    </div>
                  )}
                  {item.product.isOnSale && (
                    <div className="absolute top-0 left-0 m-2">
                      <BadgeColored variant="error">SALE</BadgeColored>
                    </div>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 
                        className="font-bold text-lg mb-1 cursor-pointer hover:text-primary"
                        onClick={() => navigate(`/product/${item.product.slug}`)}
                      >
                        {item.product.name}
                      </h3>
                      <div className="flex items-center mt-1 mb-2">
                        <div className="flex space-x-1">
                          <span className="text-accent">
                            {'★'.repeat(Math.floor(item.product.rating))}
                          </span>
                          <span className="text-gray-300">
                            {'★'.repeat(5 - Math.floor(item.product.rating))}
                          </span>
                          <span className="text-xs text-gray-500">({item.product.reviewCount})</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {item.product.salePrice ? (
                        <div>
                          <span className="text-primary font-bold text-lg">${item.product.salePrice.toFixed(2)}</span>
                          <span className="text-gray-400 line-through text-sm ml-2">${item.product.price.toFixed(2)}</span>
                        </div>
                      ) : (
                        <span className="text-primary font-bold text-lg">${item.product.price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mt-2 mb-4 line-clamp-2">
                    {item.product.description || `${item.product.name} - quality children's clothing for all occasions.`}
                  </p>
                  
                  <div className="mt-2 flex space-x-1">
                    {item.product.ageGroups.map(ageGroup => (
                      <span key={ageGroup} className="inline-block bg-muted rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
                        {ageGroup}
                      </span>
                    ))}
                    <span className="inline-block bg-muted rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
                      {item.product.colors.length} {item.product.colors.length === 1 ? 'color' : 'colors'}
                    </span>
                  </div>
                  
                  <div className="mt-auto pt-4 flex space-x-2">
                    <Button 
                      className="bg-primary text-white font-bold rounded-lg hover:bg-opacity-90 transition flex-1"
                      onClick={() => handleAddToCart(item.product.id)}
                    >
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline"
                      className="rounded-lg font-bold"
                      onClick={() => handleRemoveFromWatchlist(item.product.id)}
                    >
                      <Heart className="mr-2 h-5 w-5 fill-current" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-8 flex justify-center">
        <Button
          variant="outline"
          onClick={() => navigate("/")}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default Watchlist;
