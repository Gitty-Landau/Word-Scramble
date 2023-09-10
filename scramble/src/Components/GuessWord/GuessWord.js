import "./GuessWord.css";
import { useState } from "react";
function GuessWord(props) {
  const [input, updateInput] = useState("");
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input == props.scrambleWord) {
            props.updateHasWon(true);
            props.updateMssg(props.tries ? props.tries : "0" + "/3");
          } else {
            props.updateTries(function (prev) {
              props.updateMssg(function () {
                return prev + 1 + "/3";
              });
              return prev + 1;
            });
          }
          updateInput("");
        }}
      >
        <input
          value={input}
          type="text"
          id="guess"
          name="guess"
          onChange={(e) => {
            updateInput(e.target.value);
          }}
        ></input>

        <input type="submit" value="Unscramble"></input>
        <div className="mssg">{props.mssg}</div>
      </form>
    </div>
  );
}

export default GuessWord;
