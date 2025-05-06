import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { Heart, ShoppingBag, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeColored } from "@/components/ui/badge-colored";
import { useCart } from "@/context/CartContext";
import { useWatchlist } from "@/context/WatchlistContext";
import { useToast } from "@/hooks/use-toast";

const WholesaleCTA = () => (
  <section className="py-20 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/placeholder.svg")' }}>
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Stock Your Store?</h2>
      <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">Contact us today to place your wholesale order and bring FouKids quality to your customers</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8" href="/products">
          Browse Products
          <ArrowRight className="ml-2 h-5 w-5" />
        </a>
        <a className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-11 rounded-md px-8 bg-transparent border-white text-white hover:bg-white hover:text-gray-900" href="/contact">
          Contact Sales Team
        </a>
      </div>
    </div>
  </section>
);


const FeaturedCollection = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { addToWatchlist, isInWatchlist, removeFromWatchlist } = useWatchlist();

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
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
    <section className="py-16 bg-gray-50 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-bold mb-4">Our Products</h2>
          <p className="text-gray-600">Browse our selection of high-quality children's clothing at wholesale prices</p>
        </div>

        <Tabs defaultValue="featured">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="featured">Featured Products</TabsTrigger>
              <TabsTrigger value="new">New Arrivals</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="featured" className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products?.slice(0, 8).map((product) => (
                <div
                  key={product.id}
                  className="rounded-lg border bg-card text-card-foreground group overflow-hidden h-full border-none shadow-sm hover:shadow-md transition-all duration-300 relative"
                  style={{ backgroundColor: '#f0f0f0' }} // Added background color to improve visibility
                >
                  <div className="relative h-60 overflow-hidden">
                    <a href={`/product/${product.slug}`}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </a>
                    {product.salePrice && (
                      <div className="absolute top-2 left-2 flex flex-col gap-2">
                        <BadgeColored variant="error">
                          {Math.round((1 - product.salePrice / product.price) * 100)}% off
                        </BadgeColored>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-10 w-10 rounded-full bg-white hover:bg-primary hover:text-white"
                          onClick={() => handleToggleWatchlist(product)}
                          title="Add to Wishlist"
                        >
                          <Heart className={`h-4 w-4 ${isInWatchlist(product.id) ? 'fill-primary text-primary' : ''}`} />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-10 w-10 rounded-full bg-white hover:bg-primary hover:text-white"
                          onClick={() => handleAddToCart(product)}
                          title="Add to Basket"
                        >
                          <ShoppingBag className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-10 w-10 rounded-full bg-white hover:bg-primary hover:text-white"
                          onClick={() => navigate(`/product/${product.slug}`)}
                          title="View Product"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    {product.categoryId && (
                      <span className="text-xs text-gray-500 hover:text-primary transition-colors mb-1 inline-block">
                        {product.categoryId}
                      </span>
                    )}
                    <a href={`/product/${product.slug}`} className="block">
                      <h3 className="font-medium text-lg mb-2 hover:text-primary transition-colors line-clamp-2 h-[56px]">
                        {product.name}
                      </h3>
                    </a>
                    <div className="flex items-center">
                      {product.salePrice ? (
                        <>
                          <span className="font-bold text-lg">₹{product.salePrice}</span>
                          <span className="text-gray-400 line-through ml-2">₹{product.price}</span>
                        </>
                      ) : (
                        <span className="font-bold text-lg">₹{product.price}</span>
                      )}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">MOQ: {product.moq} pcs</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products?.filter(p => p.isNew).slice(0, 8).map((product) => (
                <div
                  key={product.id}
                  className="rounded-lg border bg-card text-card-foreground group overflow-hidden h-full border-none shadow-sm hover:shadow-md transition-all duration-300 relative"
                  style={{ backgroundColor: '#f0f0f0' }} // Added background color to improve visibility
                >
                  <div className="relative h-60 overflow-hidden">
                    <a href={`/product/${product.slug}`}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </a>
                    {product.salePrice && (
                      <div className="absolute top-2 left-2 flex flex-col gap-2">
                        <BadgeColored variant="error">
                          {Math.round((1 - product.salePrice / product.price) * 100)}% off
                        </BadgeColored>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-10 w-10 rounded-full bg-white hover:bg-primary hover:text-white"
                          onClick={() => handleToggleWatchlist(product)}
                          title="Add to Wishlist"
                        >
                          <Heart className={`h-4 w-4 ${isInWatchlist(product.id) ? 'fill-primary text-primary' : ''}`} />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-10 w-10 rounded-full bg-white hover:bg-primary hover:text-white"
                          onClick={() => handleAddToCart(product)}
                          title="Add to Basket"
                        >
                          <ShoppingBag className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-10 w-10 rounded-full bg-white hover:bg-primary hover:text-white"
                          onClick={() => navigate(`/product/${product.slug}`)}
                          title="View Product"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    {product.categoryId && (
                      <span className="text-xs text-gray-500 hover:text-primary transition-colors mb-1 inline-block">
                        {product.categoryId}
                      </span>
                    )}
                    <a href={`/product/${product.slug}`} className="block">
                      <h3 className="font-medium text-lg mb-2 hover:text-primary transition-colors line-clamp-2 h-[56px]">
                        {product.name}
                      </h3>
                    </a>
                    <div className="flex items-center">
                      {product.salePrice ? (
                        <>
                          <span className="font-bold text-lg">₹{product.salePrice}</span>
                          <span className="text-gray-400 line-through ml-2">₹{product.price}</span>
                        </>
                      ) : (
                        <span className="font-bold text-lg">₹{product.price}</span>
                      )}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">MOQ: {product.moq} pcs</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-10">
          <Button asChild size="lg" className="px-8">
            <a href="/products">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;