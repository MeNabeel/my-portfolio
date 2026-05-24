import React from "react";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const projectData = [
    {
      id: "wifi-intrusion", 
      title: "Distributed Network Intrusion Detection System (DNIDS)",
      description: "A full-stack administrative security portal designed to monitor, analyze, and mitigate network threats in real-time.",
      technologies: ["React 18", "TypeScript", "Node.js", "PostgreSQL", "Shadcn UI"],
      image: "/assets/w3.jpeg" 
    },
    {
      id: "smart-resume",
      title: "Smart Resume - ATS Resume Builder",
      description: "Smart Resume is a full-stack, ATS-friendly MERN web application that helps users effortlessly create, manage, and export professional resumes with real-time preview.",
      technologies: ["React 18", "Node.js", "MongoDB", "Express.js", "Tailwind CSS", "JWT Auth"],
      image: "/assets/ats1.jpeg"
    },
    {
      id: "toolkit", 
      title: "UCP Portal Extension", 
      description: "Chrome extension enhancing student experience with automated features, grade tracking, and personalized notifications.",
      technologies: ["HTML", "JavaScript", "Chrome API", "CSS"],
      image: "/assets/t1.png" 
    },
  ];

  return (
    <section id="projects" className="py-20 theme-gradient-bg relative overflow-hidden text-white border-t border-white/5">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full mix-blend-screen filter blur-xl opacity-10" style={{ backgroundColor: 'var(--primary-color)', animation: 'space-drift-1 25s ease-in-out infinite' }}></div>
        <div className="absolute top-40 right-10 w-96 h-96 rounded-full mix-blend-screen filter blur-xl opacity-10" style={{ backgroundColor: 'var(--secondary-color)', animation: 'space-drift-2 30s ease-in-out infinite', animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full mix-blend-screen filter blur-xl opacity-10" style={{ backgroundColor: 'var(--primary-color)', animation: 'space-drift-3 35s ease-in-out infinite', animationDelay: '4s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[length:50px_50px] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]"></div>
        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full opacity-20 animate-pulse"
              style={{
                backgroundColor: 'var(--primary-color)',
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
            <h2 className="text-5xl font-bold text-white mb-4">
              <span className="relative">
                <span className="theme-accent-text animate-gradient-x">
                  My Projects
                </span>
                {/* Animated Underline */}
                <span className="absolute bottom-0 left-0 w-0 h-1 theme-button-gradient animate-typing-underline"></span>
              </span>
            </h2>
            
            {/* Floating Elements Around Text */}
            <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full opacity-20 animate-bounce" style={{ backgroundColor: 'var(--secondary-color)' }}></div>
            <div className="absolute -bottom-2 -right-4 w-6 h-6 rounded-full opacity-20 animate-bounce" style={{ backgroundColor: 'var(--primary-color)', animationDelay: '1s' }}></div>
          </div>
          
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mt-8 animate-fade-in-up">
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
          <div className="inline-flex items-center gap-4 text-gray-400 animate-pulse">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-[var(--secondary-color)]"></div>
            <span className="text-sm font-medium">Scroll for more</span>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-[var(--primary-color)]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;