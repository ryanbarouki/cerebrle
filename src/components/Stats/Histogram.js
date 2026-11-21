import styled from "styled-components";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer} from 'recharts';

const ChartBox = styled.div`
	width: 100%;
	min-width: 0;
	height: 200px;
`;

export const Histogram = ({data}) => {
  return (
    <ChartBox>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <Bar type="monotone" dataKey="freq" fill="var(--primary)" />
          <XAxis stroke="var(--muted)" dataKey="value" />
          <YAxis stroke="var(--muted)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartBox>
  );
};