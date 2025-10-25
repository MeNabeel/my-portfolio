import React from "react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-float" style={{ animationDelay: '4s' }}></div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-30 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[length:50px_50px] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src="/assets/nab.png"
                alt="Nabeel Ijaz"
                className="w-80 h-80 rounded-2xl object-cover shadow-2xl border-8 border-white transform rotate-3 hover:rotate-0 transition-all duration-500 ease-out hover:scale-105"
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-blue-500 rounded-2xl -z-10 opacity-20 blur-lg transition-all duration-700 hover:opacity-30 hover:blur-xl"></div>
            </div>
          </div>

          <div className="flex-1 max-w-2xl">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent transform transition-all duration-500 hover:scale-105">
              About Me
            </h2>
            
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/30 transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] relative overflow-hidden">
              {/* Card Background Effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-blue-500/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/10 to-purple-500/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <p className="text-lg text-gray-700 leading-relaxed mb-6 transform transition-all duration-500 delay-100">
                  Hi, <span className="font-semibold text-purple-600 transition-colors duration-300 hover:text-purple-700">I'm Nabeel Ijaz</span>, 
                  a passionate Software Engineering student at the University of Central Punjab. 
                  I specialize in creating innovative solutions using cutting-edge technologies.
                </p>

                <div className="mb-6 transform transition-all duration-500 delay-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center transform transition-all duration-300 hover:translate-x-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 transition-all duration-300 hover:scale-150"></span>
                    Core Interests
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {["AI & Machine Learning", "Cloud Computing", "Full-Stack Development", "DevOps"].map((interest, index) => (
                      <span 
                        key={interest} 
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-sm font-medium shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl hover:from-purple-600 hover:to-blue-600"
                        style={{ transitionDelay: `${300 + index * 100}ms` }}
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6 transform transition-all duration-500 delay-300">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center transform transition-all duration-300 hover:translate-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 transition-all duration-300 hover:scale-150"></span>
                    Technical Skills
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {["React", "Node.js", "MongoDB", "Python", "Java", "C++", "AWS", "Docker"].map((skill, index) => (
                      <div 
                        key={skill} 
                        className="flex items-center transform transition-all duration-300 hover:translate-x-2 hover:text-blue-600"
                        style={{ transitionDelay: `${400 + index * 50}ms` }}
                      >
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 transition-all duration-300 hover:scale-150 hover:bg-blue-600"></div>
                        <span className="text-gray-700 transition-colors duration-300">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="transform transition-all duration-500 delay-400">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center transform transition-all duration-300 hover:translate-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 transition-all duration-300 hover:scale-150"></span>
                    Certifications
                  </h3>
                  <ul className="space-y-2">
                    {["Meta Front-End Developer Specialization", "AWS Cloud Practitioner", "Introduction to Software Engineering", "Version Control"].map((cert, index) => (
                      <li 
                        key={cert} 
                        className="flex items-center text-gray-700 transform transition-all duration-300 hover:translate-x-2 hover:text-green-600"
                        style={{ transitionDelay: `${500 + index * 75}ms` }}
                      >
                        <span className="text-green-500 mr-3 transition-transform duration-300 hover:scale-125">✓</span>
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;