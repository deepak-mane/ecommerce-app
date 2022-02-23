import React from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function PolarAreaChartGraphs() {

   const data = {
    // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    labels: ['Apple', 'MSFT', 'GOOGL','2222.SR', 'AMZN','TSLA','FB','NVDA','BRK.A','TSM'],
    datasets: [
      {
        label: '# Revenue(in Billions)',
        data: [365.8, 176.3, 239.2, 350.8, 458, 46.9, 40.3, 24.3, 346.1, 53.8],
        // data: [12, 19, 3, 5, 8, 17],
        backgroundColor: [
          'rgba(128, 0, 0, 0.5)',
          'rgba(255, 0, 0, 0.5)',
          'rgba(128, 0, 128, 0.5)',
          'rgba(255, 0, 255, 0.5)',
          'rgba(0, 128, 0, 0.5)',
          'rgba(0, 255, 0, 0.5)',
          'rgba(128, 128, 0, 0.5)',
          'rgba(255, 255, 0, 0.5)',
          'rgba(0, 0, 128, 0.5)',
          'rgba(0, 0, 255, 0.5)',
          'rgba(0, 255, 255, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  }
  
  return (
    <div>
    {/*<div style={{ height: "200px", overflow: "scroll" }}>*/}
    <PolarArea data={data} />
  </div>
  )
}
