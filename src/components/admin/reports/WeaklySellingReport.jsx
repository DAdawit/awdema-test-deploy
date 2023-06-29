import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
      display: true,
      text: "Weakly sellers and Deliverers Report",
    },
  },
};

const labels = ["Mon", "Tus", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const data = {
  labels,
  datasets: [
    {
      label: "Weakly sale Reaport",
      data: [100, 300, 350, 300, 440, 500, 300],
      backgroundColor: "rgb(163,117,255)",
    },
    {
      label: "Weakly Delivery Reaport",
      data: [50, 100, 120, 250, 200, 255, 320],
      backgroundColor: "rgb(54,162,235)",
    },
  ],
};

const WeaklySellingReport = () => {
  return <Bar options={options} data={data} />;
};

export default WeaklySellingReport;
