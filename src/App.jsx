import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Footer from "./components/Footer";
import ProjectDetail from "./components/ProjectDetail";
import TicTacToeIcon from "./components/TicTacToeIcon";
import CustomCursor from "./components/cursor/CustomCursor"; // Import the custom cursor

const Home = () => {
  return (
    <div>
      <CustomCursor /> {/* Add custom cursor here */}
      <Header />
      <main>
        <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
          {/* Your existing home section content */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-cyan-500 rounded-full blur-3xl animate-bounce delay-500"></div>
            <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-pink-500 rounded-full blur-2xl animate-ping delay-700"></div>
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
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
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
                className="group relative bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl overflow-hidden"
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-30 group-hover:opacity-70 transition-opacity duration-500"></div>
              </a>
              
              <a 
                href="#contact" 
                className="group relative border-2 border-purple-400 text-purple-300 px-10 py-4 rounded-full font-semibold hover:bg-purple-400/20 hover:text-white hover:border-purple-300 transition-all duration-500 transform hover:scale-105 hover:shadow-xl"
              >
                <span className="relative z-10">Contact Me</span>
                <div className="absolute inset-0 bg-purple-400 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 opacity-10"></div>
              </a>
            </div>
          </div>
        </section>
        <About />
        <Projects />
        <Certificates />
      </main>
      <Footer />
      <TicTacToeIcon />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
      </Routes>
    </Router>
  );
};

export default App;