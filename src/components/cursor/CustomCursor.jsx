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

    // Use event delegation for hover tracking to support dynamically loaded components (e.g. modals)
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isLink = target.closest('a');
      const isButton = target.closest('button, [role="button"], input, textarea, select');

      setLinkHovered(!!isLink);
      setButtonHovered(!!isButton);

      if (isButton && (
        isButton.classList.contains('hover:bg-red-500/80') || 
        isButton.title === 'Close Modal' || 
        isButton.title === 'Back to Home' ||
        isButton.closest('a')?.title === 'Back to Home'
      )) {
        document.body.classList.add('cursor-close-hover');
      } else {
        document.body.classList.remove('cursor-close-hover');
      }
    };

    const handleMouseLeaveWindow = () => {
      setLinkHovered(false);
      setButtonHovered(false);
      document.body.classList.remove('cursor-close-hover');
    };

    addEventListeners();
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.body.style.cursor = 'none';

    // Clean up trail points
    const trailCleanup = setInterval(() => {
      setTrail(prev => prev.filter(point => Date.now() - point.id < 100));
    }, 50);

    return () => {
      removeEventListeners();
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
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