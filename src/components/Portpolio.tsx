import React from 'react';
import { ExternalLink, TrendingUp, Users, Eye } from 'lucide-react';

const Portfolio = () => {
  const projects = [
    {
      title: 'E-commerce Fashion Brand',
      category: 'Social Media Marketing',
      image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=600',
      results: [
        { icon: <TrendingUp className="w-4 h-4" />, metric: '300%', label: 'Sales Increase' },
        { icon: <Users className="w-4 h-4" />, metric: '150K', label: 'New Followers' },
        { icon: <Eye className="w-4 h-4" />, metric: '2.5M', label: 'Monthly Reach' }
      ]
    },
    {
      title: 'Tech Startup Launch',
      category: 'Digital Marketing Campaign',
      image: 'https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=600',
      results: [
        { icon: <TrendingUp className="w-4 h-4" />, metric: '500%', label: 'ROI Growth' },
        { icon: <Users className="w-4 h-4" />, metric: '50K', label: 'Lead Generation' },
        { icon: <Eye className="w-4 h-4" />, metric: '1M', label: 'Brand Impressions' }
      ]
    },
    {
      title: 'Restaurant Chain',
      category: 'Local SEO & Social Media',
      image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600',
      results: [
        { icon: <TrendingUp className="w-4 h-4" />, metric: '200%', label: 'Foot Traffic' },
        { icon: <Users className="w-4 h-4" />, metric: '80K', label: 'Social Engagement' },
        { icon: <Eye className="w-4 h-4" />, metric: '95%', label: 'Local Visibility' }
      ]
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See how we've helped businesses like yours achieve remarkable growth 
            through strategic digital marketing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors duration-300">
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-sm text-blue-600 font-medium mb-2">
                  {project.category}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <div className="space-y-3">
                  {project.results.map((result, resultIndex) => (
                    <div key={resultIndex} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-gray-600">
                        {result.icon}
                        <span className="text-sm">{result.label}</span>
                      </div>
                      <div className="font-bold text-green-600">
                        {result.metric}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            View All Case Studies
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;