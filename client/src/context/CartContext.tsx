import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@shared/schema";

interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

interface Cart {
  id: number;
  items: CartItem[];
  total: number;
}

interface AddToCartData {
  productId: number;
  quantity: number;
  size: string;
  color: string;
}

interface CartContextType {
  cartItems: CartItem[];
  cartTotal: number;
  cartCount: number;
  isLoading: boolean;
  addToCart: (data: AddToCartData) => Promise<void>;
  updateCartItem: (itemId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  
  const { data: cart, isLoading } = useQuery<Cart>({
    queryKey: ['/api/cart'],
    retry: 1,
  });
  
  useEffect(() => {
    if (cart) {
      setCartItems(cart.items || []);
      setCartTotal(cart.total || 0);
    }
  }, [cart]);
  
  const addToCart = async (data: AddToCartData) => {
    try {
      await apiRequest('POST', '/api/cart/add', data);
      await queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  const updateCartItem = async (itemId: number, quantity: number) => {
    try {
      await apiRequest('PUT', `/api/cart/update/${itemId}`, { quantity });
      await queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    } catch (error) {
      console.error('Error updating cart item:', error);
      toast({
        title: "Error",
        description: "Failed to update cart item",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  const removeFromCart = async (itemId: number) => {
    try {
      await apiRequest('DELETE', `/api/cart/remove/${itemId}`, undefined);
      await queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  const clearCart = async () => {
    try {
      await apiRequest('POST', '/api/cart/clear', undefined);
      await queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        isLoading,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
