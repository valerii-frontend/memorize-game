import { useState, useEffect } from "react";
import Card from "./components/Card";

const easy = [
  { src: "./images/attack.png", matched: false },
  { src: "./images/defense.png", matched: false },
  { src: "./images/power.png", matched: false },
  { src: "./images/knowledge.png", matched: false },
];
const medium = [
  { src: "./images/attack.png", matched: false },
  { src: "./images/defense.png", matched: false },
  { src: "./images/power.png", matched: false },
  { src: "./images/knowledge.png", matched: false },
  { src: "./images/fire.png", matched: false },
  { src: "./images/water.png", matched: false },
  { src: "./images/air.png", matched: false },
  { src: "./images/earth.png", matched: false },
  { src: "./images/necromancy.png", matched: false },
];
const hard = [
  { src: "./images/attack.png", matched: false },
  { src: "./images/defense.png", matched: false },
  { src: "./images/power.png", matched: false },
  { src: "./images/knowledge.png", matched: false },
  { src: "./images/fire.png", matched: false },
  { src: "./images/water.png", matched: false },
  { src: "./images/air.png", matched: false },
  { src: "./images/earth.png", matched: false },
  { src: "./images/archery.png", matched: false },
  { src: "./images/armorer.png", matched: false },
  { src: "./images/artillery.png", matched: false },
  { src: "./images/ballistics.png", matched: false },
  { src: "./images/diplomacy.png", matched: false },
  { src: "./images/gold.png", matched: false },
  { src: "./images/leadership.png", matched: false },
  { src: "./images/logistics.png", matched: false },
];
const res = { src: "./images/resistance.png", matched: false };

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [pickFirst, setPickFirst] = useState(null);
  const [pickSecond, setPickSecond] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [mode, setMode] = useState("easy");
  const [size, setSize] = useState("small");
  //   shuffle the board
  const randomizeCards = () => {
    let arr = [];
    let EASY = mode === "easy";
    let MEDIUM = mode === "medium";
    let HARD = mode === "hard";
    let SMALL = size === "small";
    let REGULAR = size === "regular";
    let LARGE = size === "lg";
    if (EASY && SMALL) {
      arr = [...easy, ...easy, ...easy, ...easy];
    } else if (EASY && REGULAR) {
      arr = [
        ...easy,
        ...easy,
        ...easy,
        ...easy,
        ...easy,
        ...easy,
        ...easy,
        ...easy,
        easy[0],
        easy[0],
        easy[1],
        easy[1],
      ];
    } else if (EASY && LARGE) {
      arr = [
        ...easy,
        ...easy,
        ...easy,
        ...easy,
        ...easy,
        ...easy,
        ...easy,
        ...easy,
        ...easy,
        ...easy,
        ...easy,
        ...easy,
      ];
    } else if (MEDIUM && SMALL) {
      arr = [...medium, ...medium].filter((el) => el.src !== "./images/necromancy.png");
    } else if (MEDIUM && REGULAR) {
      arr = [...medium, ...medium, ...medium, ...medium];
    } else if (MEDIUM && LARGE) {
      arr = [...medium, ...medium, ...medium, ...medium, ...medium, ...medium].filter(
        (el) => el.src !== "./images/necromancy.png"
      );
    } else if (HARD && SMALL) {
      setSize("regular");
    } else if (HARD && REGULAR) {
      arr = [...hard, ...hard, res, res, res, res];
    } else if (HARD && LARGE) {
      arr = [...hard, ...hard, ...hard];
    } else {
      arr = [...hard, ...hard, ...hard, ...hard, ...hard, ...hard];
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
  }, [mode, size]);

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
              if (size === "extra") {
                setSize("small");
              }
              randomizeCards();
            }}>
            Easy
          </span>
          <span
            className={mode === "medium" ? "active" : ""}
            onClick={() => {
              setMode("medium");
              if (size === "extra") {
                setSize("small");
              }
              randomizeCards();
            }}>
            Med
          </span>
          <span
            className={mode === "hard" ? "active" : ""}
            onClick={() => {
              setMode("hard");
              if (size === "extra") {
                setSize("regular");
              }
              randomizeCards();
            }}>
            Hard
          </span>
        </div>
        <div className='size mode'>
          <span
            className={size === "small" ? "active" : ""}
            onClick={() => {
              setSize("small");
              if (mode === "extra") {
                setMode("easy");
              }
              randomizeCards();
            }}>
            Small
          </span>
          <span
            className={size === "regular" ? "active" : ""}
            onClick={() => {
              setSize("regular");
              if (mode === "extra") {
                setMode("easy");
              }
              randomizeCards();
            }}>
            Regular
          </span>
          <span
            className={size === "lg" ? "active" : ""}
            onClick={() => {
              setSize("lg");
              if (mode === "extra") {
                setMode("easy");
              }
              randomizeCards();
            }}>
            Large
          </span>
          <span
            className={size === "extra" ? "active ex" : "ex"}
            onClick={() => {
              setSize("extra");
              setMode("extra");
              randomizeCards();
            }}>
            Extra
          </span>
        </div>
        <div className='turns'>Total turns: {turns}</div>
      </div>
      <div
        className={
          size === "regular" ? "board regular" : size === "lg" ? "board lg" : size === "extra" ? "board extra" : "board"
        }>
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
