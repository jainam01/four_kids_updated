import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ProductDetail from "@/pages/product-detail";
import Cart from "@/pages/cart";
import Watchlist from "@/pages/watchlist";
import Category from "@/pages/category";
import SearchResults from "@/pages/search-results";
import Support from "@/pages/support";
import Admin from "@/pages/admin";
import About from "@/pages/about";
import Wholesale from "@/pages/wholesale";
import Login from "@/pages/login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNavigation from "./components/MobileNavigation";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "./context/CartContext";
import { WatchlistProvider } from "./context/WatchlistContext";
import Products from "@/pages/products";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/product/:slug" component={ProductDetail} />
          <Route path="/cart" component={Cart} />
          <Route path="/watchlist" component={Watchlist} />
          <Route path="/category/:slug" component={Category} />
          <Route path="/products" component={Products} />
          <Route path="/search" component={SearchResults} />
          <Route path="/support" component={Support} />
          <Route path="/admin" component={Admin} />
          <Route path="/about" component={About} />
          <Route path="/category/wholesale" component={Wholesale} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <MobileNavigation />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <TooltipProvider>
        <WatchlistProvider>
          <CartProvider>
            <Toaster />
            <Router />
          </CartProvider>
        </WatchlistProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;