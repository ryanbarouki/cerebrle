import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { games } from '../Home';
import { Button, ButtonContainer } from '../GlobalStyles';
import { Share } from '../Share';

export const GameResult = ({ dayString, score, nextGame, children }) => {
  const heading = useRef(null);
  const { name } = games.find(({ path }) => path === nextGame);

  useEffect(() => {
    heading.current?.focus();
  }, []);

  return (
    <div className="game-result">
      <h2 ref={heading} tabIndex={-1}>Today’s score <strong>{score}</strong></h2>
      {children}
      <ButtonContainer>
        <Button as={Link} to={`/${nextGame}`}>Play {name}</Button>
        <Share dayString={dayString} />
      </ButtonContainer>
    </div>
  );
};
