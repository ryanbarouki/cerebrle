import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { games } from '../Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { instructions } from '../../strings';

export const GameLayout = ({ game, children }) => {
  const { name, description } = games.find(({ path }) => path === game);

  return (
    <section className={`game-layout game-card--${game}`} aria-labelledby="game-title">
      <Link className="back-link" to="/"><ArrowBackIcon /> All games</Link>
      <h1 id="game-title">{name}</h1>
      <p className="game-description">{description}</p>
      <div className="play-panel">{children}</div>
      <details className="game-help">
        <summary>How to play</summary>
        <p>{instructions[game]}</p>
      </details>
      <ToastContainer hideProgressBar position="top-center" />
    </section>
  );
};
