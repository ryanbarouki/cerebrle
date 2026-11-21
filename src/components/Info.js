import { Link } from 'react-router-dom';
import { games } from './Home';
import { instructions } from '../strings';

export const Info = () => (
  <section className="content-panel" aria-labelledby="help-title">
    <h1 id="help-title">How to play</h1>
    {games.map(({ path, name }) => (
      <section key={path}>
        <h2>{name}</h2>
        <p>{instructions[path]}</p>
        <Link to={`/${path}`}>Play {name}</Link>
      </section>
    ))}
  </section>
);
