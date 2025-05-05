import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // In a real app, we would send this to an API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-secondary to-primary py-12 my-12 rounded-xl">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Join Our Newsletter</h2>
        <p className="text-white text-opacity-90 mb-6 max-w-xl mx-auto">
          Stay updated with the latest trends, exclusive offers, and new arrivals for your children.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow py-3 px-4 rounded-lg border-0 focus:ring-2 focus:ring-accent"
            disabled={isSubmitting}
          />
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-accent text-dark font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition whitespace-nowrap"
          >
            {isSubmitting ? (
              <div className="flex space-x-1">
                <div className="loading-dot w-2 h-2 bg-dark rounded-full"></div>
                <div className="loading-dot w-2 h-2 bg-dark rounded-full"></div>
                <div className="loading-dot w-2 h-2 bg-dark rounded-full"></div>
              </div>
            ) : 'Subscribe'}
          </Button>
        </form>
        
        <p className="text-white text-opacity-70 text-sm mt-4">
          By subscribing, you agree to our Privacy Policy and consent to receive updates from us.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
