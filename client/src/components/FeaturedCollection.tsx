import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";

const FeaturedCollection = () => {
  const [, navigate] = useLocation();
  const { data: featuredCollections, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products', { isFeatured: true }],
  });

  const collections = [
    {
      title: "New Arrivals",
      description: "Fresh styles just landed",
      badge: "New Season",
      path: "/category/new-arrivals",
      image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7",
      accentColor: "bg-primary/10 text-primary"
    },
    {
      title: "School Essentials",
      description: "Ready for the classroom",
      badge: "Best Seller",
      path: "/category/school-essentials",
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74",
      accentColor: "bg-secondary/10 text-secondary"
    },
    {
      title: "Clearance Sale",
      description: "Up to 60% off",
      badge: "Limited Time",
      path: "/category/sale",
      image: "https://images.unsplash.com/photo-1557383644-0f7b371688db",
      accentColor: "bg-accent/10 text-accent"
    },
    {
      title: "Special Occasions",
      description: "Picture-perfect styles",
      badge: "Featured",
      path: "/category/special-occasions",
      image: "https://images.unsplash.com/photo-1520923642038-b4259acecbd7",
      accentColor: "bg-black/10 text-black"
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="section-title text-2xl md:text-3xl font-bold">Featured Collections</h2>
            <p className="text-gray-500 mt-2">
              Discover our handpicked selection of trending styles perfect for the season
            </p>
          </div>
          
          <Button
            onClick={() => navigate("/collections")}
            variant="ghost"
            className="mt-4 md:mt-0 text-primary hover:text-primary/90 hover:bg-primary/5 flex items-center gap-1"
          >
            View All Collections
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4).fill(0).map((_, index) => (
              <Skeleton key={index} className="h-96 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((collection, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group relative"
                onClick={() => navigate(collection.path)}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={collection.image} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={collection.title} 
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${collection.accentColor}`}>
                      {collection.badge}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{collection.title}</h3>
                  <p className="text-gray-600 mb-4">{collection.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(collection.path);
                      }}
                      variant="ghost"
                      className="px-0 text-primary hover:text-primary/90 hover:bg-transparent flex items-center gap-1 text-sm font-medium"
                    >
                      Shop Collection
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    
                    <span className="text-sm text-gray-500 font-medium group-hover:text-primary transition-colors">15+ Items</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCollection;
