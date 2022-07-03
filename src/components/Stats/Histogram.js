import styled from "styled-components";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';

const ChartBox = styled.div`
	width: -webkit-fill-available;
	max-width: 350px;
	height: 200px;
`;

export const Histogram = ({data}) => {
  return (
    <ChartBox>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} style={{ color: "black" , margin: "0 -5%"}}>
          <Bar type="monotone" dataKey="freq" stroke="#8884d8" />
          <XAxis dataKey="value" />
          <YAxis />
        </BarChart>
      </ResponsiveContainer>
    </ChartBox>
  );
};