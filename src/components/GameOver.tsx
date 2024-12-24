import React from 'react';
import { Trophy } from 'lucide-react';

interface GameOverProps {
  playerName: string;
  playerScore: number;
  computerScore: number;
  onPlayAgain: () => void;
}

export function GameOver({ playerName, playerScore, computerScore, onPlayAgain }: GameOverProps) {
  const finalWinner = playerScore > computerScore ? playerName : 
                     computerScore > playerScore ? 'Computer' : 'Draw';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-8 max-w-md w-full mx-auto text-center">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto" />
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Game Over! 🎮
        </h2>
        <div className="space-y-4">
          <p className="text-2xl font-medium text-gray-700">
            {finalWinner === 'Draw' ? 
              "It's a Draw! 🤝" : 
              `${finalWinner} wins! ${finalWinner === playerName ? '🏆' : '🤖'}`}
          </p>
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <p className="text-sm text-gray-600">{playerName}</p>
              <p className="text-2xl font-bold text-blue-600">{playerScore}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Computer</p>
              <p className="text-2xl font-bold text-red-600">{computerScore}</p>
            </div>
          </div>
        </div>
        <button
          onClick={onPlayAgain}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-8 rounded-xl font-medium
            hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200"
        >
          Play Again 🔄
        </button>
      </div>
    </div>
  );
}