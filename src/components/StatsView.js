import { getStatsData } from "../stats";
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
`;

export const StatsView = () => {
	const {sequenceResults, numberResults, wordResults} = getStatsData();
	console.log(sequenceResults);
	const data = [{date: "2022-07-01", score: 12}, {date: "2022-07-02", score: 9}, {date: "2022-07-03", score: 10},  {date: "2022-07-04", score: 14}, {date: "2022-07-20", score: 7}];
	return (
		<Container>
			<div>Test Data</div>
			<LineChart width={400} height={200} data={data} style={{color: "black"}}>
				<Line type="monotone" dataKey="score" stroke="#8884d8" />
				<XAxis dataKey="date" domain={["dataMin", "dataMax"]}/>
				<YAxis domain={["dataMin", "dataMax"]}/>
				<Tooltip />
			</LineChart>
			<div>Sequence Memory Scores</div>
			<LineChart width={400} height={200} data={sequenceResults} style={{color: "black"}}>
				<Line type="monotone" dataKey="score" stroke="#8884d8" />
				<XAxis dataKey="date" domain={["dataMin", "dataMax"]}/>
				<YAxis domain={["dataMin", "dataMax"]}/>
				<Tooltip />
			</LineChart>
		</Container>
	);
}