interface GameBoardProps {
 onSelectSquare: (rowIndex: number, colIndex: number) => void,
 gameBoard: ("X" | "O" | null)[][]
}


export default function GameBoard({ onSelectSquare, gameBoard }: GameBoardProps) {

 return (
  <ol id="game-board">
   {gameBoard.map((row, rowIndex) => (
    <li key={rowIndex}>
     <ol>
      {row.map((col, colIndex) => (
       <li key={colIndex}>
        <button disabled={col !== null} onClick={() => { onSelectSquare(rowIndex, colIndex) }}>
         {col}
        </button>
       </li>
      ))}
     </ol>
    </li>)
   )}
  </ol>
 )
}