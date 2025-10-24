import React from "react";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const projectData = [
    {
      id: "wifi-intrusion", // Added ID
      title: "WiFi Intrusion Detection System",
      description: "Advanced security system using machine learning algorithms to detect network intrusions and suspicious activities in real-time.",
      technologies: ["Python", "Machine Learning", "Network Security", "TensorFlow"],
      image: "/assets/w3.jpeg" 
    },
    {
      id: "toolkit", // Added ID
      title: "UCP Portal Extension", 
      description: "Chrome extension enhancing student experience with automated features, grade tracking, and personalized notifications.",
      technologies: ["HTML", "JavaScript", "Chrome API", "CSS"],
      image: "/assets/t1.png" 
    },
    {
      id: "shortcut", // Added ID
      title: "Shortcut keys Extension for UCP Portal",
      description: "Scan Portal and identified buttons and links and dynamically give short keys. User use Keybord to control complete portal instead shifting keybord to mouse",
      technologies: ["HTML", "CSS", "JavaScript", "ChromeApi"],
      image: "/assets/s1.png" 
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Building innovative solutions that solve real-world problems using modern technologies and best practices.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {projectData.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
            View All Projects →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;