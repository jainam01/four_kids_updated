import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Product } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SizeButton } from "@/components/ui/size-button";
import { ColorButton } from "@/components/ui/color-button";
import ProductCard from "@/components/ProductCard";
import { ListFilter, LayoutGrid, List } from "lucide-react";

interface FilterProps {
  categorySlug?: string;
  searchTerm?: string;
}

const FilterSection = ({ categorySlug, searchTerm }: FilterProps) => {
  const [, navigate] = useLocation();
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Prepare query filters
  const filters: Record<string, string> = {};
  if (categorySlug) filters.category = categorySlug;
  if (searchTerm) filters.search = searchTerm;
  if (selectedSizes.length) filters.sizes = selectedSizes.join(',');
  if (selectedColors.length) filters.colors = selectedColors.join(',');
  if (selectedAgeGroups.length) filters.ageGroups = selectedAgeGroups.join(',');
  filters.minPrice = priceRange[0].toString();
  filters.maxPrice = priceRange[1].toString();

  // Get products with filters
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products', filters],
  });

  // Handle sorting
  const sortedProducts = [...(products || [])].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (a.salePrice || a.price) - (b.salePrice || b.price);
      case "price-high":
        return (b.salePrice || b.price) - (a.salePrice || a.price);
      case "popular":
        return b.reviewCount - a.reviewCount;
      case "newest":
      default:
        return b.id - a.id;
    }
  });

  // Calculate pagination
  const totalPages = Math.ceil((sortedProducts?.length || 0) / productsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleColorToggle = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleSizeToggle = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleAgeGroupToggle = (ageGroup: string) => {
    if (selectedAgeGroups.includes(ageGroup)) {
      setSelectedAgeGroups(selectedAgeGroups.filter(a => a !== ageGroup));
    } else {
      setSelectedAgeGroups([...selectedAgeGroups, ageGroup]);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const applyFilters = () => {
    // The filters are already applied via the query parameters
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedAgeGroups([]);
    setPriceRange([0, 100]);
    setCurrentPage(1);
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [categorySlug, searchTerm]);

  return (
    <section className="container mx-auto px-4 py-4">
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-bold text-lg mb-4">Filters</h3>
          
          {/* Size Filter */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Size</h4>
            <div className="flex flex-wrap gap-2">
              {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                <SizeButton
                  key={size}
                  size={size}
                  selected={selectedSizes.includes(size)}
                  onClick={() => handleSizeToggle(size)}
                />
              ))}
            </div>
          </div>
          
          {/* Color Filter */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Color</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Red', value: 'red' },
                { name: 'Blue', value: 'blue' },
                { name: 'Green', value: 'green' },
                { name: 'Yellow', value: 'yellow' },
                { name: 'Purple', value: 'purple' },
                { name: 'Black', value: 'black' }
              ].map(color => (
                <ColorButton
                  key={color.value}
                  color={color.value}
                  selected={selectedColors.includes(color.name)}
                  onClick={() => handleColorToggle(color.name)}
                />
              ))}
            </div>
          </div>
          
          {/* Price Filter */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Price Range</h4>
            <div className="px-2">
              <Slider
                value={priceRange}
                min={0}
                max={100}
                step={5}
                onValueChange={setPriceRange}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
          
          {/* Age Range */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Age Group</h4>
            <div className="space-y-2">
              {['2-4y', '5-7y', '8-10y', '11-13y', '14+y'].map(ageGroup => (
                <div key={ageGroup} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`age-${ageGroup}`}
                    checked={selectedAgeGroups.includes(ageGroup)}
                    onCheckedChange={() => handleAgeGroupToggle(ageGroup)}
                  />
                  <label 
                    htmlFor={`age-${ageGroup}`} 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {ageGroup}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Apply Filters Button */}
          <div className="space-y-2">
            <Button 
              onClick={applyFilters}
              className="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-opacity-90 transition"
            >
              Apply Filters
            </Button>
            <Button
              variant="outline"
              onClick={resetFilters}
              className="w-full py-2 rounded-lg font-bold"
            >
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort Options */}
          <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-xl shadow-sm">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">Sort by:</span>
              <Select defaultValue={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-muted border-0 rounded-lg w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 hidden sm:inline">View:</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "text-primary" : ""}
              >
                <List className="h-6 w-6" />
                <span className="sr-only">List view</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "text-primary" : ""}
              >
                <LayoutGrid className="h-6 w-6" />
                <span className="sr-only">Grid view</span>
              </Button>
            </div>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <Skeleton className="w-full h-64" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && paginatedProducts.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <ListFilter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">
                Try changing your filters or search for something else.
              </p>
              <Button onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          )}

          {/* Products grid */}
          {!isLoading && paginatedProducts.length > 0 && (
            <div className={
              viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" 
                : "flex flex-col gap-4"
            }>
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <nav className="inline-flex rounded-md shadow-sm">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-l-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-4 py-2 ${
                      currentPage === i + 1 ? "bg-primary text-white border border-primary" : ""
                    }`}
                  >
                    {i + 1}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-r-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
