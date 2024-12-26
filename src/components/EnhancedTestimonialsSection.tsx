import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
  company: string;
  imageUrl: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  content, 
  author, 
  role, 
  company, 
  imageUrl 
}) => (
  <motion.div 
    className="p-8 rounded-xl bg-white/60 backdrop-blur-sm border border-orange-500/20
               hover:border-orange-500/40 transition-all duration-300"
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <p className="text-gray-700 leading-relaxed">{content}</p>
      </div>
      <div className="mt-auto flex items-center gap-4">
        <div className="flex-shrink-0 w-12 h-12 relative">
          <Image 
            src={imageUrl}
            alt={`${author}'s profile`}
            width={48}
            height={48}
            className="rounded-full border border-orange-500/20 object-cover"
          />
        </div>
        <div className="flex-grow border-t border-orange-500/20 pt-4">
          <p className="font-semibold text-gray-700">{author}</p>
          <p className="text-sm text-gray-600">{role}</p>
          <p className="text-sm text-orange-500">{company}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const TestimonialsSection = () => {
  const testimonials = [
    {
      content: "Travela is a market-ready product that perfectly addresses a critical gap in the travel industry. The solution's unique blend of real-time adaptability and personalized planning will undoubtedly meet the growing demand for flexible travel solutions.",
      author: "Mr. Dhanush N",
      role: "Founder and CEO",
      company: "Interain Intelligence",
      imageUrl: "/api/placeholder/48/48"
    },
    {
      content: "Travela's B2B and B2C business model is strategically aligned with revenue opportunities, ensuring it can capture both individual and corporate clients. The product's market positioning and readiness make it well-suited to deliver significant value.",
      author: "Mr. Sakthivel Shanmugam",
      role: "Senior Engineer",
      company: "Maker Labs",
      imageUrl: "/api/placeholder/48/48"
    }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-orange-50/30 to-white/0 -z-10" />
      
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Industry Recognition</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          What industry experts say about Travelas innovative approach
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard 
            key={index}
            {...testimonial}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;