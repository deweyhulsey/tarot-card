import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";



function App() {
  const [count, setCount] = useState(0);
  const [deck, setDeck] = useState({});
  const [hand, setHand] = useState({});

  useEffect(() => {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then((response) => response.json())
    .then((data) => {
      setDeck(data);
      setCount(data.remaining);
    })
    .catch((err) => {
      console.log(err.message);
    })
  }, []);

  function Card({card}) {
    return(
        <>
            <div className="card">
                <h1>{card.value} of {card.suit}</h1>
                <img
                    className="card-img"
                    src={card.image}
                    alt={'Photo of ' + card.value}
                    style={{
                        // backgroundColor: 'blue',
                    }}
                />
            </div>
        </>
    )
  }

  function drawCard(deck) {
    fetch(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
    .then((response) => response.json())
    .then((data) => {
      setHand(data.cards[0]);
      console.log(hand);
    });
  }

  return (
    <div className="App">
      <h1>Draw a card</h1>
      <Card card={hand} />
      <div className="card">
        <button onClick={() => {
          setCount((count) => count - 1);
          drawCard(deck.deck_id);
        }}>
          count is {count}
        </button>
      </div>
    </div>
  );
}

export default App;
