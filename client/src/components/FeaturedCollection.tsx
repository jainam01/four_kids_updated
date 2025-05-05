import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedCollection = () => {
  const [, navigate] = useLocation();
  const { data: featuredCollections, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products', { isFeatured: true }],
  });

  const collections = [
    {
      title: "New Arrivals",
      description: "Fresh styles just landed",
      color: "from-secondary/90 to-secondary",
      path: "/category/new-arrivals",
      image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7"
    },
    {
      title: "School Essentials",
      description: "Ready for the classroom",
      color: "from-primary/90 to-primary",
      path: "/category/school-essentials",
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74"
    },
    {
      title: "Clearance Sale",
      description: "Up to 60% off",
      color: "from-accent/90 to-accent",
      path: "/category/sale",
      image: "https://images.unsplash.com/photo-1557383644-0f7b371688db"
    },
    {
      title: "Special Occasions",
      description: "Picture-perfect styles",
      color: "from-dark/90 to-dark",
      path: "/category/special-occasions",
      image: "https://images.unsplash.com/photo-1520923642038-b4259acecbd7"
    }
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Featured Collection</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Discover our handpicked selection of trending styles perfect for the season
        </p>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, index) => (
            <Skeleton key={index} className="h-80 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection, index) => (
            <div 
              key={index} 
              className={`bg-gradient-to-r ${collection.color} rounded-xl overflow-hidden shadow-md relative cursor-pointer`}
              onClick={() => navigate(collection.path)}
            >
              <img 
                src={collection.image} 
                className="w-full h-80 object-cover mix-blend-overlay" 
                alt={collection.title} 
              />
              <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{collection.title}</h3>
                <p className="mb-4 text-white/90">{collection.description}</p>
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(collection.path);
                  }}
                  className="inline-block bg-white text-foreground font-bold py-2 px-4 rounded-lg hover:bg-accent hover:text-dark transition"
                >
                  Shop Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedCollection;
