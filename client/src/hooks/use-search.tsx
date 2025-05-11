// src/hooks/use-search.tsx
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema"; // Ensure this path and type are correct

// This hook is now tailored for providing autocomplete suggestions
export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  // Debounce search term input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch a limited number of suggestions for autocomplete
  // The API endpoint '/api/products/suggestions' or similar should be optimized for this
  const { data: autocompleteResults = [], isLoading: isLoadingAutocomplete } =
    useQuery<Product[]>({
      // Example: Query key includes a 'type' or specific endpoint for suggestions
      queryKey: [
        "/api/products/suggestions",
        { search: debouncedTerm, limit: 5 },
      ], // Fetch only 5 suggestions
      queryFn: async ({ queryKey }) => {
        const [, params] = queryKey as [
          string,
          { search: string; limit: number },
        ];
        if (!params.search || params.search.trim().length <= 1) {
          return []; // Don't fetch if search term is too short
        }
        // Replace with your actual API call
        // Example: const response = await fetch(`/api/products?search=${encodeURIComponent(params.search)}&limit=${params.limit}&fields=id,name,slug,images,price,salePrice`);
        // For now, using a mock. Ensure your API returns what SearchBar expects.
        console.log(`Fetching suggestions for: ${params.search}`);

        // --- MOCK API RESPONSE FOR AUTOCOMPLETE ---
        // This should ideally come from an API endpoint like /api/products/suggestions?term=...&limit=5
        const allMockProducts: Product[] = [
          {
            id: "1",
            slug: "cool-blue-pants-regular",
            name: "Cool Blue Pants - Regular Fit",
            description:
              "Comfortable and stylish blue pants for everyday wear.",
            images: ["/placeholders/pants_blue_1.jpg"],
            price: 49.99,
            salePrice: 39.99,
            category: "Pants",
            categoryId: "cat-pants",
            inStock: true,
            isNew: true,
            rating: 4.5,
            reviewCount: 120,
            sizes: ["S", "M", "L", "XL"],
            colors: ["Blue", "Black"],
            createdAt: new Date("2023-10-01T10:00:00Z").toISOString(),
          },
          {
            id: "2",
            slug: "rugged-cargo-shorts-khaki",
            name: "Rugged Cargo Shorts - Khaki",
            description: "Durable cargo shorts.",
            images: ["/placeholders/shorts_cargo_khaki_1.jpg"],
            price: 39.99,
            category: "Shorts",
            categoryId: "cat-shorts",
            inStock: true,
            isNew: false,
            rating: 4.2,
            reviewCount: 85,
            sizes: ["M", "L", "XL"],
            colors: ["Khaki", "Olive"],
            createdAt: new Date("2023-09-15T10:00:00Z").toISOString(),
          },
          {
            id: "3",
            slug: "classic-mom-jeans-lightwash",
            name: "Classic Mom Jeans - Lightwash",
            description: "Timeless mom jeans.",
            images: ["/placeholders/jeans_mom_lightwash_1.jpg"],
            price: 59.99,
            category: "Mom Fit",
            categoryId: "cat-momfit",
            inStock: false,
            isNew: false,
            rating: 4.8,
            reviewCount: 200,
            sizes: ["S", "M", "L"],
            colors: ["Lightwash Blue"],
            createdAt: new Date("2023-08-20T10:00:00Z").toISOString(),
          },
          {
            id: "4",
            slug: "urban-utility-cargo-black",
            name: "Urban Utility Cargo - Black",
            description: "Sleek black utility cargo pants.",
            images: ["/placeholders/pants_cargo_black_1.jpg"],
            price: 65.0,
            category: "Cargo Pants",
            categoryId: "cat-cargo",
            inStock: true,
            isNew: true,
            rating: 4.6,
            reviewCount: 95,
            sizes: ["S", "M", "L", "XL"],
            colors: ["Black", "Graphite"],
            createdAt: new Date("2023-10-05T10:00:00Z").toISOString(),
          },
          {
            id: "5",
            name: "Basic Tee - White",
            slug: "basic-tee-white",
            description: "A simple white tee.",
            images: ["/placeholders/tee_white_1.jpg"],
            price: 19.99,
            category: "Tops",
            categoryId: "cat-tops",
            inStock: true,
            isNew: false,
            rating: 4.0,
            reviewCount: 50,
            sizes: ["S", "M", "L"],
            colors: ["White", "Black"],
            createdAt: new Date().toISOString(),
          },
        ];
        const filtered = allMockProducts.filter((p) =>
          p.name.toLowerCase().includes(params.search.toLowerCase()),
        );
        return Promise.resolve(filtered.slice(0, params.limit));
        // --- END MOCK ---
      },
      enabled: debouncedTerm.trim().length > 1, // Only run query if debounced term is long enough
      staleTime: 1000 * 60 * 5, // Cache suggestions for 5 minutes
    });

  // Expose searchResults (which are now autocompleteResults)
  // The SearchBar component expects 'searchResults' and 'isLoading'
  return {
    searchTerm,
    setSearchTerm,
    searchResults: autocompleteResults, // This is what SearchBar.tsx will use for the dropdown
    isLoading: isLoadingAutocomplete, // Loading state for the autocomplete suggestions
  };
};
