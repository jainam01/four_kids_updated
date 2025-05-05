import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Category as CategoryType } from "@shared/schema";
import FilterSection from "@/components/FilterSection";
import { Skeleton } from "@/components/ui/skeleton";

const Category = () => {
  const { slug } = useParams();
  
  const { data: category, isLoading: isLoadingCategory } = useQuery<CategoryType>({
    queryKey: [`/api/categories/${slug}`],
  });
  
  return (
    <div className="pb-16 md:pb-0"> {/* Add padding at bottom for mobile navigation */}
      <Helmet>
        <title>{isLoadingCategory ? "Loading category..." : `${category?.name || "Category"} - FourKids`}</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {isLoadingCategory ? (
          <div className="mb-8">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
        ) : (
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{category?.name}</h1>
            <p className="text-gray-600">{category?.description}</p>
          </div>
        )}
        
        <FilterSection categorySlug={slug} />
      </div>
    </div>
  );
};

export default Category;
