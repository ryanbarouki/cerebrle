import seedrandom from 'seedrandom';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import React from 'react';
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

const GenerateButton = styled.button`
  color: lightblue;
  background-color: whitesmoke;
  margin: 1rem;
`;

const Input = styled.input`
  background-color: whitesmoke;
  text-align: center;
  padding: 5px;
  margin: 5px;
`;

export const NumberMain = () => {
  const [num, setNum] = useState(0);

  function RandomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min +1)) + min;
  };

  const handleClick = () => {
    setNum(RandomNumberInRange(1, 90000));
  };

  return (
    <BigContainer>
      <NumberTile>
      <TargetNumber>{num}</TargetNumber>
      </NumberTile>
      
      <Input type="text" placeholder="enter your guess"></Input>
      <GenerateButton onClick={handleClick}>Change Number</GenerateButton>
    </BigContainer>

  );

};


const getDayString = () => {
  return DateTime.now().toFormat("yyyy-MM-dd");
};


