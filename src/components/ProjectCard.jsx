import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ id, title, description, technologies, image }) => {
  return (
    <div 
      className="backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-2 overflow-hidden group animate-fade-in-up"
      style={{
        backgroundColor: 'var(--projects-card-bg)',
        borderColor: 'var(--projects-card-border)',
        borderWidth: '1px',
        color: 'var(--projects-text-body)'
      }}
    >
      
      {/* Image Container with Enhanced Animations */}
      <div className="h-48 theme-button-gradient relative overflow-hidden">
        {image ? (
          <div className="relative w-full h-full overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-out"
            />
            {/* Animated Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200"></div>
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <div className="text-center transform group-hover:scale-110 transition-transform duration-300">
              <svg className="w-12 h-12 mx-auto mb-2 opacity-70 group-hover:opacity-90 group-hover:rotate-12 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
              </svg>
              <p className="text-sm font-medium group-hover:translate-y-1 transition-transform duration-200">Project Image</p>
            </div>
          </div>
        )}
        {/* Floating Elements */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 delay-100">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-75"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
      </div>

      {/* Content Section with Staggered Animations */}
      <div className="p-6">
        {/* Title with Slide-in Effect */}
        <h3 
          className="text-xl font-bold mb-3 group-hover:text-[var(--primary-color)] transition-all duration-200 transform group-hover:translate-x-2"
          style={{ color: 'var(--projects-text-title)' }}
        >
          {title}
        </h3>
        
        {/* Description with Fade-in Effect */}
        <p 
          className="mb-4 leading-relaxed transform group-hover:translate-x-1 transition-all duration-200 delay-75"
          style={{ color: 'var(--projects-text-body)' }}
        >
          {description}
        </p>
        
        {/* Technologies with Staggered Animation */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-[var(--primary-color)]/10 text-[var(--accent-color)] text-sm rounded-full border border-[var(--primary-color)]/20 font-medium transform group-hover:scale-105 transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                style={{
                  transitionDelay: `${index * 30}ms`,
                  animation: `slideInUp 0.3s ease-out ${index * 50}ms both`
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons with Enhanced Interactions */}
        <div className="flex space-x-3">
          <Link
            to={`/project/${id}`}
            className="flex-1 theme-button-gradient text-white text-center py-3 rounded-lg font-semibold hover:theme-button-gradient-hover transition-all duration-200 transform hover:scale-105 shadow-lg group relative overflow-hidden"
          >
            {/* Button Shine Effect */}
            <span className="relative z-10 flex items-center justify-center gap-2">
              View Project
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </span>
            {/* Button Background Animation */}
            <div className="absolute inset-0 theme-button-gradient-hover opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            {/* Ripple Effect */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 group-hover:scale-150 transition-all duration-300 rounded-lg"></div>
          </Link>
          
          {/* Favorite Button with Enhanced Animation */}
          <button 
            className="px-4 py-3 border rounded-lg hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-all duration-200 transform hover:scale-110 hover:shadow-md group relative overflow-hidden"
            style={{
              borderColor: 'var(--projects-card-border)',
              color: 'var(--projects-text-body)'
            }}
          >
            <svg 
              className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            {/* Pulse Effect on Hover */}
            <div className="absolute inset-0 bg-[var(--primary-color)] rounded-lg opacity-0 group-hover:opacity-10 group-hover:scale-150 transition-all duration-300"></div>
          </button>
        </div>
      </div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-6 h-6 bg-gradient-to-bl from-[var(--secondary-color)] to-[var(--primary-color)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-bl-2xl">
        <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full animate-ping"></div>
      </div>

      {/* Progress Bar Effect on Hover */}
      <div className="absolute bottom-0 left-0 w-0 h-1 theme-button-gradient group-hover:w-full transition-all duration-300 ease-out"></div>
    </div>
  );
};

export default ProjectCard;