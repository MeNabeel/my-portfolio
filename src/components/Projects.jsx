import React from "react";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const projectData = [
    {
      id: "wifi-intrusion", 
      title: "WiFi Intrusion Detection System",
      description: "Advanced security system using machine learning algorithms to detect network intrusions and suspicious activities in real-time.",
      technologies: ["Python", "Machine Learning", "Network Security", "TensorFlow"],
      image: "/assets/w3.jpeg" 
    },
    {
      id: "toolkit", 
      title: "UCP Portal Extension", 
      description: "Chrome extension enhancing student experience with automated features, grade tracking, and personalized notifications.",
      technologies: ["HTML", "JavaScript", "Chrome API", "CSS"],
      image: "/assets/t1.png" 
    },
    {
      id: "shortcut",
      title: "Shortcut keys Extension for UCP Portal",
      description: "Scan Portal and identified buttons and links and dynamically give short keys. User use Keybord to control complete portal instead shifting keybord to mouse",
      technologies: ["HTML", "CSS", "JavaScript", "ChromeApi"],
      image: "/assets/s1.png" 
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[length:50px_50px] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]"></div>
        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-20 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          {/* Animated Typography */}
          <div className="relative inline-block">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                  My Projects
                </span>
                {/* Animated Underline */}
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 animate-typing-underline"></span>
              </span>
            </h2>
            
            {/* Floating Elements Around Text */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute -bottom-2 -right-4 w-6 h-6 bg-purple-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-8 animate-fade-in-up">
            Building innovative solutions that solve real-world problems using modern technologies and best practices.
          </p>
        </div>

        {/* Projects Grid with Staggered Animation */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {projectData.map((project, index) => (
            <div 
              key={index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>

        {/* Decorative Element Instead of Button */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 text-gray-500 animate-pulse">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-blue-500"></div>
            <span className="text-sm font-medium">Scroll for more</span>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;