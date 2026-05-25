import React, { useState, useEffect, useRef } from 'react';

const PHASES = {
  CONNECTING: 0,
  PROFILE: 1,
  WELCOME: 2,
  CLOSING: 3,
  CLOSED: 4
};

const PHASE_LINES = {
  [PHASES.CONNECTING]: [
    '> INITIALIZING SYSTEM...',
    '> ORBIT STATUS : STABLE',
    '> MARS LINK : CONNECTED',
    '> VENUS LINK : CONNECTED'
  ],
  [PHASES.PROFILE]: [
    '> ENGINEER PROFILE DETECTED',
    '> ENGINEER : NABEEL IJAZ',
    '> ROLE : SOFTWARE ENGINEER',
    '> SPECIALIZATION : FULL-STACK • AI • CLOUD',
    '> certified from Meta'
  ],
  [PHASES.WELCOME]: [
    '> WELCOME, VISITOR.',
    '> OPENING DIGITAL GATEWAY...'
  ]
};

export default function BootTerminal({ onBootComplete }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [phase, setPhase] = useState(PHASES.CONNECTING);
  const [lineIndex, setLineIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [completedLines, setCompletedLines] = useState([]);
  const terminalBodyRef = useRef(null);

  // Auto-scroll inside the terminal content area only, without hijacking the browser window scroll
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [completedLines, typedText]);

  // Scroll browser window to the top on mount to ensure the boot terminal sequence is visible
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // Main typing state machine
  useEffect(() => {
    if (phase === PHASES.CLOSING) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setPhase(PHASES.CLOSED);
        setIsOpen(false);
        if (onBootComplete) onBootComplete();
      }, 800); // matches transition-all duration-[800ms]
      return () => clearTimeout(timer);
    }
    if (phase === PHASES.CLOSED) return;

    const lines = PHASE_LINES[phase];
    if (!lines) return;

    if (lineIndex >= lines.length) {
      // Finished typing current phase lines
      // Pause, then go to next phase
      const pauseDuration = phase === PHASES.WELCOME ? 1500 : 1000;
      const pauseTimer = setTimeout(() => {
        setCompletedLines([]);
        setTypedText("");
        setLineIndex(0);
        setPhase(prev => prev + 1);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    const currentLine = lines[lineIndex];
    let charIndex = 0;
    setTypedText("");

    const typingInterval = setInterval(() => {
      if (charIndex < currentLine.length) {
        const char = currentLine[charIndex];
        setTypedText(prev => prev + char);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        const commitTimer = setTimeout(() => {
          setCompletedLines(prev => [...prev, currentLine]);
          setTypedText("");
          setLineIndex(prev => prev + 1);
        }, 150); // delay between lines
        return () => clearTimeout(commitTimer);
      }
    }, 20); // typing speed per character

    return () => clearInterval(typingInterval);
  }, [phase, lineIndex]);

  // Blinking cursor component
  const BlinkingCursor = () => (
    <span className="inline-block w-2 h-4 ml-1 bg-[var(--secondary-color)] animate-[pulse_1s_infinite_step-end] align-middle shadow-[0_0_8px_var(--secondary-color)]"></span>
  );

  const handleManualClose = () => {
    setPhase(PHASES.CLOSING);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`absolute top-28 left-[4%] md:left-[8%] w-[92%] max-w-[340px] md:max-w-[400px] terminal-glass rounded-2xl flex flex-col font-scifi text-xs md:text-sm z-40 overflow-hidden pointer-events-auto transition-all duration-[800ms] ease-in-out ${
        isClosing ? 'scale-0 opacity-0 blur-lg -translate-x-1/2' : 'scale-100 opacity-100 animate-slide-in-right'
      }`}
    >
      
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between terminal-titlebar px-4 py-2.5 select-none">
        <div className="flex gap-2">
          <button 
            onClick={handleManualClose}
            className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)] hover:bg-red-400 transition-colors cursor-pointer"
            title="Close Terminal"
          />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
        </div>
        <span className="text-[10px] terminal-text font-orbitron uppercase tracking-widest font-bold">COSMOS OS v5.1.0</span>
        <div className="w-6"></div> {/* Spacer to center title */}
      </div>

      {/* Terminal Content Area */}
      <div 
        ref={terminalBodyRef}
        className="p-5 min-h-[140px] max-h-[220px] overflow-y-auto flex-grow space-y-2 select-text custom-scrollbar terminal-text"
      >
        {/* Render Completed Lines */}
        {completedLines.map((line, idx) => (
          <p key={idx} className="leading-relaxed">
            {line}
          </p>
        ))}

        {/* Render Typing Text */}
        {phase < PHASES.CLOSING && PHASE_LINES[phase] && lineIndex < PHASE_LINES[phase].length && (
          <p className="leading-relaxed">
            {typedText}
            <BlinkingCursor />
          </p>
        )}
      </div>
    </div>
  );
}
