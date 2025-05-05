import { useLocation } from "wouter";
import { useEffect, useState } from "react";

const OffersBanner = () => {
  const [, navigate] = useLocation();
  const [lightEffect, setLightEffect] = useState<'dim' | 'bright' | 'normal'>('normal');
  
  // Light pulsing effect
  useEffect(() => {
    // Change light effect in a cycle: normal -> bright -> dim -> normal
    const interval = setInterval(() => {
      setLightEffect(prev => {
        if (prev === 'normal') return 'bright';
        if (prev === 'bright') return 'dim';
        return 'normal';
      });
    }, 1200);
    
    return () => clearInterval(interval);
  }, []);
  
  const offers = [
    {
      code: "WELCOME2DQ",
      description: "15% OFF ON FIRST ORDER OVER Rs.8000",
      link: "/category/new-arrivals",
    },
    {
      code: "DESISTART",
      description: "Rs.800 OFF ON ORDERS OVER Rs.8000",
      link: "/category/pants",
    },
    {
      code: "ETHNICLOVE",
      description: "Rs.1200 OFF ON ORDERS OVER Rs.12000",
      link: "/category/traditional",
    },
  ];
  
  // Apply different background styles based on the light effect
  const getBgStyle = () => {
    if (lightEffect === 'bright') {
      return "bg-gradient-to-r from-red-100 via-red-50 to-red-100 shadow-lg";
    } else if (lightEffect === 'dim') {
      return "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200";
    }
    return "bg-gradient-to-r from-gray-100 via-white to-gray-100";
  };
  
  return (
    <div className="container mx-auto px-4 my-8">
      <div className={`rounded-md overflow-hidden transition-all duration-700 ${getBgStyle()}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {offers.map((offer, index) => (
            <div 
              key={index}
              className="flex flex-col items-center justify-center text-center cursor-pointer p-4 rounded-md transition-all duration-500 hover:bg-white/50"
              onClick={() => navigate(offer.link)}
            >
              <div 
                className={`text-2xl font-bold mb-2 transition-all duration-700 relative ${
                  lightEffect === 'bright' ? "text-red-600 scale-105" : 
                  lightEffect === 'dim' ? "text-gray-700" : "text-red-500"
                }`}
              >
                {offer.code}
                {lightEffect === 'bright' && (
                  <div className="absolute inset-0 bg-red-500/10 rounded-full blur-xl -z-10"></div>
                )}
              </div>
              <div className="text-sm font-medium text-gray-700">
                {offer.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OffersBanner;