import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Product } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

const FeaturedCollection = () => {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<"featured" | "new">("featured");
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products', { 
      ...(activeTab === "featured" ? { isFeatured: true } : { isNew: true }) 
    }],
  });

  // Sample product data to use as fallback
  const productData = [
    {
      id: 1,
      name: "Classic Comfort Basic Pants",
      category: "Basic Pants",
      price: 199,
      oldPrice: 250,
      discount: 20,
      moq: 10,
      slug: "classic-comfort-basic-pants"
    },
    {
      id: 2,
      name: "Adventure Cargo Pants",
      category: "Cargo Pants",
      price: 299,
      oldPrice: 350,
      discount: 15,
      moq: 8,
      slug: "adventure-cargo-pants"
    },
    {
      id: 3,
      name: "Summer Day Capri",
      category: "Capri",
      price: 189,
      oldPrice: 220,
      discount: 14,
      moq: 12,
      slug: "summer-day-capri"
    },
    {
      id: 4,
      name: "Everyday Play Shorts",
      category: "Shorts",
      price: 149,
      oldPrice: 180,
      discount: 17,
      moq: 15,
      slug: "everyday-play-shorts"
    },
    {
      id: 5,
      name: "Classic Mom Fit Jeans",
      category: "Mom Fit",
      price: 279,
      oldPrice: 320,
      discount: 13,
      moq: 10,
      slug: "classic-mom-fit-jeans"
    }
  ];
  
  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">Our Products</h2>
          <p className="text-gray-600 mt-2">
            Browse our selection of high-quality children's clothing at wholesale prices
          </p>
          
          <div className="flex justify-center mt-6">
            <div className="inline-flex border border-gray-200 rounded-md p-1 bg-gray-50">
              <Button
                variant="ghost"
                className={`rounded-md px-6 py-2 text-sm ${
                  activeTab === "featured" 
                    ? "bg-white shadow-sm text-gray-900" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("featured")}
              >
                Featured Products
              </Button>
              <Button
                variant="ghost"
                className={`rounded-md px-6 py-2 text-sm ${
                  activeTab === "new" 
                    ? "bg-white shadow-sm text-gray-900" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("new")}
              >
                New Arrivals
              </Button>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {Array(4).fill(0).map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-md p-4">
                <Skeleton className="w-full aspect-square rounded-md mb-4" />
                <Skeleton className="h-5 w-2/3 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-4" />
                <Skeleton className="h-6 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {/* Use product data if available, otherwise fall back to sample data */}
            {(products?.length ? products.slice(0, 5) : productData).map((product, index) => {
              // Destructure properties, handle both real data and sample data
              const {
                id,
                name = product.name,
                price = product.price,
                salePrice = product.salePrice || (product.oldPrice ? product.price : undefined),
                category = product.category || "",
                slug = product.slug,
                // Calculate discount percentage if not provided
                discountPercentage = product.discountPercentage || product.discount ||
                  (product.oldPrice ? Math.round(((product.oldPrice - price) / product.oldPrice) * 100) : 0)
              } = product;
              
              const oldPrice = product.oldPrice || (salePrice ? price : undefined);
              
              return (
                <div 
                  key={id || index} 
                  className="bg-gray-100 rounded-md overflow-hidden group cursor-pointer"
                  onClick={() => navigate(`/product/${slug}`)}
                >
                  {/* Discount Badge */}
                  {discountPercentage > 0 && (
                    <div className="absolute left-3 top-3 z-10">
                      <div className="bg-red-500 text-white text-xs font-bold rounded px-2 py-1">
                        -{discountPercentage}%
                      </div>
                    </div>
                  )}
                  
                  {/* Product Image */}
                  <div className="relative aspect-square bg-white flex items-center justify-center p-4">
                    <div className="w-full h-full flex items-center justify-center">
                      <img 
                        src="/placeholder.svg"
                        alt={name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-4">
                    <div className="text-xs text-gray-500 mb-1">{category}</div>
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{name}</h3>
                    
                    <div className="flex items-end gap-2 mt-3">
                      <span className="text-gray-900 font-bold">₹{price}</span>
                      {oldPrice && (
                        <span className="text-gray-400 line-through text-sm">₹{oldPrice}</span>
                      )}
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-2">
                      MOQ: {product.moq || 10} pcs
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCollection;
