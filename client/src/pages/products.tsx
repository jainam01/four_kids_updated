import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { Product } from "@shared/schema";
import { Helmet } from "react-helmet";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterX, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";

const Products = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [inStockOnly, setInStockOnly] = useState(true);
  const [isNewOnly, setIsNewOnly] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const handleReset = () => {
    setSelectedCategories([]);
    setPriceRange([0, 2000]);
    setInStockOnly(true);
    setIsNewOnly(false);
    setSortBy("newest");
    setSearchTerm("");
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category),
      );
    }

    // Filter by in stock
    if (inStockOnly) {
      filtered = filtered.filter((p) => p.inStock);
    }

    // Filter by new arrivals
    if (isNewOnly) {
      filtered = filtered.filter((p) => p.isNew);
    }

    // Filter by price
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    // Filter by search
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        filtered.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)); // assuming rating exists
        break;
      case "newest":
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
    }

    return filtered;
  }, [
    products,
    selectedCategories,
    inStockOnly,
    isNewOnly,
    priceRange,
    searchTerm,
    sortBy,
  ]);

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

                {/* Search */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Search</h4>
                  <Input
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([+e.target.value, priceRange[1]])
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], +e.target.value])
                      }
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Categories</h4>
                  <div className="space-y-2">
                    {[
                      "Basic Pants",
                      "Cargo Pants",
                      "Capri",
                      "Shorts",
                      "Mom Fit",
                    ].map((category) => (
                      <div key={category} className="flex items-center">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCategories([
                                ...selectedCategories,
                                category,
                              ]);
                            } else {
                              setSelectedCategories(
                                selectedCategories.filter(
                                  (c) => c !== category,
                                ),
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor={`category-${category}`}
                          className="ml-2 text-sm cursor-pointer"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability */}
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
                      className="ml-2 text-sm cursor-pointer"
                    >
                      In Stock Only
                    </label>
                  </div>
                </div>

                {/* New Arrivals */}
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
                      className="ml-2 text-sm cursor-pointer"
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
              <p className="text-gray-500">
                Showing {filteredProducts.length} products
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
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
              {!isLoading &&
                filteredProducts.map((product) => (
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
