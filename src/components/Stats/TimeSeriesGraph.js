import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';

const ChartBox = styled.div`
	width: -webkit-fill-available;
	max-width: 350px;
	height: 200px;
`;

export const TimeSeriesGraph = ({data}) => {
  return (
    <ChartBox>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} style={{ color: "black" , margin: "0 -5%"}}>
          <Line type="monotone" dataKey="score" stroke="#8884d8" />
          <XAxis dataKey="date" domain={["dataMin", "dataMax"]} />
          <YAxis domain={["dataMin", "dataMax"]} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </ChartBox>
  );
};