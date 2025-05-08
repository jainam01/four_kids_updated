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

const FeaturedCollection = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { addToWatchlist, isInWatchlist, removeFromWatchlist } = useWatchlist();

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart({
        productId: product.id,
        quantity: 1,
        size: product.sizes[0],
        color: product.colors[0],
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

  const renderProductCard = (product: Product) => (
    <div
      key={product.id}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group"
    >
      <div className="relative">
        <a href={`/product/${product.slug}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-60 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </a>
        {product.salePrice && (
          <div className="absolute top-2 left-2">
            <BadgeColored variant="error">
              {Math.round((1 - product.salePrice / product.price) * 100)}% off
            </BadgeColored>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="icon"
              className="bg-white hover:bg-primary hover:text-white"
              onClick={() => handleToggleWatchlist(product)}
              title="Add to Wishlist"
            >
              <Heart
                className={`h-4 w-4 ${
                  isInWatchlist(product.id) ? "fill-primary text-primary" : ""
                }`}
              />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="bg-white hover:bg-primary hover:text-white"
              onClick={() => handleAddToCart(product)}
              title="Add to Basket"
            >
              <ShoppingBag className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="bg-white hover:bg-primary hover:text-white"
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
          <h3 className="font-medium text-lg mb-2 hover:text-primary transition-colors line-clamp-2 h-[35px]">
            {product.name}
          </h3>
        </a>
        <div className="flex items-center">
          {product.salePrice ? (
            <>
              <span className="font-bold text-lg">₹{product.salePrice}</span>
              <span className="text-gray-400 line-through ml-2">
                ₹{product.price}
              </span>
            </>
          ) : (
            <span className="font-bold text-lg">₹{product.price}</span>
          )}
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Min. Order: {product.minimumOrderQuantity || 1} pcs
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-gray-50 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-bold mb-4">Our Products</h2>
          <p className="text-gray-600">
            Browse our selection of high-quality children's clothing at
            wholesale prices
          </p>
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
              {products?.slice(0, 8).map(renderProductCard)}
            </div>
          </TabsContent>

          <TabsContent value="new" className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products
                ?.filter((p) => p.isNew)
                .slice(0, 8)
                .map(renderProductCard)}
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
