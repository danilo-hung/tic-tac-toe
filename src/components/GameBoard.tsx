interface GameBoardProps {
 onSelectSquare: (rowIndex: number, colIndex: number) => void,
 gameBoard: ("X" | "O" | null)[][]
}


export default function GameBoard({ onSelectSquare, gameBoard }: GameBoardProps) {

 return (
  <ol id="game-board">
  {gameBoard.map((row, rowIndex) =>
    row.map((col, colIndex) => (
      <li key={`${rowIndex}-${colIndex}`}>
        <button
          disabled={col !== null}
          onClick={() => onSelectSquare(rowIndex, colIndex)}
        >
          {col}
        </button>
      </li>
    ))
  )}
</ol>
 )
}