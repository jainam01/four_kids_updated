import {
  ArrowRight, // Added for the "Contact Us" button in the new "Our Story"
  Award,
  HeartHandshake,
  Globe,
  Recycle,
  Users,
} from "lucide-react";

// The PageHeader import is removed as it's not used in the new "Our Story" design
// import { PageHeader } from "@/components/ui/page-header";

const AboutUs = () => {
  // Data from your original component
  const team = [
    {
      name: "Manish Kothari",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      bio: "With over 15 years of experience in children's fashion, Sarah founded FourKids with a vision to create durable, stylish clothing that grows with children.",
    },
    {
      name: "Hitesh Kothari",
      role: "Design Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      bio: "Michael brings his experience from top fashion houses to create comfortable, functional designs that kids love to wear and parents love to buy.",
    },
    {
      name: "Rahul Kothari",
      role: "Head of Production",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      bio: "Priya ensures all FourKids products meet our high standards for quality, durability, and ethical manufacturing practices.",
    },
    {
      name: "James Wilson",
      role: "Sustainability Officer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      bio: "James leads our initiatives to reduce environmental impact and ensure FourKids is at the forefront of sustainable children's fashion.",
    },
  ];

  const values = [
    {
      icon: Award,
      title: "Quality",
      description:
        "We use premium materials and rigorous quality control to ensure our clothes withstand active play and frequent washing.",
    },
    {
      icon: HeartHandshake,
      title: "Ethical Production",
      description:
        "All our garments are manufactured in facilities that ensure fair wages, safe working conditions, and no child labor.",
    },
    {
      icon: Globe,
      title: "Made in INDIA", // Note: The image for "Our Story" mentions Gujarat/India. This "Made in USA" value is from your provided code.
      description:
        "We're proud that all our products are designed and manufactured in the United States, supporting local communities.",
    },
    {
      icon: Recycle,
      title: "Sustainability",
      description:
        "From organic fabrics to recycled packaging, we're committed to minimizing our environmental footprint.",
    },
  ];

  return (
    <div className="font-sans">
      {" "}
      {/* Added base font style */}
      {/* New "Our Story" Section - based on the provided image */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold mb-6 text-gray-900">
              Our Story
            </h1>
            <p className="text-gray-700 mb-4 text-base leading-relaxed">
              FouKids was established in 2015 with a simple mission: to provide
              high-quality, stylish, and comfortable clothing for children aged
              5-15 at wholesale prices.
            </p>
            <p className="text-gray-700 mb-4 text-base leading-relaxed">
              Based in the heart of Gujarat's textile hub, we combine
              traditional Indian craftsmanship with modern designs to create
              clothing that children love to wear and parents trust for quality.
            </p>
            <p className="text-gray-700 mb-8 text-base leading-relaxed">
              Today, we are proud to serve retailers across India, providing
              them with premium products that stand out in the competitive
              children's wear market.
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-slate-800 text-white font-medium rounded-md hover:bg-slate-700 transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
          <div className="mt-8 md:mt-0">
            <div className="flex items-center mb-2">
              <img
                src="/foukids-icon.svg"
                alt="FouKids icon"
                className="h-5 w-5 mr-2"
              />{" "}
              {/* Example icon, replace with actual or remove if not needed */}
              <p className="text-xs text-gray-600 uppercase tracking-wider font-medium">
                FouKids Factory
              </p>
            </div>
            <div className="w-full h-64 sm:h-72 md:h-80 bg-gray-100 rounded-lg border border-gray-200 shadow-sm">
              {/* Placeholder for an image. You can use an <img> tag here */}
              {/* Example: <img src="/path/to/factory-image.jpg" alt="FouKids Factory" className="w-full h-full object-cover rounded-lg" /> */}
            </div>
          </div>
        </div>
      </section>
      {/* "Our Values" Section - from your original code */}
      <div className="bg-gray-50 py-16 md:py-20">
        {" "}
        {/* Added a light background for separation */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-900">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="mb-4 bg-primary/10 inline-flex p-3 rounded-full">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* "Timeline" Section - from your original code */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 md:mb-16 text-gray-900">
          Our Journey
        </h2>
        <div className="relative max-w-2xl mx-auto border-l-2 border-primary/30 pl-8 py-2 ml-3 sm:ml-6">
          {" "}
          {/* Centered timeline content */}
          <div className="mb-12">
            <div className="absolute -left-2.5 mt-1.5 h-5 w-5 rounded-full border-2 border-primary bg-white ring-4 ring-white"></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">2015</h3>
            <p className="text-gray-600 leading-relaxed">
              FourKids is founded with a small collection of everyday essentials
              for children aged 5-15.
            </p>
          </div>
          <div className="mb-12">
            <div className="absolute -left-2.5 mt-1.5 h-5 w-5 rounded-full border-2 border-primary bg-white ring-4 ring-white"></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">2018</h3>
            <p className="text-gray-600 leading-relaxed">
              We open our first flagship store and launch our online store,
              making our products available nationwide.
            </p>
          </div>
          <div className="mb-12">
            <div className="absolute -left-2.5 mt-1.5 h-5 w-5 rounded-full border-2 border-primary bg-white ring-4 ring-white"></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">2020</h3>
            <p className="text-gray-600 leading-relaxed">
              FourKids introduces our sustainable line, featuring organic cotton
              and recycled materials.
            </p>
          </div>
          <div>
            <div className="absolute -left-2.5 mt-1.5 h-5 w-5 rounded-full border-2 border-primary bg-white ring-4 ring-white"></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">2023</h3>
            <p className="text-gray-600 leading-relaxed">
              We proudly announce that 100% of our packaging is now plastic-free
              and fully recyclable.
            </p>
          </div>
        </div>
      </div>
      {/* "Team" Section - from your original code */}
      <div className="bg-gray-50 py-16 md:py-20">
        {" "}
        {/* Added a light background for separation */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 md:mb-16 text-gray-900">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-56 sm:h-64 overflow-hidden">
                  <img
                    src={`${member.image}?w=400&h=400&fit=crop&crop=faces`}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
