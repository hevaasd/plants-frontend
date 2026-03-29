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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function PlantChart({ plants, dark }) {
  const colors = [
    "#2E8B57", // vert foncé
    "#66CDAA", // vert clair
    "#3CB371",
    "#20B2AA",
    "#008080",
    "#6B8E23",
  ];

  const data = {
    labels: plants.map((p) => p.name),
    datasets: [
      {
        label: "Price (DH)",
        data: plants.map((p) => p.price),
        backgroundColor: plants.map((_, i) => colors[i % colors.length]),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: dark ? "#fff" : "#2f4f4f" } },
      title: { display: true, text: "Plants Price Chart", color: dark ? "#fff" : "#2f4f4f" },
    },
    scales: {
      x: { ticks: { color: dark ? "#fff" : "#2f4f4f" } },
      y: { ticks: { color: dark ? "#fff" : "#2f4f4f" } },
    },
  };

  return <Bar data={data} options={options} />;
}