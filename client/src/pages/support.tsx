import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  MessageCircle,
  Mail,
  Phone,
  HelpCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PageHeader = ({ title, currentPage }) => {
  return (
    <div className="relative py-16 px-4 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/placeholder.svg")` }}>
      <div className="container mx-auto text-center text-white z-10 relative">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
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
              <span className="text-primary">{currentPage}</span>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
};


const Support = () => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Here you would typically send the data to your API
    toast({
      title: "Support request submitted",
      description: "We'll get back to you as soon as possible.",
    });

    // Reset form
    setName('');
    setEmail('');
    setMessage('');
    setSubject('');
  };

  const faqItems = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by logging into your account and visiting the 'Order History' section. Alternatively, use the tracking number provided in your shipping confirmation email."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy. Items must be unworn, unwashed, and with all original tags attached. Please visit our Return Portal to initiate a return."
    },
    {
      question: "How do I find the right size for my child?",
      answer: "We provide a comprehensive size guide for each product category. You can find it on product pages or in the 'Size Guide' section of our website. Measure your child and compare to our charts for the best fit."
    },
    {
      question: "Do you offer wholesale pricing?",
      answer: "Yes, we offer wholesale pricing for qualified retailers. Please contact our wholesale department at wholesale@fourkids.com for more information."
    },
    {
      question: "How can I cancel my order?",
      answer: "If your order hasn't shipped yet, you can cancel it by contacting our customer service team. Once an order has shipped, you'll need to wait for it to arrive and then follow our return process."
    }
  ];

  return (
    <>
      <PageHeader title="Customer Support" currentPage="Support" />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="mb-4 bg-primary/10 inline-flex p-3 rounded-full">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4 text-sm">Get instant help from our support team</p>
              <div className="text-xs text-gray-500 flex items-center justify-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>Available 9AM - 5PM EST</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="mb-4 bg-primary/10 inline-flex p-3 rounded-full">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4 text-sm">Send us an email and we'll respond within 24 hours</p>
              <a href="mailto:support@fourkids.com" className="text-primary text-sm font-medium">support@fourkids.com</a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="mb-4 bg-primary/10 inline-flex p-3 rounded-full">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4 text-sm">Call us directly for immediate assistance</p>
              <a href="tel:1-800-555-KIDS" className="text-primary text-sm font-medium">1-800-555-KIDS</a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Order #12345"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    required
                    className="w-full min-h-[120px]"
                  />
                </div>

                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-medium">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-start">
                  <HelpCircle className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">
                      Can't find what you're looking for? Browse our <a href="/faq" className="text-primary font-medium">full FAQ section</a> or contact our support team.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;