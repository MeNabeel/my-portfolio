import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CustomCursor from "./cursor/CustomCursor"; // Import the custom cursor

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const projectsData = {
    "toolkit": {
      title: "Toolkit by Nabeel",
      description: "A comprehensive browser extension that enhances the UCP portal experience with intelligent features and automation tools.",
      fullDescription: "Toolkit is a powerful Chrome extension designed specifically for University of Central Punjab students. It transforms the standard portal into a feature-rich platform with grade estimation, dark mode, attendance tracking, and quick assignment sheet downloads. The extension provides a seamless experience for students to manage their academic activities efficiently.",
      technologies: ["JavaScript", "Chrome Extension API", "HTML5", "CSS3", "Local Storage"],
      features: [
        "Grade Estimation & Prediction",
        "Dark Mode Theme",
        "Attendance Alert System", 
        "Assignment Sheet PDF Download",
        "Attendance Manager",
        "CGPA Calculator",
        "Popup Control Panel"
      ],
      images: [
        "/assets/toolkit.png",
        "/assets/t2.png",
        "/assets/t3.png"
      ],
      githubUrl: "https://github.com/nabeelijaz/toolkit",
      liveDemo: "https://chrome.google.com/webstore/detail/toolkit"
    },
    "wifi-intrusion": {
      title: "WiFi Intrusion Detection System",
      description: "Advanced security system using machine learning to detect network intrusions in real-time.",
      fullDescription: "This system employs sophisticated machine learning algorithms to monitor network traffic and identify potential security threats. It analyzes packet patterns, connection attempts, and network behavior to detect unauthorized access attempts in real-time. The system provides comprehensive security monitoring with instant alerts and detailed threat analysis reports.",
      technologies: ["Python", "TensorFlow", "Scikit-learn", "Network Security", "ML Algorithms"],
      features: [
        "Real-time Network Monitoring",
        "Machine Learning Threat Detection",
        "Automated Threat Classification",
        "Instant Alert System",
        "Historical Data Analysis",
        "Security Dashboard"
      ],
      images: [
        "/assets/w1.jpeg",
        "/assets/w2.jpeg",
        "/assets/w3.jpeg"
      ],
      githubUrl: "https://github.com/nabeelijaz/wifi-intrusion-detection",
      liveDemo: null
    },
    "shortcut": {
      title: "Shortcut Keys Extension for UCP Portal",
      description: "Auto-detect buttons and links with dynamic shortcut keys for keyboard-only portal navigation.",
      fullDescription: "This Chrome extension revolutionizes the UCP portal navigation by automatically detecting all interactive elements and assigning intelligent shortcut keys. It eliminates the need for constant switching between keyboard and mouse, providing two modes (Beginner and Advanced) to cater to different user preferences. The extension scans the portal dynamically and creates an efficient keyboard-driven interface.",
      technologies: ["JavaScript", "Chrome API", "DOM Manipulation", "LocalStorage", "HTML/CSS"],
      features: [
        "Automatic Element Detection",
        "Dynamic Shortcut Assignment", 
        "Beginner & Advanced Modes",
        "Real-time Portal Scanning",
        "Keyboard-Only Navigation",
        "Visual Shortcut Guides"
      ],
      images: [
        "/assets/scanner.png",
        "/assets/s2.png",
        "/assets/s3.png"
      ],
      githubUrl: "https://github.com/nabeelijaz/shortcut-keys-extension",
      liveDemo: "https://chrome.google.com/webstore/detail/shortcut-keys"
    }
  };

  useEffect(() => {
    // Simulate loading for animations
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const project = projectsData[projectId];

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center animate-fade-in">
        <CustomCursor /> {/* Add cursor to error state too */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Not Found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-fade-in">
      <CustomCursor /> {/* Add custom cursor here */}
      <div className="container mx-auto px-6">
        {/* Back Button with Animation */}
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 font-semibold transition-all duration-300 transform hover:-translate-x-1 group"
        >
          <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back to Portfolio
        </Link>

        {/* Project Header with Enhanced Animations */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 transform transition-all duration-500 hover:shadow-xl border border-gray-100">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-slide-in-right">
            {project.title}
          </h1>
          <p className="text-xl text-gray-600 animate-slide-in-right" style={{animationDelay: '0.1s'}}>
            {project.description}
          </p>
          
          {/* Action Buttons */}
          <div className="flex gap-4 mt-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View Code
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Enhanced Project Gallery with Carousel */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 transform transition-all duration-500 hover:shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 animate-slide-in-right">Project Gallery</h2>
          
          {/* Main Image */}
          <div className="relative mb-6 rounded-xl overflow-hidden bg-gray-100 animate-fade-in-up">
            <img 
              src={project.images[activeImage]} 
              alt={`${project.title} screenshot ${activeImage + 1}`}
              className="w-full h-96 object-contain transition-transform duration-500 hover:scale-105"
              onError={(e) => {
                e.target.src = "/assets/placeholder.jpg";
              }}
            />
            {/* Navigation Arrows */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImage((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                <button
                  onClick={() => setActiveImage((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {project.images.map((image, index) => (
              <div 
                key={index} 
                className={`relative rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 border-2 ${
                  activeImage === index 
                    ? 'border-blue-500 scale-105 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300 hover:scale-105'
                }`}
                onClick={() => setActiveImage(index)}
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-20 object-cover"
                  onError={(e) => {
                    e.target.src = "/assets/placeholder.jpg";
                  }}
                />
                {activeImage === index && (
                  <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Features and Technologies with Staggered Animations */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Features Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-500 hover:shadow-xl animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Key Features
            </h2>
            <ul className="space-y-4">
              {project.features.map((feature, index) => (
                <li 
                  key={index} 
                  className="flex items-start text-gray-700 transform transition-all duration-300 hover:translate-x-2 group"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  <span className="group-hover:text-gray-900 transition-colors duration-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-500 hover:shadow-xl animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
              </svg>
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200 transform transition-all duration-300 hover:scale-105 hover:shadow-md hover:-translate-y-1"
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Project Overview with Enhanced Animation */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8 transform transition-all duration-500 hover:shadow-xl animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-6 h-6 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Project Overview
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg transform transition-all duration-500 hover:translate-x-1">
            {project.fullDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;