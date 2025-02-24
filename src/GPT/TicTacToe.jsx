import { useState } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [gameStatus, setGameStatus] = useState('X\'s turn');
  const [winningSquares, setWinningSquares] = useState([]);

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], winningSquares: [a, b, c] };
      }
    }
    return { winner: null, winningSquares: [] };
  };

  const handleClick = (index) => {
    if (board[index] || gameStatus.includes('won')) return;

    const newBoard = board.slice();
    newBoard[index] = isXTurn ? 'X' : 'O';
    setBoard(newBoard);

    const { winner, winningSquares } = checkWinner(newBoard);

    if (winner) {
      setGameStatus(`${winner} wins!`);
      setWinningSquares(winningSquares);
    } else if (newBoard.every(square => square !== null)) {
      setGameStatus('Draw');
    } else {
      setIsXTurn(!isXTurn);
      setGameStatus(isXTurn ? 'O\'s turn' : 'X\'s turn');
    }
  };

  const renderSquare = (index) => {
    const isWinningSquare = winningSquares.includes(index);
    return (
      <button
        className="square"
        onClick={() => handleClick(index)}
        style={{
          width: '60px',
          height: '60px',
          fontSize: '24px',
          margin: '5px',
          cursor: 'pointer',
          backgroundColor: isWinningSquare ? 'green' : '#f0f0f0',
          color: isWinningSquare ? 'white' : 'black',
          border: '1px solid #ccc',
          display: 'inline-block',
        }}
      >
        {board[index]}
      </button>
    );
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{gameStatus}</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 60px)',
          gridTemplateRows: 'repeat(3, 60px)',
          gap: '5px',
          justifyContent: 'center',
        }}
      >
        {board.map((_, index) => renderSquare(index))}
      </div>
    </div>
  );
};

export default TicTacToe;
