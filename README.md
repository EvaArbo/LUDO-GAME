# 🎲 Ludo Game (React)

A fun, interactive Ludo board game built with **React**. This project is designed for local multiplayer, styled responsively, and visually represents classic Ludo gameplay with color-coded zones, animated turns, tokens, score tracking, and more.

---

## 📸 Screenshot  
<img width="665" height="962" alt="image" src="https://github.com/user-attachments/assets/a355a97d-9ff4-4665-9967-8e7701558b2c" />


---

## 🚀 Features

| Feature                        | Status         |
|-------------------------------|----------------|
| 🎯 Board layout                | ✅ Completed    |
| 🟥🟩🟦🟨 Color-coded zones      | ✅ Completed    |
| 🔺 Center triangle fit        | ✅ Completed    |
| 🎮 Turn-based gameplay        | ✅ Completed    |
| 🏆 Scoreboard                 | ✅ Completed    |
| 📘 How to Play toggle         | ✅ Completed    |
| 🎲 Dice rolling functionality | ✅ Completed    |
| 🧍‍♂️ Token movement logic     | ✅ Completed    |
| 💥 Collision handling         | ✅ Completed    |
| 👥 Multiplayer support        | ✅ Completed    |
| 🏁 Win condition logic        | ✅ Completed    |
| 💾 Save game state            | ✅ Completed    |
| 📱 Fully responsive layout    | ✅ Completed    |

---

## 🛠️ What's Working

- ✅ Board layout (15x15 grid)
- ✅ Colored zones: Red, Green, Yellow, Blue
- ✅ Four triangle center representing winning zone
- ✅ Animated turn indicator
- ✅ Dynamic scoring system
- ✅ Dice rolling with random logic
- ✅ Token movement per dice roll
- ✅ Collision detection: send others back home
- ✅ End turn logic per player
- ✅ Multiplayer (local) turn sequence
- ✅ Game win condition detection
- ✅ Save state locally
- ✅ Fully responsive styling

---

## 🧩 Tech Stack

- ⚛️ **React** (useState, component-based UI)
- 💅 **CSS Modules** for modular styling
- 📦 **LocalStorage** for state persistence
- 🎨 Custom Ludo UI + token rendering

---

## 📘 How to Play

1. Each player takes turns rolling the dice.
2. If a 6 is rolled, the player gets an extra turn.
3. Players move tokens based on dice result.
4. Land on another player's token to send them back home.
5. First to move all tokens to the center wins!

---

## 💡 Future Improvements

| Idea                               | Description |
|------------------------------------|-------------|
| 🌐 Online Multiplayer              | Real-time socket-based gameplay via WebSockets or Firebase |
| 🎨 Theme Customization             | Dark/light themes, custom board colors |
| 🧠 AI Opponents                    | Play against computer opponents |
| 🗂️ Game History & Replay           | Save previous games and replay animations |
| 📊 Analytics Dashboard             | Track wins, turns played, and statistics |
| 🔊 Game Sound Effects              | Dice roll, token move, collisions |
| 🧪 Unit Tests & E2E Testing        | Improve code robustness and maintainability |

---

## 🧱 Folder Structure


src/
├── assets/
│   ├── Components/
│   │   ├── Board.jsx
│   │   ├── Dice.jsx
│   │   ├── Gamepiece.jsx
│   │   ├── HomeTriangles.jsx
│   │   ├── TurnIndicator.jsx
│   │   ├── Scoreboard.jsx
│   │   └── HowToPlay.jsx
│   └── styles/
│       ├── board.css
│       ├── homeTriangles.css
│       ├── turnIndicator.css
│       ├── scoreboard.css
│       ├── gamepiece.css
│       └── howtoplay.css
├── App.jsx
├── index.jsx
└── ...
🏁 Getting Started
🔧 Installation

git clone[ https://github.com/your-username/ludo-react.git](https://github.com/EvaArbo/LUDO-GAME/edit/dev)
cd ludo-react
npm install
npm run dev
Make sure you have Node.js and npm installed

🤝 Contributing
Contributions are welcome! Feel free to fork the repo, submit pull requests, or suggest improvements via Issues.

📜 License
MIT © [EVaARBO]
