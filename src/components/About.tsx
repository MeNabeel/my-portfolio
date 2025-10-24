import React from "react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src="/assets/pro.jpg"
                alt="Nabeel Ijaz"
                className="w-80 h-80 rounded-2xl object-cover shadow-2xl border-8 border-white transform rotate-3 hover:rotate-0 transition-transform duration-500"
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-blue-500 rounded-2xl -z-10 opacity-20 blur-lg"></div>
            </div>
          </div>

          <div className="flex-1 max-w-2xl">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              About Me
            </h2>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Hi, <span className="font-semibold text-purple-600">I'm Nabeel Ijaz</span>, 
                a passionate Software Engineering student at the University of Central Punjab. 
                I specialize in creating innovative solutions using cutting-edge technologies.
              </p>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  Core Interests
                </h3>
                <div className="flex flex-wrap gap-3">
                  {["AI & Machine Learning", "Cloud Computing", "Full-Stack Development", "DevOps"].map((interest) => (
                    <span key={interest} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-sm font-medium shadow-lg">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Technical Skills
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {["React", "Node.js", "MongoDB", "Python", "Java", "C++", "AWS", "Docker"].map((skill) => (
                    <div key={skill} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      <span className="text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Certifications
                </h3>
                <ul className="space-y-2">
                  {["Meta Front-End Developer Specialization", "AWS Cloud Practitioner", "Introduction to Software Engineering", "Version Control"].map((cert) => (
                    <li key={cert} className="flex items-center text-gray-700">
                      <span className="text-green-500 mr-3">✓</span>
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;