// components/History/History.jsx
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./History.css";

const History = () => {
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const savedHistory = JSON.parse(
      localStorage.getItem("gameHistory") || "[]"
    );
    setHistory(savedHistory);
  }, []);

  const deleteHistoryItem = (index) => {
    const realIndex = (currentPage - 1) * itemsPerPage + index;
    const updatedHistory = history.filter((_, i) => i !== realIndex);
    setHistory(updatedHistory);
    localStorage.setItem("gameHistory", JSON.stringify(updatedHistory));
  };

  // Pagination logic
  const totalPages = Math.ceil(history.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = history.slice(startIndex, endIndex);

  const goToPage = (pageNumber) => {
    setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Nombre de pages visibles en même temps

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Ajuster si on est près de la fin
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`page-number ${currentPage === i ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }
    return pages;
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
        <>
          <div className="history-list">
            {currentItems.map((game, index) => (
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

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="arrow-button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <IoIosArrowBack />
              </button>

              {renderPageNumbers()}

              <button
                className="arrow-button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <IoIosArrowForward />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default History;
