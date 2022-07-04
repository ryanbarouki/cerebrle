import styled from "styled-components"
import { useEffect, useState, useMemo } from "react";
import { ToastContainer, Flip } from "react-toastify";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { saveResults, loadAllResults } from "../../../save_local";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 5rem);
  gap: 10px;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align:center;
  gap: 1rem;
`;

const Square = styled.div`
  transition: 0.2s;
  padding: 30px;
  aspect-ratio: 1/1;
  background-color: ${props => props.hightlight ? "#fba8b5" : "#45acd8"};
  border-radius: 3px;
  ${({disabled}) => !disabled && `
    :active {
      background-color: #fba8b5;
    }
  `}
`;

const Button = styled.button`
  border-radius: 8px;
  border-style: solid;
  border-width: 0px;
  padding: 10px;
  :active {
    background-color: darkgray;
  }
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
  gap: 5px;
`;


const NUMBER_IN_GRID = 9
export const SequenceMain = ({dayString}) => {
  const [sequence, setSequence] = useState([Math.floor(Math.random()*(NUMBER_IN_GRID-1))]);
  const [inputSequence, setInputSequence] = useState([]);
  const storedScore = useMemo(() => (loadAllResults()[dayString]?.sequence), [dayString]);
  const [score, setScore] = useState(storedScore ?? 0);
  const [highlighedSquare, setHighlightedSquare] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (storedScore) {
      setGameOver(true);
    }
  }, []);

  useEffect(() => {
    if (score === 0 || gameOver || storedScore) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i === sequence.length) {
        clearInterval(interval);
        setHighlightedSquare(null);
      }
      setHighlightedSquare(sequence[i])
      i++;
    }, 500);
  }, [score]);

  useEffect(() => {
    if (inputSequence.length === 0) return;

    if (inputSequence[inputSequence.length-1] !== sequence[inputSequence.length-1]){
      saveResults(dayString, "sequence", score);
      setGameOver(true);
      toast(`Game Over! Score: ${score}`, {autoClose: 2000});
    }

    if (inputSequence.length === score) {
      setInputSequence(sequence => []);
      let nextInSequence = Math.floor(Math.random()*(NUMBER_IN_GRID-1))
      while (nextInSequence === sequence.at(-1)) {
        nextInSequence = Math.floor(Math.random()*(NUMBER_IN_GRID-1))
      }
      setSequence(sequence => [...sequence, nextInSequence]);
      setScore(score+1);
    }
  }, [inputSequence]);

  const handleClick = (index) => {
    if (gameOver || score === 0) return;
    setInputSequence(sequence => [...sequence, index]);
  };

  const handlesInfoClick = (e) => {
    toast("Think Simon Says! When you click start, 1 tile will flash, after it's flashed, click the same tile. Each round adds an additional tile to the sequence, and they have to be clicked in the correct order too. One incorrect click and game over!", { autoClose: 10000 })
  }

  const handleStartGame = () => {
    setSequence([Math.floor(Math.random()*(NUMBER_IN_GRID-1))]);
    setInputSequence([]);
    setGameOver(false);
    setScore(1);
  };

  return (
    <Container>
      <ToastContainer
        hideProgressBar
        position="top-center"
        transition={Flip}
        autoClose={false}
      />
      <Grid>
        {Array(NUMBER_IN_GRID).fill().map((val, index) => (
          <Square  disabled={score === 0 || gameOver} key={index} hightlight={index === highlighedSquare} 
                  onClick={() => handleClick(index)}
          ></Square>
        ))}
      </Grid>
      <ButtonContainer>
      <Button disabled={gameOver} onClick={handleStartGame}>Start Game</Button>
      <Button onClick={handlesInfoClick}>How to Play</Button>
      </ButtonContainer>
    </Container>
  )
}