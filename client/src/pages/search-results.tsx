import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "wouter";
import { useSearch } from "@/hooks/use-search";
import FilterSection from "@/components/FilterSection";
import SearchBar from "@/components/SearchBar";
import { Search } from "lucide-react";

const SearchResults = () => {
  const [, navigate] = useLocation();
  const [searchParam, setSearchParam] = useState("");
  const { setSearchTerm } = useSearch();

  // Parse search query from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q") || "";
    setSearchParam(query);
    setSearchTerm(query);
  }, [window.location.search, setSearchTerm]);

  return (
    <div className="pb-16 md:pb-0">
      {" "}
      {/* Add padding at bottom for mobile navigation */}
      <Helmet>
        <title>
          {searchParam
            ? `Search results for "${searchParam}"`
            : "Search Products"}{" "}
          - FourKids
        </title>
      </Helmet>
      <SearchBar />
      <div className="container mx-auto px-4 py-4">
        {searchParam ? (
          <>
            <h1 className="text-2xl font-bold mb-6">
              Search results for:{" "}
              <span className="text-primary">"{searchParam}"</span>
            </h1>
            <FilterSection searchTerm={searchParam} />
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center my-8">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Start Your Search</h3>
            <p className="text-gray-500 mb-4 max-w-md mx-auto">
              Enter a search term above to find products in our catalog.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
