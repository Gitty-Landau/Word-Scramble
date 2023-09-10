import "./GameOver.css";
import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
function GameOver(props) {
  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        style={{
          content: {
            background: props.hasWon ? "skyblue" : "darkgray",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            border: "none",
          },
          overlay: {
            backgroundColor: "	rgba(135, 206, 235,0.5)",
          },
        }}
      >
        <div className={props.hasWon ? "box won" : "box lost"}>
          {props.isOpen && (
            <div>
              <h3>{props.text}</h3>
              <h2>{props.word}</h2>
              <p>{props.definition[0].partOfSpeech}</p>
              <p>{props.definition[0].definition}</p>
            </div>
          )}

          <button
            onClick={() => {
              props.updateTries(0);
              props.fetchApi();
              props.updateHasWon(false);
            }}
          >
            Play Again
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default GameOver;
