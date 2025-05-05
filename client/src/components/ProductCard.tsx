import { useState } from "react";
import { useLocation } from "wouter";
import { Product } from "@shared/schema";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import { useWatchlist } from "@/context/WatchlistContext";
import { BadgeColored } from "@/components/ui/badge-colored";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
  showHoverEffects?: boolean;
}

const ProductCard = ({ product, viewMode = "grid", showHoverEffects = true }: ProductCardProps) => {
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

  if (viewMode === "grid") {
    return (
      <div 
        className="relative bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={handleNavigateToProduct}
      >
        <div className="relative">
          {/* Discount Badge */}
          {product.salePrice && (
            <div className="absolute top-2 left-2 z-10">
              <BadgeColored variant="error">
                {Math.round((1 - product.salePrice / product.price) * 100)}% off
              </BadgeColored>
            </div>
          )}

          {/* Quick View Button */}
          {showHoverEffects && isHovering && (
            <div className="absolute top-2 right-2 z-10">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white shadow-md hover:bg-gray-50"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/product/${product.slug}`);
                }}
              >
                <Eye className="h-4 w-4 mr-1" />
                Quick view
              </Button>
            </div>
          )}

          {/* Product Image */}
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full aspect-[3/4] object-cover"
          />

          {/* Hover Overlay */}
          {showHoverEffects && isHovering && (
            <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-4 transition-all duration-300">
              {/* Size Options */}
              <div className="flex gap-2 mb-3 justify-center">
                {product.sizes.map(size => (
                  <div key={size} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-sm">
                    {size}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  className="flex-1 h-9"
                  onClick={handleQuickAdd}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Quick Add
                </Button>
                <Button
                  variant="outline"
                  className="h-9 px-3"
                  onClick={handleToggleWatchlist}
                >
                  <Heart className={`h-4 w-4 ${inWatchlist ? 'fill-primary text-primary' : ''}`} />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-medium text-base mb-1">{product.name}</h3>
          <div className="flex items-baseline gap-2">
            {product.salePrice ? (
              <>
                <span className="text-primary font-semibold">₹{product.salePrice}</span>
                <span className="text-gray-400 line-through text-sm">₹{product.price}</span>
              </>
            ) : (
              <span className="text-primary font-semibold">₹{product.price}</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null; 
};

export default ProductCard;