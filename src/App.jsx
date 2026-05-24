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
  return (
    <div>
      <CustomCursor /> {/* Add custom cursor here */}
      <Header />
      <main>
        <section id="home" className="min-h-screen flex items-center justify-center theme-gradient-bg relative overflow-hidden">
          {/* Drifting Background Orbs */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-[10%] left-[15%] w-80 h-80 rounded-full blur-3xl animate-drift-1" style={{ backgroundColor: 'var(--primary-color)' }}></div>
            <div className="absolute bottom-[15%] right-[10%] w-96 h-96 rounded-full blur-3xl animate-drift-2" style={{ backgroundColor: 'var(--secondary-color)' }}></div>
            <div className="absolute bottom-[10%] left-[20%] w-72 h-72 rounded-full blur-3xl animate-drift-3" style={{ backgroundColor: 'var(--primary-color)' }}></div>
            <div className="absolute top-[20%] right-[15%] w-64 h-64 rounded-full blur-2xl animate-drift-1" style={{ backgroundColor: 'var(--secondary-color)', animationDelay: '-5s' }}></div>
          </div>

          {/* Aries Constellation (Left Side) */}
          <div className="absolute left-[3%] md:left-[8%] top-[25%] w-[220px] h-[220px] md:w-[280px] md:h-[280px] pointer-events-none opacity-25 md:opacity-40 z-0">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Lines */}
              <line x1="30" y1="20" x2="45" y2="40" stroke="var(--accent-color)" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.6" />
              <line x1="45" y1="40" x2="65" y2="65" stroke="var(--accent-color)" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.6" />
              <line x1="65" y1="65" x2="75" y2="85" stroke="var(--accent-color)" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.6" />
              
              {/* Stars */}
              {/* Hamal */}
              <circle cx="45" cy="40" r="2.2" className="constellation-star" style={{ fill: 'var(--primary-color)' }} />
              {/* Sheratan */}
              <circle cx="65" cy="65" r="1.8" className="constellation-star" style={{ fill: 'var(--secondary-color)', animationDelay: '1s' }} />
              {/* Mesarthim */}
              <circle cx="75" cy="85" r="1.5" className="constellation-star" style={{ fill: 'var(--accent-color)', animationDelay: '2s' }} />
              {/* 41 Arietis */}
              <circle cx="30" cy="20" r="1.2" className="constellation-star" style={{ fill: 'var(--secondary-color)', animationDelay: '0.5s' }} />
            </svg>
            <span className="absolute left-[10%] top-[5%] text-[9px] font-mono tracking-widest text-white/30 uppercase">Aries</span>
          </div>

          {/* Libra Constellation (Right Side) */}
          <div className="absolute right-[3%] md:right-[8%] top-[30%] w-[240px] h-[240px] md:w-[300px] md:h-[300px] pointer-events-none opacity-25 md:opacity-40 z-0">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Lines */}
              <line x1="50" y1="20" x2="25" y2="55" stroke="var(--accent-color)" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.6" />
              <line x1="50" y1="20" x2="75" y2="40" stroke="var(--accent-color)" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.6" />
              <line x1="25" y1="55" x2="75" y2="40" stroke="var(--accent-color)" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.6" />
              <line x1="25" y1="55" x2="30" y2="75" stroke="var(--accent-color)" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.6" />
              <line x1="25" y1="55" x2="60" y2="80" stroke="var(--accent-color)" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.6" />
              <line x1="60" y1="80" x2="30" y2="75" stroke="var(--accent-color)" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.6" />
              
              {/* Stars */}
              {/* Zubeneschamali */}
              <circle cx="50" cy="20" r="2.2" className="constellation-star" style={{ fill: 'var(--primary-color)' }} />
              {/* Zubenelgenubi */}
              <circle cx="25" cy="55" r="2.4" className="constellation-star" style={{ fill: 'var(--secondary-color)', animationDelay: '1.5s' }} />
              {/* Zubenelhakrabi */}
              <circle cx="75" cy="40" r="1.8" className="constellation-star" style={{ fill: 'var(--accent-color)', animationDelay: '0.7s' }} />
              {/* Brachium */}
              <circle cx="60" cy="80" r="1.8" className="constellation-star" style={{ fill: 'var(--secondary-color)', animationDelay: '2.2s' }} />
              {/* upsilon Librae */}
              <circle cx="30" cy="75" r="1.5" className="constellation-star" style={{ fill: 'var(--accent-color)', animationDelay: '1s' }} />
            </svg>
            <span className="absolute right-[10%] top-[5%] text-[9px] font-mono tracking-widest text-white/30 uppercase">Libra</span>
          </div>

          <div className="absolute inset-0 overflow-hidden">
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
          
          <div className="text-center text-white relative z-10 px-6">
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