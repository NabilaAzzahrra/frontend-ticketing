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

type Props = {
  data: {
    status: string;
    total: number;
  }[];
};

const STATUS_COLORS: Record<string, string> = {
  Done: "#22c55e",
  Onboarding: "#3b82f6",
  Onprogress: "#facc15",
  Open: "#ef4444",
};

export default function TicketsByStatusChart({ data }: Props) {
  const labels = data.map((item) => item.status);
  const totals = data.map((item) => item.total);

  const backgroundColors = data.map(
    (item) => STATUS_COLORS[item.status] ?? "#94a3b8" // fallback abu-abu
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Jumlah Tiket",
        data: totals,
        backgroundColor: backgroundColors,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Tickets by Status",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
