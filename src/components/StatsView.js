import { getStatsData } from "../stats";
import { LineChart, Line } from 'recharts';


export const StatsView = () => {
	const {sequenceResults, numberResults, wordResults} = getStatsData();
	console.log(sequenceResults);
	const data = [{result: 12}, {result: 9}, {result: 10},  {result: 14}, {result: 7}];
	return (
		<LineChart width={400} height={400} data={data}>
			<Line type="monotone" dataKey="result" stroke="#8884d8" />
		</LineChart>
	);
}