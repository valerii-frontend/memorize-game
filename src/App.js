import { useState, useEffect } from "react";
import Card from "./components/Card";

const easy = [
  { src: "/images/attack.png", matched: false },
  { src: "/images/defense.png", matched: false },
  { src: "/images/power.png", matched: false },
  { src: "/images/knowledge.png", matched: false },
];
const medium = [
  { src: "/images/attack.png", matched: false },
  { src: "/images/defense.png", matched: false },
  { src: "/images/power.png", matched: false },
  { src: "/images/knowledge.png", matched: false },
  { src: "/images/fire.png", matched: false },
  { src: "/images/water.png", matched: false },
  { src: "/images/air.png", matched: false },
  { src: "/images/earth.png", matched: false },
  { src: "/images/necromancy.png", matched: false },
];
const hard = [
  { src: "/images/attack.png", matched: false },
  { src: "/images/defense.png", matched: false },
  { src: "/images/power.png", matched: false },
  { src: "/images/knowledge.png", matched: false },
  { src: "/images/fire.png", matched: false },
  { src: "/images/water.png", matched: false },
  { src: "/images/air.png", matched: false },
  { src: "/images/earth.png", matched: false },
  { src: "/images/archery.png", matched: false },
  { src: "/images/armorer.png", matched: false },
  { src: "/images/artillery.png", matched: false },
  { src: "/images/ballistics.png", matched: false },
  { src: "/images/diplomacy.png", matched: false },
  { src: "/images/gold.png", matched: false },
  { src: "/images/leadership.png", matched: false },
  { src: "/images/logistics.png", matched: false },
];

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [pickFirst, setPickFirst] = useState(null);
  const [pickSecond, setPickSecond] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [mode, setMode] = useState("easy");
  //   shuffle the board
  const randomizeCards = () => {
    let arr = [];
    if (mode === "easy") {
      arr = [...easy, ...easy, ...easy, ...easy];
    } else if (mode === "medium") {
      arr = [...medium, ...medium, ...medium, ...medium];
    } else {
      arr = [...hard, ...hard, ...hard];
    }

    let init = arr.sort(() => Math.random() - 0.5).map((tile) => ({ ...tile, id: Math.random() }));
    setCards(init);
    setTurns(0);
  };
  //   click
  const checkCards = (card) => {
    if (pickFirst) {
      setPickSecond(card);
    } else {
      setPickFirst(card);
    }
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
  }, [mode]);

  return (
    <div className='App'>
      <h1>Heroes 3 of Might and Magic memory game</h1>
      <div className='control'>
        <button onClick={randomizeCards}>New game</button>
        <div className='mode'>
          <span
            className={mode === "easy" ? "active" : ""}
            onClick={() => {
              setMode("easy");
              randomizeCards();
            }}>
            Easy
          </span>
          <span
            className={mode === "medium" ? "active" : ""}
            onClick={() => {
              setMode("medium");
              randomizeCards();
            }}>
            Med
          </span>
          <span
            className={mode === "hard" ? "active" : ""}
            onClick={() => {
              setMode("hard");
              randomizeCards();
            }}>
            Hard
          </span>
        </div>
        <div className='turns'>Total turns: {turns}</div>
      </div>

      <div className={mode === "medium" ? "board medium" : mode === "hard" ? "board hard" : "board"}>
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
    </div>
  );
};

export default App;
