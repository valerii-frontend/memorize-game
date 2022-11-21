const Card = ({ card, checkCards, flip, disabled }) => {
  const clickCard = () => {
    if (!disabled && !card.matched) {
      checkCards(card);
    }
  };
  return (
    <div className={card.matched ? "card_matched card" : "card"} onClick={clickCard}>
      <div className={flip ? "card__flip" : ""}>
        <img className='card__front' src={card.src} alt={card.src.split("/")[2].split(".")[0] + " card front"} />
        <img className='card__back' alt='card back side' src='/images/back.png' />
      </div>
    </div>
  );
};
export default Card;
