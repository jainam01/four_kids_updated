import { useState } from 'react';
import { useLocation } from 'wouter';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearch } from '@/hooks/use-search';

const SearchBar = () => {
  const [, navigate] = useLocation();
  const { searchTerm, setSearchTerm, searchResults } = useSearch();
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="relative">
        <form onSubmit={handleSearch} className="bg-white rounded-xl shadow-sm flex items-center p-2 mx-auto max-w-3xl">
          <Search className="h-5 w-5 text-gray-400 ml-2" />
          <Input
            type="text"
            placeholder="Search for kids clothing..."
            className="w-full p-2 border-0 outline-none focus-visible:ring-0 font-nunito text-dark"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          />
          <Button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-opacity-90 transition">
            Search
          </Button>
        </form>

        {/* Autocomplete dropdown */}
        {isFocused && searchTerm && searchResults.length > 0 && (
          <div className="absolute z-10 mt-1 max-w-3xl w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-100">
              {searchResults.slice(0, 5).map((result) => (
                <li key={result.id}>
                  <button
                    className="flex items-center px-4 py-3 w-full text-left hover:bg-muted"
                    onClick={() => {
                      navigate(`/product/${result.slug}`);
                      setSearchTerm('');
                    }}
                  >
                    <img
                      src={result.images[0]}
                      alt={result.name}
                      className="w-10 h-10 object-cover rounded-md mr-3"
                    />
                    <div>
                      <p className="font-semibold">{result.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${result.salePrice || result.price}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
              <li className="px-4 py-2 text-center">
                <button
                  className="text-primary font-semibold text-sm"
                  onClick={() => {
                    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
                    setSearchTerm('');
                  }}
                >
                  See all results
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
