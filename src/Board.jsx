import { useState, useEffect, useCallback, useRef } from 'react';

function Square({
  className = '',
  value = '',
  gameOver = false,
  handleSquareClick = () => {},
  ...props
}) {
  return (
    <div
      className={`w-16 h-16 flex justify-center items-center text-5xl font-bold transition duration-300 border-2 rounded-md border-blue-400 shadow-[0_0_12px_#00faff] ${className} hover:shadow-[0_0_16px_#00faff] hover:bg-opacity-10 hover:bg-blue-300`}
      onClick={handleSquareClick}
      {...props}
    >
      <p className={`${
        value === 'X' ? 'text-red-500 drop-shadow-[0_0_12px_#ff0000]' : 'text-green-500 drop-shadow-[0_0_12px_#00ff00]'
      }`}>{['X', 'O'].includes(value) ? value : null}</p>
    </div>
  );
}

export default function Board() {
  const winCombos = useRef([
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
  ]);

  const generate2DArray = useCallback(() => {
    return Array(3).fill(-1).map(() => Array(3).fill(-1));
  }, []);

  const [squares, setSquares] = useState(generate2DArray());
  const [movesHistory, setMovesHistory] = useState([]);
  const [player1Symbol, setPlayer1Symbol] = useState('');
  const [isPlayer1, setIsPlayer1] = useState(true);
  const [gameStatus, setGameStatus] = useState('Turn : Player 1');
  const [gameStarted, setGameStarted] = useState(false);

  const chooseMark = (mark) => {
    if (!gameStarted) setPlayer1Symbol(prevSymbol => prevSymbol !== mark ? mark : '');
  };

  const handleSquareClick = ({ outerIndex, innerIndex }) => {
    console.log(`gameStatus: ${gameStatus}`);    
    if (!player1Symbol || squares[outerIndex][innerIndex] !== -1 || gameStatus.toLowerCase().includes('winner')) return;
    if (!gameStarted) setGameStarted(true);
    setMovesHistory((moves) => {
      const current = moves.map((move) => [...move]);
      current.push([outerIndex, innerIndex]);
      return current;
    });
    setSquares((prevSquares) => {
      const newSquares = prevSquares.map((row) => [...row]);
      // player1Mark	isPlayer1	Assigned Mark	
      //   	'X'	        true	      'X'	
      //  	'X'	        false	      'O'
      newSquares[outerIndex][innerIndex] = isPlayer1 ? player1Symbol : (player1Symbol === 'X' ? 'O' : 'X' ); ; 
      return newSquares;
    });   
    setIsPlayer1(!isPlayer1);
  };

  function gameOver() {
    for (const combo of winCombos.current) {
      let [a, b, c] = combo;
      if (
        squares[a[0]][a[1]] !== -1 &&
        squares[a[0]][a[1]] === squares[b[0]][b[1]] &&
        squares[a[0]][a[1]] === squares[c[0]][c[1]]
      ) return squares[a[0]][a[1]];
    }
    return null;
  }

  const checkWinner = () => {
    const winner = gameOver();
    return winner ? `Winner : ${winner === 'X' ? 'Player 1' : 'Player 2'}` : `Turn : ${isPlayer1 ? 'Player 1' : 'Player 2'}`;
  };

  useEffect(() => {
    if (gameStarted) setGameStatus(checkWinner());
  }, [squares]);

  const resetGame = () => {
    setSquares(generate2DArray());
    setMovesHistory([]);
    setPlayer1Symbol('');
    setGameStarted(false);
    setGameStatus('Turn : Player 1');
  };

  return (
    <div className="w-full h-screen flex flex-col justify-between items-center bg-gradient-to-b from-[#0a0a1a] via-[#1a1a3a] to-[#0a0a1a] p-5 text-white">
      <h1 className="text-5xl font-bold">
        <span className="text-blue-400 drop-shadow-[0_0_12px_#00faff]">Tic</span>{' '}
        <span className="text-pink-400 drop-shadow-[0_0_12px_#ff00ff]">Tac</span>{' '}
        <span className="text-blue-400 drop-shadow-[0_0_12px_#00faff]">Toe</span>
      </h1>
      <h2 className="text-2xl font-bold text-blue-300 mt-4">{player1Symbol ? `Player 1 symbol: ${player1Symbol}` : 'Player 1 please choose your symbol'}</h2>
      <div className="flex text-3xl gap-4">
        {['X', 'O'].map((mark) => (
          <div
            key={mark}
            className={`w-12 h-12 flex justify-center items-center border-2 rounded-md border-cyan-400 text-cyan-400 
                        ${mark === 'X' 
                          ? 'hover:border-red-500 hover:text-red-500 hover:shadow-[0_0_40px_#ff0000]' 
                          : 'hover:border-green-500 hover:text-green-500 hover:shadow-[0_0_40px_#00ff00]'
                        }
                        ${player1Symbol === mark ? 
                          mark === 'X' 
                            ? 'border-red-500 text-red-500 shadow-[0_0_25px_#ff0000]' 
                            : 'border-green-500 text-green-500 shadow-[0_0_25px_#00ff00]' 
                          : ''}`}
            onClick={() => chooseMark(mark)}
          >
            {mark}
          </div>
        ))}
      </div>
      <h1 className="text-2xl font-bold text-green-300 drop-shadow-[0_0_15px_#00ff00] mt-5">{gameStatus}</h1>
      <div className="flex flex-col gap-2 mt-5">
        {squares.map((arr, outerIndex) => (
          <div key={outerIndex} className="flex gap-2">
            {arr.map((val, innerIndex) => (
              <Square
                key={innerIndex}
                value={squares[outerIndex][innerIndex]}
                gameOver={gameStatus.includes('winner')}
                onClick={() => handleSquareClick({ outerIndex, innerIndex })}
              />
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={resetGame}
        className="w-40 mt-6 border-2 border-pink-400 text-pink-400 rounded-full p-3 text-xl font-bold 
                  hover:bg-pink-400 hover:text-white shadow-[0_0_8px_#ff69b4] hover:shadow-[0_0_12px_#ff1493]">Reset Game</button>
    </div>
  );
}

// 1. Create a SQUARE
// 2. Create a BOARD
// 3. Keep a squares state in BOARD component which tracks the squares that have been clicked
// 4. Send a function as a prop to the SQUARE component which gets triggered when the square is clicked.
// 5. When a square is clicked, onClick functions performs following actions
//    a. check for player's turn and mark 'X' OR 'O' accordingly
//    b. updates the squares state changing the value in the square that has been clicked 
//    c. updates the movesHistory state storing the location of the recent square that has been clicked
//    d. change the player's turn state
//    e. check for a winner in useEffect
//       1. if there is a winner, declare the winner and stop the game
//       2. else assign the turn to next player
