import { getStatsData } from "../../stats";
import styled from "styled-components";
import { TimeSeriesGraph } from "./TimeSeriesGraph";
import { Histogram } from "./Histogram";

const Container = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	width: -webkit-fill-available;
	max-width: 350px;
	height: -webkit-fill-available;
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
      <div>{name[game]} Memory Scores</div>
      <TimeSeriesGraph data={results[game]} />
      <Histogram data={distributions[game]} />
		</Container>
	);
}