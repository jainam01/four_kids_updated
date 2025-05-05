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

      <div className="pb-16 md:pb-0"> {/* Add padding at bottom for mobile navigation */}
        <HeroSection />
        <SearchBar />
        <CategorySelection />
        <FeaturedCollection />
        <FilterSection />
        <SizeGuide />
        <Newsletter />
      </div>
    </>
  );
};

export default Home;
