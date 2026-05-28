import "./Application.css";
import { useEffect, useState } from "react";

function Application() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    const storedJobs =
      JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, []);

  const deleteJob = (id) => {
    const updatedJobs = jobs.filter(
      (job) => job.id !== id
    );

    setJobs(updatedJobs);

    localStorage.setItem(
      "jobs",
      JSON.stringify(updatedJobs)
    );
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.company
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (status === "All" ||
        job.status === status)
  );

  return (
    <div className="application-container">
      <h1 className="application-heading">
        Applications
      </h1>

      <input
        className="search-bar"
        type="text"
        placeholder="Search jobs..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <select
        className="filter-box"
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
      >
        <option>All</option>
        <option>Applied</option>
        <option>Interview</option>
        <option>Rejected</option>
        <option>Offer</option>
      </select>

      <div className="job-list">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="job-card"
          >
            <h2>{job.company}</h2>
            <p>{job.role}</p>
            <p>{job.status}</p>

            <button
              onClick={() =>
                deleteJob(job.id)
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Application;