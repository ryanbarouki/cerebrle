import seedrandom from 'seedrandom';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { ToastContainer, Flip } from "react-toastify";
import { toast } from 'react-toastify';
import { CountdownCircleTimer } from "react-countdown-circle-timer";


const BigContainer = styled.div`
  display: flex;
  text-align: center;
  overflow: auto;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
`;

const NumberTile = styled.div`
  display: flex;
  min-width: 10rem;
  width: fit-content;
  padding: 0;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  align-items: center;
`;


const TargetNumber = styled.div`
  color: lightblue;
  font-size: 5rem;
  text-align: center;
`;

const GuessButton = styled.button`
  border-radius: 8px;
  border-style: solid;
  border-width: 2px;
  border-color: black;
  padding: 1rem 2rem;
  :active {
    background-color: darkgray;
  }
  font-size: 1rem;
`;

const Input = styled.input`
  background-color: whitesmoke;
  text-align: center;
  font-size: 1.5rem;
  padding: 1rem;
  margin: 0.5rem;
  width: 12rem;
  border-radius: 5px;
  
`;

function randomNumberInRange(min, max) {
    return String(Math.floor(Math.random() * (max - min +1)) + min);
  };

const NUM_SHOW_DURATION = 5000;
export const NumberMain = () => {
  const [num, setNum] = useState(randomNumberInRange(0,9));
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState('');
  const [showNum, setShowNum] = useState(false);

  const handleClick = (e) => {
    if (score === 0) {
      setScore(1);
      setShowNum(true);
      setTimeout(() => {
        setShowNum(false);
      }, NUM_SHOW_DURATION);
      return;
    }

    if (guess === num) {
      setScore(score + 1);
      toast("Correct, Level " + score + " complete", { autoClose: 1000 });
      setNum(num + randomNumberInRange(0, 9));
      setShowNum(true);

      setTimeout(() => {
        setShowNum(false);
      }, NUM_SHOW_DURATION);

    } else {
      toast("Incorrect!, you got to level " + score, { autoClose: 5000 });
      setScore(1)
    }
    setGuess("");
  };
  

  const handleInput = (e) => {
    setGuess(e.target.value);
  };

  const handleEnter = e => {
    if (e.keyCode === 13) {
      handleClick();
    }
  };

  return (
    <BigContainer>
    <ToastContainer
        hideProgressBar
        position="top-center"
        transition={Flip}
        autoClose={true}
      />
      {
        score === 0 ? 
          <GuessButton onClick={handleClick}>{"Start"}</GuessButton>
        :
        true ? 
          <NumberTile>
              <TargetNumber>{num}</TargetNumber>
              <CountdownCircleTimer
                isPlaying
                duration={NUM_SHOW_DURATION/1000}
                colors={["#FC8B9D"]}
                size={60}
              >
              </CountdownCircleTimer>
          </NumberTile>
        :
          <NumberTile>
          <Input type="text" 
                disabled={showNum} 
                placeholder="enter your guess" 
                onChange={handleInput} 
                value={guess} 
                onKeyDown={handleEnter} 
                autoFocus/>
          <GuessButton onClick={handleClick}>{"Guess"}</GuessButton>
          </NumberTile>
      }
    </BigContainer>
  );
};


const getDayString = () => {
  return DateTime.now().toFormat("yyyy-MM-dd");
};


