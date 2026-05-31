
import "./Analytics.css";

import {
  useContext
} from "react";

import {
  motion
} from "framer-motion";

import {
  JobContext
} from "../context/JobContext";

import PageWrapper from "../components/PageWrapper";

import {

  ResponsiveContainer,

  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,

  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid

} from "recharts";

function Analytics() {

  /* CONTEXT */

  const { jobs } =
    useContext(JobContext);

  /* COUNTS */

  const applied =
    jobs.filter(
      (job) =>
        job.status === "Applied"
    ).length;

  const interview =
    jobs.filter(
      (job) =>
        job.status === "Interview"
    ).length;

  const rejected =
    jobs.filter(
      (job) =>
        job.status === "Rejected"
    ).length;

  const offer =
    jobs.filter(
      (job) =>
        job.status === "Offer"
    ).length;

  const total =
    jobs.length;

  /* SUCCESS RATE */

  const successRate =

    total === 0
      ? 0
      : Math.round(
          (offer / total) * 100
        );

  /* PIE DATA */

  const pieData = [

    {
      name: "Applied",
      value: applied
    },

    {
      name: "Interview",
      value: interview
    },

    {
      name: "Rejected",
      value: rejected
    },

    {
      name: "Offer",
      value: offer
    }

  ];

  /* BAR DATA */

  const barData = [

    {
      status: "Applied",
      count: applied
    },

    {
      status: "Interview",
      count: interview
    },

    {
      status: "Rejected",
      count: rejected
    },

    {
      status: "Offer",
      count: offer
    }

  ];

  /* COLORS */

  const COLORS = [

    "#2563eb",
    "#f59e0b",
    "#ef4444",
    "#10b981"

  ];

  return (

    <PageWrapper>

      <div className="analytics-container">

        {/* TOP */}

        <div className="analytics-top">

          <div>

            <h1 className="analytics-heading">
              Analytics Dashboard
            </h1>

            <p className="analytics-subtext">
              Track your application performance professionally.
            </p>

          </div>

        </div>

        {/* STATS */}

        <div className="stats-grid">

          {/* APPLIED */}

          <motion.div
            whileHover={{
              y: -8
            }}
            className="analytics-card applied-card"
          >

            <div className="card-top">

              <span className="card-icon">
                📨
              </span>

              <h3>
                Applied
              </h3>

            </div>

            <p>
              {applied}
            </p>

          </motion.div>

          {/* INTERVIEW */}

          <motion.div
            whileHover={{
              y: -8
            }}
            className="analytics-card interview-card"
          >

            <div className="card-top">

              <span className="card-icon">
                🎯
              </span>

              <h3>
                Interview
              </h3>

            </div>

            <p>
              {interview}
            </p>

          </motion.div>

          {/* REJECTED */}

          <motion.div
            whileHover={{
              y: -8
            }}
            className="analytics-card rejected-card"
          >

            <div className="card-top">

              <span className="card-icon">
                ❌
              </span>

              <h3>
                Rejected
              </h3>

            </div>

            <p>
              {rejected}
            </p>

          </motion.div>

          {/* OFFER */}

          <motion.div
            whileHover={{
              y: -8
            }}
            className="analytics-card offer-card"
          >

            <div className="card-top">

              <span className="card-icon">
                🏆
              </span>

              <h3>
                Offers
              </h3>

            </div>

            <p>
              {offer}
            </p>

          </motion.div>

        </div>

        {/* EMPTY */}

        {

          total === 0 ? (

            <div className="empty-analytics">

              <div className="empty-icon">
                📊
              </div>

              <h3>
                No Analytics Yet
              </h3>

              <p>
                Add job applications to view analytics insights.
              </p>

            </div>

          ) : (

            <>

              {/* CHART GRID */}

              <div className="charts-grid">

                {/* PIE CHART */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  className="chart-box"
                >

                  <h2 className="chart-title">
                    Job Status Overview
                  </h2>

                  <div className="chart-wrapper">

                    <ResponsiveContainer
                      width="100%"
                      height={350}
                    >

                      <PieChart>

                        <Pie
                          data={pieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={110}
                          label
                        >

                          {

                            pieData.map(
                              (_, index) => (

                                <Cell
                                  key={index}
                                  fill={
                                    COLORS[index]
                                  }
                                />

                              )
                            )

                          }

                        </Pie>

                        <Tooltip />

                        <Legend />

                      </PieChart>

                    </ResponsiveContainer>

                  </div>

                </motion.div>

                {/* BAR CHART */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    delay: 0.2
                  }}
                  className="chart-box"
                >

                  <h2 className="chart-title">
                    Application Breakdown
                  </h2>

                  <div className="chart-wrapper">

                    <ResponsiveContainer
                      width="100%"
                      height={350}
                    >

                      <BarChart
                        data={barData}
                      >

                        <CartesianGrid
                          strokeDasharray="3 3"
                        />

                        <XAxis
                          dataKey="status"
                        />

                        <YAxis />

                        <Tooltip />

                        <Bar
                          dataKey="count"
                          radius={[
                            10,
                            10,
                            0,
                            0
                          ]}
                        >

                          {

                            barData.map(
                              (_, index) => (

                                <Cell
                                  key={index}
                                  fill={
                                    COLORS[index]
                                  }
                                />

                              )
                            )

                          }

                        </Bar>

                      </BarChart>

                    </ResponsiveContainer>

                  </div>

                </motion.div>

              </div>

              {/* INSIGHTS */}

              <div className="insights-grid">

                <div className="insight-card">

                  <h4>
                    Total Applications
                  </h4>

                  <p>
                    {total}
                  </p>

                </div>

                <div className="insight-card">

                  <h4>
                    Success Rate
                  </h4>

                  <p>
                    {successRate}%
                  </p>

                </div>

                <div className="insight-card">

                  <h4>
                    Interview Rate
                  </h4>

                  <p>

                    {

                      total === 0
                        ? 0
                        : Math.round(
                            (
                              interview
                              /
                              total
                            ) * 100
                          )

                    }%

                  </p>

                </div>

              </div>

            </>

          )

        }

      </div>

    </PageWrapper>
  );
}

export default Analytics;

