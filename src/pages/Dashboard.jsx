import "./Dashboard.css";

import {
  useContext
} from "react";

import {
  JobContext
} from "../context/JobContext";

import PageWrapper from "../components/PageWrapper";

function Dashboard() {

  /* CONTEXT */

  const { jobs } =
    useContext(JobContext);

  /* COUNTS */

  const applied =
    jobs.filter(
      (j) =>
        j.status === "Applied"
    ).length;

  const interview =
    jobs.filter(
      (j) =>
        j.status === "Interview"
    ).length;

  const offer =
    jobs.filter(
      (j) =>
        j.status === "Offer"
    ).length;

  const rejected =
    jobs.filter(
      (j) =>
        j.status === "Rejected"
    ).length;

  return (

    <PageWrapper>

      <div className="dashboard-container">

        {/* TOP */}

        <div className="dashboard-top">

          <div>

            <h1 className="dashboard-heading">
              Dashboard
            </h1>

            <p className="dashboard-subtext">
              Track your job search
              progress in one place.
            </p>

          </div>

        </div>

        {/* STATS */}

        <div className="stats-grid">

          {/* TOTAL */}

          <div className="dashboard-card total-card">

            <div className="card-top">

              <span className="card-icon">
                📄
              </span>

              <h3>
                Total Jobs
              </h3>

            </div>

            <p>
              {jobs.length}
            </p>

          </div>

          {/* APPLIED */}

          <div className="dashboard-card applied-card">

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

          </div>

          {/* INTERVIEW */}

          <div className="dashboard-card interview-card">

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

          </div>

          {/* OFFER */}

          <div className="dashboard-card offer-card">

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

          </div>

          {/* REJECTED */}

          <div className="dashboard-card rejected-card">

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

          </div>

        </div>

        {/* RECENT ACTIVITY */}

        <div className="activity-section">

          <div className="section-header">

            <h2>
              Recent Applications
            </h2>

          </div>

          {

            jobs.length === 0 ? (

              <div className="empty-activity">

                <div className="empty-icon">
                  📂
                </div>

                <h3>
                  No Applications Yet
                </h3>

                <p>
                  Start tracking your jobs professionally.
                </p>

              </div>

            ) : (

              <div className="activity-list">

                {

                  [...jobs]
                    .reverse()
                    .slice(0, 5)
                    .map(
                      (
                        job,
                        index
                      ) => (

                        <div
                          className="activity-card"
                          key={index}
                        >

                          <div>

                            <h3>
                              {job.company}
                            </h3>

                            <p>
                              {job.role}
                            </p>

                            <span className="job-date">

                              {job.date}

                            </span>

                          </div>

                          <span
                            className={`activity-status ${job.status.toLowerCase()}`}
                          >

                            {job.status}

                          </span>

                        </div>

                      )
                    )

                }

              </div>

            )

          }

        </div>

      </div>

    </PageWrapper>
  );
}

export default Dashboard;