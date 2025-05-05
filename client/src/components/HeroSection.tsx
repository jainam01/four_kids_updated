import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Award, Palette } from "lucide-react";

const HeroSection = () => {
  const [, navigate] = useLocation();

  return (
    <div>
      {/* Top Banner - Style 1 */}
      <div className="bg-[#b5e3d8] text-black m-2.5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center py-3 text-center">
            <div className="flex-1 pb-3 md:pb-0">
              <p className="text-2xl md:text-2xl text-base font-bold mb-0 md:mb-1 text-[#232323] uppercase">FREE SHIPPING ACROSS USA</p>
              <p className="text-base md:text-base text-xs leading-[22px] text-[#3c3c3c] mb-0">Enjoy free shipping on all orders</p>
            </div>
            <div className="hidden md:block w-px h-14 bg-[#232323]/20 mx-8"></div>
            <div className="flex-1">
              <p className="text-2xl md:text-2xl text-base font-bold mb-0 md:mb-1 text-[#232323] uppercase">UNBEATABLE INTERNATIONAL PRICE</p>
              <p className="text-base md:text-base text-xs leading-[22px] text-[#3c3c3c] mb-0">Shop trendy picks at best lowest prices!</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Top Banner - Style 2 */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-2 gap-8">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-sm font-bold text-[#232323]">MADE IN USA</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-gray-200"></div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="text-sm font-bold text-[#232323]">ASSURED QUALITY</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-gray-200"></div>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              <span className="text-sm font-bold text-[#232323]">TRENDY DESIGNS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="relative">
          {/* Left decorative element */}
          <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gradient-to-r from-primary/5 to-primary/0 z-0"></div>
          
          {/* Right decorative element */}
          <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-l from-primary/5 to-primary/0 z-0"></div>
        
          <div className="container mx-auto px-4 py-10 md:py-16 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-primary inline-block text-white text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full mb-4">
                  New Collection
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                  Back to School <span className="text-primary">Collection</span>
                </h1>
                
                <p className="text-gray-600 mb-8 text-lg">
                  Discover our new styles perfect for the classroom and playground. 
                  Quality clothing that grows with your child.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={() => navigate("/category/new-arrivals")}
                    className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md flex items-center gap-2"
                  >
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    onClick={() => navigate("/collections")}
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary/5 font-medium py-3 px-6 rounded-md"
                  >
                    View Collections
                  </Button>
                </div>
                
                <div className="mt-8 grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">150+</div>
                    <div className="text-xs text-gray-500 uppercase">Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">50+</div>
                    <div className="text-xs text-gray-500 uppercase">Styles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">5+</div>
                    <div className="text-xs text-gray-500 uppercase">Categories</div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2 relative">
                <div className="absolute -top-8 -right-8 w-40 h-40 bg-accent/20 rounded-full z-0"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/20 rounded-full z-0"></div>
                
                <div className="bg-white p-3 rounded-xl shadow-lg relative z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff" 
                    alt="Kids in stylish back to school outfits" 
                    className="rounded-lg w-full h-auto object-cover"
                  />
                  
                  <div className="absolute -bottom-5 -left-5 bg-white p-2 rounded-lg shadow-md">
                    <div className="bg-primary/10 text-primary text-xl font-bold px-3 py-1 rounded">
                      -30%
                    </div>
                  </div>
                  
                  <div className="absolute -top-5 -right-5 bg-white p-3 rounded-full shadow-md">
                    <div className="bg-accent/10 text-black text-xs font-bold px-2 py-1 rounded-full">
                      NEW
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;