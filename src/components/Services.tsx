import React from 'react';
import { 
  Megaphone, 
  Users, 
  BarChart3, 
  Target, 
  Smartphone, 
  TrendingUp,
  Mail,
  Search
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Megaphone className="w-8 h-8" />,
      title: 'Digital Marketing Strategy',
      description: 'Comprehensive digital marketing strategies tailored to your business goals and target audience.',
      features: ['Market Analysis', 'Competitor Research', 'ROI Optimization']
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Social Media Management',
      description: 'Full-service social media management across all major platforms to build your community.',
      features: ['Content Creation', 'Community Management', 'Influencer Partnerships']
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Analytics & Reporting',
      description: 'Data-driven insights and comprehensive reporting to track your marketing performance.',
      features: ['Performance Tracking', 'Custom Dashboards', 'Monthly Reports']
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Paid Advertising',
      description: 'Strategic paid advertising campaigns on Google, Facebook, Instagram, and LinkedIn.',
      features: ['Campaign Setup', 'A/B Testing', 'Budget Optimization']
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Content Creation',
      description: 'Engaging visual and written content that resonates with your audience and drives action.',
      features: ['Video Production', 'Graphic Design', 'Copywriting']
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Growth Marketing',
      description: 'Scalable growth strategies to increase your customer base and revenue.',
      features: ['Funnel Optimization', 'Conversion Rate Optimization', 'Lead Generation']
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: 'Email Marketing',
      description: 'Personalized email campaigns that nurture leads and drive customer retention.',
      features: ['Automation Setup', 'List Segmentation', 'Performance Optimization']
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: 'SEO Optimization',
      description: 'Improve your search engine rankings and drive organic traffic to your website.',
      features: ['Keyword Research', 'On-page SEO', 'Link Building']
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We offer comprehensive digital marketing solutions to help your business 
            thrive in the digital landscape.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-sm text-gray-500 flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            View All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;