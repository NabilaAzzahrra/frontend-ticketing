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

type Props = {
  data: {
    date: string;
    total: number;
  }[];
};

export default function TicketsDailyLineChart({ data }: Props) {
  // label tanggal (01 Jan)
  const labels = data.map((item) =>
    new Date(item.date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    })
  );

  const totals = data.map((item) => item.total);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Tiket Harian",
        data: totals,
        tension: 0.4,
        fill: true,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        pointRadius: 6,          // ⬅️ titik terlihat jelas
        pointHoverRadius: 8,
        showLine: data.length > 1, // ⬅️ kalau 1 data, jangan paksa garis
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Tickets Daily",
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => ` ${ctx.parsed.y} tiket`,
        },
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

  return <Line data={chartData} options={options} />;
}
