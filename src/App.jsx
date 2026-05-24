import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Footer from "./components/Footer";
import ProjectDetail from "./components/ProjectDetail";
import TicTacToeIcon from "./components/TicTacToeIcon";
import CliConsole from "./components/CliConsole";
import CustomCursor from "./components/cursor/CustomCursor"; // Import the custom cursor
import ContactPage from "./components/ContactPage";
import { Link } from "react-router-dom";

const Home = () => {
  const [hoveredAries, setHoveredAries] = React.useState(false);
  const [hoveredLibra, setHoveredLibra] = React.useState(false);

  return (
    <div>
      <CustomCursor /> {/* Add custom cursor here */}
      <Header />
      <main>
        <section id="home" className="min-h-screen flex items-center justify-center theme-gradient-bg relative overflow-hidden">
          {/* Drifting Background Orbs */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-[10%] left-[15%] w-80 h-80 rounded-full blur-3xl" style={{ backgroundColor: 'var(--primary-color)', animation: 'space-drift-1 25s ease-in-out infinite' }}></div>
            <div className="absolute bottom-[15%] right-[10%] w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'var(--secondary-color)', animation: 'space-drift-2 30s ease-in-out infinite' }}></div>
            <div className="absolute bottom-[10%] left-[20%] w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: 'var(--primary-color)', animation: 'space-drift-3 35s ease-in-out infinite' }}></div>
            <div className="absolute top-[20%] right-[15%] w-64 h-64 rounded-full blur-2xl" style={{ backgroundColor: 'var(--secondary-color)', animation: 'space-drift-1 25s ease-in-out infinite', animationDelay: '-5s' }}></div>
          </div>

          {/* Aries Constellation (Left Side) */}
          <div 
            className="absolute left-[3%] md:left-[8%] top-[25%] w-[220px] h-[220px] md:w-[280px] md:h-[280px] pointer-events-none z-10 transition-opacity duration-300"
            style={{ opacity: hoveredAries ? 0.9 : 0.4 }}
          >
            <svg className="w-full h-full pointer-events-none" viewBox="0 0 100 100">
              {/* Lines */}
              <line 
                x1="30" y1="20" x2="45" y2="40" 
                stroke={hoveredAries ? "var(--secondary-color)" : "var(--accent-color)"} 
                strokeWidth={hoveredAries ? "1.2" : "0.5"} 
                strokeDasharray={hoveredAries ? "none" : "3 3"} 
                opacity={hoveredAries ? "0.9" : "0.6"}
                className="transition-all duration-300"
              />
              <line 
                x1="45" y1="40" x2="65" y2="65" 
                stroke={hoveredAries ? "var(--secondary-color)" : "var(--accent-color)"} 
                strokeWidth={hoveredAries ? "1.2" : "0.5"} 
                strokeDasharray={hoveredAries ? "none" : "3 3"} 
                opacity={hoveredAries ? "0.9" : "0.6"}
                className="transition-all duration-300"
              />
              <line 
                x1="65" y1="65" x2="75" y2="85" 
                stroke={hoveredAries ? "var(--secondary-color)" : "var(--accent-color)"} 
                strokeWidth={hoveredAries ? "1.2" : "0.5"} 
                strokeDasharray={hoveredAries ? "none" : "3 3"} 
                opacity={hoveredAries ? "0.9" : "0.6"}
                className="transition-all duration-300"
              />
            </svg>

            {/* Interactive Stars (Absolute divs capture hover perfectly) */}
            {/* Hamal */}
            <div 
              className="absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full cursor-pointer z-10 flex items-center justify-center pointer-events-auto"
              style={{ left: '45%', top: '40%' }}
              onMouseEnter={() => setHoveredAries(true)}
              onMouseLeave={() => setHoveredAries(false)}
            >
              <div className="w-2.5 h-2.5 rounded-full constellation-star" style={{ backgroundColor: 'var(--primary-color)' }}></div>
            </div>
            {/* Sheratan */}
            <div 
              className="absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full cursor-pointer z-10 flex items-center justify-center pointer-events-auto"
              style={{ left: '65%', top: '65%' }}
              onMouseEnter={() => setHoveredAries(true)}
              onMouseLeave={() => setHoveredAries(false)}
            >
              <div className="w-2 h-2 rounded-full constellation-star" style={{ backgroundColor: 'var(--secondary-color)', animationDelay: '1s' }}></div>
            </div>
            {/* Mesarthim */}
            <div 
              className="absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full cursor-pointer z-10 flex items-center justify-center pointer-events-auto"
              style={{ left: '75%', top: '85%' }}
              onMouseEnter={() => setHoveredAries(true)}
              onMouseLeave={() => setHoveredAries(false)}
            >
              <div className="w-1.5 h-1.5 rounded-full constellation-star" style={{ backgroundColor: 'var(--accent-color)', animationDelay: '2s' }}></div>
            </div>
            {/* 41 Arietis */}
            <div 
              className="absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full cursor-pointer z-10 flex items-center justify-center pointer-events-auto"
              style={{ left: '30%', top: '20%' }}
              onMouseEnter={() => setHoveredAries(true)}
              onMouseLeave={() => setHoveredAries(false)}
            >
              <div className="w-1.5 h-1.5 rounded-full constellation-star" style={{ backgroundColor: 'var(--secondary-color)', animationDelay: '0.5s' }}></div>
            </div>

            <span 
              className="absolute left-[10%] top-[5%] text-[9px] font-mono tracking-widest uppercase transition-colors duration-300"
              style={{ color: hoveredAries ? 'var(--secondary-color)' : 'rgba(255, 255, 255, 0.3)' }}
            >
              Aries
            </span>
          </div>

          {/* Libra Constellation (Right Side) */}
          <div 
            className="absolute right-[3%] md:right-[8%] top-[30%] w-[240px] h-[240px] md:w-[300px] md:h-[300px] pointer-events-none z-10 transition-opacity duration-300"
            style={{ opacity: hoveredLibra ? 0.9 : 0.4 }}
          >
            <svg className="w-full h-full pointer-events-none" viewBox="0 0 100 100">
              {/* Lines */}
              <line 
                x1="50" y1="20" x2="25" y2="55" 
                stroke={hoveredLibra ? "var(--secondary-color)" : "var(--accent-color)"} 
                strokeWidth={hoveredLibra ? "1.2" : "0.5"} 
                strokeDasharray={hoveredLibra ? "none" : "3 3"} 
                opacity={hoveredLibra ? "0.9" : "0.6"}
                className="transition-all duration-300"
              />
              <line 
                x1="50" y1="20" x2="75" y2="40" 
                stroke={hoveredLibra ? "var(--secondary-color)" : "var(--accent-color)"} 
                strokeWidth={hoveredLibra ? "1.2" : "0.5"} 
                strokeDasharray={hoveredLibra ? "none" : "3 3"} 
                opacity={hoveredLibra ? "0.9" : "0.6"}
                className="transition-all duration-300"
              />
              <line 
                x1="25" y1="55" x2="75" y2="40" 
                stroke={hoveredLibra ? "var(--secondary-color)" : "var(--accent-color)"} 
                strokeWidth={hoveredLibra ? "1.2" : "0.5"} 
                strokeDasharray={hoveredLibra ? "none" : "3 3"} 
                opacity={hoveredLibra ? "0.9" : "0.6"}
                className="transition-all duration-300"
              />
              <line 
                x1="25" y1="55" x2="30" y2="75" 
                stroke={hoveredLibra ? "var(--secondary-color)" : "var(--accent-color)"} 
                strokeWidth={hoveredLibra ? "1.2" : "0.5"} 
                strokeDasharray={hoveredLibra ? "none" : "3 3"} 
                opacity={hoveredLibra ? "0.9" : "0.6"}
                className="transition-all duration-300"
              />
              <line 
                x1="25" y1="55" x2="60" y2="80" 
                stroke={hoveredLibra ? "var(--secondary-color)" : "var(--accent-color)"} 
                strokeWidth={hoveredLibra ? "1.2" : "0.5"} 
                strokeDasharray={hoveredLibra ? "none" : "3 3"} 
                opacity={hoveredLibra ? "0.9" : "0.6"}
                className="transition-all duration-300"
              />
              <line 
                x1="60" y1="80" x2="30" y2="75" 
                stroke={hoveredLibra ? "var(--secondary-color)" : "var(--accent-color)"} 
                strokeWidth={hoveredLibra ? "1.2" : "0.5"} 
                strokeDasharray={hoveredLibra ? "none" : "3 3"} 
                opacity={hoveredLibra ? "0.9" : "0.6"}
                className="transition-all duration-300"
              />
            </svg>

            {/* Interactive Stars */}
            {/* Zubeneschamali */}
            <div 
              className="absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full cursor-pointer z-10 flex items-center justify-center pointer-events-auto"
              style={{ left: '50%', top: '20%' }}
              onMouseEnter={() => setHoveredLibra(true)}
              onMouseLeave={() => setHoveredLibra(false)}
            >
              <div className="w-2.2 h-2.2 rounded-full constellation-star" style={{ backgroundColor: 'var(--primary-color)' }}></div>
            </div>
            {/* Zubenelgenubi */}
            <div 
              className="absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full cursor-pointer z-10 flex items-center justify-center pointer-events-auto"
              style={{ left: '25%', top: '55%' }}
              onMouseEnter={() => setHoveredLibra(true)}
              onMouseLeave={() => setHoveredLibra(false)}
            >
              <div className="w-2.4 h-2.4 rounded-full constellation-star" style={{ backgroundColor: 'var(--secondary-color)', animationDelay: '1.5s' }}></div>
            </div>
            {/* Zubenelhakrabi */}
            <div 
              className="absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full cursor-pointer z-10 flex items-center justify-center pointer-events-auto"
              style={{ left: '75%', top: '40%' }}
              onMouseEnter={() => setHoveredLibra(true)}
              onMouseLeave={() => setHoveredLibra(false)}
            >
              <div className="w-1.8 h-1.8 rounded-full constellation-star" style={{ backgroundColor: 'var(--accent-color)', animationDelay: '0.7s' }}></div>
            </div>
            {/* Brachium */}
            <div 
              className="absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full cursor-pointer z-10 flex items-center justify-center pointer-events-auto"
              style={{ left: '60%', top: '80%' }}
              onMouseEnter={() => setHoveredLibra(true)}
              onMouseLeave={() => setHoveredLibra(false)}
            >
              <div className="w-1.8 h-1.8 rounded-full constellation-star" style={{ backgroundColor: 'var(--secondary-color)', animationDelay: '2.2s' }}></div>
            </div>
            {/* upsilon Librae */}
            <div 
              className="absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full cursor-pointer z-10 flex items-center justify-center pointer-events-auto"
              style={{ left: '30%', top: '75%' }}
              onMouseEnter={() => setHoveredLibra(true)}
              onMouseLeave={() => setHoveredLibra(false)}
            >
              <div className="w-1.5 h-1.5 rounded-full constellation-star" style={{ backgroundColor: 'var(--accent-color)', animationDelay: '1s' }}></div>
            </div>

            <span 
              className="absolute right-[10%] top-[5%] text-[9px] font-mono tracking-widest uppercase transition-colors duration-300"
              style={{ color: hoveredLibra ? 'var(--secondary-color)' : 'rgba(255, 255, 255, 0.3)' }}
            >
              Libra
            </span>
          </div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${10 + Math.random() * 10}s`
                }}
              />
            ))}
          </div>
          
          <div className="text-center text-white relative z-20 px-6">
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold mb-4 animate-fade-in-up">
                <span className="theme-accent-text animate-gradient-x">
                  Nabeel Ijaz
                </span>
              </h1>
            </div>

            <div className="mb-8 max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-gray-300 mb-4 animate-typewriter">
                Software Engineering Student &{" "}
                <span className="text-purple-300 font-semibold animate-pulse">
                  Full-Stack Developer
                </span>
              </p>
              <p className="text-lg md:text-xl text-gray-400 animate-fade-in delay-1000">
                passionate about <span className="text-blue-300">AI</span>,{" "}
                <span className="text-purple-300">Cloud Computing</span>, and building{" "}
                <span className="text-cyan-300">innovative digital solutions</span>
              </p>
            </div>

            <div className="flex gap-6 justify-center flex-wrap animate-fade-in-up delay-500">
              <a 
                href="#projects" 
                className="group relative theme-button-gradient text-white px-10 py-4 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl overflow-hidden"
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 theme-button-gradient-hover opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -inset-1 theme-button-gradient rounded-full blur opacity-30 group-hover:opacity-70 transition-opacity duration-500"></div>
              </a>
              
              <Link 
                to="/contact" 
                className="group relative border-2 border-[var(--primary-color)] text-[var(--accent-color)] px-10 py-4 rounded-full font-semibold hover:bg-[var(--primary-color)]/20 hover:text-white hover:border-[var(--secondary-color)] transition-all duration-500 transform hover:scale-105 hover:shadow-xl"
              >
                <span className="relative z-10">Contact Me</span>
                <div className="absolute inset-0 bg-[var(--primary-color)] rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 opacity-10"></div>
              </Link>
            </div>
          </div>
        </section>
        <About />
        <Projects />
        <Certificates />
      </main>
      <Footer />
      <TicTacToeIcon />
      <CliConsole />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
};

export default App;