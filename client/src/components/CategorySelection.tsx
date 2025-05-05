import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ChevronRight } from "lucide-react";
import { Category } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

const CategorySelection = () => {
  const [, navigate] = useLocation();
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const handleCategoryClick = (slug: string) => {
    navigate(`/category/${slug}`);
  };

  // Extended category type to handle the image property
  type ExtendedCategory = Category | {
    name: string;
    slug: string;
    image: string;
  };
  
  const categoryData: ExtendedCategory[] = [
    {
      name: "Basic Pants",
      slug: "basic-pants",
      image: "/placeholder.svg",
    },
    {
      name: "Cargo Pants",
      slug: "cargo-pants",
      image: "/placeholder.svg",
    },
    {
      name: "Capri Pants",
      slug: "capri-pants",
      image: "/placeholder.svg",
    },
    {
      name: "Shorts Collection",
      slug: "shorts",
      image: "/placeholder.svg",
    }
  ];

  return (
    <div className="container mx-auto px-12 md:px-20 my-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">Shop by Category</h2>
        <div className="w-20 h-1 bg-primary mx-auto"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {isLoading ? (
          Array(4).fill(0).map((_, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg">
              <Skeleton className="aspect-[4/5] w-full" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          ))
        ) : (
          (categories?.length ? categories.slice(0, 4) : categoryData).map((cat, index) => (
            <a 
              key={index} 
              href={`/category/${cat.slug}`}
              onClick={(e) => {
                e.preventDefault();
                handleCategoryClick(cat.slug);
              }}
            >
              <div className="group relative overflow-hidden rounded-lg transition-all duration-500 hover:shadow-xl hover:scale-[1.02]">
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <img 
                    src={'image' in cat ? (cat as {image: string}).image : "/placeholder.svg"} 
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="text-lg md:text-xl font-bold mb-1 group-hover:text-white/90 transition-colors">{cat.name}</h3>
                  
                  <span className="inline-flex items-center text-xs font-medium text-white/80 group-hover:text-white transition-colors">
                    Shop Now
                    <ChevronRight className="h-3 w-3 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default CategorySelection;
