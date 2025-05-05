import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import { useWatchlist } from "@/context/WatchlistContext";
import { BadgeColored } from "@/components/ui/badge-colored";

const FeaturedCollection = () => {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<"featured" | "new">("featured");
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { addToWatchlist, isInWatchlist, removeFromWatchlist } = useWatchlist();

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products', { 
      ...(activeTab === "featured" ? { isFeatured: true } : { isNew: true }) 
    }],
  });

  const handleAddToCart = async (product: Product) => {
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

  const handleToggleWatchlist = async (product: Product) => {
    try {
      if (isInWatchlist(product.id)) {
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

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Our Products</h2>
        <div className="flex gap-4">
          <Button
            variant={activeTab === "featured" ? "default" : "outline"}
            onClick={() => setActiveTab("featured")}
          >
            Featured
          </Button>
          <Button
            variant={activeTab === "new" ? "default" : "outline"}
            onClick={() => setActiveTab("new")}
          >
            New Arrivals
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-100 h-[400px] rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.slice(0, 8).map((product) => (
            <div 
              key={product.id}
              className="group relative bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md"
              onClick={() => navigate(`/product/${product.slug}`)}
            >
              <div className="relative">
                {product.salePrice && (
                  <div className="absolute top-2 left-2 z-10">
                    <BadgeColored variant="error">
                      {Math.round((1 - product.salePrice / product.price) * 100)}% off
                    </BadgeColored>
                  </div>
                )}

                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-2 right-2 z-10 bg-white shadow-md hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${product.slug}`);
                  }}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Quick view
                </Button>

                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full aspect-[3/4] object-cover"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                  <div className="flex gap-2 mb-3 justify-center">
                    {product.sizes.map(size => (
                      <div key={size} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-sm">
                        {size}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1 h-9"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Quick Add
                    </Button>
                    <Button
                      variant="outline"
                      className="h-9 px-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleWatchlist(product);
                      }}
                    >
                      <Heart className={`h-4 w-4 ${isInWatchlist(product.id) ? 'fill-primary text-primary' : ''}`} />
                    </Button>
                  </div>
                </div>
              </div>

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
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedCollection;