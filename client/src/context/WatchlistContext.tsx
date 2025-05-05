import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@shared/schema";

interface WatchlistItem {
  id: number;
  productId: number;
  product: Product;
  createdAt: string;
}

interface WatchlistContextType {
  watchlistItems: WatchlistItem[];
  isLoading: boolean;
  addToWatchlist: (productId: number) => Promise<void>;
  removeFromWatchlist: (productId: number) => Promise<void>;
  clearWatchlist: () => Promise<void>;
  isInWatchlist: (productId: number) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>([]);
  
  const { data: watchlist, isLoading } = useQuery<WatchlistItem[]>({
    queryKey: ['/api/watchlist'],
    retry: 1,
  });
  
  useEffect(() => {
    if (watchlist) {
      setWatchlistItems(watchlist);
    }
  }, [watchlist]);
  
  const addToWatchlist = async (productId: number) => {
    try {
      await apiRequest('POST', '/api/watchlist/add', { productId });
      await queryClient.invalidateQueries({ queryKey: ['/api/watchlist'] });
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      toast({
        title: "Error",
        description: "Failed to add item to watchlist",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  const removeFromWatchlist = async (productId: number) => {
    const item = watchlistItems.find(item => item.product.id === productId);
    if (!item) return;
    
    try {
      await apiRequest('DELETE', `/api/watchlist/remove/${item.id}`, undefined);
      await queryClient.invalidateQueries({ queryKey: ['/api/watchlist'] });
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from watchlist",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  const clearWatchlist = async () => {
    try {
      // Sequentially remove all items
      for (const item of watchlistItems) {
        await apiRequest('DELETE', `/api/watchlist/remove/${item.id}`, undefined);
      }
      await queryClient.invalidateQueries({ queryKey: ['/api/watchlist'] });
    } catch (error) {
      console.error('Error clearing watchlist:', error);
      toast({
        title: "Error",
        description: "Failed to clear watchlist",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  const isInWatchlist = (productId: number): boolean => {
    return watchlistItems.some(item => item.product.id === productId);
  };
  
  return (
    <WatchlistContext.Provider
      value={{
        watchlistItems,
        isLoading,
        addToWatchlist,
        removeFromWatchlist,
        clearWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};
