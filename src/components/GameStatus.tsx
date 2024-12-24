import React from 'react';
import { Trophy, User2, Bot } from 'lucide-react';

interface GameStatusProps {
  playerName: string;
  currentRound: number;
  totalRounds: number;
  playerScore: number;
  computerScore: number;
  status: string;
}

export function GameStatus({
  playerName,
  currentRound,
  totalRounds,
  playerScore,
  computerScore,
  status,
}: GameStatusProps) {
  return (
    <div className="text-center space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Round {currentRound} of {totalRounds} 🎯
        </div>
      </div>
      <div className="flex justify-center gap-12">
        <div className="bg-blue-50 px-6 py-4 rounded-xl">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <User2 className="w-5 h-5" />
            <span className="font-medium">{playerName}</span>
          </div>
          <div className="text-3xl font-bold text-blue-700">{playerScore} 🏆</div>
        </div>
        <div className="bg-red-50 px-6 py-4 rounded-xl">
          <div className="flex items-center gap-2 text-red-600 mb-2">
            <Bot className="w-5 h-5" />
            <span className="font-medium">Computer</span>
          </div>
          <div className="text-3xl font-bold text-red-700">{computerScore} 🤖</div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 text-lg font-medium text-gray-700">
        <Trophy className="w-5 h-5 text-yellow-500" />
        {status}
      </div>
    </div>
  );
}