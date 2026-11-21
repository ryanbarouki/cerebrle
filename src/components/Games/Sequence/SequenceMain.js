import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { saveResults, loadAllResults } from '../../../save_local';
import { Button } from '../../GlobalStyles';
import { GameLayout } from '../GameLayout';
import { GameResult } from '../GameResult';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: min(100%, 18rem);
  gap: 0.55rem;
`;

const Square = styled.button`
  aspect-ratio: 1;
  border: 1px solid #6898b2;
  padding: 0;
  background: var(--game-tint);
  border-radius: 12px;

  &:not([aria-disabled="true"]) { cursor: pointer; }
  &:hover:not([aria-disabled="true"]) { background: #bfe7f8; }

  &[data-lit="true"], &:active:not([aria-disabled="true"]) {
    background: var(--brand-pink);
    box-shadow: inset 0 0 0 3px #8d3153;
  }
`;

const TILE_COUNT = 9;
const HIGHLIGHT_TIME = 500;
const TAP_TIME = 180;
const randomTile = () => Math.floor(Math.random() * TILE_COUNT);

export const SequenceMain = ({ dayString }) => {
  const [storedScore] = useState(() => loadAllResults()[dayString]?.sequence);
  const [sequence, setSequence] = useState([]);
  const [entered, setEntered] = useState(0);
  const [highlighted, setHighlighted] = useState(null);
  const [tap, setTap] = useState(null);
  const [watching, setWatching] = useState(false);
  const [finished, setFinished] = useState(false);
  const firstTile = useRef(null);
  const round = sequence.length;

  useEffect(() => {
    if (!watching) return;

    let step = 0;
    const timer = setInterval(() => {
      if (step === sequence.length) {
        clearInterval(timer);
        setHighlighted(null);
        setWatching(false);
        return;
      }
      setHighlighted(sequence[step]);
      step++;
    }, HIGHLIGHT_TIME);

    return () => clearInterval(timer);
  }, [sequence, watching]);

  useEffect(() => {
    if (tap === null) return;
    const timer = setTimeout(() => setTap(null), TAP_TIME);
    return () => clearTimeout(timer);
  }, [tap]);

  useEffect(() => {
    if (round === 1 && watching) firstTile.current?.focus();
  }, [round, watching]);

  const handleTile = (index) => {
    if (round === 0 || watching || finished) return;

    if (index !== sequence[entered]) {
      saveResults(dayString, 'sequence', round);
      setFinished(true);
      return;
    }

    setTap({ index });
    if (entered + 1 === round) {
      const offset = 1 + Math.floor(Math.random() * (TILE_COUNT - 1));
      setSequence([...sequence, (index + offset) % TILE_COUNT]);
      setEntered(0);
      setWatching(true);
      return;
    }
    setEntered(entered + 1);
  };

  return (
    <GameLayout game="sequence">
      {finished || storedScore != null ? (
        <GameResult dayString={dayString} score={storedScore ?? round} nextGame="number" />
      ) : (
        <>
          <div className="round-status" role="status">
            <strong>{round === 0 ? 'Ready to play?' : watching ? 'Watch the tiles' : 'Your turn'}</strong>
            {round > 0 && <span>Round {round}{!watching && ` · ${entered} of ${round} entered`}</span>}
          </div>
          <Grid>
            {Array.from({ length: TILE_COUNT }, (_, index) => (
              <Square
                type="button"
                key={index}
                ref={index === 0 ? firstTile : undefined}
                aria-label={`Tile ${index + 1}`}
                aria-disabled={watching || undefined}
                disabled={round === 0}
                data-lit={index === highlighted || index === tap?.index}
                onClick={() => handleTile(index)}
              />
            ))}
          </Grid>
          {round === 0 && <Button onClick={() => {
            setSequence([randomTile()]);
            setWatching(true);
          }}>Start game</Button>}
        </>
      )}
    </GameLayout>
  );
};
