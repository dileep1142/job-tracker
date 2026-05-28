import "./Dashboard.css";

function Dashboard() {

  const jobs =
    JSON.parse(localStorage.getItem("jobs")) || [];

  const applied = jobs.filter(
    (j) => j.status === "Applied"
  ).length;

  const interview = jobs.filter(
    (j) => j.status === "Interview"
  ).length;

  const offer = jobs.filter(
    (j) => j.status === "Offer"
  ).length;

  const rejected = jobs.filter(
    (j) => j.status === "Rejected"
  ).length;

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <div className="dashboard-header">

        <div>
          <h1 className="dashboard-title">
            Job Dashboard
          </h1>

          <p className="dashboard-subtitle">
            Track your applications easily
          </p>
        </div>

      </div>

      {/* STATS */}
      <div className="dashboard-grid">

        {/* TOTAL */}
        <div className="dashboard-card total-card">

          <div className="card-top">
            <div className="card-icon">
              📊
            </div>

            <span className="card-badge">
              Total
            </span>
          </div>

          <h2>{jobs.length}</h2>

          <p>Total Applications</p>

        </div>

        {/* APPLIED */}
        <div className="dashboard-card applied-card">

          <div className="card-top">
            <div className="card-icon">
              📨
            </div>

            <span className="card-badge">
              Applied
            </span>
          </div>

          <h2>{applied}</h2>

          <p>Jobs Applied</p>

        </div>

        {/* INTERVIEW */}
        <div className="dashboard-card interview-card">

          <div className="card-top">
            <div className="card-icon">
              🎯
            </div>

            <span className="card-badge">
              Interview
            </span>
          </div>

          <h2>{interview}</h2>

          <p>Interview Scheduled</p>

        </div>

        {/* OFFER */}
        <div className="dashboard-card offer-card">

          <div className="card-top">
            <div className="card-icon">
              🏆
            </div>

            <span className="card-badge">
              Offers
            </span>
          </div>

          <h2>{offer}</h2>

          <p>Offer Received</p>

        </div>

        {/* REJECTED */}
        <div className="dashboard-card rejected-card">

          <div className="card-top">
            <div className="card-icon">
              ❌
            </div>

            <span className="card-badge">
              Rejected
            </span>
          </div>

          <h2>{rejected}</h2>

          <p>Rejected Applications</p>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;