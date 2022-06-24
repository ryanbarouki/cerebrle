import seedrandom from 'seedrandom';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import cerebrleLogo from './cerebrle_logo.svg';
import React from 'react';
import { useState } from 'react';


const BigContainer = styled.div`
  display: flex;
  text-align: center;
  position: absolute;
  overflow: auto;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  @media (prefers-color-scheme: dark) {
  background-color: #121212;
  }
`;


const TargetNumber = styled.h1`
  color: lightblue;
  font-size: 3rem;
`;

const GenerateButton = styled.button`
  color: lightblue;
  background-color: whitesmoke;
  margin: 1rem;
`;

const Input = styled.input`
  background-color: whitesmoke;
  text-align: center;
`;

const GenerateNumber = () => {
  const [num, setNum] = useState(0);

  function RandomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min +1)) + min;
  };

  const handleClick = () => {
    setNum(RandomNumberInRange(1, 999999999));
  };

  return (
    <BigContainer>
      <TargetNumber>{num}</TargetNumber>
      <Input type="text" placeholder="enter your guess"></Input>
      <GenerateButton onClick={handleClick}>Change Number</GenerateButton>
    </BigContainer>

  );

};


const getDayString = () => {
  return DateTime.now().toFormat("yyyy-MM-dd");
};



export default GenerateNumber;