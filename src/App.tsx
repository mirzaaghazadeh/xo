import React from 'react';
import { UserSetupModal } from './components/UserSetupModal';
import { Board } from './components/Board';
import { GameStatus } from './components/GameStatus';
import { GameOver } from './components/GameOver';
import { useGameState } from './hooks/useGameState';

export default function App() {
  const {
    playerName,
    totalRounds,
    currentRound,
    squares,
    playerScore,
    computerScore,
    winningLine,
    resetGame,
    handleSquareClick,
    getStatus,
    showSetup,
    setShowSetup
  } = useGameState();

  if (!playerName || showSetup) {
    return <UserSetupModal 
      onSubmit={(name, rounds) => {
        setShowSetup(false);
        resetGame(name, rounds);
      }}
      initialName={localStorage.getItem('lastPlayerName') || ''} 
      initialRounds={Number(localStorage.getItem('lastRounds')) || 5} 
    />;
  }

  const gameEnded = currentRound > totalRounds;

  if (gameEnded) {
    return (
      <GameOver
        playerName={playerName}
        playerScore={playerScore}
        computerScore={computerScore}
        onPlayAgain={() => {
          localStorage.setItem('lastPlayerName', playerName);
          localStorage.setItem('lastRounds', totalRounds.toString());
          setShowSetup(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-8 max-w-2xl w-full mx-auto">
        <GameStatus
          playerName={playerName}
          currentRound={currentRound}
          totalRounds={totalRounds}
          playerScore={playerScore}
          computerScore={computerScore}
          status={getStatus()}
        />
        <Board
          squares={squares}
          onSquareClick={handleSquareClick}
          winningLine={winningLine}
        />
      </div>
    </div>
  );
}