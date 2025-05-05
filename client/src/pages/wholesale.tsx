import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  Briefcase,
  Building2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
    
    // Here you would typically send the data to your API
    toast({
      title: "Wholesale application submitted",
      description: "Our team will review your application and contact you soon.",
    });
    
    // Reset form
    setBusinessName('');
    setContactName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setBusinessType('');
    setMessage('');
    setTaxId('');
  };

  const benefits = [
    {
      icon: CheckCircle2,
      title: "Competitive Pricing",
      description: "Access to our full product range at competitive wholesale prices"
    },
    {
      icon: ShieldCheck,
      title: "Quality Guarantee",
      description: "All products undergo rigorous quality testing before shipping"
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Quick turnaround times with reliable shipping options"
    },
    {
      icon: Briefcase,
      title: "Dedicated Support",
      description: "Personal account manager for all your wholesale needs"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">FourKids Wholesale Program</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Partner with us to bring high-quality children's clothing to your customers.
            Our wholesale program offers competitive pricing, reliable fulfillment, and exceptional support.
          </p>
        </div>

        <Tabs defaultValue="overview" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Program Overview</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="apply">Apply Now</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="p-6 border rounded-md mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">About Our Wholesale Program</h2>
                <p className="text-gray-600 mb-4">
                  FourKids offers a comprehensive wholesale program designed specifically for retailers, 
                  boutiques, and online stores looking to expand their children's clothing offerings.
                </p>
                <p className="text-gray-600 mb-4">
                  Our collections feature high-quality, durable garments for kids aged 5-15, all designed 
                  and made in the USA with an emphasis on ethical manufacturing and sustainability.
                </p>
                <p className="text-gray-600 mb-4">
                  With minimum order quantities starting at just $500, we make it easy for businesses of 
                  all sizes to access our popular product lines.
                </p>
                
                <div className="mt-6">
                  <h3 className="text-lg font-bold mb-2">Key Program Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span className="text-gray-600">No long-term contracts or exclusivity requirements</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span className="text-gray-600">Seasonal pre-order discounts for better margins</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span className="text-gray-600">Dropshipping options available for online retailers</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span className="text-gray-600">Marketing support and product training</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="text-lg font-bold mb-4">Wholesale Requirements</h3>
                <ul className="space-y-4">
                  <li className="pb-4 border-b border-gray-200">
                    <span className="font-medium block mb-1">Valid Business License</span>
                    <span className="text-sm text-gray-600">A current business license and tax ID are required</span>
                  </li>
                  <li className="pb-4 border-b border-gray-200">
                    <span className="font-medium block mb-1">Minimum Order</span>
                    <span className="text-sm text-gray-600">$500 minimum for initial orders, $300 for reorders</span>
                  </li>
                  <li className="pb-4 border-b border-gray-200">
                    <span className="font-medium block mb-1">Brand Representation</span>
                    <span className="text-sm text-gray-600">Commitment to properly represent the FourKids brand</span>
                  </li>
                  <li>
                    <span className="font-medium block mb-1">Payment Terms</span>
                    <span className="text-sm text-gray-600">Net 30 terms available for established accounts</span>
                  </li>
                </ul>
                
                <div className="mt-6 p-4 bg-primary/5 rounded-md">
                  <p className="text-sm text-gray-700">
                    Ready to get started? Click on the "Apply Now" tab to submit your application 
                    or contact our wholesale team directly at 
                    <a href="mailto:wholesale@fourkids.com" className="text-primary font-medium"> wholesale@fourkids.com</a>
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="benefits" className="p-6 border rounded-md mt-2">
            <h2 className="text-2xl font-bold mb-6 text-center">Wholesale Partner Benefits</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                    <div className="mb-4 bg-primary/10 inline-flex p-3 rounded-full">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-8">
              <h3 className="text-xl font-bold mb-4">Pricing Structure</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order Volume
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Discount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Terms
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$500 - $1,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">30% off MSRP</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Prepayment required</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$1,001 - $5,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">35% off MSRP</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Net 15</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$5,001 - $10,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">40% off MSRP</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Net 30</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$10,001+</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">45% off MSRP</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Net 30</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                onClick={() => {
                  // Find the apply tab and click it
                  const applyTab = document.querySelector('[data-value="apply"]') as HTMLElement;
                  if (applyTab) applyTab.click();
                }}
                className="bg-primary hover:bg-primary/90 text-white font-medium py-2.5 px-8 rounded-md"
              >
                Apply Now
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="apply" className="p-6 border rounded-md mt-2">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-center">Wholesale Application</h2>
              <p className="text-gray-600 mb-6 text-center">
                Complete the form below to apply for our wholesale program. Our team will review your 
                application and contact you within 2 business days.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name*
                  </label>
                  <Input
                    id="businessName"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Name*
                  </label>
                  <Input
                    id="contactName"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address*
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number*
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Address*
                  </label>
                  <Textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
                      Business Type*
                    </label>
                    <Input
                      id="businessType"
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      placeholder="Retail Store, Online Shop, etc."
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-1">
                      Tax ID / Business License*
                    </label>
                    <Input
                      id="taxId"
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Information
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your business, target customers, and which product lines you're interested in."
                    className="w-full min-h-[100px]"
                  />
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm text-gray-600">
                  <div className="flex items-start">
                    <Building2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <p>
                      By submitting this application, you agree to the terms of our wholesale program. 
                      We'll review your application and contact you within 2 business days.
                    </p>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3"
                >
                  Submit Application
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Wholesale;