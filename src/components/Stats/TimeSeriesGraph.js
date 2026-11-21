import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';

const ChartBox = styled.div`
	width: 100%;
	min-width: 0;
	height: 200px;
`;

export const TimeSeriesGraph = ({data}) => {
  return (
    <ChartBox>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dataKey="score" stroke="var(--primary)" />
          <XAxis stroke="var(--muted)" dataKey="date" domain={["dataMin", "dataMax"]} />
          <YAxis stroke="var(--muted)" domain={["dataMin", "dataMax"]} />
          <Tooltip contentStyle={{ background: "var(--surface)", borderColor: "var(--border)" }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartBox>
  );
};