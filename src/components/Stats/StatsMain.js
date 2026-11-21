import { GameCards } from '../Home';

export const StatsMain = () => (
  <section className="game-picker" aria-labelledby="stats-title">
    <h1 id="stats-title">Your stats</h1>
    <GameCards stats />
  </section>
);
