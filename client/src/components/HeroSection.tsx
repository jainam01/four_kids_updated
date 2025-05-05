import { useState, useEffect } from 'react';
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";

const HeroSection = () => {
  const [, navigate] = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      title: "BREEZE '25",
      description: "Light, Airy, Effortlessly Chic",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bgColor: "#e8f4f2",
      link: "/category/new-arrivals"
    },
    {
      title: "STYLISH BASICS",
      description: "Quality Essentials for Every Child",
      image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bgColor: "#f5f0e6",
      link: "/category/pants"
    },
    {
      title: "SUMMER VIBES",
      description: "Colorful, Comfortable, Cool",
      image: "https://images.unsplash.com/photo-1567113463300-102a7eb3cb26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bgColor: "#f6e8e8",
      link: "/category/shorts"
    }
  ];
  
  useEffect(() => {
    // Auto-slide every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroSlides.length]);
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  const goToPrevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
  };
  
  const goToNextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  };
  
  const currentHero = heroSlides[currentSlide];
  
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
      
      {/* Features Banner */}
      <div className="bg-white border-b border-gray-100 mx-2.5">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-2 gap-6 md:gap-8 flex-wrap">
            <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-700">
              <span>Free Shipping Over $50</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-gray-200"></div>
            <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-700">
              <span>30-Day Returns</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-gray-200"></div>
            <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-700">
              <span>24/7 Customer Support</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-gray-200"></div>
            <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-700">
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Hero Section with Carousel */}
      <section 
        className="relative overflow-hidden mx-2.5 mt-4 rounded-xl transition-all duration-500"
        style={{ backgroundColor: currentHero.bgColor }}
      >
        <div className="relative">
          <div className="container mx-auto px-4 py-10 md:py-0 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 py-6 md:py-16 pl-4 md:pl-8 relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold mb-2 text-gray-800">
                  {currentHero.title}
                </h2>
                
                <p className="text-gray-600 mb-8 text-lg">
                  {currentHero.description}
                </p>
                
                <div className="flex flex-wrap">
                  <Button
                    onClick={() => navigate(currentHero.link)}
                    className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-sm uppercase flex items-center"
                  >
                    SHOP NOW
                    <ShoppingBag className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                {/* Carousel Controls */}
                <div className="mt-8 flex items-center">
                  <div className="flex space-x-2 mr-4">
                    {heroSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentSlide === index ? 'bg-black w-6' : 'bg-gray-400'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={goToPrevSlide}
                      className="p-1 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={goToNextSlide}
                      className="p-1 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2 relative">
                <img 
                  key={currentSlide}
                  src={currentHero.image}
                  alt={currentHero.title} 
                  className="w-full h-auto object-cover transition-opacity duration-300"
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