import { Link } from "wouter";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  MapPin, 
  Mail, 
  Phone 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FourKids</h3>
            <p className="text-gray-400 mb-4">
              Fashion that grows with your child. Quality clothing for every occasion.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/new-arrivals" className="text-gray-400 hover:text-white">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/category/best-sellers" className="text-gray-400 hover:text-white">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/category/sale" className="text-gray-400 hover:text-white">
                  Sale Items
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-gray-400 hover:text-white">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/gift-cards" className="text-gray-400 hover:text-white">
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/support" className="text-gray-400 hover:text-white">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-400 hover:text-white">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-400 hover:text-white">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-white">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-gray-400 hover:text-white">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <span className="text-gray-400">123 Fashion Street, New York, NY 10001</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">support@fourkids.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">+1 (800) 123-4567</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Store Hours</h4>
              <p className="text-gray-400">Mon-Fri: 9AM - 8PM</p>
              <p className="text-gray-400">Sat-Sun: 10AM - 6PM</p>
            </div>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-700 text-gray-400 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; {new Date().getFullYear()} FourKids. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white">Terms of Service</Link>
              <Link href="/accessibility" className="hover:text-white">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
