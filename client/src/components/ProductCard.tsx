import { useState } from "react";
import { useLocation } from "wouter";
import { Product } from "@shared/schema";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import { useWatchlist } from "@/context/WatchlistContext";
import { apiRequest } from "@/lib/queryClient";
import { BadgeColored } from "@/components/ui/badge-colored";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

const ProductCard = ({ product, viewMode = "grid" }: ProductCardProps) => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { addToWatchlist, isInWatchlist, removeFromWatchlist } = useWatchlist();
  const [isHovering, setIsHovering] = useState(false);
  
  const inWatchlist = isInWatchlist(product.id);

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
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

  const handleToggleWatchlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (inWatchlist) {
        await removeFromWatchlist(product.id);
        toast({
          title: "Removed from watchlist",
          description: `${product.name} has been removed from your watchlist.`,
        });
      } else {
        await addToWatchlist(product.id);
        toast({
          title: "Added to watchlist",
          description: `${product.name} has been added to your watchlist.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update watchlist",
        variant: "destructive",
      });
    }
  };

  const handleNavigateToProduct = () => {
    navigate(`/product/${product.slug}`);
  };

  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex space-x-1">
        <span className="text-accent">{'★'.repeat(fullStars)}</span>
        {hasHalfStar && <span className="text-accent">½</span>}
        <span className="text-gray-300">{'★'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0))}</span>
        <span className="text-xs text-gray-500">({product.reviewCount})</span>
      </div>
    );
  };

  if (viewMode === "list") {
    return (
      <div 
        className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition group cursor-pointer"
        onClick={handleNavigateToProduct}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-1/3">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-48 sm:h-full object-cover"
            />
            <div className="absolute top-0 right-0 p-2">
              <Button 
                variant="secondary"
                size="icon"
                className="rounded-full shadow-sm hover:scale-110 transition"
                onClick={handleToggleWatchlist}
              >
                <Heart className={`h-5 w-5 ${inWatchlist ? 'fill-primary text-primary' : ''}`} />
                <span className="sr-only">Add to wishlist</span>
              </Button>
            </div>
            {product.isNew && (
              <div className="absolute top-0 left-0 m-2">
                <BadgeColored variant="success">NEW</BadgeColored>
              </div>
            )}
            {product.isOnSale && (
              <div className="absolute top-0 left-0 m-2">
                <BadgeColored variant="error">SALE</BadgeColored>
              </div>
            )}
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                <div className="flex items-center mt-1 mb-2">
                  {renderRatingStars(product.rating)}
                </div>
              </div>
              <div className="text-right">
                {product.salePrice ? (
                  <div>
                    <span className="text-primary font-bold text-lg">${product.salePrice.toFixed(2)}</span>
                    <span className="text-gray-400 line-through text-sm ml-2">${product.price.toFixed(2)}</span>
                  </div>
                ) : (
                  <span className="text-primary font-bold text-lg">${product.price.toFixed(2)}</span>
                )}
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mt-2 mb-4 line-clamp-2">
              {product.description || `${product.name} for children - quality clothing for all occasions.`}
            </p>
            
            <div className="mt-2 flex space-x-1">
              {product.ageGroups.map(ageGroup => (
                <span key={ageGroup} className="inline-block bg-muted rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
                  {ageGroup}
                </span>
              ))}
              <span className="inline-block bg-muted rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
                {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
              </span>
            </div>
            
            <div className="mt-auto pt-4 flex space-x-2">
              <Button 
                className="bg-primary text-white font-bold rounded-lg hover:bg-opacity-90 transition flex-1"
                onClick={handleQuickAdd}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button 
                variant="outline"
                className="rounded-lg font-bold"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/product/${product.slug}`);
                }}
              >
                <Eye className="mr-2 h-5 w-5" />
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition group cursor-pointer"
      onClick={handleNavigateToProduct}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-0 right-0 p-2">
          <Button 
            variant="secondary"
            size="icon"
            className="rounded-full shadow-sm hover:scale-110 transition"
            onClick={handleToggleWatchlist}
          >
            <Heart className={`h-5 w-5 ${inWatchlist ? 'fill-primary text-primary' : ''}`} />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </div>
        
        {product.isNew && (
          <div className="absolute top-0 left-0 m-2">
            <BadgeColored variant="success">NEW</BadgeColored>
          </div>
        )}
        
        {product.isOnSale && (
          <div className="absolute top-0 left-0 m-2">
            <BadgeColored variant="error">SALE</BadgeColored>
          </div>
        )}
        
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 transition-opacity duration-200 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex justify-between">
            <Button 
              className="bg-primary text-white py-2 px-4 rounded-lg font-bold hover:bg-opacity-90 transition"
              onClick={handleQuickAdd}
            >
              Quick Add
            </Button>
            <Button 
              className="bg-white text-primary py-2 px-4 rounded-lg font-bold hover:bg-muted transition"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/product/${product.slug}`);
              }}
            >
              View
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{product.name}</h3>
        <div className="flex justify-between items-center">
          {product.salePrice ? (
            <div>
              <span className="text-primary font-bold">${product.salePrice.toFixed(2)}</span>
              <span className="text-gray-400 line-through text-sm ml-2">${product.price.toFixed(2)}</span>
            </div>
          ) : (
            <span className="text-primary font-bold">${product.price.toFixed(2)}</span>
          )}
          {renderRatingStars(product.rating)}
        </div>
        
        <div className="mt-2 flex flex-wrap gap-1">
          {product.ageGroups.map(ageGroup => (
            <span key={ageGroup} className="inline-block bg-muted rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
              {ageGroup}
            </span>
          ))}
          <span className="inline-block bg-muted rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
            {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
