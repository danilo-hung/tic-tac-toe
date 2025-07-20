import { useState } from 'react'
import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log'

interface GameTurn { square: { rowIndex: number, colIndex: number }, player: 'X' | 'O' }

function deriveActivePlayer(gameTurns: GameTurn[]) {
 let curPlayer: 'X' | 'O' = 'X';
 if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
  curPlayer = 'O';
 }
 return curPlayer;
}

function App() {
 const [gameTurns, setGameTurns] = useState<GameTurn[]>([]);

 const activePlayer = deriveActivePlayer(gameTurns);

 const handleSelectSquare = (rowIndex: number, colIndex: number) => {
  setGameTurns((prev) => {

   const currentPlayer = deriveActivePlayer(prev);

   const updatedTurns: GameTurn[] = [{ square: { rowIndex, colIndex }, player: currentPlayer }, ...prev];

   return updatedTurns;

  })
 }

 return (
  <main>
   <div id="game-container">
    <ol id="players" className="highlight-player">
     <Player name="Player1" symbol="X" isActive={activePlayer === "X"} />
     <Player name="Player2" symbol="O" isActive={activePlayer === "O"} />
    </ol>
    <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
   </div>
   <Log turns={gameTurns} />
  </main>
 )
}

export default App
