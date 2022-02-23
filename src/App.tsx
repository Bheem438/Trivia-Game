import React from "react";
import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [questions, setquestions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [exact, setExact] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [isFlag, setIsFalg] = useState(false);

  useEffect(() => {
    axios.get("https://jservice.io/api/random").then((response) => {
      console.log(response);
      setquestions(response.data[0].question);
      setAnswer(response.data[0].answer);
    });
  }, []);

  function callback() {
    setTimeout(() => {
      axios.get("https://jservice.io/api/random").then((response) => {
        setquestions(response.data[0].question);
        setAnswer(response.data[0].answer);
      });
    }, 300);
  }

  const clickHandler = () => {
    if (inputValue.length <= 3) {
      setIsInput(true);
    } else {
      if (inputValue === answer) {
        setExact(true);
      } else {
        setExact(false);
      }
      setIsFalg(true);
      setInputValue("");
      callback();
      setIsInput(false);
    }
  };

  return (
    <div className="App">
      <h1>Trivia Game</h1>
      <h3 className="question">{questions}</h3>
      <br />
      <br />
      <br />
      <input
        type="text"
        className="inp"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <button className="btn" onClick={clickHandler}></button>
      <br />
      {isInput ? <p className="isInput">Please answer the question</p> : null}
      {isFlag && (
        <>
         {exact ? (
        <div className="crt">
          <Alert status="success">
            <AlertIcon className="icon" />
            Correct
          </Alert>
        </div>
      ) : (
        <div className="incrt">
          <Alert status="error">
            <AlertIcon className="icon" />
            InCorrect
          </Alert>
        </div>
      )}
        </>
      )}
     
    </div>
  );
}

export default App;
