import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./History.css";

const History = () => {
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const savedHistory = JSON.parse(
      localStorage.getItem("gameHistory") || "[]"
    );
    setHistory(savedHistory);
  }, []);

  useEffect(() => {
    // Calculate max possible page based on current items
    const maxPage = Math.ceil(history.length / itemsPerPage);

    // If current page is greater than max page and history is not empty,
    // set current page to max page or 1 if there are no pages
    if (currentPage > maxPage && currentPage !== 1) {
      setCurrentPage(Math.max(1, maxPage));
    }
  }, [history, currentPage]);

  const deleteHistoryItem = (index) => {
    const realIndex = (currentPage - 1) * itemsPerPage + index;
    const updatedHistory = history.filter((_, i) => i !== realIndex);

    // Calculate if current page will be empty after deletion
    const itemsInCurrentPage = history.filter((_, i) => {
      const pageStartIndex = (currentPage - 1) * itemsPerPage;
      const pageEndIndex = pageStartIndex + itemsPerPage;
      return i >= pageStartIndex && i < pageEndIndex;
    }).length;

    // If this is the last item in the current page and we're not on page 1
    if (itemsInCurrentPage === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }

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
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

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
      <h2>Historique du Jeu</h2>
      {history.length === 0 ? (
        <div className="empty-history">
          <p>Aucun jeu joué pour le moment !</p>
          <p>Commencez à jouer pour voir votre historique ici.</p>
        </div>
      ) : (
        <>
          <div className="history-list">
            {currentItems.map((game, index) => (
              <div
                key={index}
                className={`history-item ${
                  game.status === "success" ? "success" : "failure"
                }`}
              >
                <button
                  className="delete-button"
                  onClick={() => deleteHistoryItem(index)}
                  aria-label="Delete history item"
                >
                  <IoClose />
                </button>
                <p className="history-date">
                  Date : {new Date(game.date).toLocaleDateString()}
                </p>
                <p>Cartes : {game.cardCount}</p>
                <p>Durée : {game.duration} secondes</p>
                <p>Score : {game.score} points</p>
                <p>
                  Essais : {game.trials + 1} / {game.maxTrials}
                </p>
                <p className="game-status">
                  Statut :{" "}
                  {game.status === "success" ? "Victoire !" : "Partie terminée"}
                </p>
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
