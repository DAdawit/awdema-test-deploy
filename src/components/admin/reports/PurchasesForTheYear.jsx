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
      text: "Purchases For The Year",
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
      label: "Orders",
      data: [100, 300, 350, 300, 440, 500, 600, 800, 700, 1000, 950, 975],
      backgroundColor: "rgb(54,162,235)",
    },
    {
      label: "Canceled orders",
      data: [20, 50, 150, 200, 340, 400, 500, 560, 540, 610, 700, 755],
      backgroundColor: "rgb(255,114,144)",
    },
    {
      label: "Sale",
      data: [50, 150, 250, 320, 290, 400, 630, 590, 670, 900, 870, 975],
      backgroundColor: "rgb(0,203,169)",
    },

    {
      label: "Deliveries",
      data: [40, 50, 250, 320, 190, 300, 730, 690, 770, 850, 870, 900],
      backgroundColor: "rgb(93,198,198)",
    },
  ],
};

const PurchasesForTheYear = () => {
  return <Bar options={options} data={data} />;
};

export default PurchasesForTheYear;
