import { getStatsData } from "../../stats";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';
import styled from "styled-components";
import { TimeSeriesGraph } from "./TimeSeriesGraph";

const Container = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	width: -webkit-fill-available;
	max-width: 350px;
	height: -webkit-fill-available;
`;

const ChartBox = styled.div`
	width: -webkit-fill-available;
	max-width: 350px;
	height: 200px;
`;

export const StatsView = () => {
	const {sequenceResults, numberResults, wordResults} = getStatsData();
	console.log(sequenceResults);
	const data = [{date: "2022-07-01", score: 12}, {date: "2022-07-02", score: 9}, {date: "2022-07-03", score: 10},  {date: "2022-07-04", score: 14}, {date: "2022-07-20", score: 7}];
	return (
		<Container>
			{ sequenceResults.length > 0 &&
			<>
				<div>Sequence Memory Scores</div>
				<TimeSeriesGraph data={sequenceResults}/>
			</>
			}
			{ numberResults.length > 0 &&
			<>
				<div>Number Memory Scores</div>
				<TimeSeriesGraph data={numberResults}/>
			</>
			}
			{ wordResults.length > 0 &&
			<>
				<div>Verbal Memory Scores</div>
				<TimeSeriesGraph data={wordResults}/>
			</>
			}
		</Container>
	);
}