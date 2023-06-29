import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Active Users",
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Active Users",
      data: [80, 100, 300, 150, 400, 500, 650, 500, 700, 850, 820, 850],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Active Sellers",
      data: [50, 120, 320, 200, 410, 420, 450, 450, 490, 495, 500, 520],
      borderColor: "rgba(153, 102, 255, 0.9)",
      backgroundColor: "rgba(153, 102, 255, 0.9)",
    },
    {
      label: "Active Deliverers",
      data: [10, 50, 120, 125, 250, 280, 300, 200, 340, 350, 400, 420],
      borderColor: "rgba(54, 162, 235, 1)",
      backgroundColor: "rgba(54, 162, 235, 1)",
    },
  ],
};

const ActiveUsers = () => {
  return <Line options={options} data={data} />;
};

export default ActiveUsers;
