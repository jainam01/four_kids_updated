import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { 
  BookOpen, Package, Archive, Ruler, Search, Plus
} from "lucide-react";
import { Category } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryIcons = {
  pants: <BookOpen className="h-8 w-8 text-primary" />,
  cargo: <Package className="h-8 w-8 text-primary" />,
  capris: <Archive className="h-8 w-8 text-primary" />,
  shorts: <Ruler className="h-8 w-8 text-primary" />,
  "mom-fit": <Plus className="h-8 w-8 text-primary" />,
  default: <Search className="h-8 w-8 text-primary" />
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
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
      
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array(5).fill(0).map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-sm">
              <Skeleton className="h-16 w-16 rounded-full mx-auto mb-3" />
              <Skeleton className="h-5 w-24 mx-auto mb-2" />
              <Skeleton className="h-4 w-16 mx-auto" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories?.map((category) => (
            <div 
              key={category.id} 
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition text-center cursor-pointer hover:scale-105 transform transition"
              onClick={() => handleCategoryClick(category.slug)}
            >
              <div className="bg-muted rounded-full h-16 w-16 flex items-center justify-center mx-auto">
                {getIconForCategory(category.slug)}
              </div>
              <h3 className="mt-3 font-bold">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.itemCount} items</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategorySelection;
