import seedrandom from 'seedrandom';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { ToastContainer, Flip } from "react-toastify";
import { toast } from 'react-toastify';


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
  height: 10rem;
  padding: 0;
  background-color: pink;
  justify-content: center;
  text-align: center;
  border-color: #187594;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  flex-direction: column;
  align-items: center;
`;


const TargetNumber = styled.h1`
  color: lightblue;
  font-size: 8rem;
  text-align: center;
`;

const GuessButton = styled.button`
  min-width: 10rem;
  border-radius: 8px;
  border-style: solid;
  border-width: 2px;
  border-color: black;
  padding: 5px;
  :active {
    background-color: darkgray;
  }
  font-size: 1rem;
`;

const Input = styled.input`
  background-color: whitesmoke;
  text-align: center;
  padding: 0px;
  margin: 5px;
  width: 10rem;
  border-radius: 5px;
  
`;

const displayNum = " "
function randomNumberInRange(min, max) {
    return String(Math.floor(Math.random() * (max - min +1)) + min);
  };

export const NumberMain = () => {
  const [num, setNum] = useState(randomNumberInRange(0,9));
  const [score, setScore] = useState(1);
  const [guess, setGuess] = useState('');

  const [showDiv, setshowDiv] = useState(true);
  useEffect(() => {
    setTimeout(function () {
      setshowDiv(false);
    }, 5000);
    }, []);

  const handleClick = (e) => { 
    
      setTimeout(function () {
        setshowDiv(false);
      }, 5000);
      document.getElementById("guess").value="";
      if (guess === num) {
        setScore(score+1);
        toast("Correct, Level " + score + " complete", {autoClose: 1000});
        setNum(num + randomNumberInRange(0, 9));

        setTimeout(function () {
          setshowDiv(true);
        }, 1);

      } else {
        toast("Incorrect!, you got to level " + score, {autoClose: 5000});
        setScore(1)
      }
      
    setGuess(0);

  };
  

  const handleInput = (e) => {
    setGuess(e.target.value);
  };

  return (
    <BigContainer>
    <ToastContainer
        hideProgressBar
        position="top-center"
        transition={Flip}
        autoClose={true}
      />
      <NumberTile>

      {showDiv ? (
      <TargetNumber>{num}</TargetNumber>
       ): (
          <div></div>
        )}{" "}

      </NumberTile>
      <Input type="text" placeholder="enter your guess" onChange={handleInput} id="guess" ></Input>
      <GuessButton onClick={handleClick}> Start </GuessButton>
    </BigContainer>
  );
};


const getDayString = () => {
  return DateTime.now().toFormat("yyyy-MM-dd");
};


