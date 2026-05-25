import React, { useState, useEffect, useRef } from 'react';

export default function BootTerminal({ onBootComplete }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [completedLines, setCompletedLines] = useState([]);
  const [visibleBinaryBoxes, setVisibleBinaryBoxes] = useState(0);
  const contentEndRef = useRef(null);

  const bootSequence = [
    { type: 'text', content: '> INITIALIZING SYSTEM...' },
    { type: 'text', content: '> ENGINEER PROFILE DETECTED' },
    { type: 'text', content: '> MISSION CODE : COSMOS_510' },
    { type: 'binary', content: ['0001', '0101', '0000', '0100'] },
    { type: 'text', content: '> ORBIT STATUS : STABLE' },
    { type: 'text', content: '> MARS LINK : CONNECTED' },
    { type: 'text', content: '> VENUS LINK : CONNECTED' },
    { type: 'empty' },
    { type: 'text', content: '> ENGINEER : NABEEL IJAZ' },
    { type: 'text', content: '> ROLE : SOFTWARE ENGINEER' },
    { type: 'text', content: '> SPECIALIZATION : FULL-STACK • AI • CLOUD' },
    { type: 'text', content: '> certified from Meta' },
    { type: 'text', content: '> WELCOME, VISITOR.' },
    { type: 'text', content: '> OPENING DIGITAL GATEWAY...' }
  ];

  // Auto-scroll to bottom of terminal content
  useEffect(() => {
    if (contentEndRef.current) {
      contentEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [completedLines, typedText, visibleBinaryBoxes]);

  // Main typing state machine
  useEffect(() => {
    if (stepIndex >= bootSequence.length) {
      // Sequence completed, trigger auto-minimize after 2.5s
      const minimizeTimer = setTimeout(() => {
        setIsMinimized(true);
        if (onBootComplete) onBootComplete();
      }, 2500);
      return () => clearTimeout(minimizeTimer);
    }

    const currentStep = bootSequence[stepIndex];

    if (currentStep.type === 'empty') {
      // Quick insert of empty line
      setCompletedLines(prev => [...prev, { type: 'empty' }]);
      setStepIndex(prev => prev + 1);
    } 
    else if (currentStep.type === 'text') {
      let charIndex = 0;
      setTypedText("");
      
      const typingInterval = setInterval(() => {
        const text = currentStep.content;
        if (charIndex < text.length) {
          setTypedText(prev => prev + text[charIndex]);
          charIndex++;
        } else {
          clearInterval(typingInterval);
          // Wait briefly, then commit line to completed lines and proceed
          setTimeout(() => {
            setCompletedLines(prev => [...prev, { type: 'text', content: text }]);
            setTypedText("");
            setStepIndex(prev => prev + 1);
          }, 350);
        }
      }, 25); // Typing speed per character (25ms)

      return () => clearInterval(typingInterval);
    } 
    else if (currentStep.type === 'binary') {
      let boxCount = 0;
      setVisibleBinaryBoxes(0);

      const boxInterval = setInterval(() => {
        if (boxCount < currentStep.content.length) {
          boxCount++;
          setVisibleBinaryBoxes(boxCount);
        } else {
          clearInterval(boxInterval);
          setTimeout(() => {
            setCompletedLines(prev => [...prev, { type: 'binary', content: currentStep.content }]);
            setVisibleBinaryBoxes(0);
            setStepIndex(prev => prev + 1);
          }, 600);
        }
      }, 200); // 200ms delay between revealing each binary box

      return () => clearInterval(boxInterval);
    }
  }, [stepIndex]);

  // Ensure that minimizing the terminal immediately completes the boot sequence to activate the hero UI
  useEffect(() => {
    if (isMinimized && onBootComplete) {
      onBootComplete();
    }
  }, [isMinimized, onBootComplete]);

  // Blinking cursor component
  const BlinkingCursor = () => (
    <span className="inline-block w-2 h-4 ml-1 bg-cyan-400 animate-[pulse_1s_infinite_step-end] align-middle shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
  );

  if (!isOpen) return null;

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="absolute top-28 left-[4%] md:left-[8%] cursor-pointer z-40 flex items-center gap-3 bg-[#0a0518]/80 backdrop-blur-md border border-cyan-500/40 hover:border-cyan-400 px-4 py-2.5 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.3)] text-xs font-mono text-cyan-400 hover:scale-105 transition-all duration-300 pointer-events-auto"
        title="Expand System Terminal"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="tracking-widest uppercase text-[10px] font-bold">SYS_OS_ONLINE.log</span>
      </button>
    );
  }

  return (
    <div className="absolute top-28 left-[4%] md:left-[8%] w-[92%] max-w-[340px] md:max-w-[400px] bg-[#060312]/80 backdrop-blur-md border border-cyan-500/30 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col font-mono text-xs md:text-sm text-cyan-400/90 z-40 overflow-hidden pointer-events-auto transition-all duration-700 animate-slide-in-right">
      
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between bg-[#0b061d] px-4 py-2.5 border-b border-cyan-500/20 select-none">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
        </div>
        <span className="text-[10px] text-cyan-400/60 uppercase tracking-widest font-bold">COSMOS OS v5.1.0</span>
        <button 
          onClick={() => setIsMinimized(true)}
          className="text-cyan-400/50 hover:text-cyan-300 hover:bg-white/5 rounded px-1.5 py-0.5 text-[10px] transition-colors"
          title="Minimize Window"
        >
          _
        </button>
      </div>

      {/* Terminal Content Area */}
      <div className="p-5 max-h-[300px] overflow-y-auto flex-grow space-y-2 select-text custom-scrollbar">
        {/* Render Completed Lines */}
        {completedLines.map((line, idx) => {
          if (line.type === 'empty') {
            return <div key={idx} className="h-2"></div>;
          }
          if (line.type === 'binary') {
            return (
              <div key={idx} className="flex gap-2 my-2 py-1">
                {line.content.map((val, bIdx) => (
                  <div 
                    key={bIdx} 
                    className="w-12 h-8 border border-purple-500/30 rounded bg-purple-950/20 text-purple-300 font-bold flex items-center justify-center text-[11px] shadow-[0_0_8px_rgba(168,85,247,0.15)]"
                  >
                    {val}
                  </div>
                ))}
              </div>
            );
          }
          return (
            <p key={idx} className="leading-relaxed">
              {line.content}
            </p>
          );
        })}

        {/* Render Typing Text */}
        {stepIndex < bootSequence.length && bootSequence[stepIndex].type === 'text' && (
          <p className="leading-relaxed">
            {typedText}
            <BlinkingCursor />
          </p>
        )}

        {/* Render Typing Binary Boxes */}
        {stepIndex < bootSequence.length && bootSequence[stepIndex].type === 'binary' && (
          <div className="flex gap-2 my-2 py-1">
            {bootSequence[stepIndex].content.slice(0, visibleBinaryBoxes).map((val, bIdx) => (
              <div 
                key={bIdx} 
                className="w-12 h-8 border border-purple-500/40 rounded bg-purple-950/30 text-purple-300 font-bold flex items-center justify-center text-[11px] shadow-[0_0_8px_rgba(168,85,247,0.25)] animate-pulse"
              >
                {val}
              </div>
            ))}
            {visibleBinaryBoxes < bootSequence[stepIndex].content.length && <BlinkingCursor />}
          </div>
        )}

        {/* End of logs hook */}
        <div ref={contentEndRef} />
      </div>
    </div>
  );
}
