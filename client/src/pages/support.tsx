"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle, Mail, Phone, HelpCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/PageHeader";

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

export default function Support() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && !window.Tawk_API) {
      window.Tawk_LoadStart = new Date();
      const script = document.createElement("script");
      script.src = "https://embed.tawk.to/681ef8d75fa91f190c499d6b/1iqsfo300";
      script.async = true;
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");

      script.onload = () => {
        console.log("Tawk.to loaded");
      };

      document.body.appendChild(script);
    }
  }, []);

  const showPopup = (message: string) => {
    setPopupMessage(message);
    setPopupVisible(true);
    setTimeout(() => {
      setPopupVisible(false);
    }, 5000); // Popup will disappear after 5 seconds
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      showPopup("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showPopup("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("/api/send-support-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) throw new Error("Failed to send email");

      showPopup("Support request sent successfully!");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      showPopup("Failed to send your message. Please try again.");
    }
  };

  const handleCallbackRequest = async () => {
    try {
      const res = await fetch("/api/request-callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) throw new Error("Failed to request callback");

      showPopup("Our team will contact you shortly.");
    } catch (error) {
      showPopup("Failed to request callback. Please try again.");
    }
  };

  const faqItems = [
    {
      question: "How do I track my order?",
      answer:
        "You can track your order by logging into your account and visiting the 'Order History' section.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy. Items must be unworn and with all original tags.",
    },
    {
      question: "How do I find the right size for my child?",
      answer:
        "Use the size guide available on product pages to find the perfect fit.",
    },
    {
      question: "Do you offer wholesale pricing?",
      answer:
        "Yes, please email wholesale@fourkids.com for details on becoming a wholesale partner.",
    },
    {
      question: "How can I cancel my order?",
      answer:
        "If it hasn't shipped yet, contact customer service. Otherwise, return it once it arrives.",
    },
  ];

  return (
    <>
      <PageHeader title="Customer Support" currentPage="Support" />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Popup Notification */}
          {popupVisible && (
            <div
              className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary text-white p-3 rounded-lg shadow-lg"
              style={{
                position: "fixed",
                bottom: "4%",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#4CAF50", // Green for success
                color: "white",
                padding: "12px 20px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                fontWeight: "bold",
                zIndex: 9999,
                transition: "opacity 0.3s ease",
              }}
            >
              {popupMessage}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Live Chat */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border text-center transition hover:shadow-lg">
              <div className="mb-4 bg-primary/10 inline-flex p-3 rounded-full">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Get instant help from our support team
              </p>
              <div className="text-xs text-gray-500 flex items-center justify-center mb-2">
                <Clock className="h-3 w-3 mr-1" />
                <span>9AM - 5PM EST</span>
              </div>
              <Button
                className="mt-2"
                onClick={() => window.Tawk_API?.maximize()}
              >
                Start Chat
              </Button>
            </div>

            {/* Email */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border text-center transition hover:shadow-lg">
              <div className="mb-4 bg-primary/10 inline-flex p-3 rounded-full">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4 text-sm">
                We'll respond within 24 hours
              </p>
              <a
                href="mailto:support@fourkids.com"
                className="text-primary text-sm font-medium"
              >
                support@fourkids.com
              </a>
            </div>

            {/* Phone */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border text-center transition hover:shadow-lg">
              <div className="mb-4 bg-primary/10 inline-flex p-3 rounded-full">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Prefer to talk? Request a callback!
              </p>
              <Button className="mt-2" onClick={handleCallbackRequest}>
                Request a Callback
              </Button>
            </div>

            {/* Track Order */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border text-center transition hover:shadow-lg">
              <div className="mb-4 bg-primary/10 inline-flex p-3 rounded-full">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Track Your Order</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Enter your order number to get real-time delivery updates
              </p>
              <a href="/track-order">
                <Button className="mt-2">Track Now</Button>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    placeholder="Order #12345"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Your message here..."
                  />
                </div>
                <Button type="submit" className="w-full mt-4">
                  Send Message
                </Button>
              </form>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible>
                {faqItems.map((item, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
