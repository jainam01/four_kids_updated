import { useState } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Phone, MapPin, TruckIcon, RotateCw, CreditCard, HelpCircle } from "lucide-react";

const Support = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !subject || !message) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent!",
        description: "We'll respond to your inquiry as soon as possible.",
      });
      
      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const faqs = [
    {
      question: "What sizes do you offer?",
      answer: "We offer children's clothing in sizes ranging from 2-3 years (XS) to 12-13 years (XL). You can find detailed sizing information in our Size Guide to help you find the perfect fit for your child."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within the continental US. Express shipping options are available at checkout for faster delivery. International shipping times vary by destination, but generally take 7-14 business days."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unworn items with tags attached. Returns are free for exchanges or store credit. If you prefer a refund to your original payment method, a small return shipping fee may apply."
    },
    {
      question: "Do you offer bulk ordering for schools or events?",
      answer: "Yes! We offer special pricing for bulk orders. Please fill out our contact form with details about your needs, and our team will get back to you with a custom quote."
    },
    {
      question: "Are your clothes machine washable?",
      answer: "Yes, most of our clothing items are machine washable. We recommend washing in cold water and tumble drying on low to maintain the quality and colors of the garments. Specific care instructions can be found on each product's label."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with tracking information. You can also log into your account on our website to view order status and tracking details."
    },
  ];
  
  return (
    <div className="container mx-auto px-4 py-8 pb-16 md:pb-8">
      <Helmet>
        <title>Customer Support - FourKids</title>
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Customer Support</h1>
        <p className="text-gray-600 text-center mb-8">
          We're here to help with any questions or concerns you may have
        </p>
        
        <Tabs defaultValue="contact">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contact">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4">Get In Touch</h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-primary mr-3 mt-1" />
                      <div>
                        <h3 className="font-semibold">Email Us</h3>
                        <p className="text-sm text-gray-600">support@fourkids.com</p>
                        <p className="text-xs text-gray-500">Response time: 24-48 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-primary mr-3 mt-1" />
                      <div>
                        <h3 className="font-semibold">Call Us</h3>
                        <p className="text-sm text-gray-600">+1 (800) 123-4567</p>
                        <p className="text-xs text-gray-500">Mon-Fri: 9AM - 5PM EST</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MessageSquare className="h-5 w-5 text-primary mr-3 mt-1" />
                      <div>
                        <h3 className="font-semibold">Live Chat</h3>
                        <p className="text-sm text-gray-600">Chat with our support team</p>
                        <p className="text-xs text-gray-500">Available 7 days a week</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-primary mr-3 mt-1" />
                      <div>
                        <h3 className="font-semibold">Visit Us</h3>
                        <p className="text-sm text-gray-600">123 Fashion Street</p>
                        <p className="text-sm text-gray-600">New York, NY 10001</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-span-2">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4">Send a Message</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <Label htmlFor="subject">Subject</Label>
                      <Select 
                        value={subject} 
                        onValueChange={setSubject}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="order">Order Inquiry</SelectItem>
                          <SelectItem value="return">Return/Exchange</SelectItem>
                          <SelectItem value="product">Product Information</SelectItem>
                          <SelectItem value="bulk">Bulk Order</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Please describe your inquiry in detail"
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-primary text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex space-x-1">
                          <div className="loading-dot w-2 h-2 bg-white rounded-full"></div>
                          <div className="loading-dot w-2 h-2 bg-white rounded-full"></div>
                          <div className="loading-dot w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      ) : "Send Message"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="faq">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
              
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              <div className="mt-8 text-center">
                <p className="mb-4 text-gray-600">Can't find what you're looking for?</p>
                <Button variant="outline" onClick={() => document.querySelector('button[value="contact"]')?.click()}>
                  Contact Our Support Team
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="shipping">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Shipping & Returns</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-start mb-4">
                    <TruckIcon className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-lg font-semibold">Shipping Information</h3>
                  </div>
                  
                  <div className="space-y-4 text-gray-600">
                    <p>All orders are processed within 1-2 business days from the time of order confirmation. Once your order ships, you'll receive a confirmation email with tracking information.</p>
                    
                    <div className="border-t border-b py-4">
                      <h4 className="font-semibold mb-2">Shipping Options</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>Standard Shipping (3-5 business days)</span>
                          <span>$4.99</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Express Shipping (2-3 business days)</span>
                          <span>$9.99</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Next Day Shipping</span>
                          <span>$14.99</span>
                        </li>
                        <li className="flex justify-between font-medium">
                          <span>Free shipping on all orders over $50</span>
                          <span>$0.00</span>
                        </li>
                      </ul>
                    </div>
                    
                    <p>International shipping is available to select countries. Shipping times and fees vary based on destination.</p>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-start mb-4">
                    <RotateCw className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-lg font-semibold">Returns & Exchanges</h3>
                  </div>
                  
                  <div className="space-y-4 text-gray-600">
                    <p>We want you to be completely satisfied with your purchase. If for any reason you're not happy, we offer a simple return policy.</p>
                    
                    <div className="border-t border-b py-4">
                      <h4 className="font-semibold mb-2">Return Policy</h4>
                      <ul className="space-y-2 text-sm">
                        <li>Items can be returned within 30 days of delivery</li>
                        <li>Items must be unworn, unwashed, and have all original tags attached</li>
                        <li>Returns are free for exchanges or store credit</li>
                        <li>Refunds to original payment method may incur a $4.99 return shipping fee</li>
                      </ul>
                    </div>
                    
                    <p>To start a return or exchange, please visit our <a href="#" className="text-primary underline">Returns Portal</a> or contact our customer service team.</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Support;
