import { Link } from "wouter";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  MapPin, 
  Mail, 
  Phone,
  CreditCard,
  Send,
  Heart,
  ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-6">
      {/* Main Footer */}
      <div className="container mx-auto px-4">
        {/* Newsletter and Social Media */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold mb-4">Stay in the Loop</h3>
              <p className="text-gray-600 mb-6">
                Subscribe to our newsletter for the latest updates, exclusive offers, and children's fashion tips.
              </p>
              
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Input 
                    type="email" 
                    placeholder="Enter your email"
                    className="pr-12 border-gray-200 rounded-lg focus-visible:ring-primary"
                  />
                  <Button 
                    type="submit" 
                    className="absolute right-0 top-0 bottom-0 bg-primary hover:bg-primary/90 text-white rounded-r-lg"
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Subscribe</span>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="md:border-l md:border-gray-200 md:pl-8">
              <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
              <p className="text-gray-600 mb-4">
                Follow us on social media for style inspiration and exclusive deals.
              </p>
              
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-100 p-3 rounded-full text-gray-600 hover:bg-primary hover:text-white transition-colors">
                  <Facebook size={18} />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="bg-gray-100 p-3 rounded-full text-gray-600 hover:bg-primary hover:text-white transition-colors">
                  <Instagram size={18} />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="#" className="bg-gray-100 p-3 rounded-full text-gray-600 hover:bg-primary hover:text-white transition-colors">
                  <Twitter size={18} />
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="#" className="bg-gray-100 p-3 rounded-full text-gray-600 hover:bg-primary hover:text-white transition-colors">
                  <Youtube size={18} />
                  <span className="sr-only">YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <h3 className="text-xl font-bold">FourKids</h3>
              <div className="ml-2 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">Official Store</div>
            </div>
            
            <p className="text-gray-500 mb-4">
              Fashion that grows with your child. Quality clothing for every occasion at affordable prices.
            </p>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm">Secure payments</span>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Send className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm">Fast delivery</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm">Quality guaranteed</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              Shop
              <ChevronRight className="h-4 w-4 ml-1 md:hidden" />
            </h3>
            
            <ul className="space-y-3">
              <li>
                <Link href="/category/new-arrivals" className="text-gray-500 hover:text-primary transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/category/best-sellers" className="text-gray-500 hover:text-primary transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/category/sale" className="text-gray-500 hover:text-primary transition-colors">
                  Sale Items
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-gray-500 hover:text-primary transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/gift-cards" className="text-gray-500 hover:text-primary transition-colors">
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              Help
              <ChevronRight className="h-4 w-4 ml-1 md:hidden" />
            </h3>
            
            <ul className="space-y-3">
              <li>
                <Link href="/support" className="text-gray-500 hover:text-primary transition-colors">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-500 hover:text-primary transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-500 hover:text-primary transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-500 hover:text-primary transition-colors">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-gray-500 hover:text-primary transition-colors">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              Contact Us
              <ChevronRight className="h-4 w-4 ml-1 md:hidden" />
            </h3>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-gray-500">123 Fashion Street, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:support@fourkids.com" className="text-gray-500 hover:text-primary transition-colors">
                  support@fourkids.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="tel:+18001234567" className="text-gray-500 hover:text-primary transition-colors">
                  +1 (800) 123-4567
                </a>
              </li>
            </ul>
            
            <div className="mt-6 bg-white p-4 rounded-lg border border-gray-100">
              <h4 className="font-semibold mb-2 text-sm">Store Hours</h4>
              <p className="text-gray-500 text-sm">Mon-Fri: 9AM - 8PM</p>
              <p className="text-gray-500 text-sm">Sat-Sun: 10AM - 6PM</p>
            </div>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-8 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
          <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="MasterCard" className="h-8 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
          <img src="https://cdn-icons-png.flaticon.com/512/196/196565.png" alt="PayPal" className="h-8 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
          <img src="https://cdn-icons-png.flaticon.com/512/196/196539.png" alt="American Express" className="h-8 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
          <img src="https://cdn-icons-png.flaticon.com/512/5968/5968389.png" alt="Apple Pay" className="h-8 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
          <img src="https://cdn-icons-png.flaticon.com/512/6124/6124998.png" alt="Google Pay" className="h-8 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
        </div>
        
        {/* Bottom Footer */}
        <div className="pt-6 border-t border-gray-200 text-gray-500 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <p>&copy; {new Date().getFullYear()} FourKids. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link href="/accessibility" className="hover:text-primary transition-colors">Accessibility</Link>
              <Link href="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
