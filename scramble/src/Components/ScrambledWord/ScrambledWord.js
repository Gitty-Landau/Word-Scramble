import "./ScrambledWord.css";
import { useState } from "react";

function ScrambledWord(props) {
  function ScrambleWord() {
    let wordArr = props.word.split("");
    let indexArr = [];
    let newArr = [];
    let i = 0;
    while (indexArr.length < wordArr.length) {
      let randomIndex = Math.floor(Math.random() * wordArr.length);
      while (indexArr.includes(randomIndex)) {
        randomIndex = Math.floor(Math.random() * wordArr.length);
      }
      indexArr[indexArr.length] = randomIndex;
      newArr[randomIndex] = wordArr[i];
      i++;
    }
    return newArr.join("");
  }
  return <div className="word_display">{props.word && ScrambleWord()}</div>;
}
export default ScrambledWord;
