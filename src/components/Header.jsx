import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("portfolio-theme") || "cosmic");

  useEffect(() => {
    document.body.className = theme === "gold" ? "theme-gold" : "theme-cosmic";
    localStorage.setItem("portfolio-theme", theme);
    // Dispatch custom event to notify other components (e.g., About)
    window.dispatchEvent(new Event("theme-change"));
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "cosmic" ? "gold" : "cosmic"));
  };

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-sm border-b border-gray-200 animate-slide-down">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo and Name with Enhanced Animation */}
        <div className="flex items-center space-x-3 group cursor-pointer">
          {/* PNG Logo with Enhanced Animation */}
            <div className="relative">
              {!logoFailed ? (
                <img
                  src="/assets/nabeel.png"
                  alt="Nabeel Ijaz Logo"
                  className="w-10 h-10 rounded-xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl object-cover border-2 border-transparent group-hover:border-[var(--primary-color)]"
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                <div className="w-10 h-10 theme-button-gradient rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                  <span className="text-white font-bold text-sm">NI</span>
                </div>
              )}
              {/* Pulsing Effect */}
              <div className="absolute inset-0 theme-button-gradient rounded-xl opacity-0 group-hover:opacity-100 -z-10 animate-ping-slow transition-opacity duration-500"></div>
            </div>

          {/* Name with Enhanced Typography */}
          <h1 className="text-2xl font-bold theme-accent-text group-hover:opacity-90 transition-all duration-500 transform group-hover:scale-105">
            Nabeel Ijaz
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-8">
            {["Home", "About", "Projects", "Certificates", "Contact"].map((item, index) => (
              <li key={item}>
                {item === "Contact" ? (
                  <Link
                    to="/contact"
                    className="text-gray-700 hover:text-[var(--primary-color)] font-medium transition-all duration-500 relative group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="relative z-10 block transform group-hover:translate-y-[-2px] transition-transform duration-300">
                      {item}
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 theme-button-gradient group-hover:w-full transition-all duration-500 ease-out"></span>
                    <span className="absolute inset-0 theme-button-gradient rounded-lg scale-0 group-hover:scale-100 opacity-5 transition-transform duration-300 -z-10"></span>
                    <span className="absolute -top-1 -right-1 w-1 h-1 bg-[var(--primary-color)] rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-opacity duration-300"></span>
                  </Link>
                ) : (
                  <a
                    href={`/#${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-[var(--primary-color)] font-medium transition-all duration-500 relative group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="relative z-10 block transform group-hover:translate-y-[-2px] transition-transform duration-300">
                      {item}
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 theme-button-gradient group-hover:w-full transition-all duration-500 ease-out"></span>
                    <span className="absolute inset-0 theme-button-gradient rounded-lg scale-0 group-hover:scale-100 opacity-5 transition-transform duration-300 -z-10"></span>
                    <span className="absolute -top-1 -right-1 w-1 h-1 bg-[var(--primary-color)] rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-opacity duration-300"></span>
                  </a>
                )}
              </li>
            ))}
            <li>
              <a
                href="/assets/nabeel.pdf"
                download="Nabeel_Ijaz_Resume.pdf"
                className="text-[var(--primary-color)] hover:text-[var(--secondary-color)] font-medium transition-all duration-500 flex items-center gap-1 group bg-[var(--primary-color)]/10 px-4 py-2 rounded-full border border-[var(--primary-color)]/20 hover:bg-[var(--primary-color)]/20 shadow-sm"
                title="Download CV"
              >
                <svg className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>CV</span>
              </a>
            </li>
            <li>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-all duration-500 shadow-sm flex items-center justify-center cursor-pointer hover:rotate-45"
                title={theme === "gold" ? "Switch to Cosmic Theme" : "Switch to Gold Theme"}
              >
                {theme === "gold" ? (
                  <svg className="w-5 h-5 text-[var(--secondary-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-[var(--primary-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                )}
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg absolute w-full">
          <ul className="flex flex-col py-4 px-6 space-y-4">
            {["Home", "About", "Projects", "Certificates", "Contact"].map((item) => (
              <li key={item}>
                {item === "Contact" ? (
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-700 hover:text-purple-600 font-medium text-lg"
                  >
                    {item}
                  </Link>
                ) : (
                  <a
                    href={`/#${item.toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-700 hover:text-purple-600 font-medium text-lg"
                  >
                    {item}
                  </a>
                )}
              </li>
            ))}
            <li>
              <a
                href="/assets/nabeel.pdf"
                download="Nabeel_Ijaz_Resume.pdf"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center gap-2 text-[var(--primary-color)] hover:text-[var(--secondary-color)] font-medium text-lg mt-2 bg-[var(--primary-color)]/10 px-4 py-2 rounded-lg border border-[var(--primary-color)]/20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download CV
              </a>
            </li>
            <li>
              <button
                onClick={() => { toggleTheme(); setIsMobileMenuOpen(false); }}
                className="inline-flex items-center gap-2 text-gray-700 hover:text-purple-600 font-medium text-lg mt-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 cursor-pointer"
              >
                <span>Theme: {theme === "gold" ? "Cosmic" : "Gold"}</span>
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Progress Bar Indicator */}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 theme-button-gradient animate-progress"></div>
    </header>
  );
};

export default Header;