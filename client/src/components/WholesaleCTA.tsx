
import { ArrowRight } from "lucide-react";

const WholesaleCTA = () => (
  <section className="py-20 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/placeholder.svg")' }}>
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Stock Your Store?</h2>
      <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">Contact us today to place your wholesale order and bring FouKids quality to your customers</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8" href="/products">
          Browse Products
          <ArrowRight className="ml-2 h-5 w-5" />
        </a>
        <a className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-11 rounded-md px-8 bg-transparent border-white text-white hover:bg-white hover:text-gray-900" href="/contact">
          Contact Sales Team
        </a>
      </div>
    </div>
  </section>
);

export default WholesaleCTA;
