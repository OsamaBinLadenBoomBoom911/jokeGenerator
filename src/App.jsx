import { useState } from 'react';
import axios from "axios";
import { useEffect } from 'react';

function DiceRollingApp() {
  // useState hook to keep track of the dice roll value
  const [diceValue, setDiceValue] = useState(1);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('https://official-joke-api.appspot.com/random_joke')
      .then(response => setData(response.data))
      .catch(error => console.error('There was an error!', error));
  }, [])

  const rollDice = () => {
    const randomValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(randomValue);
  };

  return (
    <div style={styles.container}>
      <h1>Dice Rolling App  </h1>
      <div style={styles.dice}>
        <p style={styles.diceValue}>{diceValue}</p>
      </div>
      <h2>data</h2>
      <button style={styles.button} onClick={rollDice}>
        Roll Dice
      </button>
      {data ? <div>{JSON.stringify(data)}</div> : <p>Loading...</p>}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  dice: {
    fontSize: '100px',
    width: '150px',
    height: '150px',
    border: '5px solid purple',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px auto',
    backgroundColor: '#f2f2f2',
  },
  diceValue: {
    margin: '0',
  },
  button: {
    padding: '10px 20px',
    fontSize: '20px',
    cursor: 'pointer',
    backgroundColor: '#850deeff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  },
};

export default DiceRollingApp;
