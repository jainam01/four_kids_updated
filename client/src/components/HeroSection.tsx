import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [, navigate] = useLocation();

  return (
    <section className="relative bg-gradient-to-r from-secondary to-primary py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-white z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Back to School Collection</h1>
            <p className="text-lg mb-6">Discover our new styles perfect for the classroom and playground!</p>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => navigate("/category/new-arrivals")}
                className="bg-white text-primary font-bold py-3 px-6 rounded-xl hover:bg-accent hover:text-dark transition"
              >
                Shop Now
              </Button>
              <Button
                onClick={() => navigate("/collections")}
                variant="outline"
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-xl hover:bg-white hover:text-primary transition"
              >
                View Collections
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff" 
              alt="Kids in stylish back to school outfits" 
              className="rounded-2xl shadow-lg max-w-xs md:max-w-md object-cover"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-background" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
    </section>
  );
};

export default HeroSection;
