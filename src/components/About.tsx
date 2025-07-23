import React from 'react';
import { Award, Users, Clock, Globe } from 'lucide-react';

const About = () => {
  const achievements = [
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Industry Recognition',
      description: 'Award-winning campaigns and certified digital marketing experts'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Expert Team',
      description: '20+ specialists in digital marketing, design, and development'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: '5+ Years Experience',
      description: 'Proven track record of delivering successful campaigns'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Global Reach',
      description: 'Serving clients across 15+ countries worldwide'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About DigitalVibe
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We're a passionate team of digital marketing experts dedicated to helping 
              businesses succeed in the ever-evolving digital landscape. Our data-driven 
              approach and creative strategies have helped hundreds of clients achieve 
              their marketing goals.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              From startups to enterprise companies, we craft customized solutions that 
              drive real results. Our expertise spans across all digital channels, 
              ensuring your brand message reaches the right audience at the right time.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 bg-blue-100 p-2 rounded-lg text-blue-600">
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3">
              <img
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Digital marketing team collaborating"
                className="rounded-2xl shadow-2xl object-cover w-full h-96"
              />
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-xl shadow-xl">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm text-blue-200">Successful Projects</div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-purple-600 text-white p-6 rounded-xl shadow-xl">
              <div className="text-3xl font-bold">98%</div>
              <div className="text-sm text-purple-200">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;