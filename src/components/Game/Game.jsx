import { useState, useEffect } from "react";
import Card from "../Card/Card";
import "./Game.css";

const Game = ({ settings }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
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
  }, [settings.cardCount]);

  const handleCardClick = (clickedCard) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(clickedCard.id)) return;
    if (matchedPairs.includes(clickedCard.id)) return;

    const newFlippedCards = [...flippedCards, clickedCard.id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstCard, secondCard] = newFlippedCards.map((id) =>
        cards.find((card) => card.id === id)
      );

      if (firstCard.value === secondCard.value) {
        setMatchedPairs([...matchedPairs, firstCard.id, secondCard.id]);
        setFlippedCards([]);

        if (matchedPairs.length + 2 === cards.length) {
          setEndTime(Date.now());
          saveGameResult();
        }
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  const saveGameResult = () => {
    const duration = Math.floor((endTime - startTime) / 1000);
    const score = Math.floor((settings.cardCount * 1000) / duration);
    const gameResult = {
      date: new Date().toISOString(),
      cardCount: settings.cardCount,
      duration,
      score,
    };

    const history = JSON.parse(localStorage.getItem("gameHistory") || "[]");
    localStorage.setItem(
      "gameHistory",
      JSON.stringify([...history, gameResult])
    );
  };

  return (
    <div className="game">
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
        <div className="game-complete">
          <h2>Félicitations!</h2>
          <p>Temps: {Math.floor((endTime - startTime) / 1000)} secondes</p>
        </div>
      )}
    </div>
  );
};

export default Game;
