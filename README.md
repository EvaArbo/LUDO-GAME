# 🎲 Ludo Fighters

A colorful Ludo game built with React and a Flask backend. Play as **Red** against three computer players on a 15 × 15 board. The frontend includes dice rolls, token movement, a scoreboard, turn indicators, and an account dashboard.

- **Play:** https://ludo-game-ns8e.vercel.app/
- **Backend repository:** https://github.com/EvaArbo/LUDO-GAME-BACKEND

## Preview

The image below shows an earlier board design. The current interface keeps its bright player colors and adapts the board to smaller screens.

<img width="665" height="962" alt="Earlier Ludo board design" src="https://github.com/user-attachments/assets/a355a97d-9ff4-4665-9967-8e7701558b2c" />

## Current features

- 15 × 15 board with red, green, yellow, and blue home areas and center arrows
- Responsive board, controls, login, and dashboard layouts
- One human player (Red) and three automated opponents
- Dice rolling, token entry on a six, movement along player paths, and turn tracking
- Scoreboard, last roll display, instructions, and winner display
- Account registration and sign-in through the Flask API
- Start a new game or resume a game saved through the backend

**Still in progress:** Capturing another player's token, robust win scoring, and complete rules validation need further gameplay work. This is currently a single-player game against computer turns; local or online human multiplayer is not implemented.

## Tech stack

- React 19, React Router, Vite, and regular CSS files
- Axios for requests to the Flask backend
- Local storage for the sign-in token and last game ID; game state is sent to the backend

## Run locally

```bash
git clone https://github.com/EvaArbo/LUDO-GAME.git
cd LUDO-GAME
npm install
npm run dev
```

Open the local URL printed by Vite. The frontend uses the deployed backend by default. To use your own backend, create a `.env.local` file in this folder:

```env
VITE_API_URL=http://localhost:5000
```

Restart Vite after changing environment variables. The backend must allow requests from your frontend origin.

## Main files

| File or folder | Purpose |
| --- | --- |
| `src/routes/AppRouter.jsx` | Login, dashboard, and game routes |
| `src/context/GameContext.jsx` | Turns, dice, tokens, scores, and game API calls |
| `src/assets/Components/Board.jsx` | 15 × 15 board rendering |
| `src/assets/styles/` | Board and game controls styling |
| `src/styles/` | Login and dashboard styling |
| `src/services/api.jsx` | Axios API client |
| `src/utils/movement.js` | Player paths and movement helpers |

## Next steps

- Finish captures, exact finish behavior, and win-state testing
- Add selectable human player count and multiplayer if desired
- Add focused gameplay tests and a current board screenshot
