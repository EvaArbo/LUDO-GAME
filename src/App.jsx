import React from 'react';
import Dice from "./components/Dice";
import GamePiece from "./assets/Components/Gamepiece";

import { GameProvider } from './context/Gamecontext';

function App() {
  return (
    <GameProvider>
      <div>
        <h1>Ludo Game</h1>
        <Dice />
        <GamePiece/>
      </div>
    </GameProvider>
  );
}

export default App;
