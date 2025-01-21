import { useState, useEffect } from "react";
import Card from "../Card/Card";
import "./Game.css";

const Game = ({ settings }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [trials, setTrials] = useState(0);
  const [maxTrials, setMaxTrials] = useState(0);

  const initializeGame = () => {
    // Calculate maximum allowed trials based on card count
    const calculatedMaxTrials = Math.ceil(settings.cardCount * 1.5);
    setMaxTrials(calculatedMaxTrials);

    const numbers = Array.from(
      { length: settings.cardCount / 2 },
      (_, i) => i + 1
    );
    const cardPairs = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .map((number, index) => ({
        id: index,
        value: number,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(cardPairs);
    setStartTime(Date.now());
    setEndTime(null);
    setMatchedPairs([]);
    setFlippedCards([]);
    setTrials(0);
  };

  useEffect(() => {
    initializeGame();
  }, [settings.cardCount]);

  const saveGameResult = (endTimeValue, isSuccess) => {
    const duration = Math.floor((endTimeValue - startTime) / 1000);
    const score = Math.floor((settings.cardCount * 1000) / duration);
    const gameResult = {
      date: new Date().toISOString(),
      cardCount: settings.cardCount,
      duration,
      score,
      trials,
      maxTrials,
      status: isSuccess ? "success" : "failure",
    };
    const history = JSON.parse(localStorage.getItem("gameHistory") || "[]");
    localStorage.setItem(
      "gameHistory",
      JSON.stringify([...history, gameResult])
    );
  };

  const handleCardClick = (clickedCard) => {
    if (endTime) return; // Prevent clicks after game ends
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(clickedCard.id)) return;
    if (matchedPairs.includes(clickedCard.id)) return;

    const newFlippedCards = [...flippedCards, clickedCard.id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setTrials((prev) => prev + 1);

      const [firstCard, secondCard] = newFlippedCards.map((id) =>
        cards.find((card) => card.id === id)
      );

      if (firstCard.value === secondCard.value) {
        const newMatchedPairs = [...matchedPairs, firstCard.id, secondCard.id];
        setMatchedPairs(newMatchedPairs);
        setFlippedCards([]);

        if (newMatchedPairs.length === cards.length) {
          const currentEndTime = Date.now();
          setEndTime(currentEndTime);
          const isSuccess = trials + 1 <= maxTrials;
          saveGameResult(currentEndTime, isSuccess);
        }
      } else {
        setTimeout(() => setFlippedCards([]), 1000);

        if (trials + 1 >= maxTrials && matchedPairs.length < cards.length) {
          const currentEndTime = Date.now();
          setEndTime(currentEndTime);
          saveGameResult(currentEndTime, false);
        }
      }
    }
  };

  const handleRestart = () => {
    initializeGame();
  };

  return (
    <div className="game">
      <div className="game-stats">
        <p>
          Essais: {trials} / {maxTrials}
        </p>
      </div>
      <div className="game-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            isFlipped={
              flippedCards.includes(card.id) || matchedPairs.includes(card.id)
            }
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>
      {endTime && (
        <div
          className={`game-complete ${
            matchedPairs.length === cards.length && trials <= maxTrials
              ? "success"
              : "failure"
          }`}
        >
          <h2>
            {matchedPairs.length === cards.length && trials <= maxTrials
              ? "Félicitations !"
              : "Partie terminée"}
          </h2>
          <p>Temps: {Math.floor((endTime - startTime) / 1000)} secondes</p>
          <p>
            Essais utilisés: {trials} / {maxTrials}
          </p>
          {matchedPairs.length === cards.length && trials <= maxTrials ? (
            <p>
              Vous avez réussi à trouver toutes les paires dans le nombre
              d'essais imparti !
            </p>
          ) : (
            <p>
              Vous n'avez pas réussi à terminer le jeu dans le nombre d'essais
              imparti.
            </p>
          )}
          <button className="restart-button" onClick={handleRestart}>
            Rejouer
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
