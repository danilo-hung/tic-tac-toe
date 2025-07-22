




export default function GameOver({ winner, onResetGame }: { winner: string | undefined, onResetGame: () => void }) {

 return (
  <div id="game-over">
   <h2>Game Over!</h2>
   {winner ?
    <p>{winner} won!</p> :
    <p>It&apos;s a draw</p>
   }
   <p>
    <button onClick={onResetGame}>Rematch</button>
   </p>
  </div>
 )
}