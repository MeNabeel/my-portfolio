import React from "react";
import { useParams, Link } from "react-router-dom";

const ProjectDetail = () => {
  const { projectId } = useParams();

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
      ]
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
      ]
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
      ]
    }
  };

  const project = projectsData[projectId];

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Not Found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">

        <Link 
          to="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 font-semibold"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back to Portfolio
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{project.title}</h1>
          <p className="text-xl text-gray-600">{project.description}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Project Gallery</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.images.map((image, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200">
                <img 
                  src={image} 
                  alt={`${project.title} screenshot ${index + 1}`}
                  className="w-full h-64 object-contain bg-gray-100 hover:scale-105 transition-transform duration-300 p-2"
                  onError={(e) => {
                    e.target.src = "/assets/placeholder.jpg";
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Features</h2>
            <ul className="space-y-4">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Project Overview</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {project.fullDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;