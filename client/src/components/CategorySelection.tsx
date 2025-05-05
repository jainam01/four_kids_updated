import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { 
  BookOpen, Package, Archive, Ruler, Search, Plus, ChevronRight
} from "lucide-react";
import { Category } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const CategoryIcons = {
  pants: <BookOpen className="h-6 w-6 text-primary" />,
  cargo: <Package className="h-6 w-6 text-primary" />,
  capris: <Archive className="h-6 w-6 text-primary" />,
  shorts: <Ruler className="h-6 w-6 text-primary" />,
  "mom-fit": <Plus className="h-6 w-6 text-primary" />,
  default: <Search className="h-6 w-6 text-primary" />
};

const CategorySelection = () => {
  const [, navigate] = useLocation();
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const getIconForCategory = (slug: string) => {
    return CategoryIcons[slug as keyof typeof CategoryIcons] || CategoryIcons.default;
  };

  const handleCategoryClick = (slug: string) => {
    navigate(`/category/${slug}`);
  };

  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="section-title text-2xl md:text-3xl font-bold">Browse by Category</h2>
            <p className="text-gray-500 mt-2">Find the perfect style for your child</p>
          </div>
          
          <Button
            onClick={() => navigate("/categories")}
            variant="ghost"
            className="mt-4 md:mt-0 text-primary hover:text-primary/90 hover:bg-primary/5 flex items-center gap-1"
          >
            View All Categories
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Array(5).fill(0).map((_, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <Skeleton className="h-16 w-16 rounded-full mx-auto mb-3" />
                <Skeleton className="h-5 w-24 mx-auto mb-2" />
                <Skeleton className="h-4 w-16 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories?.map((category) => (
              <div 
                key={category.id} 
                className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center cursor-pointer group"
                onClick={() => handleCategoryClick(category.slug)}
              >
                <div className="bg-gray-50 group-hover:bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mx-auto transition-colors duration-300">
                  {getIconForCategory(category.slug)}
                </div>
                <h3 className="mt-4 font-bold text-gray-800 group-hover:text-primary transition-colors duration-300">{category.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{category.itemCount || 0} items</p>
                
                <div className="mt-4 flex justify-center">
                  <span className="inline-flex items-center text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Products
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySelection;
