import { useState, useEffect } from "react";
import "./History.css";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(
      localStorage.getItem("gameHistory") || "[]"
    );
    setHistory(savedHistory);
  }, []);

  return (
    <div className="history">
      <h2>Game History</h2>
      <div className="history-list">
        {history.map((game, index) => (
          <div key={index} className="history-item">
            <p className="history-date">
              Date: {new Date(game.date).toLocaleDateString()}
            </p>
            <p>Cards: {game.cardCount}</p>
            <p>Duration: {game.duration} seconds</p>
            <p>Score: {game.score} points</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
