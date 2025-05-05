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
      <div className="bg-white border-b border-gray-100 mx-2.5">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-2 gap-8">
            <div className="flex items-center gap-2 rounded px-5 py-3.5">
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-base md:text-base text-sm font-bold text-[#232323] mb-0">MADE IN USA</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-gray-200"></div>
            <div className="flex items-center gap-2 rounded px-5 py-3.5">
              <Award className="h-5 w-5 text-primary" />
              <span className="text-base md:text-base text-sm font-bold text-[#232323] mb-0">ASSURED QUALITY</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-gray-200"></div>
            <div className="flex items-center gap-2 rounded px-5 py-3.5">
              <Palette className="h-5 w-5 text-primary" />
              <span className="text-base md:text-base text-sm font-bold text-[#232323] mb-0">TRENDY DESIGNS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Hero Section - Based on reference design */}
      <section className="relative bg-[#e8f4f2] overflow-hidden mx-2.5 mt-4 rounded-xl">
        <div className="relative">
          <div className="container mx-auto px-4 py-10 md:py-0 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 py-6 md:py-16 pl-4 md:pl-8">
                <h2 className="text-4xl md:text-6xl font-bold mb-2 text-gray-800">
                  BREEZE '25
                </h2>
                
                <p className="text-gray-600 mb-8 text-lg">
                  Light, Airy, Effortlessly Chic
                </p>
                
                <div className="flex flex-wrap">
                  <Button
                    onClick={() => navigate("/category/new-arrivals")}
                    className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-sm uppercase"
                  >
                    SHOP NOW
                  </Button>
                </div>
              </div>
              
              <div className="order-1 md:order-2 relative">
                <img 
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Fashion models showcasing latest designs" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;