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
    }, 4000);

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
      <section id="certificates" className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '3s' }}></div>
        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full opacity-25 animate-pulse"
              style={{
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
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent transform transition-all duration-500 hover:scale-105">
              Certificates & Achievements
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Professional certifications and courses that validate my expertise in various technologies.
            </p>
          </div>

          {/* Main Slider */}
          <div 
            className="relative max-w-6xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8 mb-8 transform transition-all duration-700 hover:shadow-3xl"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
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
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 group"
                >
                  <svg className="w-6 h-6 text-purple-600 group-hover:text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 group"
                >
                  <svg className="w-6 h-6 text-purple-600 group-hover:text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Certificate Details */}
              <div className="flex-1 text-left">
                <h3 className="text-3xl font-bold text-gray-800 mb-4 transform transition-all duration-500 hover:translate-x-2">
                  {certificates[currentIndex].title}
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600 transform transition-all duration-500 delay-100 hover:translate-x-2">
                    <svg className="w-5 h-5 mr-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="font-semibold">Issuer:</span> {certificates[currentIndex].issuer}
                  </div>
                  <div className="flex items-center text-gray-600 transform transition-all duration-500 delay-200 hover:translate-x-2">
                    <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-semibold">Date:</span> {certificates[currentIndex].date}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center transform transition-all duration-300 hover:translate-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 transition-all duration-300 hover:scale-150"></span>
                    Skills Acquired
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {certificates[currentIndex].skills.map((skill, index) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gradient-to-r from-green-100 to-blue-100 text-green-700 rounded-full text-sm font-medium border border-green-200 transform transition-all duration-300 hover:scale-105 hover:shadow-md"
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
                className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* View All Certificates Button */}
          <div className="text-center">
            <button 
              onClick={() => setShowAllCertificates(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center mx-auto gap-3"
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl shadow-2xl border border-white/30 max-w-6xl w-full max-h-[90vh] overflow-hidden transform animate-scale-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-3xl font-bold">All Certificates</h3>
                <button
                  onClick={() => setShowAllCertificates(false)}
                  className="text-white hover:text-purple-200 transition-colors duration-300 p-2 hover:bg-white/20 rounded-full"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-purple-100 mt-2">Browse through all my professional certifications and achievements</p>
            </div>

            {/* Certificates Grid */}
            <div className="p-8 max-h-[70vh] overflow-y-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert, index) => (
                  <div
                    key={cert.id}
                    className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/30 transform transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer group"
                    onClick={() => {
                      setCurrentIndex(index);
                      setShowAllCertificates(false);
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
                      <div className="absolute top-3 right-3 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {cert.date}
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
                      {cert.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">{cert.issuer}</p>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-gradient-to-r from-green-50 to-blue-50 text-green-700 rounded-full text-xs font-medium border border-green-200"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          +{cert.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6 bg-white/50">
              <div className="text-center">
                <button
                  onClick={() => setShowAllCertificates(false)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
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