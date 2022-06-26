import seedrandom from 'seedrandom';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import React, { useEffect } from 'react';
import { useState } from 'react';


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
  min-width: 5rem;
  width: fit-content;
  height: 5rem;
  background-color: pink;
  justify-content: center;
  text-align: center;
  border-radius: 5px;
  flex-direction: column;
  align-items: center;
`;


const TargetNumber = styled.h1`
  color: lightblue;
  font-size: 3rem;
  text-align: center;
`;

const GuessButton = styled.button`
  color: lightblue;
  background-color: whitesmoke;
  margin: 1rem;
  min-width: 5rem;

`;

const Input = styled.input`
  background-color: whitesmoke;
  text-align: center;
  padding: 5px;
  margin: 5px;
`;

function randomNumberInRange(min, max) {
    return String(Math.floor(Math.random() * (max - min +1)) + min);
  };

export const NumberMain = () => {
  const [num, setNum] = useState(randomNumberInRange(0,9));

  const [guess, setGuess] = useState('');

  const handleClick = (e) => { 
      if (guess === num) {
        console.log("correct");
      } else {
        console.log("no match");
      }
      setNum(num + randomNumberInRange(0, 9));
    setGuess(0);

  };

  const handleInput = (e) => {
    setGuess(e.target.value);
  };

  return (
    <BigContainer>
      <NumberTile>
      <TargetNumber>{num}</TargetNumber>
      </NumberTile>
      <Input type="text" placeholder="enter your guess" onChange={handleInput} ></Input>
      <GuessButton onClick={handleClick}> Start </GuessButton>
    </BigContainer>
  );
};


const getDayString = () => {
  return DateTime.now().toFormat("yyyy-MM-dd");
};


