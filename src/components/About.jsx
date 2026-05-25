import React, { useState, useEffect } from "react";

const About = () => {
  const [theme, setTheme] = useState(localStorage.getItem("portfolio-theme") || "cosmic");

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem("portfolio-theme") || "cosmic");
    };
    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, []);

  return (
    <section id="about" className="py-20 relative overflow-hidden border-t border-black/5" style={{ background: 'var(--about-bg)', color: 'var(--about-text-body)' }}>


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

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[length:50px_50px] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src={theme === "gold" ? "/assets/nabeel_t2.png" : "/assets/nabeel_t1.png"}
                alt="Nabeel Ijaz"
                className="w-80 h-80 rounded-2xl object-cover shadow-2xl border-8 transform rotate-3 hover:rotate-0 transition-all duration-300 ease-out hover:scale-105"
                style={{ borderColor: 'var(--about-card-border)' }}
              />
              <div className="absolute -inset-4 theme-button-gradient rounded-2xl -z-10 opacity-20 blur-lg transition-all duration-300 hover:opacity-30 hover:blur-xl"></div>
            </div>
          </div>

          <div className="flex-1 max-w-2xl">
            <h2 className="text-5xl font-bold mb-6 transform transition-all duration-300 hover:scale-105" style={{ color: 'var(--about-text-title)' }}>
              About Me
            </h2>

            <div 
              className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] relative overflow-hidden"
              style={{ backgroundColor: 'var(--about-card-bg)', borderColor: 'var(--about-card-border)', color: 'var(--about-text-body)' }}
            >
              {/* Card Background Effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-blue-500/10 rounded-full -translate-y-16 translate-x-16 opacity-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/10 to-purple-500/10 rounded-full translate-y-12 -translate-x-12 opacity-10"></div>

              <div className="relative z-10">
                <p className="text-lg leading-relaxed mb-6 transform transition-all duration-300 delay-100" style={{ color: 'var(--about-text-body)' }}>
                  Hi, <span className="font-semibold transition-colors duration-200" style={{ color: 'var(--about-highlight-color)' }}>I'm Nabeel Ijaz</span>,
                  a passionate Software Engineering student at the University of Central Punjab.
                  I specialize in creating innovative solutions using cutting-edge technologies.
                </p>

                <div className="mb-6 transform transition-all duration-300 delay-200">
                  <h3 className="text-xl font-semibold mb-4 flex items-center transform transition-all duration-200 hover:translate-x-2" style={{ color: 'var(--about-text-title)' }}>
                    <span className="w-2 h-2 rounded-full mr-3 transition-all duration-200 hover:scale-150" style={{ backgroundColor: 'var(--about-highlight-color)' }}></span>
                    Core Interests
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {["Full-Stack Development", "System Design", "AI & Machine Learning", "DevOps", "Cloud Computing"].map((interest, index) => (
                      <span
                        key={interest}
                        className="px-4 py-2 theme-button-gradient text-white rounded-full text-sm font-medium shadow-lg transform transition-all duration-200 hover:scale-110 hover:shadow-xl"
                        style={{ transitionDelay: `${300 + index * 100}ms` }}
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6 transform transition-all duration-300 delay-300">
                  <h3 className="text-xl font-semibold mb-4 flex items-center transform transition-all duration-200 hover:translate-x-2" style={{ color: 'var(--about-text-title)' }}>
                    <span className="w-2 h-2 rounded-full mr-3 transition-all duration-200 hover:scale-150" style={{ backgroundColor: 'var(--about-highlight-color)' }}></span>
                    Technical Skills
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {["React", "Node.js", "MongoDB", "Express", "Python", "Java", "C++", "AWS", "Docker"].map((skill, index) => (
                      <div
                        key={skill}
                        className="flex items-center transform transition-all duration-200 hover:translate-x-2 about-item-hover"
                        style={{ transitionDelay: `${400 + index * 50}ms`, color: 'var(--about-text-body)' }}
                      >
                        <div className="w-2 h-2 rounded-full mr-3 transition-all duration-200 hover:scale-150" style={{ backgroundColor: 'var(--about-highlight-color)' }}></div>
                        <span className="transition-colors duration-200">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="transform transition-all duration-300 delay-400">
                  <h3 className="text-xl font-semibold mb-4 flex items-center transform transition-all duration-200 hover:translate-x-2" style={{ color: 'var(--about-text-title)' }}>
                    <span className="w-2 h-2 rounded-full mr-3 transition-all duration-200 hover:scale-150" style={{ backgroundColor: 'var(--about-highlight-color)' }}></span>
                    Certifications
                  </h3>
                  <ul className="space-y-2">
                    {["Introduction to Software Engineering", "Meta Front-End Developer Specialization", "AWS Cloud Practitioner", "Version Control", "Machine Learning"].map((cert, index) => (
                      <li
                        key={cert}
                        className="flex items-center transform transition-all duration-200 hover:translate-x-2 about-item-hover"
                        style={{ transitionDelay: `${500 + index * 75}ms`, color: 'var(--about-text-body)' }}
                      >
                        <span className="mr-3 transition-transform duration-200 hover:scale-125 font-bold" style={{ color: 'var(--about-highlight-color)' }}>✓</span>
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