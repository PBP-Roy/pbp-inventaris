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

// Registrasi komponen Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CustomChart = () => {
  // Data untuk grafik
  const data = {
    labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    datasets: [
      {
        label: "Product-in",
        data: [20000, 40000, 60000, 50000, 70000, 50000, 60000],
        borderColor: "#4F86F9", // Warna biru untuk garis
        backgroundColor: "rgba(79, 134, 249, 0.2)",
        tension: 0.4, // Garis melengkung
        pointBackgroundColor: "#4F86F9",
        pointBorderColor: "#fff",
        pointHoverRadius: 8,
        pointRadius: 6,
      },
      {
        label: "Product-out",
        data: [30000, 30000, 50000, 60000, 60000, 40000, 50000],
        borderColor: "#E5B8A0", // Warna oranye untuk garis
        backgroundColor: "rgba(229, 184, 160, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "#E5B8A0",
        pointBorderColor: "#fff",
        pointHoverRadius: 8,
        pointRadius: 6,
      },
    ],
  };

  // Opsi untuk grafik
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Membuat ukuran fleksibel
    plugins: {
      legend: {
        display: true,
        position: "bottom", // Memindahkan legend ke bawah chart
        labels: {
          font: {
            size: 14,
          },
          color: "#333",
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
          footer: (tooltipItems) => {
            const month = tooltipItems[0].label;
            return `This Month: ${tooltipItems[0].raw} (${month})`;
          },
        },
        backgroundColor: "#FEE7E1",
        titleColor: "#333",
        bodyColor: "#333",
        footerColor: "#333",
        footerFont: { size: 12 },
        displayColors: false,
        padding: 10,
        borderColor: "#333",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          font: { size: 12 },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          font: { size: 12 },
        },
        grid: {
          color: "#e6e6e6",
        },
      },
    },
    layout: {
      padding: 10, // Tambahkan padding untuk lebih rapi
    },
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1100px",
        height: "500px",
        margin: "auto",
        marginTop: "10px",
        marginBottom: "20px",
        backgroundColor: "white", // Latar belakang putih
        borderRadius: "10px", // Tambahkan sedikit radius untuk estetika
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Tambahkan bayangan untuk gaya
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default CustomChart;
