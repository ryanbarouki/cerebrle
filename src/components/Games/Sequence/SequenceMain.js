import styled from "styled-components"
import { useEffect, useState } from "react";

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
  gap: 1rem;
`;

const Square = styled.div`
  padding: 30px;
  aspect-ratio: 1/1;
  background-color: ${props => props.hightlight ? "white" : "darkgray"};
  border-radius: 3px;
  ${({disabled}) => !disabled && `
    :active {
      background-color: white;
    }
  `}
`;

const Button = styled.button`
  border-radius: 8px;
  border-style: solid;
  border-width: 0px;
  padding: 10px;
  :active {
    background-color: white;
  }
`;

const NUMBER_IN_GRID = 9
export const SequenceMain = () => {
  const [sequence, setSequence] = useState([Math.floor(Math.random()*(NUMBER_IN_GRID-1))]);
  const [inputSequence, setInputSequence] = useState([]);
  const [level, setLevel] = useState(null);
  const [highlighedSquare, setHighlightedSquare] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (level === null || gameOver) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i === sequence.length) {
        clearInterval(interval);
        setHighlightedSquare(null);
      }
      setHighlightedSquare(sequence[i])
      i++;
    }, 500);
  }, [level]);

  useEffect(() => {
    if (inputSequence.length === 0) return;

    if (inputSequence[inputSequence.length-1] === sequence[inputSequence.length-1]){
    } else {
      setGameOver(true);
    }

    if (inputSequence.length === level) {
      setInputSequence(sequence => []);
      let nextInSequence = Math.floor(Math.random()*(NUMBER_IN_GRID-1))
      while (nextInSequence === sequence.at(-1)) {
        nextInSequence = Math.floor(Math.random()*(NUMBER_IN_GRID-1))
      }
      setSequence(sequence => [...sequence, nextInSequence]);
      setLevel(level+1);
    }
  }, [inputSequence])

  const handleClick = (index) => {
    if (gameOver || level === null) return;
    setInputSequence(sequence => [...sequence, index]);
  };

  const handleStartGame = () => {
    setSequence([Math.floor(Math.random()*(NUMBER_IN_GRID-1))]);
    setInputSequence([]);
    setGameOver(false);
    setLevel(1);
  };

  return (
    <Container>
      <Grid>
        {Array(NUMBER_IN_GRID).fill().map((val, index) => (
          <Square  disabled={level === null || gameOver} key={index} hightlight={index === highlighedSquare} 
                  onClick={() => handleClick(index)}
          ></Square>
        ))}
      </Grid>
      <Button onClick={handleStartGame}>Start Game</Button>
    </Container>
  )
}