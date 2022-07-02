import seedrandom from 'seedrandom';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { ToastContainer, Flip } from "react-toastify";
import { toast } from 'react-toastify';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { StatsModal } from '../../StatsModal';
import Chart from 'react-google-charts'


const graphItems = styled.li`
    position:absolute;	
    list-style:none;
    background:lightblue;
    width:40px;
    text-align:center;
    border:1px solid black;
    visibility: hidden;
    background-image:url(bar-shaded.png);
    background-repeat:repeat-y;


`;


const HistogramData = [
    ['1', '2', '3', '4'],
    [2 / 3, -1, 0, 0],
    [2 / 3, -1, 0, null],
    [2 / 3, -1, 0, null],
    [-1 / 3, 0, 1, null],
    [-1 / 3, 0, -1, null],
    [-1 / 3, 0, null, null],
    [-1 / 3, 0, null, null],
]

const chartOptions = {
    title: 'Stats',
    legend: { position: 'top', maxLines: 2 },
    colors: ['#5C3292', '#1A8763', '#871B47', '#999999'],
  interpolateNulls: false,
}
class HistogramChart extends Component {
  render() {
    return (
      <div className="container mt-5">
        <h2>React Histogram Chart Example</h2>
        <Chart
          width={'600px'}
          height={'320px'}
          chartType="Histogram"
          loader={<div>Loading Chart</div>}
          data={HistogramData}
          options={chartOptions}
          rootProps={{ 'data-testid': '5' }}
        />
      </div>
    )
  }
}
export default HistogramChart