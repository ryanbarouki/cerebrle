import { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import randomWords from 'random-words';
import { ToastContainer, Flip } from "react-toastify";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { saveResults, loadAllResults } from "../../../save_local";
import { Button } from "../../GlobalStyles";
import { strings } from "../../../strings";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1rem;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Word = styled.div`
  font-size: 3rem;
`;

const Score = styled.div`
  font-size: 1.2rem;
`;

const NUMBER_OF_LIVES = 3;
export const WordMain = ({dayString}) => {
  const storedScore = useMemo(() => (loadAllResults()[dayString]?.word), [dayString]);
  const [score, setScore] = useState(storedScore ?? 0);
  const [lives, setLives] = useState(NUMBER_OF_LIVES);
  const [seenWords, setSeenWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(randomWords());
  const [isNewWord, setIsNewWord] = useState(true);

  useEffect(() => {
    if (storedScore) {
      setLives(0);
      toast(strings.tomorrowToast, {autoClose: 2000});
    }
  }, []);

  const handleWInfoClick = (e) => {
    toast(strings.howTo.word, { autoClose: 10000 })
  };

  useEffect(() => {
    if (storedScore) return;
    if (lives === 0) {
      toast(strings.endToast(score), {autoClose: 2000});
      saveResults(dayString, "word", score);
    }
  }, [lives]);

  const nextWord = () => {
    const generateNewWord = Math.round(Math.random()) === 0;
    if (generateNewWord || seenWords.length <= 3) {
      const newWord = randomWords();
      setCurrentWord(newWord);
      setSeenWords(words => [...words, newWord]);
      setIsNewWord(true);
    } else {
      let nextWord = seenWords[Math.floor(Math.random()*(seenWords.length))];
      while (nextWord === currentWord) {
        nextWord = seenWords[Math.floor(Math.random()*(seenWords.length))];
      }
      setCurrentWord(nextWord);
      setIsNewWord(false);
    }
  };

  const handleChoice = (choseNewWord) => {
    if (isNewWord === choseNewWord) {
      setScore(score+1);
    } else {
      setLives(lives-1);
    }
    nextWord();
  };

  return (
    <Container>
      <ToastContainer
        hideProgressBar
        position="top-center"
        transition={Flip}
        autoClose={false}
      />
      <RowContainer>
        <Score>{`Lives: ${lives} | Score: ${score}`}</Score>
      </RowContainer>
      <Word>{currentWord}</Word>
        {lives !== 0 &&
          <RowContainer>
            <Button disabled={lives === 0} onClick={() => handleChoice(false)}>Seen</Button>
            <Button disabled={lives === 0} onClick={() => handleChoice(true)}>New</Button>
          </RowContainer>
        }
      <Button onClick={handleWInfoClick}>How to Play</Button>
    </Container>
  )
}