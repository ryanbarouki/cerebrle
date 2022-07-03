import { getStatsData } from "../../stats";
import styled from "styled-components";
import { TimeSeriesGraph } from "./TimeSeriesGraph";
import { Histogram } from "./Histogram";
import { Link } from "react-router-dom";

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

const BIN_SIZE = 10;
export const StatsView = ({game}) => {
	const { results, 
        maxScores,
        gamesPlayed,
        distributions } = getStatsData(BIN_SIZE);
  let name = {sequence: "Sequence",
              number: "Number",
              word: "Verbal"};

  return (
    <Container>
      {
        results[game].length !== 0 ?
          <>
            <div>{name[game]} Memory Scores</div>
            <TimeSeriesGraph data={results[game]} />
            <Histogram data={distributions[game]} />
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