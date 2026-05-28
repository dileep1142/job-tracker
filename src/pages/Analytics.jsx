import "./Analytics.css";
import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function Analytics() {

  const jobs =
    JSON.parse(localStorage.getItem("jobs")) || [];

  const applied = jobs.filter(
    (job) => job.status === "Applied"
  ).length;

  const interview = jobs.filter(
    (job) => job.status === "Interview"
  ).length;

  const rejected = jobs.filter(
    (job) => job.status === "Rejected"
  ).length;

  const offer = jobs.filter(
    (job) => job.status === "Offer"
  ).length;

  const data = {
    labels: [
      "Applied",
      "Interview",
      "Rejected",
      "Offer",
    ],

    datasets: [
      {
        data: [
          applied,
          interview,
          rejected,
          offer,
        ],

        backgroundColor: [
          "#2563eb",
          "#f59e0b",
          "#ef4444",
          "#10b981",
        ],

        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="analytics-container">

      <h1 className="analytics-heading">
        Analytics Dashboard
      </h1>

      {/* STATS */}
      <div className="stats-grid">

        <div className="analytics-card applied-card">
          <div className="card-top">
            <span className="card-icon">📨</span>
            <h3>Applied</h3>
          </div>

          <p>{applied}</p>
        </div>

        <div className="analytics-card interview-card">
          <div className="card-top">
            <span className="card-icon">🎯</span>
            <h3>Interview</h3>
          </div>

          <p>{interview}</p>
        </div>

        <div className="analytics-card rejected-card">
          <div className="card-top">
            <span className="card-icon">❌</span>
            <h3>Rejected</h3>
          </div>

          <p>{rejected}</p>
        </div>

        <div className="analytics-card offer-card">
          <div className="card-top">
            <span className="card-icon">🏆</span>
            <h3>Offers</h3>
          </div>

          <p>{offer}</p>
        </div>

      </div>

      {/* PIE CHART */}
      <div className="chart-box">

        <h2 className="chart-title">
          Job Status Overview
        </h2>

        <div className="chart-wrapper">
          <Pie data={data} />
        </div>

      </div>

    </div>
  );
}

export default Analytics;