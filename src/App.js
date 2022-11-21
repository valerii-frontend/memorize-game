import { useState, useEffect } from "react";
import Card from "./components/Card";

const images = [
  { src: "/images/artillery.png", matched: false },
  { src: "/images/attack.png", matched: false },
  { src: "/images/defense.png", matched: false },
  { src: "/images/diplomacy.png", matched: false },
  { src: "/images/gold.png", matched: false },
  { src: "/images/power.png", matched: false },
  { src: "/images/sorcery.png", matched: false },
  { src: "/images/leadership.png", matched: false },
];

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [pickFirst, setPickFirst] = useState(null);
  const [pickSecond, setPickSecond] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //   shuffle the board
  const randomizeCards = () => {
    const arr = [...images, ...images].sort(() => Math.random() - 0.5).map((tile) => ({ ...tile, id: Math.random() }));
    setCards(arr);
    setTurns(0);
  };
  //   click
  const checkCards = (card) => {
    pickFirst ? setPickSecond(card) : setPickFirst(card);
  };
  //   compare
  const turnsCounter = () => {
    setPickFirst(null);
    setPickSecond(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };
  useEffect(() => {
    if (pickFirst && pickSecond) {
      setDisabled(true);
      if (pickFirst.src === pickSecond.src) {
        setCards((prev) => {
          return prev.map((card) => {
            if (card.id === pickFirst.id || card.id === pickSecond.id) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        turnsCounter();
      } else {
        setTimeout(() => turnsCounter(), 1000);
      }
    }
  }, [pickSecond, pickFirst]);
  // init
  useEffect(() => {
    randomizeCards();
  }, []);
  return (
    <div className='App'>
      <h1>Heroes 3 of Might and Magic memory game</h1>
      <button onClick={randomizeCards}>New game</button>
      <div className='board'>
        {cards.map((card) => (
          <Card
            card={card}
            key={card.id}
            checkCards={checkCards}
            flip={card === pickFirst || card === pickSecond || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <div className='turns'>Total turns: {turns}</div>
    </div>
  );
};

export default App;
