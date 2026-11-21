import { useState } from 'react';
import randomWords from 'random-words';
import { saveResults, loadAllResults } from '../../../save_local';
import { Button } from '../../GlobalStyles';
import { GameLayout } from '../GameLayout';
import { GameResult } from '../GameResult';

const NUMBER_OF_LIVES = 3;

export const WordMain = ({ dayString }) => {
  const [storedScore] = useState(() => loadAllResults()[dayString]?.word);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(NUMBER_OF_LIVES);
  const [seenWords, setSeenWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(() => randomWords());
  const [miss, setMiss] = useState(null);

  const handleChoice = (choseNew) => {
    const isNew = !seenWords.includes(currentWord);
    const correct = isNew === choseNew;
    const nextLives = correct ? lives : lives - 1;
    const nextScore = correct ? score + 1 : score;

    setMiss(correct ? null : { word: currentWord, isNew });
    setLives(nextLives);
    setScore(nextScore);

    if (nextLives === 0) {
      saveResults(dayString, 'word', nextScore);
      return;
    }

    const earlierWords = seenWords.filter((word) => word !== currentWord);
    const repeat = earlierWords.length >= 4 && Math.random() >= 0.5;
    setCurrentWord(repeat ? earlierWords[Math.floor(Math.random() * earlierWords.length)] : randomWords());
    if (isNew) setSeenWords([...seenWords, currentWord]);
  };

  const feedback = miss && (
    <span>“{miss.word}” {miss.isNew ? 'was new' : 'had appeared before'}.</span>
  );

  return (
    <GameLayout game="word">
      {lives === 0 || storedScore != null ? (
        <GameResult dayString={dayString} score={storedScore ?? score} nextGame="sequence">
          {feedback && <p className="play-status">{feedback}</p>}
        </GameResult>
      ) : (
        <div className="word-round">
          <div className="word-score" role="status">
            <span>Lives <strong>{lives}</strong></span>
            <span>Score <strong>{score}</strong></span>
          </div>
          <div className="word-display game-prompt" aria-live="polite">{currentWord}</div>
          <div className="word-actions">
            <Button onClick={() => handleChoice(false)}>Seen</Button>
            <Button onClick={() => handleChoice(true)}>New</Button>
          </div>
          <p className="word-feedback" role="status">{feedback}</p>
        </div>
      )}
    </GameLayout>
  );
};
