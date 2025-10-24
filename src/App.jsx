import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import ProjectDetail from "./components/ProjectDetail";

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="text-center text-white relative z-10 px-6">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              Nabeel <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Ijaz</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Software Engineering Student & <span className="text-purple-300">Full-Stack Developer </span> 
               passionate about AI, Cloud Computing, and building innovative digital solutions
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="#projects" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                View My Work
              </a>
              <a href="#contact" className="border border-purple-400 text-purple-300 px-8 py-3 rounded-full font-semibold hover:bg-purple-400/10 transition-all duration-300">
                Contact Me
              </a>
            </div>
          </div>
        </section>
        <About />
        <Projects />
      </main>
      <Footer />
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