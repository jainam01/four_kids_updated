import { Helmet } from "react-helmet";
import HeroSection from "@/components/HeroSection";
import SearchBar from "@/components/SearchBar";
import CategorySelection from "@/components/CategorySelection";
import FilterSection from "@/components/FilterSection";
import FeaturedCollection from "@/components/FeaturedCollection";
import SizeGuide from "@/components/SizeGuide";
import Newsletter from "@/components/Newsletter";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>FourKids - Children's Clothing Store</title>
        <meta name="description" content="Quality children's clothing for all occasions. Shop our collection of kids fashion items." />
      </Helmet>

      <div className="pb-16 md:pb-0 bg-gray-50"> {/* Add padding at bottom for mobile navigation */}
        <HeroSection />
        
        {/* Benefits Bar */}
        <div className="bg-white py-5 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center justify-center md:justify-start gap-3 py-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Free Shipping Over $50</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3 py-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">30-Day Returns</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3 py-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">24/7 Customer Support</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3 py-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
        
        <CategorySelection />
        <FeaturedCollection />
        
        {/* Trending Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
              <div>
                <h2 className="section-title text-2xl md:text-3xl font-bold">Trending Now</h2>
                <p className="text-gray-600 mt-2">Most popular items based on sales</p>
              </div>
              <div className="mt-4 md:mt-0">
                <button className="btn-primary py-2 px-4 rounded-md flex items-center gap-2">
                  View All
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            <FilterSection />
          </div>
        </section>
        
        <SizeGuide />
        <Newsletter />
      </div>
    </>
  );
};

export default Home;
