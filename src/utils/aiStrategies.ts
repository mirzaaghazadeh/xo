import { calculateWinner } from './gameLogic';

type Board = (string | null)[];

export function getBestMove(board: Board, difficulty: 'easy' | 'normal' | 'very-hard'): number {
  switch (difficulty) {
    case 'very-hard':
      return getUnbeatableMove(board);
    case 'normal':
      return Math.random() > 0.6 ? getUnbeatableMove(board) : getRandomMove(board);
    case 'easy':
    default:
      return Math.random() > 0.2 ? getRandomMove(board) : getUnbeatableMove(board);
  }
}

function getRandomMove(board: Board): number {
  const availableSquares = board.reduce<number[]>((acc, square, index) => {
    if (!square) acc.push(index);
    return acc;
  }, []);
  return availableSquares[Math.floor(Math.random() * availableSquares.length)];
}

function getUnbeatableMove(board: Board): number {
  const availableSquares = board.reduce<number[]>((acc, square, index) => {
    if (!square) acc.push(index);
    return acc;
  }, []);

  // First move optimizations
  if (availableSquares.length === 9) return 4; // Always take center first
  if (availableSquares.length === 8 && !board[4]) return 4; // Take center if available

  let bestScore = -Infinity;
  let bestMove = availableSquares[0];

  for (const move of availableSquares) {
    board[move] = 'O';
    const score = minimax(board, 0, false);
    board[move] = null;

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}

function minimax(board: Board, depth: number, isMaximizing: boolean): number {
  const result = calculateWinner(board);
  if (result) {
    return result.winner === 'O' ? 10 - depth : depth - 10;
  }
  if (!board.includes(null)) {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = 'O';
        bestScore = Math.max(bestScore, minimax(board, depth + 1, false));
        board[i] = null;
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = 'X';
        bestScore = Math.min(bestScore, minimax(board, depth + 1, true));
        board[i] = null;
      }
    }
    return bestScore;
  }
}