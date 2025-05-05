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
        className="product-card font-poppins cursor-pointer"
        onClick={handleNavigateToProduct}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-1/3 product-image-container">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="product-image w-full h-48 sm:h-full object-cover"
            />
            <div className="absolute top-3 right-3 z-10">
              <Button 
                variant="secondary"
                size="icon"
                className="rounded-full bg-white shadow hover:scale-110 transition"
                onClick={handleToggleWatchlist}
              >
                <Heart className={`h-4 w-4 ${inWatchlist ? 'fill-primary text-primary' : 'text-gray-500'}`} />
                <span className="sr-only">Add to wishlist</span>
              </Button>
            </div>
            {product.isNew && (
              <div className="product-badge bg-success text-white">
                NEW
              </div>
            )}
            {product.isOnSale && !product.isNew && (
              <div className="product-badge bg-primary text-white">
                SALE
              </div>
            )}
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="product-title text-base mb-1">{product.name}</h3>
                <div className="flex space-x-1 text-xs my-1">
                  <span className="text-primary">{'★'.repeat(Math.floor(product.rating || 0))}</span>
                  <span className="text-gray-300">{'★'.repeat(5 - Math.floor(product.rating || 0))}</span>
                  <span className="text-gray-500">({product.reviewCount || 0})</span>
                </div>
              </div>
              <div className="text-right">
                {product.salePrice ? (
                  <div>
                    <span className="product-price">${product.salePrice.toFixed(2)}</span>
                    <span className="product-old-price">${product.price.toFixed(2)}</span>
                  </div>
                ) : (
                  <span className="product-price">${product.price.toFixed(2)}</span>
                )}
              </div>
            </div>
            
            <p className="text-gray-600 text-xs mt-2 mb-3 line-clamp-2 font-poppins">
              {product.description || `${product.name} for children - quality clothing for all occasions.`}
            </p>
            
            <div className="mt-2 flex flex-wrap gap-1">
              {product.ageGroups.map(ageGroup => (
                <span key={ageGroup} className="inline-block bg-gray-100 rounded-full px-2 py-0.5 text-xs text-gray-600">
                  {ageGroup}
                </span>
              ))}
              <span className="inline-block bg-gray-100 rounded-full px-2 py-0.5 text-xs text-gray-600">
                {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
              </span>
            </div>
            
            <div className="mt-auto pt-3 flex gap-2">
              <Button 
                className="btn-primary py-2 px-3 text-xs flex-1"
                onClick={handleQuickAdd}
              >
                <ShoppingCart className="mr-1 h-3.5 w-3.5" />
                Add to Cart
              </Button>
              <Button 
                variant="outline"
                className="py-2 px-3 text-xs rounded-md font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/product/${product.slug}`);
                }}
              >
                <Eye className="mr-1 h-3.5 w-3.5" />
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
      className="product-card font-poppins cursor-pointer"
      onClick={handleNavigateToProduct}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="product-image-container">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="product-image h-64 object-cover"
        />
        <div className="absolute top-3 right-3 z-10">
          <Button 
            variant="secondary"
            size="icon"
            className="rounded-full bg-white shadow hover:scale-110 transition"
            onClick={handleToggleWatchlist}
          >
            <Heart className={`h-4 w-4 ${inWatchlist ? 'fill-primary text-primary' : 'text-gray-500'}`} />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </div>
        
        {product.isNew && (
          <div className="product-badge bg-success text-white">
            NEW
          </div>
        )}
        
        {product.isOnSale && !product.isNew && (
          <div className="product-badge bg-primary text-white">
            SALE
          </div>
        )}
        
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex justify-between gap-2">
            <Button 
              className="btn-primary flex-1 py-2 px-3 text-xs"
              onClick={handleQuickAdd}
            >
              <ShoppingCart className="mr-1 h-3.5 w-3.5" />
              Quick Add
            </Button>
            <Button 
              className="bg-white text-gray-700 py-2 px-3 rounded-md text-xs font-medium hover:bg-gray-100 transition flex-1"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/product/${product.slug}`);
              }}
            >
              <Eye className="mr-1 h-3.5 w-3.5" />
              View
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="product-title font-poppins truncate">{product.name}</h3>
        <div className="flex justify-between items-center">
          {product.salePrice ? (
            <div>
              <span className="product-price">${product.salePrice.toFixed(2)}</span>
              <span className="product-old-price">${product.price.toFixed(2)}</span>
            </div>
          ) : (
            <span className="product-price">${product.price.toFixed(2)}</span>
          )}
          <div className="flex space-x-1 text-xs">
            <span className="text-primary">{'★'.repeat(Math.floor(product.rating || 0))}</span>
            <span className="text-gray-300">{'★'.repeat(5 - Math.floor(product.rating || 0))}</span>
          </div>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {product.ageGroups.slice(0, 2).map(ageGroup => (
            <span key={ageGroup} className="inline-block bg-gray-100 rounded-full px-2 py-0.5 text-xs text-gray-600">
              {ageGroup}
            </span>
          ))}
          <span className="inline-block bg-gray-100 rounded-full px-2 py-0.5 text-xs text-gray-600">
            {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
