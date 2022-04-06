import React, { useState, useEffect } from "react";
import Square from "./Square";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isNextX, setIsNextX] = useState(true);
  const [winner, setWinner] = useState(null);
  const [status, setStatus] = useState("Au tour du joueur X");

  useEffect(() => {
    if (winner) {
      setStatus("Winner: " + winner);
    } else {
      setStatus("Next player: " + (isNextX ? "X" : "O"));
    }
  }, [isNextX]);

  const handleClick = (i) => {
    const squaresBis = squares.slice();
    if (calculateWinner(squaresBis) || squaresBis[i]) {
      return;
    }
    squaresBis[i] = isNextX ? "X" : "O";
    setSquares(squaresBis);
    setIsNextX(!isNextX);
    setWinner(calculateWinner(squaresBis));
  };

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  // console.log("début");
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // console.log(`a: ${a} b: ${b} c: ${c}`);
    // console.log(`${squares[a]} ${squares[b]} ${squares[c]}`);
    // console.log("//////////////////////////////////////////////");
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // console.log("fin");
  return null;
}
