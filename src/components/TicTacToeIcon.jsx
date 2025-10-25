import React, { useState, useEffect } from "react";

const TicTacToeIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [gameMode, setGameMode] = useState("player"); // "player" or "ai"
  const [userSymbol, setUserSymbol] = useState("X"); // User can choose X or O
  const [difficulty, setDifficulty] = useState("medium"); // easy, medium, hard

  // AI move logic
  const getAIMove = (currentBoard, symbol) => {
    const opponentSymbol = symbol === 'X' ? 'O' : 'X';
    
    // Easy mode - random moves
    if (difficulty === "easy") {
      const emptySquares = currentBoard
        .map((square, index) => square === null ? index : null)
        .filter(index => index !== null);
      return emptySquares[Math.floor(Math.random() * emptySquares.length)];
    }

    // Medium mode - mix of smart and random moves
    if (difficulty === "medium" && Math.random() > 0.7) {
      const emptySquares = currentBoard
        .map((square, index) => square === null ? index : null)
        .filter(index => index !== null);
      return emptySquares[Math.floor(Math.random() * emptySquares.length)];
    }

    // Hard mode - minimax algorithm
    const minimax = (board, depth, isMaximizing) => {
      const winner = calculateWinner(board);
      
      if (winner === symbol) return { score: 10 - depth };
      if (winner === opponentSymbol) return { score: depth - 10 };
      if (!board.includes(null)) return { score: 0 };

      if (isMaximizing) {
        let bestScore = -Infinity;
        let bestMove = null;

        for (let i = 0; i < 9; i++) {
          if (board[i] === null) {
            board[i] = symbol;
            const score = minimax(board, depth + 1, false).score;
            board[i] = null;
            
            if (score > bestScore) {
              bestScore = score;
              bestMove = i;
            }
          }
        }
        return { score: bestScore, move: bestMove };
      } else {
        let bestScore = Infinity;
        let bestMove = null;

        for (let i = 0; i < 9; i++) {
          if (board[i] === null) {
            board[i] = opponentSymbol;
            const score = minimax(board, depth + 1, true).score;
            board[i] = null;
            
            if (score < bestScore) {
              bestScore = score;
              bestMove = i;
            }
          }
        }
        return { score: bestScore, move: bestMove };
      }
    };

    // Try to win immediately
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        const testBoard = [...currentBoard];
        testBoard[i] = symbol;
        if (calculateWinner(testBoard) === symbol) {
          return i;
        }
      }
    }

    // Block opponent from winning
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        const testBoard = [...currentBoard];
        testBoard[i] = opponentSymbol;
        if (calculateWinner(testBoard) === opponentSymbol) {
          return i;
        }
      }
    }

    // Use minimax for best move
    if (difficulty === "hard" || difficulty === "medium") {
      const result = minimax(currentBoard, 0, true);
      return result.move;
    }

    // Fallback to center or corners
    if (currentBoard[4] === null) return 4; // Center
    
    const corners = [0, 2, 6, 8];
    const emptyCorners = corners.filter(index => currentBoard[index] === null);
    if (emptyCorners.length > 0) {
      return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
    }

    // Any empty square
    const emptySquares = currentBoard
      .map((square, index) => square === null ? index : null)
      .filter(index => index !== null);
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.includes(null) ? null : 'Draw';
  };

  const handleClick = (index) => {
    if (board[index] || winner || (gameMode === "ai" && !isUserTurn())) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameHistory(prev => [...prev, { 
        winner: gameWinner, 
        board: newBoard,
        mode: gameMode,
        difficulty: gameMode === "ai" ? difficulty : null
      }]);
    }
  };

  const isUserTurn = () => {
    if (gameMode === "player") return true;
    return (userSymbol === 'X' && isXNext) || (userSymbol === 'O' && !isXNext);
  };

  // AI makes move
  useEffect(() => {
    if (gameMode === "ai" && !winner && !isUserTurn()) {
      const timer = setTimeout(() => {
        const aiSymbol = userSymbol === 'X' ? 'O' : 'X';
        const aiMove = getAIMove(board, aiSymbol);
        
        if (aiMove !== null && aiMove !== undefined) {
          const newBoard = [...board];
          newBoard[aiMove] = aiSymbol;
          setBoard(newBoard);
          setIsXNext(!isXNext);

          const gameWinner = calculateWinner(newBoard);
          if (gameWinner) {
            setWinner(gameWinner);
            setGameHistory(prev => [...prev, { 
              winner: gameWinner, 
              board: newBoard,
              mode: gameMode,
              difficulty: difficulty
            }]);
          }
        }
      }, 500); // Small delay for better UX

      return () => clearTimeout(timer);
    }
  }, [board, isXNext, gameMode, userSymbol, winner, difficulty]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const startNewGame = (mode, symbol = "X", diff = "medium") => {
    setGameMode(mode);
    setUserSymbol(symbol);
    setDifficulty(diff);
    resetGame();
  };

  const getStatus = () => {
    if (winner) {
      if (gameMode === "ai") {
        if (winner === 'Draw') return "It's a Draw!";
        return winner === userSymbol ? "You Win! 🎉" : "AI Wins! 🤖";
      }
      return winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`;
    }
    
    if (gameMode === "ai") {
      return isUserTurn() ? "Your Turn" : "AI is thinking...";
    }
    return `Next player: ${isXNext ? 'X' : 'O'}`;
  };

  const renderSquare = (index) => (
    <button
      className={`w-16 h-16 bg-white/90 border-2 text-2xl font-bold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center
        ${board[index] ? 'cursor-default' : 'cursor-pointer hover:bg-white hover:shadow-lg hover:scale-105'}
        ${!isUserTurn() && gameMode === "ai" ? 'cursor-not-allowed opacity-80' : ''}
        ${board[index] === 'X' ? 'border-purple-200' : 'border-blue-200'}
      `}
      onClick={() => handleClick(index)}
      disabled={!!board[index] || winner || (gameMode === "ai" && !isUserTurn())}
    >
      <span className={board[index] === 'X' ? 'text-purple-600' : 'text-blue-600'}>
        {board[index]}
      </span>
    </button>
  );

  // Auto-close game after win
  useEffect(() => {
    if (winner) {
      const timer = setTimeout(() => {
        resetGame();
        setIsOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [winner]);

  return (
    <>
      {/* Floating Game Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-110 hover:rotate-12 transition-all duration-500 group animate-bounce"
          title="Play Tic Tac Toe"
        >
          <div className="relative">
            {/* Tic Tac Toe Grid Icon */}
            <div className="w-8 h-8 relative">
              {/* Grid Lines */}
              <div className="absolute top-1/3 left-0 w-full h-0.5 bg-white/80 rounded"></div>
              <div className="absolute top-2/3 left-0 w-full h-0.5 bg-white/80 rounded"></div>
              <div className="absolute left-1/3 top-0 w-0.5 h-full bg-white/80 rounded"></div>
              <div className="absolute left-2/3 top-0 w-0.5 h-full bg-white/80 rounded"></div>
              
              {/* X and O symbols */}
              <div className="absolute top-1 left-1 w-2 h-2">
                <div className="w-full h-0.5 bg-white transform rotate-45 absolute top-1/2"></div>
                <div className="w-full h-0.5 bg-white transform -rotate-45 absolute top-1/2"></div>
              </div>
              <div className="absolute top-1 right-1 w-2 h-2 border border-white rounded-full"></div>
            </div>
            
            {/* Pulsing Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-100 -z-10 animate-ping"></div>
          </div>
        </button>
      </div>

      {/* Game Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl shadow-2xl border border-white/30 p-8 max-w-md w-full transform animate-scale-in">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Tic Tac Toe
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-purple-600 transition-colors duration-300 p-2 hover:bg-white/50 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Game Mode Selection - Only show when no active game */}
            {!winner && board.every(square => square === null) && (
              <div className="mb-6 space-y-4">
                <div className="text-center">
                  <h4 className="font-semibold text-gray-700 mb-3">Choose Game Mode</h4>
                  <div className="flex gap-3 mb-4">
                    <button
                      onClick={() => startNewGame("player")}
                      className={`flex-1 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        gameMode === "player" 
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg" 
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      👥 2 Players
                    </button>
                    <button
                      onClick={() => startNewGame("ai", "X", "medium")}
                      className={`flex-1 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        gameMode === "ai" 
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg" 
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      🤖 vs AI
                    </button>
                  </div>

                  {/* AI Settings */}
                  {gameMode === "ai" && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Choose Your Symbol:
                        </label>
                        <div className="flex gap-3">
                          {["X", "O"].map(symbol => (
                            <button
                              key={symbol}
                              onClick={() => startNewGame("ai", symbol, difficulty)}
                              className={`flex-1 py-2 rounded-lg font-bold text-lg transition-all duration-300 ${
                                userSymbol === symbol
                                  ? symbol === 'X' 
                                    ? "bg-purple-600 text-white shadow-lg" 
                                    : "bg-blue-600 text-white shadow-lg"
                                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              }`}
                            >
                              {symbol}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          AI Difficulty:
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {["easy", "medium", "hard"].map(level => (
                            <button
                              key={level}
                              onClick={() => startNewGame("ai", userSymbol, level)}
                              className={`py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                                difficulty === level
                                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg" 
                                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              }`}
                            >
                              {level.charAt(0).toUpperCase() + level.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Game Status */}
            <div className="text-center mb-6">
              <div className={`text-lg font-semibold px-4 py-2 rounded-full backdrop-blur-sm ${
                winner 
                  ? winner === 'Draw' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : gameMode === "ai" && winner === userSymbol
                    ? 'bg-green-100 text-green-800'
                    : gameMode === "ai" && winner !== userSymbol
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                  : 'bg-purple-100 text-purple-800'
              } transition-all duration-500`}>
                {getStatus()}
              </div>
              {gameMode === "ai" && !winner && (
                <p className="text-sm text-gray-600 mt-2">
                  You are <span className={userSymbol === 'X' ? 'text-purple-600 font-bold' : 'text-blue-600 font-bold'}>{userSymbol}</span>
                </p>
              )}
            </div>

            {/* Game Board */}
            <div className="grid grid-cols-3 gap-3 mb-6 bg-white/50 p-4 rounded-2xl shadow-inner">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(index => (
                <div key={index} className="flex justify-center">
                  {renderSquare(index)}
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex gap-3">
              <button
                onClick={resetGame}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                New Game
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 border border-gray-300 text-gray-600 rounded-xl hover:border-purple-400 hover:text-purple-600 transition-colors duration-300"
              >
                Close
              </button>
            </div>

            {/* Game History */}
            {gameHistory.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-600 mb-2">Recent Games</h4>
                <div className="space-y-1 max-h-20 overflow-y-auto">
                  {gameHistory.slice(-3).map((game, index) => (
                    <div key={index} className="text-xs text-gray-500 flex justify-between items-center">
                      <span>Game {gameHistory.length - index}</span>
                      <div className="flex items-center gap-2">
                        {game.mode === "ai" && (
                          <span className="text-xs bg-gray-200 px-1 rounded">AI</span>
                        )}
                        <span className={
                          game.winner === 'Draw' 
                            ? 'text-yellow-600' 
                            : game.mode === "ai" && game.winner === userSymbol
                            ? 'text-green-600'
                            : game.mode === "ai" && game.winner !== userSymbol
                            ? 'text-red-600'
                            : 'text-green-600'
                        }>
                          {game.winner === 'Draw' ? 'Draw' : game.mode === "ai" ? (game.winner === userSymbol ? 'You Won' : 'AI Won') : `${game.winner} won`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TicTacToeIcon;