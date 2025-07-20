
interface LogProps { turns: { square: { rowIndex: number, colIndex: number }, player: 'X' | 'O' }[] }

export default function Log({ turns }: LogProps) {
 return (
  <ol id="log">
   {turns.map((turn) => (
    <li key={`${turn.square.rowIndex}${turn.square.colIndex}`}>
     {turn.player} selected {turn.square.rowIndex}, {turn.square.colIndex}
    </li>
   ))}
  </ol>
 )
}