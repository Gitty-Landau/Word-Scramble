import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import ScrambledWord from "./Components/ScrambledWord/ScrambledWord";
import GuessWord from "./Components/GuessWord/GuessWord";
import { useEffect } from "react";
import GameOver from "./Components/GameOver/GameOver";

function App() {
  const [tries, updateTries] = useState(0);
  const [scrambleWord, updateScrambleWord] = useState("");
  const [hasWon, updateHasWon] = useState(false);
  const [defintion, updateDefinition] = useState("");
  const [mssg, updateMssg] = useState(tries ? tries : "0" + "/3");
  async function fetchApi() {
    try {
      const response = await fetch(
        "https://random-word-api.vercel.app/api?words=1"
      );
      const data = await response.json();
      return data[0];
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(function () {
    const word = fetchApi().then((e) => {
      updateScrambleWord(e);
    });
  }, []);
  useEffect(
    function () {
      const def = fetchDefApi().then((e) => {
        updateDefinition(e);
      });
      updateMssg("0/3");
    },
    [scrambleWord]
  );
  async function fetchDefApi() {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${scrambleWord}`
      );
      const data = await response.json();
      const meaningArr = data[0].meanings;
      const newArr = [];
      meaningArr.forEach((meaning, index) => {
        newArr[index] = {
          partOfSpeech: meaning.partOfSpeech,
          definition: meaning.definitions[0].definition,
        };
      });
      return newArr;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <h1>Word Scramble</h1>
      <ScrambledWord word={scrambleWord}></ScrambledWord>
      <GuessWord
        mssg={mssg}
        updateMssg={updateMssg}
        updateHasWon={updateHasWon}
        updateTries={updateTries}
        scrambleWord={scrambleWord}
      ></GuessWord>
      <GameOver
        updateTries={updateTries}
        fetchApi={fetchApi}
        updateHasWon={updateHasWon}
        definition={defintion}
        word={scrambleWord}
        hasWon={hasWon}
        text={<p>You {hasWon ? "Won" : "Lost"}</p>}
        isOpen={tries >= 3 || hasWon}
      ></GameOver>
    </div>
  );
}

export default App;
