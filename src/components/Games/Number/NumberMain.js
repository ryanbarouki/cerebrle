import { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { saveResults, loadAllResults } from '../../../save_local';
import { Button } from '../../GlobalStyles';
import { GameLayout } from '../GameLayout';
import { GameResult } from '../GameResult';

const SECONDS_TO_MEMORIZE = 5;
const randomDigit = () => String(Math.floor(Math.random() * 10));

export const NumberMain = ({ dayString }) => {
  const [storedScore] = useState(() => loadAllResults()[dayString]?.number);
  const [number, setNumber] = useState('');
  const [guess, setGuess] = useState('');
  const [memorizing, setMemorizing] = useState(false);
  const [finished, setFinished] = useState(false);

  const submitGuess = (event) => {
    event.preventDefault();
    if (memorizing || !guess) return;

    if (guess !== number) {
      saveResults(dayString, 'number', number.length);
      setFinished(true);
      return;
    }

    setNumber(number + randomDigit());
    setGuess('');
    setMemorizing(true);
  };

  return (
    <GameLayout game="number">
      {finished || storedScore != null ? (
        <GameResult dayString={dayString} score={storedScore ?? number.length} nextGame="word">
          {finished && (
            <dl className="answer-review">
              <div><dt>Correct number</dt><dd>{number}</dd></div>
              <div><dt>Your guess</dt><dd>{guess}</dd></div>
            </dl>
          )}
        </GameResult>
      ) : !number ? (
        <>
          <p className="play-status">You’ll have {SECONDS_TO_MEMORIZE} seconds to memorize each number.</p>
          <Button onClick={() => {
            setNumber(randomDigit());
            setMemorizing(true);
          }}>Start game</Button>
        </>
      ) : (
        <form className="number-round" onSubmit={submitGuess}>
          <div className="round-status" role="status">
            {memorizing ? <strong>Memorize this number</strong> :
              <label htmlFor="number-guess"><strong>Enter the number you saw</strong></label>}
            <span>Round {number.length}</span>
          </div>
          {memorizing ? (
            <div className="number-display game-prompt">{number}</div>
          ) : (
            <input className="number-display number-input" id="number-guess" type="text"
              inputMode="numeric" autoComplete="off" spellCheck={false} value={guess}
              onChange={(event) => setGuess(event.target.value.replace(/[^0-9]/g, ''))}
              autoFocus />
          )}
          <div className="number-action">
            {memorizing ? (
              <CountdownCircleTimer
                isPlaying
                duration={SECONDS_TO_MEMORIZE}
                colors="var(--accent)"
                trailColor="var(--border)"
                size={48}
                strokeWidth={4}
                onComplete={() => { setMemorizing(false); }}
              >
                {({ remainingTime }) => <span aria-hidden="true">{remainingTime}</span>}
              </CountdownCircleTimer>
            ) : <Button type="submit" disabled={!guess}>Submit guess</Button>}
          </div>
        </form>
      )}
    </GameLayout>
  );
};
