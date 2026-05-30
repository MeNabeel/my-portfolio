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
import InteractiveOrbs from "./components/InteractiveOrbs";
import BootTerminal from "./components/BootTerminal";
import Aurora from "./components/Aurora";

const Home = () => {
  const [hoveredAries, setHoveredAries] = React.useState(false);
  const [hoveredLibra, setHoveredLibra] = React.useState(false);
  const [hoveredMars, setHoveredMars] = React.useState(false);
  const [hoveredVenus, setHoveredVenus] = React.useState(false);
  const [hoveredSun, setHoveredSun] = React.useState(false);
  const [isBooted, setIsBooted] = React.useState(false);
  const [theme, setTheme] = React.useState(localStorage.getItem("portfolio-theme") || "cosmic");

  React.useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem("portfolio-theme") || "cosmic");
    };
    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, []);

  return (
    <div>
      <CustomCursor /> {/* Add custom cursor here */}
      <Header />
      <main>
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* Main Hero Elements */}
          <div className="w-full h-full absolute inset-0 flex items-center justify-center opacity-100 pointer-events-auto">

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
                strokeWidth={hoveredAries ? "1.5" : "0.5"} 
                strokeDasharray={hoveredAries ? "none" : "3 3"} 
                opacity={hoveredAries ? "0.9" : "0.3"}
                className="transition-all duration-300 pointer-events-auto cursor-pointer"
                onMouseEnter={() => setHoveredAries(true)}
                onMouseLeave={() => setHoveredAries(false)}
              />
              <line 
                x1="45" y1="40" x2="65" y2="65" 
                stroke={hoveredAries ? "var(--secondary-color)" : "var(--accent-color)"} 
                strokeWidth={hoveredAries ? "1.5" : "0.5"} 
                strokeDasharray={hoveredAries ? "none" : "3 3"} 
                opacity={hoveredAries ? "0.9" : "0.3"}
                className="transition-all duration-300 pointer-events-auto cursor-pointer"
                onMouseEnter={() => setHoveredAries(true)}
                onMouseLeave={() => setHoveredAries(false)}
              />
              <line 
                x1="65" y1="65" x2="75" y2="85" 
                stroke={hoveredAries ? "var(--secondary-color)" : "var(--accent-color)"} 
                strokeWidth={hoveredAries ? "1.5" : "0.5"} 
                strokeDasharray={hoveredAries ? "none" : "3 3"} 
                opacity={hoveredAries ? "0.9" : "0.3"}
                className="transition-all duration-300 pointer-events-auto cursor-pointer"
                onMouseEnter={() => setHoveredAries(true)}
                onMouseLeave={() => setHoveredAries(false)}
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
                strokeWidth={hoveredLibra ? "1.5" : "0.5"} 
                strokeDasharray={hoveredLibra ? "none" : "3 3"} 
                opacity={hoveredLibra ? "0.9" : "0.3"}
                className="transition-all duration-300 pointer-events-auto cursor-pointer"
                onMouseEnter={() => setHoveredLibra(true)}
                onMouseLeave={() => setHoveredLibra(false)}
              />
              <line 
                x1="50" y1="20" x2="75" y2="40" 
                stroke={hoveredLibra ? "var(--secondary-color)" : "var(--accent-color)"} 
                strokeWidth={hoveredLibra ? "1.5" : "0.5"} 
                strokeDasharray={hoveredLibra ? "none" : "3 3"} 
                opacity={hoveredLibra ? "0.9" : "0.3"}
                className="transition-all duration-300 pointer-events-auto cursor-pointer"
                onMouseEnter={() => setHoveredLibra(true)}
                onMouseLeave={() => setHoveredLibra(false)}
              />
              <line 
                x1="25" y1="55" x2="75" y2="40" 
                stroke={hoveredLibra ? "var(--secondary-color)" : "var(--accent-color)"} 
                strokeWidth={hoveredLibra ? "1.5" : "0.5"} 
                strokeDasharray={hoveredLibra ? "none" : "3 3"} 
                opacity={hoveredLibra ? "0.9" : "0.3"}
                className="transition-all duration-300 pointer-events-auto cursor-pointer"
                onMouseEnter={() => setHoveredLibra(true)}
                onMouseLeave={() => setHoveredLibra(false)}
              />
              <line 
                x1="25" y1="55" x2="30" y2="75" 
                stroke={hoveredLibra ? "var(--secondary-color)" : "var(--accent-color)"} 
                strokeWidth={hoveredLibra ? "1.5" : "0.5"} 
                strokeDasharray={hoveredLibra ? "none" : "3 3"} 
                opacity={hoveredLibra ? "0.9" : "0.3"}
                className="transition-all duration-300 pointer-events-auto cursor-pointer"
                onMouseEnter={() => setHoveredLibra(true)}
                onMouseLeave={() => setHoveredLibra(false)}
              />
              <line 
                x1="25" y1="55" x2="60" y2="80" 
                stroke={hoveredLibra ? "var(--secondary-color)" : "var(--accent-color)"} 
                strokeWidth={hoveredLibra ? "1.5" : "0.5"} 
                strokeDasharray={hoveredLibra ? "none" : "3 3"} 
                opacity={hoveredLibra ? "0.9" : "0.3"}
                className="transition-all duration-300 pointer-events-auto cursor-pointer"
                onMouseEnter={() => setHoveredLibra(true)}
                onMouseLeave={() => setHoveredLibra(false)}
              />
              <line 
                x1="60" y1="80" x2="30" y2="75" 
                stroke={hoveredLibra ? "var(--secondary-color)" : "var(--accent-color)"} 
                strokeWidth={hoveredLibra ? "1.5" : "0.5"} 
                strokeDasharray={hoveredLibra ? "none" : "3 3"} 
                opacity={hoveredLibra ? "0.9" : "0.3"}
                className="transition-all duration-300 pointer-events-auto cursor-pointer"
                onMouseEnter={() => setHoveredLibra(true)}
                onMouseLeave={() => setHoveredLibra(false)}
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
              <div className="w-2.5 h-2.5 rounded-full constellation-star" style={{ backgroundColor: 'var(--primary-color)' }}></div>
            </div>
            {/* Zubenelgenubi */}
            <div 
              className="absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full cursor-pointer z-10 flex items-center justify-center pointer-events-auto"
              style={{ left: '25%', top: '55%' }}
              onMouseEnter={() => setHoveredLibra(true)}
              onMouseLeave={() => setHoveredLibra(false)}
            >
              <div className="w-2.5 h-2.5 rounded-full constellation-star" style={{ backgroundColor: 'var(--secondary-color)', animationDelay: '1.5s' }}></div>
            </div>
            {/* Zubenelhakrabi */}
            <div 
              className="absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full cursor-pointer z-10 flex items-center justify-center pointer-events-auto"
              style={{ left: '75%', top: '40%' }}
              onMouseEnter={() => setHoveredLibra(true)}
              onMouseLeave={() => setHoveredLibra(false)}
            >
              <div className="w-2 h-2 rounded-full constellation-star" style={{ backgroundColor: 'var(--accent-color)', animationDelay: '0.7s' }}></div>
            </div>
            {/* Brachium */}
            <div 
              className="absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full cursor-pointer z-10 flex items-center justify-center pointer-events-auto"
              style={{ left: '60%', top: '80%' }}
              onMouseEnter={() => setHoveredLibra(true)}
              onMouseLeave={() => setHoveredLibra(false)}
            >
              <div className="w-2 h-2 rounded-full constellation-star" style={{ backgroundColor: 'var(--secondary-color)', animationDelay: '2.2s' }}></div>
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
          </div>

          {theme !== "aurora" && (
            <>
              {/* Mars (Left Bottom Corner) */}
              <div 
                className="absolute left-[5%] md:left-[10%] bottom-[8%] md:bottom-[12%] pointer-events-auto cursor-pointer z-10 flex flex-col items-center group transition-all duration-500"
                style={{ animation: 'planet-float 7s ease-in-out infinite' }}
                onMouseEnter={() => setHoveredMars(true)}
                onMouseLeave={() => setHoveredMars(false)}
              >
                <div 
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full relative transition-all duration-500 hover:scale-105"
                  style={{
                    background: 'radial-gradient(circle at 35% 35%, #ffa3a3 0%, #dc2626 55%, #7f1d1d 100%)',
                    boxShadow: hoveredMars ? '0 0 35px rgba(220, 38, 38, 0.8), inset -6px -6px 12px rgba(0, 0, 0, 0.8)' : '0 0 15px rgba(220, 38, 38, 0.3), inset -6px -6px 12px rgba(0, 0, 0, 0.8)'
                  }}
                >
                  {/* Polar Ice Cap */}
                  <div className="absolute w-2 h-1.5 bg-white/80 rounded-full blur-[0.5px] top-[8%] left-[62%] -rotate-12"></div>
                </div>
                <span 
                  className="mt-2 text-[9px] font-mono tracking-widest uppercase transition-all duration-300"
                  style={{ color: 'var(--secondary-color)', opacity: hoveredMars ? 0.8 : 0, transform: hoveredMars ? 'translateY(0)' : 'translateY(4px)' }}
                >
                  Mars
                </span>
              </div>

              {/* Venus (Right Bottom Corner) */}
              <div 
                className="absolute right-[5%] md:right-[10%] bottom-[8%] md:bottom-[12%] pointer-events-auto cursor-pointer z-10 flex flex-col items-center group transition-all duration-500"
                style={{ animation: 'planet-float 8s ease-in-out infinite', animationDelay: '1s' }}
                onMouseEnter={() => setHoveredVenus(true)}
                onMouseLeave={() => setHoveredVenus(false)}
              >
                <div 
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full relative transition-all duration-500 hover:scale-105"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, #fffbeb 0%, #f59e0b 50%, #78350f 100%)',
                    boxShadow: hoveredVenus ? '0 0 35px rgba(245, 158, 11, 0.8), inset -5px -5px 10px rgba(0, 0, 0, 0.8)' : '0 0 15px rgba(245, 158, 11, 0.3), inset -5px -5px 10px rgba(0, 0, 0, 0.8)'
                  }}
                >
                </div>
                <span 
                  className="mt-2 text-[9px] font-mono tracking-widest uppercase transition-all duration-300"
                  style={{ color: 'var(--secondary-color)', opacity: hoveredVenus ? 0.8 : 0, transform: hoveredVenus ? 'translateY(0)' : 'translateY(4px)' }}
                >
                  Venus
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

              {/* Distant Sun (Interactive) */}
              <div 
                className="absolute top-[10%] md:top-[12%] left-1/2 -translate-x-1/2 pointer-events-auto cursor-pointer z-10 flex flex-col items-center group transition-all duration-500"
                onMouseEnter={() => setHoveredSun(true)}
                onMouseLeave={() => setHoveredSun(false)}
              >
                <div 
                  className="sun transition-all duration-500"
                  style={{
                    position: 'relative',
                    top: 0,
                    left: 0,
                    transform: 'none',
                    scale: hoveredSun ? '1.18' : '1.0',
                    opacity: hoveredSun ? 1.0 : 0.65,
                    boxShadow: hoveredSun 
                      ? '0 0 50px rgba(255, 240, 180, 1.0), 0 0 100px rgba(255, 180, 50, 0.85), 0 0 150px rgba(255, 140, 50, 0.6)' 
                      : '0 0 15px rgba(255, 212, 148, 0.4), 0 0 30px rgba(255, 180, 100, 0.2)'
                  }}
                ></div>
                <span 
                  className="mt-2 text-[9px] font-mono tracking-widest uppercase transition-all duration-300"
                  style={{ 
                    color: 'var(--secondary-color)', 
                    opacity: hoveredSun ? 0.85 : 0, 
                    transform: hoveredSun ? 'translateY(0)' : 'translateY(4px)' 
                  }}
                >
                  Sun
                </span>
              </div>
            </>
          )}

          
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
              
              {/* Premium Built-With-Purpose Subtitle centered between Mars & Venus */}
              <p className="mt-8 text-md md:text-lg italic text-purple-200/80 font-mono tracking-wide max-w-2xl mx-auto animate-reveal-text">
                "Between distant planets and endless possibilities, I engineer the future."
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
          </div>

          {/* Boot sequence terminal popup */}
          <BootTerminal onBootComplete={() => setIsBooted(true)} />
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
  const [theme, setTheme] = React.useState(localStorage.getItem("portfolio-theme") || "cosmic");

  React.useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem("portfolio-theme") || "cosmic");
    };
    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen theme-gradient-bg">
        {/* Animated background orbs */}
        <InteractiveOrbs />

        {theme === "aurora" && (
          <div className="fixed inset-0 z-0 pointer-events-none">
            <Aurora 
              colorStops={["#00ffd0", "#7c4dff", "#00f2fe"]} 
              blend={0.5} 
              amplitude={1.0} 
              speed={1} 
            />
          </div>
        )}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;