import "./AddJob.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobForm from "../components/JobForm";

function AddJob() {
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleAddJob = () => {
    const newJob = {
      id: Date.now(),
      company,
      role,
      status,
      date,
      notes,
    };

    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    jobs.push(newJob);

    localStorage.setItem("jobs", JSON.stringify(jobs));

    alert("Job Added Successfully");

    navigate("/applications");
  };

  return (   
    <div className="addjob-container">
      <div className="addjob-box">
        <h1 className="addjob-heading">Add Job</h1>

        <input
          className="addjob-input"
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          className="addjob-input"
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <select
          className="addjob-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
          <option>Offer</option>
        </select>

        <input
          className="addjob-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <textarea
          className="addjob-textarea"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button className="addjob-btn" onClick={handleAddJob}>
          Add Job
        </button>
      </div>
    </div>
  );
}

export default AddJob;