
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Product } from "@shared/schema";
import { Helmet } from "react-helmet";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterX, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";

const Products = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [inStockOnly, setInStockOnly] = useState(true);
  const [isNewOnly, setIsNewOnly] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const handleReset = () => {
    setSelectedCategories([]);
    setPriceRange([0, 500]);
    setInStockOnly(true);
    setIsNewOnly(false);
    setSortBy("newest");
  };

  return (
    <>
      <Helmet>
        <title>All Products - FourKids</title>
      </Helmet>

      <PageHeader 
        title="Our Products" 
        currentPage="Products" 
        backgroundImage="/placeholder.svg"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-1/4 hidden lg:block">
            <div className="sticky top-24 space-y-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={handleReset}>
                    <FilterX className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium mb-3">Categories</h4>
                  <div className="space-y-2">
                    {["Basic Pants", "Cargo Pants", "Capri", "Shorts", "Mom Fit"].map((category) => (
                      <div key={category} className="flex items-center">
                        <Checkbox
                          id={`category-${category.toLowerCase().replace(" ", "-")}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCategories([...selectedCategories, category]);
                            } else {
                              setSelectedCategories(selectedCategories.filter(c => c !== category));
                            }
                          }}
                        />
                        <label
                          htmlFor={`category-${category.toLowerCase().replace(" ", "-")}`}
                          className="text-sm font-medium leading-none ml-2 cursor-pointer"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium mb-3">Availability</h4>
                  <div className="flex items-center">
                    <Checkbox
                      id="in-stock"
                      checked={inStockOnly}
                      onCheckedChange={(checked) => setInStockOnly(!!checked)}
                    />
                    <label
                      htmlFor="in-stock"
                      className="text-sm font-medium leading-none ml-2 cursor-pointer"
                    >
                      In Stock Only
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium mb-3">Product Status</h4>
                  <div className="flex items-center">
                    <Checkbox
                      id="new-products"
                      checked={isNewOnly}
                      onCheckedChange={(checked) => setIsNewOnly(!!checked)}
                    />
                    <label
                      htmlFor="new-products"
                      className="text-sm font-medium leading-none ml-2 cursor-pointer"
                    >
                      New Arrivals
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="w-full lg:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="w-full sm:w-auto">
                <p className="text-gray-500">
                  Showing {products?.length || 0} products
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  className="flex lg:hidden items-center"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {!isLoading && products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
