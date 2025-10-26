import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-sm border-b border-gray-200 animate-slide-down">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo and Name with Enhanced Animation */}
        <div className="flex items-center space-x-3 group cursor-pointer">
          {/* PNG Logo with Enhanced Animation */}
          <div className="relative">
            <img
              src="/assets/nabeel.png"
              alt="Nabeel Ijaz Logo"
              className="w-10 h-10 rounded-xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl object-cover border-2 border-transparent group-hover:border-purple-300"
              onError={(e) => {
                // Fallback if image doesn't load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback Logo if PNG doesn't load */}
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl hidden">
              <span className="text-white font-bold text-sm">NI</span>
            </div>
            {/* Pulsing Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl opacity-0 group-hover:opacity-100 -z-10 animate-ping-slow transition-opacity duration-500"></div>
          </div>
          
          {/* Name with Enhanced Typography */}
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:from-purple-700 group-hover:to-blue-700 transition-all duration-500 transform group-hover:scale-105">
            Nabeel Ijaz
          </h1>
        </div>

        {/* Navigation with Enhanced Animations */}
        <nav>
          <ul className="flex space-x-8">
            {["Home", "About", "Projects", "Certificates", "Contact"].map((item, index) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-purple-600 font-medium transition-all duration-500 relative group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Main Text */}
                  <span className="relative z-10 block transform group-hover:translate-y-[-2px] transition-transform duration-300">
                    {item}
                  </span>
                  
                  {/* Animated Underline */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full transition-all duration-500 ease-out"></span>
                  
                  {/* Background Highlight on Hover */}
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
                  
                  {/* Floating Dots */}
                  <span className="absolute -top-1 -right-1 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-opacity duration-300"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      {/* Progress Bar Indicator */}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 animate-progress"></div>
    </header>
  );
};

export default Header;