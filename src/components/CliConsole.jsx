import React, { useState, useEffect, useRef } from "react";

const CliConsole = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [logs, setLogs] = useState([
    { type: "system", text: "Nabeel-OS CLI Terminal [Version 1.0.0]" },
    { type: "system", text: "Type /help to see all available commands." }
  ]);
  const logsEndRef = useRef(null);

  // Auto scroll logs box to bottom
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const handleCommand = (cmd) => {
    const rawCmd = cmd.trim();
    if (!rawCmd) return;

    const trimmed = rawCmd.toLowerCase();
    // Add forward slash helper if omitted
    const cleanCmd = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    const cmdParts = cleanCmd.split(" ");
    const primaryCmd = cmdParts[0];

    let responseText = "";

    switch (primaryCmd) {
      case "/help":
        responseText = "Commands: /skills, /contact, /certs, /education, /scroll <section>, /theme, /game, /clear, /close";
        break;
      case "/skills":
      case "/tools":
        responseText = "Skills: React, Node.js, MongoDB, Express, Python, Java, C++, AWS, Docker, Git";
        break;
      case "/contact":
        responseText = "Contact: Email: nabeelijaz559@gmail.com | Location: Lahore, Pakistan | GitHub: @MeNabeel";
        break;
      case "/certs":
      case "/certificates":
        responseText = "Certs: Meta Front-End Specialization, Machine Learning (Stanford DeepLearning), IBM Software Engineering";
        break;
      case "/education":
        responseText = "Education: Software Engineering Student at University of Central Punjab";
        break;
      case "/theme": {
        const currentTheme = localStorage.getItem("portfolio-theme") || "cosmic";
        const nextTheme = currentTheme === "cosmic" ? "gold" : "cosmic";
        localStorage.setItem("portfolio-theme", nextTheme);
        document.body.className = `theme-${nextTheme}`;
        window.dispatchEvent(new Event("theme-change"));
        responseText = `System: Theme updated to ${nextTheme.toUpperCase()}`;
        break;
      }
      case "/game":
      case "/play":
        window.dispatchEvent(new Event("play-game"));
        responseText = "System: Triggering Tic-Tac-Toe modal launch...";
        break;
      case "/close":
        setIsOpen(false);
        return;
      case "/clear":
        setLogs([]);
        return;
      case "/scroll": {
        const target = cmdParts[1];
        if (!target) {
          responseText = "Usage: /scroll <about | projects | certificates | contact | footer>";
        } else {
          const sectionId = target === "certs" ? "certificates" : target;
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            responseText = `System: Navigating to section #${sectionId}`;
          } else {
            responseText = `Error: Section #${target} not found. Try: about, projects, certificates, contact`;
          }
        }
        break;
      }
      default: {
        // Fallback checks for direct section keywords without prefixing /scroll
        const cleanKeyword = primaryCmd.replace("/", "");
        if (["about", "projects", "certificates", "certs", "contact", "footer"].includes(cleanKeyword)) {
          const sectionId = cleanKeyword === "certs" ? "certificates" : cleanKeyword;
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            responseText = `System: Scrolling to section #${sectionId}...`;
          } else {
            responseText = `Command "${rawCmd}" not recognized. Type /help.`;
          }
        } else {
          responseText = `Command "${rawCmd}" not recognized. Type /help.`;
        }
      }
    }

    setLogs((prev) => [
      ...prev,
      { type: "user", text: rawCmd },
      { type: "system", text: responseText }
    ]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      handleCommand(inputVal);
      setInputVal("");
    }
  };

  return (
    <>
      {/* Floating CLI Toggle Button */}
      <div className="fixed bottom-28 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="theme-button-gradient text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-110 hover:-rotate-12 transition-all duration-300 group flex items-center justify-center cursor-pointer"
          title="Open Console CLI"
        >
          <div className="relative">
            <svg className="w-8 h-8 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="absolute inset-0 theme-button-gradient rounded-2xl opacity-0 group-hover:opacity-100 -z-10 animate-ping"></div>
          </div>
        </button>
      </div>

      {/* Slide-out Terminal Panel */}
      {isOpen && (
        <div className="fixed bottom-28 right-24 z-50 flex items-center justify-center animate-scale-in">
          <div className="bg-black/90 text-white rounded-2xl p-4 w-80 shadow-2xl border border-white/10 backdrop-blur-md flex flex-col relative overflow-hidden">
            {/* Header / Title Bar */}
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/10">
              <span className="text-[11px] font-mono text-white/50 tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                nabeel_os_cli.sh
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-red-400 hover:bg-white/10 p-1 rounded-full transition-colors cursor-pointer"
                title="Close terminal"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Terminal logs list */}
            <div className="h-40 overflow-y-auto pr-1 mb-3 space-y-1.5 scrollbar-thin overflow-x-hidden">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className={`text-[11px] font-mono leading-relaxed break-words ${
                    log.type === "user" ? "text-cyan-400" : "text-green-400"
                  }`}
                >
                  {log.type === "user" ? "> " : ""}
                  {log.text}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>

            {/* Console Prompt Input Form */}
            <form onSubmit={onSubmit} className="flex items-center gap-1.5 border-t border-white/10 pt-2.5">
              <span className="text-[11px] font-mono text-cyan-400 font-bold">&gt;</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type command (e.g. /skills)..."
                className="flex-1 bg-transparent text-white text-[11px] font-mono outline-none border-none placeholder-white/30"
                autoFocus
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CliConsole;
