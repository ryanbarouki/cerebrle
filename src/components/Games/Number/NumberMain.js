import styled from 'styled-components';
import { DateTime } from 'luxon';
import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { ToastContainer, Flip } from "react-toastify";
import { toast } from 'react-toastify';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { saveResults, loadAllResults } from '../../../save_local';
import { Button } from '../../GlobalStyles';
import { strings } from '../../../strings';


const BigContainer = styled.div`
  display: flex;
  text-align: center;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const NumberTile = styled.div`
  display: flex;
  min-width: 10rem;
  width: 100%;
  padding: 0;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  align-items: center;
`;


const TargetNumber = styled.div`
  color: #45acd8;
  font-size: 4rem;
  text-align: center;
  width: 100%;
  word-wrap: break-word;
`;

const ButtonContainer = styled.div`
display: flex; 
gap: 5px;;

`;

const Input = styled.input`
  background-color: whitesmoke;
  text-align: center;
  font-size: 1.5rem;
  padding: 1rem;
  margin: 0.5rem;
  width: 12rem;
  border-radius: 5px;
  border-width: 0;
  :focus {
    outline: none;
  }
  @media (prefers-color-scheme: dark) {
    color: #DADADA;
    background-color: #1F2023;  
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

function randomNumberInRange(min, max) {
    return String(Math.floor(Math.random() * (max - min +1)) + min);
  };


const NUM_SHOW_DURATION = 5000;
export const NumberMain = ({dayString}) => {
  const [num, setNum] = useState(randomNumberInRange(0,9));
  const storedScore = useMemo(() => loadAllResults()[dayString]?.number, [dayString]);
  const [score, setScore] = useState(storedScore ?? 0);
  const [guess, setGuess] = useState('');
  const [showNum, setShowNum] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (storedScore) {
      setGameOver(true);
      toast(strings.tomorrowToast, {autoClose: 2000});
    }
  }, []);

  const handleinfoClick = (e) => {
    toast(strings.howTo.number, { autoClose: 10000 })
 }

  const render = () => {
    if (gameOver) {
      return (
        <>
          <div>Today's score - <strong>{score}</strong></div>
          <Button onClick={handleinfoClick}>{"How to Play"}</Button>
        </>
      )
    }
    if (score === 0) {
      return (
        <ButtonContainer>
          <Button onClick={handleClick}>{"Start"}</Button>
          <Button onClick={handleinfoClick}>{"How to Play"}</Button>
        </ButtonContainer>
      );
    }
    if (showNum) {
      return (
        <NumberTile>
          <TargetNumber>{num}</TargetNumber>
          <CountdownCircleTimer
            isPlaying
            duration={NUM_SHOW_DURATION / 1000}
            colors={["#FC8B9D"]}
            size={60}
          >
          </CountdownCircleTimer>
        </NumberTile>
      );
    } else {
      return (
        <NumberTile>
          <Input type="number"
            disabled={gameOver}
            placeholder="enter your guess"
            onChange={handleInput}
            value={guess}
            onKeyDown={handleEnter}
            autoFocus />
          <Button disabled={gameOver} onClick={handleClick}>{"Guess"}</Button>
        </NumberTile>
      );
    }
  };

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
      setNum(num + randomNumberInRange(0, 9));
      setShowNum(true);

      setTimeout(() => {
        setShowNum(false);
      }, NUM_SHOW_DURATION);

    } else {
      toast(strings.endToast(score), { autoClose: 5000 });
      saveResults(dayString, "number", score);
      setGameOver(true);
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
      { render() }
    </BigContainer>
  );
};


const getDayString = () => {
  return DateTime.now().toFormat("yyyy-MM-dd");
};


