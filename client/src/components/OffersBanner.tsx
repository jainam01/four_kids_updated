import { useLocation } from "wouter";
import { useEffect, useState } from "react";

const OffersBanner = () => {
  const [, navigate] = useLocation();
  const [isBlinking, setIsBlinking] = useState(false);
  
  // Flash effect for the text
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking((prev) => !prev);
    }, 1500);
    
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
  
  return (
    <div className="container mx-auto px-4 my-8">
      <div className="bg-gray-100 rounded-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {offers.map((offer, index) => (
            <div 
              key={index}
              className="flex flex-col items-center justify-center text-center cursor-pointer"
              onClick={() => navigate(offer.link)}
            >
              <div 
                className={`text-2xl font-bold mb-1 transition-opacity duration-500 ${
                  isBlinking ? "opacity-100" : "opacity-80"
                }`}
              >
                {offer.code}
              </div>
              <div className="text-sm font-medium">
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