import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

//components
import Navbar from "./components/Navbar/Navbar";
import Game from "./components/Game/Game";
import Settings from "./components/Settings/Settings";
import History from "./components/History/History";

export default function App() {
  const [gameSettings, setGameSettings] = useState({
    cardCount: 16,
    background: "#ecf0f1",
  });

  return (
    <div className="app" style={{ background: gameSettings.background }}>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Game settings={gameSettings} />} />
          <Route
            path="/settings"
            element={
              <Settings
                settings={gameSettings}
                onSettingsChange={setGameSettings}
              />
            }
          />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
    </div>
  );
}
