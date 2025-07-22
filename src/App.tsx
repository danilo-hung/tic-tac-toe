import { useState } from 'react'
import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log'
import GameOver from './components/GameOver'
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
 const [playersName, setPlayersName] = useState<{ X: string, O: string }>({
  X: "player 1",
  O: 'player 2'
 })
 const [gameTurns, setGameTurns] = useState<GameTurn[]>([]);

 const activePlayer = deriveActivePlayer(gameTurns);

 const gameBoard = initialGameBoard.map(row => [...row]);
 gameTurns.forEach(turn => {
  gameBoard[turn.square.rowIndex][turn.square.colIndex] = turn.player;
 })

 let winner: string | undefined = undefined

 for (const combination of WINNING_COMBINATIONS) {
  const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
  const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
  const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
  if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol) {
   winner = playersName[firstSquareSymbol]
  }
 }

 const hasDraw = gameTurns.length === 9 && !winner

 const handleSelectSquare = (rowIndex: number, colIndex: number) => {
  setGameTurns((prev) => {
   const currentPlayer = deriveActivePlayer(prev);
   const updatedTurns: GameTurn[] = [{ square: { rowIndex, colIndex }, player: currentPlayer }, ...prev];
   return updatedTurns;
  })
 }

 const handlePlayerNameChange = (symbol: 'O' | 'X', newName: string) => {
  setPlayersName(prev => {
   return {
    ...prev,
    [symbol]: newName
   }
  })
 }

 const handleRestart = () => {
  setGameTurns([])
 }

 return (
  <main>
   <header>
    <img src="public/game-logo.png" alt="" />
    <h1>Tic Tac Toe</h1>
   </header>
   <div id="game-container">
    <ol id="players" className="highlight-player">
     <Player name="Player1" symbol="X" isActive={activePlayer === "X"} onChangePlayerName={handlePlayerNameChange} />
     <Player name="Player2" symbol="O" isActive={activePlayer === "O"} onChangePlayerName={handlePlayerNameChange} />
    </ol>
    <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
    {(winner || hasDraw) && <GameOver winner={winner} onResetGame={handleRestart} />}
   </div>
   <Log turns={gameTurns} />
  </main>
 )
}

export default App
