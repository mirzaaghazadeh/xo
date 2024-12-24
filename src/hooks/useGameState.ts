import { useState } from 'react';
import { calculateWinner, getAvailableSquares } from '../utils/gameLogic';

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

  const resetGame = (name: string, rounds: number) => {
    setPlayerName(name);
    setTotalRounds(rounds);
    setCurrentRound(1);
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setPlayerScore(0);
    setComputerScore(0);
    setWinningLine(null);
  };

  const makeComputerMove = (board: (string | null)[]) => {
    const availableSquares = getAvailableSquares(board);
    if (availableSquares.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableSquares.length);
      const newSquares = [...board];
      newSquares[availableSquares[randomIndex]] = 'O';
      setSquares(newSquares);
      setXIsNext(true);
      checkWinner(newSquares);
    }
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
  };
}