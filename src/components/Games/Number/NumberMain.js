import seedrandom from 'seedrandom';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { ToastContainer, Flip } from "react-toastify";
import { toast } from 'react-toastify';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { saveResults } from '../../../save_local';
import { Link } from 'react-router-dom';
import { HelpOutline } from '@mui/icons-material';
import { Button } from '@mui/material';

const BigContainer = styled.div`
  display: flex;
  text-align: center;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
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

const NumButton = styled.button`
  border-radius: 8px;
  border-width: 0px;
  padding: 1rem 2rem;
  :active {
    background-color: darkgray;
  }
  font-size: 1rem;
  @media (prefers-color-scheme: dark) {
    color: #DADADA;
    background-color: #1F2023;  

    :active {
      background-color: #000;
    }
  }
`;

const ButtonContainer = styled.div`
display: flex; 
gap: 5px;;
margin: 5px;
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

const HelpIcon = styled(HelpOutline)`
  color: black; 
  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

const TitleBarDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleBar = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr;
  margin-bottom: 1rem;
  @media (prefers-color-scheme: dark) {
    color: #fff;
  }
`;

function randomNumberInRange(min, max) {
    return String(Math.floor(Math.random() * (max - min +1)) + min);
  };


const NUM_SHOW_DURATION = 5000;
export const NumberMain = ({dayString}) => {
  const [num, setNum] = useState(randomNumberInRange(0,9));
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState('');
  const [showNum, setShowNum] = useState(false);


  const handleinfoClick = (e) => {
    toast("A number will appear on the screen for 5 seconds, once the 5 seconds runs out, enter the number into the guess box. Each correct round will add 1 additonal digit to the end. If you guess wrong once, game over!", { autoClose: 10000 })
 }

 

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
      toast("Incorrect!, you got to level " + score, { autoClose: 5000 });
      saveResults(dayString, "number", score);
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
        <TitleBar>
          <TitleBarDiv>
            <Button><HelpIcon onClick={handleinfoClick}></HelpIcon></Button>
            
          </TitleBarDiv>
            

        </TitleBar>
      <ButtonContainer>
      <Link to="/" style={{textDecoration: "none"}}>
                <NumButton> Home </NumButton>
            </Link>
            <Link to="/word" style={{textDecoration: "none"}}>
                <NumButton>Verbal Memory</NumButton>
            </Link>
      </ButtonContainer>

      {
        score === 0 ? 
        
        <ButtonContainer>
          <NumButton onClick={handleClick}>{"Start"}</NumButton>
        </ButtonContainer>
    
        :
        showNum ? 
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
          <Input type="number" 
                disabled={showNum} 
                placeholder="enter your guess" 
                onChange={handleInput} 
                value={guess} 
                onKeyDown={handleEnter} 
                autoFocus/>
          <NumButton onClick={handleClick}>{"Guess"}</NumButton>
          </NumberTile>
      }
    </BigContainer>
  );
};


const getDayString = () => {
  return DateTime.now().toFormat("yyyy-MM-dd");
};


