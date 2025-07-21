import { useState } from 'react'
import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log'
import { WINNING_COMBINATIONS } from './util/winning-comination'

interface GameTurn { square: { rowIndex: number, colIndex: number }, player: 'X' | 'O' }

function deriveActivePlayer(gameTurns: GameTurn[]) {
 let curPlayer: 'X' | 'O' = 'X';
 if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
  curPlayer = 'O';
 }
 return curPlayer;
}

const initialGameBoard: (null | 'X' | 'O')[][] = [
 [null, null, null],
 [null, null, null],
 [null, null, null]
]

function App() {
 const [gameTurns, setGameTurns] = useState<GameTurn[]>([]);

 const activePlayer = deriveActivePlayer(gameTurns);

 const gameBoard = initialGameBoard.map(row => [...row]);
 gameTurns.forEach(turn => {
  gameBoard[turn.square.rowIndex][turn.square.colIndex] = turn.player;
 })

 let winner: 'X' | 'O' | null = null

 for (const combination of WINNING_COMBINATIONS) {
  const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
  const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
  const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
  if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol) {
   winner = firstSquareSymbol
  }
 }

 const handleSelectSquare = (rowIndex: number, colIndex: number) => {
  setGameTurns((prev) => {
   const currentPlayer = deriveActivePlayer(prev);
   const updatedTurns: GameTurn[] = [{ square: { rowIndex, colIndex }, player: currentPlayer }, ...prev];
   return updatedTurns;
  })
 }

 return (
  <main>
   <header>
    <img src="public/game-logo.png" alt="" />
    <h1>Tic Tac Toe</h1>
   </header>
   <div id="game-container">
    <ol id="players" className="highlight-player">
     <Player name="Player1" symbol="X" isActive={activePlayer === "X"} />
     <Player name="Player2" symbol="O" isActive={activePlayer === "O"} />
    </ol>
    {winner && <p>You won, {winner}</p>}
    <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />


   </div>
   <Log turns={gameTurns} />
  </main>
 )
}

export default App
