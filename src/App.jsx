import { useState } from 'react';
import './App.css';
import GamePiece from './assets/Components/GamePiece'; // Import your GamePiece component
import { movePiece, getPositionFromIndex } from './utils/movement'; // Import the movement functions

function App() {
  const [count, setCount] = useState(0); // Dice roll count
  const [pieces, setPieces] = useState([
    { id: 1, color: 'red', position: { x: 0, y: 6 }, name: 'Player 1' },
    { id: 2, color: 'blue', position: { x: 1, y: 6 }, name: 'Player 2' },
    { id: 3, color: 'green', position: { x: 2, y: 6 }, name: 'Player 3' },  // Added Player 3
    { id: 4, color: 'yellow', position: { x: 3, y: 6 }, name: 'Player 4' },  // Added Player 4
  ]);

  // Function to handle dice roll and move the piece
  const handleDiceRoll = () => {
    const diceRoll = Math.floor(Math.random() * 6) + 1; // Random dice roll from 1 to 6
    setCount(diceRoll); // Update the dice roll state

    // For the purpose of this example, moving the first piece (can be customized)
    const piece = pieces[0]; // Example: move the first piece
    const { newIndex, newPosition } = movePiece(piece.position, diceRoll, false);

    // Update the piece position
    const updatedPieces = pieces.map((p) =>
      p.id === piece.id ? { ...p, position: newPosition } : p
    );
    setPieces(updatedPieces);
  };

  return (
    <div className="app-container">
      <h1>Ludo Game</h1>

      <div className="game-container">
        {/* Render GamePiece for each player */}
        {pieces.map((piece) => (
          <GamePiece
            key={piece.id}
            color={piece.color}
            position={piece.position}
            name={piece.name}
          />
        ))}
      </div>

      <div className="dice-roll">
        {/* Button to roll the dice */}
        <p>Dice Roll: {count}</p>
        <button onClick={handleDiceRoll}>Roll Dice</button> {/* Make sure the button is clickable */}
      </div>
    </div>
  );
}

export default App;
