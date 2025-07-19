import {useState} from 'react'
import Player from './components/Player'
import GameBoard from './components/GameBoard'

function App() {
 const [activePlayerSymbol, setActivePlayerSymbol] = useState<'X' | 'O'>('X');
 const handleSelectSquare = () => {
  setActivePlayerSymbol(prev=> prev === 'X' ? 'O' : 'X');
 }

 return (
  <main>
   <div id="game-container">
    <ol id="players" className="highlight-player">
     <Player name="Player1" symbol="X" isActive = {activePlayerSymbol === "X"} />
     <Player name="Player2" symbol="O" isActive = {activePlayerSymbol === "O"}/>
    </ol>
    <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayerSymbol}/>
   </div>

  </main>
 )
}

export default App
