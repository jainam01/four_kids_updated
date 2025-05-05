import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  
  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);
  
  // Fetch results based on debounced term
  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products', { search: debouncedTerm }],
    enabled: debouncedTerm.length > 1,
  });
  
  useEffect(() => {
    if (data) {
      setSearchResults(data);
    } else {
      setSearchResults([]);
    }
  }, [data]);
  
  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isLoading,
  };
};
