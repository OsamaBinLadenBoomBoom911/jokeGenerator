import { useState } from 'react';
import axios from "axios";
import { useEffect } from 'react';

function DiceRollingApp() {
  const [diceValue, setDiceValue] = useState(0);
  const [joke, setJoke] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchJoke = async () => {
    setIsLoading(true);
    try{
      const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
      setJoke(response.data);
    }catch(err) {
      console.error('There was an error!', err);
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchJoke();
  }, [])

  const rollDiceAndFetchJoke = () => {
    const randomValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(randomValue);

    fetchJoke();
  }

  return (
    <div style={styles.container}>
      <h1>Dice Rolling and Jokes Generator App  </h1>
      <div style={styles.dice}>
        <p style={styles.diceValue}>{diceValue}</p>
      </div>
      <button style={styles.button} onClick={rollDiceAndFetchJoke} disabled={isLoading}>
        {isLoading ? "Loading a Joke...." : "Roll dice and get a NEW JOKE"}
      </button>
      <hr style={styles.hr}/>
      <h1> Your random Joke : </h1>
      <div style={styles.jokeContainer}>
        {isLoading ? (
            <p>Looking for a fresh joke...</p>
        ) : joke ? (
          <div>
            <p style={styles.setup}> Setup :  {joke.setup} </p>
            <p style={styles.punchline}> Punchline :  {joke.punchline} </p>
          </div>
        ) : (
          <p>Hit the button to get a Fresh Joke Everytime</p>
        )}
      </div>
    </div>
  );
}
const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    fontFamily: 'Arial, sans-serif',
  },
  dice: {
    fontSize: '100px',
    width: '150px',
    height: '150px',
    border: '5px solid #673AB7', 
    borderRadius: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px auto',
    backgroundColor: '#E1BEE7',
  },
  diceValue: {
    margin: '0',
    color: '#673AB7',
    fontWeight: 'bold',
  },
  button: {
    padding: '12px 25px',
    fontSize: '20px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    boxShadow: '0 4px #388E3C',
    transition: 'background-color 0.3s',
  },
  hr: {
    width: '80%',
    margin: '30px auto',
    borderTop: '2px solid #ccc',
  },
  jokeContainer: {
    border: '1px solid #ddd',
    padding: '20px',
    margin: '20px auto',
    maxWidth: '400px',
    borderRadius: '10px',
    backgroundColor: '#fffaf0', 
    textAlign: 'left',
  },
  setup: {
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  punchline: {
    fontStyle: 'italic',
    color: '#666',
  }
};

export default DiceRollingApp;
