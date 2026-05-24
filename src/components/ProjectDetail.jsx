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
      title: "Distributed Network Intrusion Detection System (DNIDS)",
      description: "A full-stack administrative security portal designed to monitor, analyze, and mitigate network threats in real-time.",
      fullDescription: "The DNIDS project uses a scalable, monolithic architecture where a Node/Express backend serves both a RESTful API and a compiled Vite/React frontend. The system relies on strictly typed TypeScript across the entire stack with shared Zod schemas ensuring data integrity between client and server.\n\nWhen unauthorized behavior occurs, the backend intercepts the request and generates a security alert containing severity level, event type, and offender's IP address. Admins using the dark-themed Shadcn UI dashboard can view alerts in real-time and proactively block IPs tied to critical alerts. The application uses Drizzle ORM to efficiently query PostgreSQL databases, ensuring fast load times even with large volumes of security logs.",
      technologies: [
        "React 18", "TypeScript", "Vite", "Tailwind CSS", "Shadcn UI (Radix UI)", 
        "Lucide React", "Node.js", "Express.js", "PostgreSQL (Neon Serverless)", 
        "Drizzle ORM", "Drizzle-Zod", "Express Sessions", "JWT/Token-based", 
        "Zod", "Nodemailer (SMTP)", "Archiver (ZIP)", "React Query", "Wouter"
      ],
      features: [
        "Real-Time Security Dashboard - Centralized admin portal for viewing critical security events and network anomalies",
        "Automated Alert Generation - Intelligently logs suspicious activities (unauthorized login attempts) with timestamps and source IPs",
        "Threat Mitigation & IP Blocking - Instantly block malicious IP addresses directly from incoming alerts",
        "Secure Authentication & Recovery - Robust login with email-based password recovery using expiring tokens",
        "Dynamic Code Export - Generate on-the-fly .zip archives of frontend, backend, or full source code",
        "Granular User Auditing - Tracks and logs user interactions for compliance and security"
      ],
      images: [
        "/assets/w1.jpeg",
        "/assets/w2.jpeg",
        "/assets/w3.jpeg"
      ],
      githubUrl: "https://github.com/nabeelijaz/wifi-intrusion-detection",
      liveDemo: null
    },
    "smart-resume": {
      title: "Smart Resume - ATS Resume Builder",
      description: "Smart Resume is a full-stack, ATS-friendly MERN web application that helps users effortlessly create, manage, and export professional resumes with real-time preview and multiple modern templates.",
      fullDescription: "Smart Resume is a comprehensive, full-stack MERN application designed to help job seekers create resumes that pass Applicant Tracking Systems (ATS). The application features a dynamic, split-screen editor where users can input their personal details, work experience, education, skills, projects, certifications, languages, and extracurricular activities, seeing changes reflect in real-time on a selected template. Built with modern security practices like JWT and Google OAuth, users can securely store their resumes and export them to high-quality PDF format seamlessly.",
      technologies: [
        "React 18", "Vite", "Tailwind CSS", "MongoDB", "Express.js", "Node.js", 
        "JWT Authentication", "Google OAuth", "html2canvas", "jspdf", 
        "React Quill", "Mongoose"
      ],
      features: [
        "Dynamic real-time live preview while typing",
        "5 professional ATS-friendly templates",
        "High-quality PDF export functionality",
        "9 comprehensive resume sections (Personal Details, Summary, Work Experience, Education, Skills, Projects, Certifications, Languages, Extracurricular)",
        "Secure authentication (Email/Password + Google OAuth)",
        "Rich text editor support for formatted content"
      ],
      images: [
        "/assets/ats1.jpeg",
        "/assets/ats2.jpeg",
        "/assets/ats3.jpeg",
        "/assets/ats4.jpeg"
      ],
      githubUrl: "https://github.com/MeNabeel/my-portfolio",
      liveDemo: null
    }
  };

  useEffect(() => {
    // Simulate loading for animations
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    const activeTheme = localStorage.getItem("portfolio-theme") || "cosmic";
    document.body.className = activeTheme === "gold" ? "theme-gold" : "theme-cosmic";

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
    <div className="min-h-screen theme-gradient-bg py-8 animate-fade-in text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-screen filter blur-[100px] opacity-25 animate-pulse" style={{ backgroundColor: 'var(--primary-color)' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full mix-blend-screen filter blur-[100px] opacity-25 animate-pulse delay-1000" style={{ backgroundColor: 'var(--secondary-color)' }}></div>
        <div className="absolute inset-0 bg-[length:50px_50px] bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] animate-grid-move"></div>
      </div>
      <CustomCursor /> {/* Add custom cursor here */}
      <div className="container mx-auto px-6 relative z-10">
        {/* Back Button with Animation */}
        <Link 
          to="/" 
          className="inline-flex items-center text-[var(--primary-color)] hover:text-[var(--secondary-color)] mb-8 font-semibold transition-all duration-300 transform hover:-translate-x-1 group"
        >
          <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back to Portfolio
        </Link>

        {/* Project Header with Enhanced Animations */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8 mb-8 transform transition-all duration-500 hover:shadow-xl border border-white/10 text-white">
          <h1 className="text-4xl font-bold text-white mb-4 animate-slide-in-right">
            {project.title}
          </h1>
          <p className="text-xl text-gray-300 animate-slide-in-right" style={{animationDelay: '0.1s'}}>
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
                className="inline-flex items-center gap-2 theme-button-gradient text-white px-6 py-3 rounded-lg font-semibold hover:theme-button-gradient-hover transition-all duration-300 transform hover:scale-105 shadow-lg"
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
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8 mb-8 border border-white/10 text-white">
          <h2 className="text-2xl font-bold text-white mb-6 animate-slide-in-right">Project Gallery</h2>
          
          {/* Main Image */}
          <div className="relative mb-6 rounded-xl overflow-hidden bg-white/5 animate-fade-in-up">
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
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white/20 hover:scale-110 transition-all duration-300"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                <button
                  onClick={() => setActiveImage((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white/20 hover:scale-110 transition-all duration-300"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    ? 'border-[var(--primary-color)] scale-105 shadow-lg' 
                    : 'border-white/10 hover:border-white/30 hover:scale-105'
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
                  <div className="absolute inset-0 bg-[var(--primary-color)]/20 flex items-center justify-center">
                    <div className="w-3 h-3 bg-[var(--primary-color)] rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Features and Technologies with Staggered Animations */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Features Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-white/10 text-white animate-fade-in-up">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3" style={{ color: 'var(--primary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Key Features
            </h2>
            <ul className="space-y-4">
              {project.features.map((feature, index) => (
                <li 
                  key={index} 
                  className="flex items-start text-gray-300 transform transition-all duration-300 hover:translate-x-2 group"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300" style={{ color: 'var(--primary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  <span className="group-hover:text-white transition-colors duration-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-white/10 text-white animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3" style={{ color: 'var(--secondary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
              </svg>
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-full text-sm font-medium border border-[var(--primary-color)]/20 transform transition-all duration-300 hover:scale-105 hover:shadow-md hover:-translate-y-1"
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Project Overview with Enhanced Animation */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8 mt-8 border border-white/10 text-white animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3" style={{ color: 'var(--primary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Project Overview
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg transform transition-all duration-500 hover:translate-x-1">
            {project.fullDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;