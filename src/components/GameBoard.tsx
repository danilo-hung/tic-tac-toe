interface GameBoardProps {
 onSelectSquare: (rowIndex: number, colIndex: number) => void,
 turns: { square: { rowIndex: number, colIndex: number }, player: 'X' | 'O' }[]
}

const initialGameBoard: (null | 'X' | 'O')[][] = [
 [null, null, null],
 [null, null, null],
 [null, null, null]
]

export default function GameBoard({ onSelectSquare, turns }: GameBoardProps) {

 const gameBoard = initialGameBoard.map(row => [...row]);

 turns.forEach(turn => {
  gameBoard[turn.square.rowIndex][turn.square.colIndex] = turn.player;
 })

 return (
  <ol id="game-board">
   {gameBoard.map((row, rowIndex) => (
    <li key={rowIndex}>
     <ol>
      {row.map((col, colIndex) => (
       <li key={colIndex}>
        <button onClick={() => { onSelectSquare(rowIndex, colIndex) }}>{col}</button>
       </li>
      ))}
     </ol>
    </li>)
   )}
  </ol>
 )
}