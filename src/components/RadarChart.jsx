import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function RadarChart({ scores = {}, labels = [] }) {
  const defaultLabels = [
    'Pemahaman Konsep',
    'Analisis Kritis',
    'Logika Penalaran',
    'Pemecahan Masalah',
    'Ketelitian Hitung'
  ];

  const chartLabels = labels.length > 0 ? labels : defaultLabels;

  const dataValues = [
    scores.pemahaman ?? 85,
    scores.analisis ?? 75,
    scores.logika ?? 90,
    scores.pemecahan ?? 80,
    scores.ketelitian ?? 70
  ];

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Skor Kompetensi (%)',
        data: dataValues,
        backgroundColor: 'rgba(37, 99, 235, 0.25)', // Royal Indigo with 25% opacity
        borderColor: '#2563EB', // Royal Indigo
        borderWidth: 2.5,
        pointBackgroundColor: '#0D9488', // Soft Teal points
        pointBorderColor: '#FFFFFF',
        pointHoverBackgroundColor: '#FFFFFF',
        pointHoverBorderColor: '#2563EB',
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: '#E2E8F0',
        },
        grid: {
          color: '#E2E8F0',
        },
        pointLabels: {
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
            size: 12,
            weight: '600',
          },
          color: '#334155',
        },
        ticks: {
          stepSize: 20,
          backdropColor: 'transparent',
          font: {
            size: 10,
          },
          color: '#94A3B8',
          display: true,
        },
        min: 0,
        max: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#0F172A',
        titleFont: { family: "'Plus Jakarta Sans', sans-serif", size: 13, weight: 'bold' },
        bodyFont: { family: "'Inter', sans-serif", size: 12 },
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (context) => ` ${context.dataset.label}: ${context.raw}%`
        }
      },
    },
  };

  return (
    <div className="w-full h-[280px] sm:h-[320px] flex items-center justify-center p-2">
      <Radar data={data} options={options} />
    </div>
  );
}
