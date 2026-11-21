import { getStatsData } from '../../stats';
import { TimeSeriesGraph } from './TimeSeriesGraph';
import { Histogram } from './Histogram';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import { Button } from '../GlobalStyles';
import { games } from '../Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const StatsView = ({ game }) => {
  const { results, maxScore, distribution, played, streak } = getStatsData()[game];
  const { name } = games.find(({ path }) => path === game);

  return (
    <section className="content-panel" aria-labelledby="scores-title">
      <Link className="back-link" to="/stats"><ArrowBackIcon /> All stats</Link>
      <h1 id="scores-title">{name} stats</h1>
      {results.length > 0 ? (
        <>
          <dl className="stats-summary">
            <div><dt>Best score</dt><dd>{maxScore}</dd></div>
            <div><dt>Days played</dt><dd>{played}</dd></div>
            <div><dt>Current streak</dt><dd>{streak}</dd></div>
          </dl>
          <h2>Score history</h2>
          <TimeSeriesGraph data={results.map(({ date, score }) => ({
            date: DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED),
            score,
          }))} />
          <h2>Score distribution</h2>
          <Histogram data={distribution} />
        </>
      ) : (
        <>
          <p>Play a game to record your first score.</p>
          <Button as={Link} to={`/${game}`}>Play {name}</Button>
        </>
      )}
    </section>
  );
};
