// components/History/History.jsx
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import "./History.css";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(
      localStorage.getItem("gameHistory") || "[]"
    );
    setHistory(savedHistory);
  }, []);

  const deleteHistoryItem = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
    localStorage.setItem("gameHistory", JSON.stringify(updatedHistory));
  };

  return (
    <div className="history">
      <h2>Game History</h2>
      {history.length === 0 ? (
        <div className="empty-history">
          <p>No games played yet!</p>
          <p>Start playing to see your history here.</p>
        </div>
      ) : (
        <div className="history-list">
          {history.map((game, index) => (
            <div key={index} className="history-item">
              <button
                className="delete-button"
                onClick={() => deleteHistoryItem(index)}
                aria-label="Delete history item"
              >
                <IoClose />
              </button>
              <p className="history-date">
                Date: {new Date(game.date).toLocaleDateString()}
              </p>
              <p>Cards: {game.cardCount}</p>
              <p>Duration: {game.duration} seconds</p>
              <p>Score: {game.score} points</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
