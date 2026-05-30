import React, { useState, useEffect } from "react";

const Certificates = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  const certificates = [
    {
      id: 1,
      title: "Meta Front-End Developer Specialization",
      issuer: "Meta",
      date: "2025",
      image: "/assets/fe1.png",
      skills: ["React", "JavaScript", "HTML/CSS", "UI/UX"]
    },
    {
      id: 2,
      title: "Machine Learning Specialization",
      issuer: "DeepLearning Stanford",
      date: "2024",
      image: "/assets/m1.png",
      skills: ["Machine Learning", "Deep Learning", "Neural Networks"]
    },
    {
      id: 3,
      title: "Introduction to Software Engineering",
      issuer: "IBM",
      date: "2025",
      image: "/assets/is.png",
      skills: ["SDLC", "Agile", "Software Design"]
    },
    {
      id: 4,
      title: "Version Control with Git",
      issuer: "Meta",
      date: "2025",
      image: "/assets/vs.png",
      skills: ["Git", "GitHub", "Collaboration"]
    },
    {
      id: 5,
      title: "Work Smart With PowerPoint",
      issuer: "Microsoft",
      date: "2025",
      image: "/assets/pp.png",
      skills: ["PowerPoint", "Slideshow", "Visual Communication"]
    },
    {
      id: 6,
      title: "Principle of Ux/Ui Design",
      issuer: "Meta",
      date: "2024",
      image: "/assets/ux.png",
      skills: ["UX/UI Design", "User Research", "Wireframing"]
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying || showAllCertificates) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === certificates.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, certificates.length, showAllCertificates]);

  const nextSlide = () => {
    setCurrentIndex(currentIndex === certificates.length - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? certificates.length - 1 : currentIndex - 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <section 
        id="certificates" 
        className="py-20 relative overflow-hidden border-t"
        style={{
          background: 'var(--certificates-bg)',
          color: 'var(--certificates-text-body)',
          borderColor: 'var(--certificates-card-border)'
        }}
      >

        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full opacity-20 animate-pulse"
              style={{
                backgroundColor: 'var(--primary-color)',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 theme-accent-text transform transition-all duration-500 hover:scale-105">
              Certificates & Achievements
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--certificates-text-body)' }}>
              Professional certifications and courses that validate my expertise in various technologies.
            </p>
          </div>

          {/* Main Slider */}
          <div 
            className="relative max-w-6xl mx-auto backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 transform transition-all duration-700 hover:shadow-3xl"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            style={{
              backgroundColor: 'var(--certificates-card-bg)',
              borderColor: 'var(--certificates-card-border)',
              borderWidth: '1px',
              color: 'var(--certificates-text-body)'
            }}
          >
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Certificate Image */}
              <div className="flex-1 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 group">
                  <img
                    src={certificates[currentIndex].image}
                    alt={certificates[currentIndex].title}
                    className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = "/assets/certificates/placeholder.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="flex-1 text-left">
                <h3 className="text-3xl font-bold mb-4 transform transition-all duration-500 hover:translate-x-2" style={{ color: 'var(--certificates-text-title)' }}>
                  {certificates[currentIndex].title}
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center transform transition-all duration-500 delay-100 hover:translate-x-2" style={{ color: 'var(--certificates-text-body)' }}>
                    <svg className="w-5 h-5 mr-3" style={{ color: 'var(--primary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="font-semibold mr-1.5" style={{ color: 'var(--certificates-text-title)' }}>Issuer:</span> {certificates[currentIndex].issuer}
                  </div>
                  <div className="flex items-center transform transition-all duration-500 delay-200 hover:translate-x-2" style={{ color: 'var(--certificates-text-body)' }}>
                    <svg className="w-5 h-5 mr-3" style={{ color: 'var(--secondary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-semibold mr-1.5" style={{ color: 'var(--certificates-text-title)' }}>Date:</span> {certificates[currentIndex].date}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3 flex items-center transform transition-all duration-300 hover:translate-x-2" style={{ color: 'var(--certificates-text-title)' }}>
                    <span className="w-2 h-2 rounded-full mr-3 transition-all duration-300 hover:scale-150" style={{ backgroundColor: 'var(--primary-color)' }}></span>
                    Skills Acquired
                  </h4>
                  <div className="flex flex-wrap gap-2">
                      {certificates[currentIndex].skills.map((skill, index) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-[var(--primary-color)]/10 text-[var(--accent-color)] rounded-full text-sm font-medium border border-[var(--primary-color)]/20 transform transition-all duration-200 hover:scale-105 hover:shadow-md"
                          style={{ transitionDelay: `${300 + index * 50}ms` }}
                        >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                 
                 
                </div>
              </div>
            </div>
          </div>

          {/* Slider Indicators */}
          <div className="flex justify-center space-x-3 mb-8">
            {certificates.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 transform hover:scale-125 ${
                  index === currentIndex
                    ? 'theme-button-gradient scale-125 shadow-lg'
                    : 'hover:opacity-100'
                }`}
                style={{
                  backgroundColor: index === currentIndex ? '' : 'var(--certificates-card-border)',
                  opacity: index === currentIndex ? 1 : 0.4
                }}
              />
            ))}
          </div>

          {/* View All Certificates Button */}
          <div className="text-center">
            <button 
              onClick={() => setShowAllCertificates(true)}
              className="theme-button-gradient text-white px-10 py-4 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center mx-auto gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Explore All Certificates
            </button>
          </div>
        </div>
      </section>

      {/* All Certificates Modal */}
      {showAllCertificates && (
        <div className="fixed inset-0 bg-[#0f0c29]/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
          <div className="theme-gradient-bg text-white rounded-3xl shadow-2xl border border-white/20 max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden transform animate-scale-in relative">
            
            {/* Background elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

              <div className="absolute inset-0 bg-[length:50px_50px] bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] animate-grid-move"></div>
            </div>

            {/* Header */}
            <div className="relative z-10 bg-white/5 border-b border-white/10 p-6 text-white flex-shrink-0">
              <h3 className="text-3xl font-bold">All Certificates</h3>
              <p className="text-purple-200 mt-2">Browse through all my professional certifications and achievements</p>
              <button
                onClick={() => setShowAllCertificates(false)}
                className="absolute top-6 right-6 text-white bg-white/10 hover:bg-red-500/80 hover:rotate-90 hover:-translate-y-1 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-red-500/50 cursor-pointer"
                title="Close Modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Certificates Grid */}
            <div className="relative z-10 p-8 flex-1 overflow-y-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert, index) => (
                  <div
                    key={cert.id}
                    className="backdrop-blur-lg rounded-2xl p-6 shadow-lg border transform transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer group"
                    onClick={() => {
                      setCurrentIndex(index);
                      setShowAllCertificates(false);
                    }}
                    style={{
                      backgroundColor: 'var(--certificates-card-bg)',
                      borderColor: 'var(--certificates-card-border)',
                      borderWidth: '1px',
                      color: 'var(--certificates-text-body)'
                    }}
                  >
                    <div className="relative mb-4 rounded-lg overflow-hidden">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = "/assets/certificates/placeholder.jpg";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-white font-semibold text-sm">Click to view details</span>
                      </div>
                      <div className="absolute top-3 right-3 text-white px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: 'var(--primary-color)' }}>
                        {cert.date}
                      </div>
                    </div>
                    <h4 className="font-bold mb-2 line-clamp-2 group-hover:text-[var(--accent-color)] transition-colors duration-200" style={{ color: 'var(--certificates-text-title)' }}>
                      {cert.title}
                    </h4>
                    <p className="text-sm mb-3" style={{ color: 'var(--certificates-text-body)' }}>{cert.issuer}</p>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-white/5 border border-white/10 text-[var(--accent-color)] rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className="px-2 py-1 bg-white/5 border border-white/10 text-gray-300 rounded-full text-xs">
                          +{cert.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 border-t border-white/10 pt-6 pb-10 px-6 bg-white/5 flex-shrink-0">
              <div className="text-center">
                <button
                  onClick={() => setShowAllCertificates(false)}
                  className="theme-button-gradient text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Certificates;