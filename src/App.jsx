import { Routes, Route, Link } from "react-router-dom";
import Game from "./components/Game/Game";
import Settings from "./components/Settings/Settings";
import History from "./components/History/History";
import "./App.css";
import { useState } from "react";

export default function App() {
  const [gameSettings, setGameSettings] = useState({
    cardCount: 16,
    background: "#ecf0f1",
  });

  return (
    <div className="app" style={{ background: gameSettings.background }}>
      <nav className="navbar">
        <h1 className="title">Jeu de Mémoire</h1>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            Jeu
          </Link>
          <Link to="/settings" className="nav-link">
            Paramètres
          </Link>
          <Link to="/history" className="nav-link">
            Historique
          </Link>
        </div>
      </nav>

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
