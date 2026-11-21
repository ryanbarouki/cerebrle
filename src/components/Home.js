import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { DateTime } from 'luxon';

export const games = [
  { path: 'sequence', name: 'Sequence Memory', description: 'Watch the tiles light up, then repeat the pattern in order.' },
  { path: 'number', name: 'Number Memory', description: 'Memorize the digits before they disappear, then enter them from memory.' },
  { path: 'word', name: 'Verbal Memory', description: 'Decide whether each word is new or one you’ve already seen.' },
];

export const GameCards = ({ stats = false }) => {
  const Title = stats ? 'h2' : 'h3';

  return (
    <div className="game-cards">
      {games.map(({ path, name, description }) => (
        <Link to={stats ? `/stats/${path}` : `/${path}`} className={`game-card game-card--${path}`} key={path}>
          <div className="card-art" aria-hidden="true">
            {path === 'sequence' && <div className="art-grid">{Array.from({ length: 9 }, (_, index) => <span key={index} />)}</div>}
            {path === 'number' && <div className="art-digits"><span>3</span><span>7</span><span>2</span></div>}
            {path === 'word' && <div className="art-words"><span>seen</span><span>new</span></div>}
          </div>
          <div className="card-content">
            <Title>{name}</Title>
            {!stats && <p>{description}</p>}
            <span className="card-action">{stats ? 'View stats' : 'Play game'} <ArrowForwardIcon /></span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export const Home = ({ dayString }) => (
  <>
    <section className="home-hero" aria-labelledby="home-title">
      <div className="hero-copy">
        <time dateTime={dayString}>{DateTime.fromISO(dayString).toLocaleString({ weekday: 'long', month: 'long', day: 'numeric' })}</time>
        <h1 id="home-title">Daily memory<br />challenges<span>.</span></h1>
        <p>Three games to see how much you can remember.</p>
      </div>
      <div className="hero-art" aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => <span key={index} />)}
      </div>
    </section>
    <section className="game-picker" aria-labelledby="game-picker-title">
      <h2 id="game-picker-title">Choose a game</h2>
      <GameCards />
    </section>
  </>
);
