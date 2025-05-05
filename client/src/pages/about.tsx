import { 
  Award, 
  HeartHandshake, 
  Globe, 
  Recycle, 
  Users
} from 'lucide-react';

const AboutUs = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      bio: "With over 15 years of experience in children's fashion, Sarah founded FourKids with a vision to create durable, stylish clothing that grows with children."
    },
    {
      name: "Michael Chen",
      role: "Design Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      bio: "Michael brings his experience from top fashion houses to create comfortable, functional designs that kids love to wear and parents love to buy."
    },
    {
      name: "Priya Patel",
      role: "Head of Production",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      bio: "Priya ensures all FourKids products meet our high standards for quality, durability, and ethical manufacturing practices."
    },
    {
      name: "James Wilson",
      role: "Sustainability Officer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      bio: "James leads our initiatives to reduce environmental impact and ensure FourKids is at the forefront of sustainable children's fashion."
    }
  ];

  const values = [
    {
      icon: Award,
      title: "Quality",
      description: "We use premium materials and rigorous quality control to ensure our clothes withstand active play and frequent washing."
    },
    {
      icon: HeartHandshake,
      title: "Ethical Production",
      description: "All our garments are manufactured in facilities that ensure fair wages, safe working conditions, and no child labor."
    },
    {
      icon: Globe,
      title: "Made in USA",
      description: "We're proud that all our products are designed and manufactured in the United States, supporting local communities."
    },
    {
      icon: Recycle,
      title: "Sustainability",
      description: "From organic fabrics to recycled packaging, we're committed to minimizing our environmental footprint."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h1>
        <p className="text-xl text-gray-600 mb-6">
          Creating quality children's clothing that stands the test of time.
        </p>
        <div className="bg-gray-100 p-8 rounded-lg">
          <p className="text-gray-700 leading-relaxed">
            FourKids was founded in 2015 with a simple mission: to create high-quality, durable children's clothing that grows with your child. As parents ourselves, we were frustrated by the lack of well-made, stylish options that could withstand the daily adventures of active kids.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            What started as a small collection of basics has grown into a complete children's wardrobe, all designed and made in the USA with an unwavering commitment to quality, sustainability, and ethical manufacturing.
          </p>
        </div>
      </div>

      {/* Our Values */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="mb-4 bg-primary/10 inline-flex p-3 rounded-full">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Our Journey</h2>
        <div className="relative border-l-2 border-primary/30 pl-8 py-2 ml-6">
          <div className="mb-12">
            <div className="absolute -left-2.5 mt-1.5 h-5 w-5 rounded-full border-2 border-primary bg-white"></div>
            <h3 className="text-xl font-bold">2015</h3>
            <p className="text-gray-600">FourKids is founded with a small collection of everyday essentials for children aged 5-15.</p>
          </div>
          
          <div className="mb-12">
            <div className="absolute -left-2.5 mt-1.5 h-5 w-5 rounded-full border-2 border-primary bg-white"></div>
            <h3 className="text-xl font-bold">2018</h3>
            <p className="text-gray-600">We open our first flagship store and launch our online store, making our products available nationwide.</p>
          </div>
          
          <div className="mb-12">
            <div className="absolute -left-2.5 mt-1.5 h-5 w-5 rounded-full border-2 border-primary bg-white"></div>
            <h3 className="text-xl font-bold">2020</h3>
            <p className="text-gray-600">FourKids introduces our sustainable line, featuring organic cotton and recycled materials.</p>
          </div>
          
          <div>
            <div className="absolute -left-2.5 mt-1.5 h-5 w-5 rounded-full border-2 border-primary bg-white"></div>
            <h3 className="text-xl font-bold">2023</h3>
            <p className="text-gray-600">We proudly announce that 100% of our packaging is now plastic-free and fully recyclable.</p>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
              <div className="h-48 overflow-hidden">
                <img 
                  src={`${member.image}?w=400&h=400&fit=crop&crop=faces`} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-primary text-sm mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Join Our Team</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            We're always looking for passionate individuals to join our team. Check out our current openings 
            and become part of our mission to create better children's clothing.
          </p>
          <a 
            href="/careers" 
            className="inline-block bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-full"
          >
            View Careers
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;