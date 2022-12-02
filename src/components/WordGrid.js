import React, { useEffect, useState } from "react";

const WordGrid = ({
  attemptIndex,
  word,
  targetWord,
  currentAttempt,
  setAttempts,
}) => {
const initialLettersValues = {
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
  }
  const [letters, setLetters] = useState(initialLettersValues);

  const lettersList = Object.values(letters);

  const updateAttempts = () => {
    setAttempts((currentAttempts) => ({
      ...currentAttempts,
      [currentAttempt]: lettersList.join(""),
    }));
  };

  useEffect(() => {
    updateAttempts();
  }, [letters]);

  useEffect(()=>{
    setLetters(initialLettersValues);
  }, [targetWord])

  const handleLetterChange = async (index, value) => {
    setLetters((currentLetters) => ({
      ...currentLetters,
      [index]: value,
    }));
  };

  const getCellStyles = (letter, index) => {
    const isAttemptCompleted = attemptIndex < currentAttempt;
    const isIncluded = isAttemptCompleted && targetWord.toLocaleLowerCase().includes(letter?.toLocaleLowerCase());
    const isCorrectIndex =
      isAttemptCompleted &&
      targetWord[index].toLocaleLowerCase() === word[index]?.toLocaleLowerCase();

    if (isIncluded && isCorrectIndex) {
      return "text-bg-success";
    }
    if (isIncluded) {
      return "text-bg-warning";
    }
    if (isAttemptCompleted) {
      return "text-bg-dark";
    }
    return "";
  };

  return (
    <div className="row m-auto">
      {lettersList.map((letter, index) => (
        <input
          type="text"
          className={`${getCellStyles(letter, index)} col border border-2 rounded`}
          key={index}
          maxLength={1}
          value={letter}
          onChange={(e) => handleLetterChange(index, e.target.value)}
          disabled={attemptIndex !== currentAttempt}
        />
      ))}
    </div>
  );
};

export default WordGrid;
