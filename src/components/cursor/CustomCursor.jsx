import React, { useState, useEffect } from 'react';
import './cursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add trail effect
      setTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }];
        return newTrail.slice(-8); // Keep only last 8 positions
      });
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    // Add hover effects for interactive elements
    const handleHoverEvents = () => {
      const links = document.querySelectorAll('a');
      const buttons = document.querySelectorAll('button, [role="button"]');
      const inputs = document.querySelectorAll('input, textarea, select');
      
      links.forEach(link => {
        link.addEventListener('mouseenter', () => setLinkHovered(true));
        link.addEventListener('mouseleave', () => setLinkHovered(false));
      });
      
      buttons.forEach(button => {
        button.addEventListener('mouseenter', () => setButtonHovered(true));
        button.addEventListener('mouseleave', () => setButtonHovered(false));
      });

      inputs.forEach(input => {
        input.addEventListener('mouseenter', () => setButtonHovered(true));
        input.addEventListener('mouseleave', () => setButtonHovered(false));
      });
    };

    addEventListeners();
    handleHoverEvents();
    document.body.style.cursor = 'none';

    // Clean up trail points
    const trailCleanup = setInterval(() => {
      setTrail(prev => prev.filter(point => Date.now() - point.id < 100));
    }, 50);

    return () => {
      removeEventListeners();
      document.body.style.cursor = 'auto';
      clearInterval(trailCleanup);
    };
  }, []);

  const cursorClasses = [
    'custom-cursor',
    hidden && 'cursor-hidden',
    clicked && 'cursor-clicked',
    linkHovered && 'cursor-link-hover',
    buttonHovered && 'cursor-button-hover'
  ].filter(Boolean).join(' ');

  return (
    <>
      {/* Trail dots */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="cursor-trail-dot"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            opacity: (index + 1) / trail.length,
            transform: `scale(${0.2 + (index / trail.length) * 0.8})`
          }}
        />
      ))}
      
      {/* Outer ring */}
      <div
        className="cursor-outer"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      
      {/* Main cursor */}
      <div
        className={cursorClasses}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div className="cursor-inner-glow" />
        <div className="cursor-pulse" />
      </div>
      
      {/* Hover effect */}
      {(linkHovered || buttonHovered) && (
        <div
          className="cursor-hover-effect"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;