import "./JobCard.css";

function JobCard({ job, deleteJob, updateStatus }) {
  return (
    <div className="job-card">

      {/* HEADER */}
      <div className="job-header">
        <h2 className="company">{job.company}</h2>
        <span className={`status ${(job.status || "").toLowerCase()}`}>
          {job.status || "Unknown"}
        </span>
      </div>

      {/* CONTENT */}
      <p className="role">{job.role}</p>

      {/* ACTIONS */}
      <div className="actions">

        <button
          className="btn small"
          onClick={() => updateStatus(job.id, "Applied")}
          disabled={job.status === "Applied"}
        >
          Applied
        </button>

        <button
          className="btn small"
          onClick={() => updateStatus(job.id, "Interview")}
          disabled={job.status !== "Applied"}
        >
          Interview
        </button>

        <button
          className="btn small"
          onClick={() => updateStatus(job.id, "Offer")}
          disabled={job.status !== "Interview"}
        >
          Offer
        </button>

        <button
          className="btn danger small"
          onClick={() => deleteJob(job.id)}
        >
          Delete
        </button>

      </div>
    </div>
  );
}

export default JobCard;