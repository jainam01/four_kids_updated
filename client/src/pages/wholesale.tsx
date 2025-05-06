import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Calculator, CheckCircle2, FileText, Package, Truck } from "lucide-react";

const benefits = [
  {
    icon: CheckCircle2,
    title: "Competitive Pricing",
    description: "Access wholesale rates with volume-based discounts to maximize your profit margins."
  },
  {
    icon: Package,
    title: "Quality Products",
    description: "Premium quality children's clothing with rigorous quality control standards."
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    description: "Quick nationwide delivery with free shipping on orders above ₹10,000."
  },
  {
    icon: FileText,
    title: "Exclusive Access",
    description: "Early access to new collections and seasonal lookbooks."
  }
];

const Wholesale = () => {
  const { toast } = useToast();
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [message, setMessage] = useState('');
  const [taxId, setTaxId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Wholesale application submitted",
      description: "Our team will review your application and contact you soon.",
    });
    setBusinessName('');
    setContactName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setBusinessType('');
    setMessage('');
    setTaxId('');
  };

  return (
    <main className="flex-grow">
      <div className="relative py-16 px-4 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/placeholder.svg")' }}>
        <div className="container mx-auto text-center text-white z-10 relative">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Wholesale Program</h1>
          <nav aria-label="Breadcrumb">
            <ol className="flex justify-center items-center space-x-2">
              <li>
                <a className="hover:text-primary transition-colors flex items-center" href="/">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house h-4 w-4 mr-1">
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  Home
                </a>
              </li>
              <li className="flex items-center">
                <ArrowRight className="h-4 w-4 mx-2 text-gray-300" />
                <span className="text-primary">Wholesale</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Partner with FouKids</h2>
            <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
              Join our network of retailers and resellers to access premium quality children's clothing at competitive wholesale prices. 
              We offer flexible terms, reliable shipping, and exceptional product support.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="default" size="lg" asChild>
                <a href="/contact">Become a Partner</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/products">View Product Catalog</a>
              </Button>
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Wholesale Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: 1, title: "Register", desc: "Fill out our wholesale application form with your business details." },
                { number: 2, title: "Approval", desc: "Our team reviews your application and provides access to wholesale pricing." },
                { number: 3, title: "Order", desc: "Place your wholesale orders through our dedicated B2B portal." }
              ].map((step) => (
                <div key={step.number} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="flex flex-col space-y-1.5 p-6 text-center pb-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-bold text-xl">{step.number}</span>
                    </div>
                    <h3 className="font-semibold tracking-tight text-xl">{step.title}</h3>
                  </div>
                  <div className="p-6 pt-0">
                    <p className="text-gray-600 text-center">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <Tabs defaultValue="pricing">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="minimums">Order Minimums</TabsTrigger>
                <TabsTrigger value="shipping">Shipping & Terms</TabsTrigger>
              </TabsList>
              <TabsContent value="pricing" className="bg-white p-6 border rounded-b-md shadow-sm">
                <h4 className="text-lg font-semibold mb-4">Wholesale Pricing Structure</h4>
                <p className="mb-4">Our wholesale prices offer significant discounts off retail prices:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
                  <li>Standard Wholesale: 30-40% off retail prices</li>
                  <li>Volume Discount: Additional 5% on orders above ₹25,000</li>
                  <li>Loyalty Discount: Additional 3% for regular partners (after 3+ orders)</li>
                </ul>
                <p>Exact pricing is available after wholesale account approval.</p>
              </TabsContent>
              <TabsContent value="minimums" className="bg-white p-6 border rounded-b-md shadow-sm">
                <h4 className="text-lg font-semibold mb-4">Minimum Order Requirements</h4>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
                  <li>Initial Order: ₹10,000 minimum</li>
                  <li>Reorder Minimum: ₹5,000</li>
                  <li>Category Minimum: 6 pieces per style/color</li>
                </ul>
              </TabsContent>
              <TabsContent value="shipping" className="bg-white p-6 border rounded-b-md shadow-sm">
                <h4 className="text-lg font-semibold mb-4">Shipping & Payment Terms</h4>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
                  <li>Free shipping on orders above ₹10,000</li>
                  <li>2-5 business days delivery nationwide</li>
                  <li>Payment terms: 50% advance, 50% before dispatch</li>
                  <li>Returns accepted for manufacturing defects</li>
                </ul>
              </TabsContent>
            </Tabs>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Profit Calculator</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Use our simple calculator to estimate your potential profits when reselling FouKids products.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { name: "Basic Pants", wholesale: "149", retail: "249", margin: "40" },
                { name: "Cargo Pants", wholesale: "199", retail: "349", margin: "43" },
                { name: "Mom Fit", wholesale: "229", retail: "399", margin: "43" }
              ].map((product) => (
                <div key={product.name} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="flex flex-col space-y-1.5 p-6 pb-2">
                    <h3 className="font-semibold tracking-tight text-lg">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">Average wholesale price</p>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="text-2xl font-bold">₹{product.wholesale}</div>
                    <p className="text-sm text-gray-500">Suggested retail: ₹{product.retail}</p>
                    <div className="mt-2 text-sm text-green-600">~{product.margin}% Margin</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button>
                <a href="/contact">Request Full Price List</a>
              </Button>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join our wholesale program today and start offering high-quality children's clothing to your customers.
            </p>
            <Button size="lg">
              <a href="/contact">Apply for Wholesale Account</a>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Wholesale;