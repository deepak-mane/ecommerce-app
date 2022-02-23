import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(
  CategoryScale,
  ChartDataLabels,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



export default function ChartGraphs() {

  const options = {
    indexAxis: "y",
    plugin: {
      datalabels: {
        color: "white"
      }
    },
  
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    }
  };

  const labels = [
    "Seller 1",
    "Seller 2",
    "Seller 3",
    "Seller 4",
    "Seller 5",
    "Seller 6",
    "Seller 7",
    "Seller 7",
    "Seller 8",
    "Seller 9",
    "Seller 10"
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Open",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "#7874B1"
      },
      {
        label: "Won",
        data: labels.map(() => faker.datatype.number({  min: 0, max: 1000 })),
        backgroundColor: "#9A97C4"
      },
      {
        label: "Lost",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "#BBB9D8"
      }
    ]
  };
  
  return (
    <div style={{ height: "200px", overflow: "scroll" }}>
    <Bar options={options} data={data} />
  </div>
  )
}
