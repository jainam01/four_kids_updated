import { Helmet } from "react-helmet";
import HeroSection from "@/components/HeroSection";
import SearchBar from "@/components/SearchBar";
import CategorySelection from "@/components/CategorySelection";
import FeaturedCollection from "@/components/FeaturedCollection";
import WholesaleCTA from "@/components/WholesaleCTA";
import OffersBanner from "@/components/OffersBanner";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>FourKids - Children's Clothing Store</title>
        <meta name="description" content="Quality children's clothing for all occasions. Shop our collection of kids fashion items." />
      </Helmet>

      <div className="pb-16 md:pb-0 bg-gray-50"> {/* Add padding at bottom for mobile navigation */}
        <HeroSection />
        <OffersBanner />
        <CategorySelection />
        <FeaturedCollection />
        <WholesaleCTA />
      </div>
    </>
  );
};

export default Home;