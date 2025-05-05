import { useState } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { 
  Trash2, 
  ShoppingBag, 
  ChevronLeft, 
  CreditCard, 
  Truck, 
  ShieldCheck 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import { SizeButton } from "@/components/ui/size-button";
import { ColorButton } from "@/components/ui/color-button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const Cart = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { cartItems, updateCartItem, removeFromCart, clearCart, cartTotal } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [discount, setDiscount] = useState(0);
  
  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      await updateCartItem(itemId, newQuantity);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      });
    }
  };
  
  const handleRemoveItem = async (itemId: number) => {
    try {
      await removeFromCart(itemId);
      toast({
        description: "Item removed from cart",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      });
    }
  };
  
  const handleClearCart = async () => {
    try {
      await clearCart();
      toast({
        description: "Cart has been cleared",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      });
    }
  };
  
  const handleApplyPromo = async () => {
    setIsApplyingPromo(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (promoCode.toUpperCase() === "KIDS10") {
        const discountAmount = cartTotal * 0.1;
        setDiscount(discountAmount);
        toast({
          title: "Promo code applied",
          description: `You saved ${formatCurrency(discountAmount)}!`,
        });
      } else {
        toast({
          title: "Invalid promo code",
          description: "Please check the code and try again",
          variant: "destructive",
        });
      }
    } finally {
      setIsApplyingPromo(false);
    }
  };
  
  const handleCheckout = () => {
    toast({
      title: "Checkout process",
      description: "This would proceed to checkout in a real application",
    });
    // In a real app, this would navigate to the checkout page
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 pb-16 md:pb-8">
        <Helmet>
          <title>Your Cart - FourKids</title>
        </Helmet>
        
        <div className="max-w-2xl mx-auto text-center py-16">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button 
            onClick={() => navigate("/")}
            className="bg-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-opacity-90 transition"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }
  
  const subtotal = cartTotal;
  const shipping = subtotal > 50 ? 0 : 4.99;
  const taxes = subtotal * 0.08; // Assume 8% tax rate
  const total = subtotal + shipping + taxes - discount;
  
  return (
    <div className="container mx-auto px-4 py-8 pb-16 md:pb-8">
      <Helmet>
        <title>Your Cart - FourKids</title>
      </Helmet>
      
      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 flex justify-between items-center border-b">
              <h2 className="font-bold">{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}</h2>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear Cart
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear your cart?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove all items from your cart. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearCart}>Clear Cart</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            
            <div>
              {cartItems.map((item) => (
                <div key={item.id} className="p-6 border-b last:border-b-0 flex flex-col sm:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{item.product.name}</h3>
                      <span className="font-bold text-primary">
                        {formatCurrency(
                          (item.product.salePrice || item.product.price) * item.quantity
                        )}
                      </span>
                    </div>
                    
                    <div className="mt-2 flex flex-wrap gap-2 text-sm text-muted-foreground">
                      <span>Size: {item.size}</span>
                      <span className="mx-1">•</span>
                      <span>Color: {item.color}</span>
                      {item.product.salePrice && (
                        <>
                          <span className="mx-1">•</span>
                          <span className="text-error">On Sale</span>
                        </>
                      )}
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-6 bg-muted/50">
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => navigate("/")}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="font-bold text-lg mb-4">Order Summary</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Tax</span>
                  <span>{formatCurrency(taxes)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
            
            <div className="p-6 border-b">
              <h3 className="font-semibold mb-2">Promo Code</h3>
              <div className="flex">
                <Input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="rounded-r-none"
                />
                <Button
                  onClick={handleApplyPromo}
                  disabled={!promoCode || isApplyingPromo}
                  className="rounded-l-none"
                >
                  {isApplyingPromo ? (
                    <div className="flex space-x-1">
                      <div className="loading-dot w-2 h-2 bg-current rounded-full"></div>
                      <div className="loading-dot w-2 h-2 bg-current rounded-full"></div>
                      <div className="loading-dot w-2 h-2 bg-current rounded-full"></div>
                    </div>
                  ) : "Apply"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Try "KIDS10" for 10% off your order
              </p>
            </div>
            
            <div className="p-6">
              <Button
                onClick={handleCheckout}
                className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition mb-4"
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Proceed to Checkout
              </Button>
              
              <div className="space-y-3 mt-6">
                <div className="flex items-center text-sm">
                  <Truck className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center text-sm">
                  <ShieldCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Secure checkout process</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bulk Order Banner */}
          <div className="mt-4 bg-primary/10 rounded-xl p-4">
            <h3 className="font-semibold text-primary mb-2">Need Multiple Items?</h3>
            <p className="text-sm mb-3">Get special discounts when you order in bulk.</p>
            <Button 
              variant="outline" 
              className="w-full border-primary text-primary hover:bg-primary hover:text-white"
              onClick={() => navigate("/support")}
            >
              Request Bulk Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
