import { useState } from 'react';
import { calculateWinner } from '../utils/gameLogic';
import { getBestMove } from '../utils/aiStrategies';

export function useGameState() {
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [totalRounds, setTotalRounds] = useState(5);
  const [currentRound, setCurrentRound] = useState(1);
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [showSetup, setShowSetup] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'normal' | 'very-hard'>('normal');

  const resetGame = (name: string, rounds: number, newDifficulty: 'easy' | 'normal' | 'very-hard') => {
    setPlayerName(name);
    setTotalRounds(rounds);
    setDifficulty(newDifficulty);
    setCurrentRound(1);
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setPlayerScore(0);
    setComputerScore(0);
    setWinningLine(null);
  };

  const checkWinner = (currentSquares: (string | null)[]) => {
    const result = calculateWinner(currentSquares);
    if (result) {
      setWinningLine(result.line);
      if (result.winner === 'X') {
        setPlayerScore(score => score + 1);
      } else {
        setComputerScore(score => score + 1);
      }
      setTimeout(() => {
        setCurrentRound(round => round + 1);
        setSquares(Array(9).fill(null));
        setXIsNext(true);
        setWinningLine(null);
      }, 1500);
    } else if (!currentSquares.includes(null)) {
      setTimeout(() => {
        setCurrentRound(round => round + 1);
        setSquares(Array(9).fill(null));
        setXIsNext(true);
      }, 1000);
    }
  };

  const makeComputerMove = (board: (string | null)[]) => {
    const moveIndex = getBestMove(board, difficulty);
    const newSquares = [...board];
    newSquares[moveIndex] = 'O';
    setSquares(newSquares);
    setXIsNext(true);
    checkWinner(newSquares);
  };

  const handleSquareClick = (i: number) => {
    if (squares[i] || !xIsNext || calculateWinner(squares)) return;

    const newSquares = [...squares];
    newSquares[i] = 'X';
    setSquares(newSquares);
    setXIsNext(false);
    checkWinner(newSquares);

    setTimeout(() => {
      if (!calculateWinner(newSquares) && newSquares.includes(null)) {
        makeComputerMove(newSquares);
      }
    }, 500);
  };

  const getStatus = () => {
    const winner = calculateWinner(squares);
    if (winner) {
      return `${winner.winner === 'X' ? playerName : 'Computer'} wins! 🎉`;
    } else if (!squares.includes(null)) {
      return "It's a draw! 🤝";
    } else {
      return `${xIsNext ? `${playerName}'s` : "Computer's"} turn ${xIsNext ? '🎮' : '🤖'}`;
    }
  };

  return {
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
    setShowSetup,
    difficulty,
  };
}