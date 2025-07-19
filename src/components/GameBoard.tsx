import { useState } from 'react';

interface GameBoardProps {
 onSelectSquare: () => void,
 activePlayerSymbol: 'O' | 'X'
}

const initialGameBoard: (null | 'X' | 'O')[][] = [
 [null, null, null],
 [null, null, null],
 [null, null, null]
]

export default function GameBoard({ onSelectSquare, activePlayerSymbol }: GameBoardProps) {

 const [gameBoard, setGameBoard] = useState(initialGameBoard);
 const handleSelectedSquare = (rowIndex: number, colIndex: number) => {
  setGameBoard((prev) => {
   const updatedGameBoard = [...prev.map(innerArr => [...innerArr])]
   if (updatedGameBoard[rowIndex][colIndex] === null) {
    updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol
   }

   return updatedGameBoard
  })
  onSelectSquare()
 };

 return (
  <ol id="game-board">
   {gameBoard.map((row, rowIndex) => (
    <li key={rowIndex}>
     <ol>
      {row.map((col, colIndex) => (
       <li key={colIndex}>
        <button onClick={() => { handleSelectedSquare(rowIndex, colIndex) }}>{col}</button>
       </li>
      ))}
     </ol>
    </li>)
   )}
  </ol>
 )
}