import { useState } from "react";
import "./App.css";
import WordGrid from "./components/WordGrid";
import { getRandomWord } from "./data/randomWords";

function App() {
  const [targetWord, setTargetWord] = useState(getRandomWord());
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const initialAttemptsValues = {
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
  };
  const [attempts, setAttempts] = useState(initialAttemptsValues);
  const [isGameFinished, setIsGameFinished] = useState(false);

  const words = Object.values(attempts);

  const verifyWord = () => {
    return (
      attempts[currentAttempt].toLocaleLowerCase() ===
      targetWord.toLocaleLowerCase()
    );
  };

  const reset = () => {
    setAttempts(initialAttemptsValues);
    setCurrentAttempt(0);
    setTargetWord(getRandomWord());
    setIsGameFinished(false);
  };

  const updateAttempt = () => {
    if (currentAttempt === 5) {
      if (verifyWord()) {
        alert("¡Correcto!");
        setIsGameFinished(true);
      }else{
        alert(`Juego terminado. La palabra correcta era ${targetWord}`);
        setIsGameFinished(true);
      }
    } else {
      if (verifyWord()) {
        alert("¡Correcto!");
        setIsGameFinished(true);
      }
      setCurrentAttempt((previousAttempt) => previousAttempt + 1);
    }
  };

  return (
    <div>
      <h1>Random Word</h1>
      <div className="container text-center m-auto">
        {words.map((word, index) => (
          <WordGrid
            key={index}
            attemptIndex={index}
            word={word}
            targetWord={targetWord}
            currentAttempt={currentAttempt}
            setAttempts={setAttempts}
            isGameFinished={isGameFinished}
          />
        ))}
      </div>
      <div className="buttons-container mx-auto py-4 d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => reset()}
        >
          Reiniciar
        </button>
        <button
          type="button"
          className="btn btn-light"
          disabled={attempts[currentAttempt].length < 5}
          onClick={() => updateAttempt()}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}

export default App;
