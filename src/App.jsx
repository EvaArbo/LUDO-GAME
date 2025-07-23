import React from 'react';
import TokenPreview from './assets/Components/TokenPreview';
import Dice from './assets/Components/Dice';
import { GameProvider } from './context/Gamecontext';

function App() {
  return (
    <GameProvider>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', padding: '2rem' }}>
        <h2>🎲 Dice Preview</h2>
        <TokenPreview />
        <Dice />
      </div>
    </GameProvider>
  );
}

export default App;
