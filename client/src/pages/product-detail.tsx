import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { Heart, ShoppingBag, Share2, Truck, RotateCcw, Shield } from "lucide-react";
import { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { SizeButton } from "@/components/ui/size-button";
import { ColorButton } from "@/components/ui/color-button";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import { useWatchlist } from "@/context/WatchlistContext";
import { apiRequest } from "@/lib/queryClient";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/ProductCard";
import { BadgeColored } from "@/components/ui/badge-colored";
import { Input } from "@/components/ui/input";

const ProductDetail = () => {
  const { slug } = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { addToWatchlist, isInWatchlist, removeFromWatchlist } = useWatchlist();
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${slug}`],
  });
  
  // Related products query
  const { data: relatedProducts, isLoading: isLoadingRelated } = useQuery<Product[]>({
    queryKey: ['/api/products', { limit: 4 }],
    enabled: !!product,
  });
  
  const inWatchlist = product ? isInWatchlist(product.id) : false;
  
  const handleToggleWatchlist = async () => {
    if (!product) return;
    
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
  
  const handleAddToCart = async () => {
    if (!product) return;
    
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to select a size before adding to cart.",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedColor) {
      toast({
        title: "Please select a color",
        description: "You need to select a color before adding to cart.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await addToCart({
        productId: product.id,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor
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
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };
  
  const handleBulkOrder = () => {
    // In a real app, this would open a bulk order form or modal
    toast({
      title: "Bulk Order Request",
      description: "Our team will contact you shortly for bulk order details.",
    });
  };
  
  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex space-x-1">
        <span className="text-accent">{'★'.repeat(fullStars)}</span>
        {hasHalfStar && <span className="text-accent">½</span>}
        <span className="text-gray-300">{'★'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0))}</span>
      </div>
    );
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <Skeleton className="w-full h-96 rounded-xl" />
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="w-full h-24 rounded-lg" />
              ))}
            </div>
          </div>
          <div className="md:w-1/2">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/4 mb-6" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-6" />
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">We couldn't find the product you're looking for.</p>
        <Button onClick={() => navigate("/")}>Return to Home</Button>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{`${product.name} - FourKids`}</title>
        <meta name="description" content={product.description || `${product.name} - Quality children's clothing from FourKids.`} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8 pb-16 md:pb-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm mb-6">
          <button onClick={() => navigate("/")} className="text-gray-500 hover:text-primary">
            Home
          </button>
          <span className="mx-2">/</span>
          <button 
            onClick={() => navigate(`/category/${product.categoryId}`)} 
            className="text-gray-500 hover:text-primary"
          >
            Category
          </button>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Images */}
          <div className="md:w-1/2">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <img 
                src={product.images[activeImageIndex]} 
                alt={product.name} 
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2 mt-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`overflow-hidden rounded-lg border-2 ${
                    activeImageIndex === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - view ${index + 1}`} 
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="md:w-1/2">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {renderRatingStars(product.rating)}
                    <span className="ml-2 text-sm text-gray-500">({product.reviewCount} reviews)</span>
                  </div>
                  
                  {product.isNew && (
                    <BadgeColored variant="success">NEW</BadgeColored>
                  )}
                  
                  {product.isOnSale && (
                    <BadgeColored variant="error">SALE</BadgeColored>
                  )}
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleWatchlist}
                className="hover:bg-muted rounded-full"
              >
                <Heart className={`h-6 w-6 ${inWatchlist ? "fill-primary text-primary" : ""}`} />
                <span className="sr-only">
                  {inWatchlist ? "Remove from wishlist" : "Add to wishlist"}
                </span>
              </Button>
            </div>
            
            <div className="mt-6">
              <div className="flex items-baseline">
                {product.salePrice ? (
                  <>
                    <span className="text-2xl font-bold text-primary">${product.salePrice.toFixed(2)}</span>
                    <span className="text-gray-400 line-through text-lg ml-2">${product.price.toFixed(2)}</span>
                    <span className="ml-2 text-sm bg-error/10 text-error px-2 py-1 rounded-md">
                      {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                )}
              </div>
              
              <p className="mt-6 text-gray-600">
                {product.description || `${product.name} for children - quality clothing for all occasions.`}
              </p>
            </div>
            
            {/* Size Selection */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Size</h3>
                <button
                  className="text-primary text-sm font-medium"
                  onClick={() => navigate("/size-guide")}
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <SizeButton
                    key={size}
                    size={size}
                    selected={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                  />
                ))}
              </div>
            </div>
            
            {/* Color Selection */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <div key={color} className="text-center">
                    <ColorButton
                      color={color.toLowerCase()}
                      selected={selectedColor === color}
                      onClick={() => setSelectedColor(color)}
                    />
                    <span className="text-xs block mt-1">{color}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center max-w-[120px]">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="rounded-r-none"
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="text-center border-l-0 border-r-0 rounded-none h-10"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="rounded-l-none"
                  >
                    +
                  </Button>
                </div>
                <div className="text-sm text-gray-500">
                  {product.inStock 
                    ? <span className="text-success font-medium">In Stock</span>
                    : <span className="text-error font-medium">Out of Stock</span>
                  }
                </div>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <div className="mt-8 space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition h-12"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              
              <Button
                variant="outline"
                onClick={handleBulkOrder}
                className="w-full border-primary text-primary font-bold py-3 rounded-xl hover:bg-primary hover:text-white transition h-12"
              >
                Request Bulk Order
              </Button>
            </div>
            
            {/* Product Features */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <span>Free shipping over $50</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span>30-day returns</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="h-5 w-5 text-primary" />
                <span>Quality guarantee</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Share2 className="h-5 w-5 text-primary" />
                <span>Share this product</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs Section */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
          <Tabs defaultValue="details">
            <TabsList className="mb-6">
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="sizing">Sizing & Fit</TabsTrigger>
              <TabsTrigger value="care">Care Instructions</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              <div className="space-y-4 text-gray-600">
                <p>{product.description || `${product.name} for children - quality clothing that's comfortable and stylish.`}</p>
                
                <h4 className="font-bold text-foreground">Features:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Premium quality fabric</li>
                  <li>Comfortable fit for active kids</li>
                  <li>Multiple color options</li>
                  <li>Easy to care for</li>
                  <li>Suitable for all seasons</li>
                </ul>
                
                <h4 className="font-bold text-foreground">Material:</h4>
                <p>100% Cotton (may vary depending on color selection)</p>
              </div>
            </TabsContent>
            
            <TabsContent value="sizing">
              <div className="space-y-4 text-gray-600">
                <h4 className="font-bold text-foreground">Size Chart:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted">
                        <th className="py-2 px-4 text-left">Size</th>
                        <th className="py-2 px-4 text-left">Age</th>
                        <th className="py-2 px-4 text-left">Height (cm)</th>
                        <th className="py-2 px-4 text-left">Chest (cm)</th>
                        <th className="py-2 px-4 text-left">Waist (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-muted">
                        <td className="py-2 px-4 font-semibold">XS</td>
                        <td className="py-2 px-4">2-3 Years</td>
                        <td className="py-2 px-4">92-98</td>
                        <td className="py-2 px-4">53-55</td>
                        <td className="py-2 px-4">51-52</td>
                      </tr>
                      <tr className="border-b border-muted">
                        <td className="py-2 px-4 font-semibold">S</td>
                        <td className="py-2 px-4">4-5 Years</td>
                        <td className="py-2 px-4">104-110</td>
                        <td className="py-2 px-4">56-58</td>
                        <td className="py-2 px-4">53-54</td>
                      </tr>
                      <tr className="border-b border-muted">
                        <td className="py-2 px-4 font-semibold">M</td>
                        <td className="py-2 px-4">6-7 Years</td>
                        <td className="py-2 px-4">116-122</td>
                        <td className="py-2 px-4">59-61</td>
                        <td className="py-2 px-4">56-57</td>
                      </tr>
                      <tr className="border-b border-muted">
                        <td className="py-2 px-4 font-semibold">L</td>
                        <td className="py-2 px-4">8-9 Years</td>
                        <td className="py-2 px-4">128-134</td>
                        <td className="py-2 px-4">62-65</td>
                        <td className="py-2 px-4">59-61</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-semibold">XL</td>
                        <td className="py-2 px-4">10-11 Years</td>
                        <td className="py-2 px-4">140-146</td>
                        <td className="py-2 px-4">66-69</td>
                        <td className="py-2 px-4">63-65</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <h4 className="font-bold text-foreground">Fit Information:</h4>
                <p>This product is designed for a regular fit. If your child is between sizes, we recommend sizing up for room to grow.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="care">
              <div className="space-y-4 text-gray-600">
                <h4 className="font-bold text-foreground">Washing Instructions:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Machine wash cold with like colors</li>
                  <li>Use mild detergent</li>
                  <li>Do not bleach</li>
                  <li>Tumble dry low</li>
                  <li>Cool iron if needed</li>
                  <li>Do not dry clean</li>
                </ul>
                
                <h4 className="font-bold text-foreground">Care Tips:</h4>
                <p>To maintain the color and shape of your garment, turn inside out before washing and avoid using fabric softeners.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="flex items-center">
                      {renderRatingStars(product.rating)}
                      <span className="ml-2 font-semibold">{product.rating.toFixed(1)} out of 5</span>
                    </div>
                    <p className="text-sm text-gray-500">Based on {product.reviewCount} reviews</p>
                  </div>
                  
                  <Button className="ml-auto">Write a Review</Button>
                </div>
                
                <Separator />
                
                <div className="text-center py-8">
                  <p className="text-gray-500">Detailed reviews will be implemented in a future update.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          
          {isLoadingRelated ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array(4).fill(0).map((_, index) => (
                <Skeleton key={index} className="w-full h-80 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts?.filter(p => p.id !== product.id).slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
