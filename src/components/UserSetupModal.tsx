import React from 'react';
import { Gamepad2, User, Hash, Plus, Minus } from 'lucide-react';

interface UserSetupModalProps {
  onSubmit: (playerName: string, rounds: number) => void;
  initialName: string;
  initialRounds: number;
}

export function UserSetupModal({ onSubmit, initialName, initialRounds }: UserSetupModalProps) {
  const [playerName, setPlayerName] = React.useState(initialName);
  const [rounds, setRounds] = React.useState(initialRounds);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      onSubmit(playerName, rounds);
    }
  };

  const adjustRounds = (amount: number) => {
    setRounds(prev => Math.max(1, prev + amount));
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-100">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <Gamepad2 className="w-16 h-16 text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome to XO Game! 🎮</h2>
          <p className="text-gray-600">Let's set up your game 🎯</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="playerName" className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <User className="w-4 h-4" />
              Your Name
            </label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="rounds" className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Hash className="w-4 h-4" />
              Number of Rounds
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => adjustRounds(-2)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Minus className="w-5 h-5 text-gray-600" />
              </button>
              <input
                type="number"
                id="rounds"
                value={rounds}
                onChange={(e) => setRounds(Math.max(1, parseInt(e.target.value)))}
                min="1"
                step="2"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-center"
              />
              <button
                type="button"
                onClick={() => adjustRounds(2)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Plus className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl font-medium
              hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Start Game 🚀
          </button>
        </form>
      </div>
    </div>
  );
}