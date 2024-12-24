import React from 'react';
import { Circle, X } from 'lucide-react';

interface BoardProps {
  squares: (string | null)[];
  onSquareClick: (index: number) => void;
  winningLine: number[] | null;
}

export function Board({ squares, onSquareClick, winningLine }: BoardProps) {
  const renderSquare = (index: number) => {
    const isWinningSquare = winningLine?.includes(index);
    return (
      <button
        className={`w-24 h-24 border-4 border-gray-200 flex items-center justify-center rounded-xl
          transition-all duration-200 transform hover:scale-105
          ${isWinningSquare ? 'bg-green-100 border-green-300' : 'hover:bg-blue-50 hover:border-blue-200'}`}
        onClick={() => onSquareClick(index)}
      >
        {squares[index] === 'X' && (
          <X className="w-12 h-12 text-blue-600 animate-appear" />
        )}
        {squares[index] === 'O' && (
          <Circle className="w-12 h-12 text-red-600 animate-appear" />
        )}
      </button>
    );
  };

  return (
    <div className="grid grid-cols-3 gap-3 bg-white p-3 rounded-2xl shadow-lg">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="transform hover:scale-105 transition-transform">
          {renderSquare(i)}
        </div>
      ))}
    </div>
  );
}