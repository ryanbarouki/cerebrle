import { getStatsData } from "../../stats";
import styled from "styled-components";
import { TimeSeriesGraph } from "./TimeSeriesGraph";
import { Histogram } from "./Histogram";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";

const Container = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	width: -webkit-fill-available;
	max-width: 350px;
	height: -webkit-fill-available;
`;

const Button = styled.button`
  border-radius: 8px;
  border-width: 0px;
  padding: 1rem 2rem;
  margin-top: 10px;
  :active {
    background-color: darkgray;
  }
  font-size: 1rem;
  @media (prefers-color-scheme: dark) {
    color: #DADADA;
    background-color: #1F2023;  

    :active {
      background-color: #000;
    }
  }
`;

const Title = styled.div`
  font-size: 2rem;
  text-align: center;
`;

export const StatsView = ({game}) => {
	const { results, 
        maxScore,
        distribution,
        played,
        streak } = getStatsData()[game];
  let name = {sequence: "Sequence",
              number: "Number",
              word: "Verbal"};

  return (
    <Container>
      {
        results.length !== 0 ?
          <>
            <Title>{name[game]} Memory Scores</Title>
            <div>Max Score - <strong>{maxScore}</strong> | Days Played - <strong>{played}</strong></div>
            <div>Playing Streak - <strong>{streak}</strong></div>
            <TimeSeriesGraph data={results.map(({date, score}) => ({date: DateTime.fromFormat(date, "yyyy-MM-dd").toLocaleString(DateTime.DATE_FULL), score: score}))} />
            <Histogram data={distribution} />
          </> :
          <>
            <div>No stats yet!</div>
            <Link to="/" style={{textDecoration: "none"}}>
              <Button>Go back to play!</Button>
            </Link>
          </>
      }
    </Container>
  );
}