import "./JobForm.css";

function JobForm({
  company,
  setCompany,
  role,
  setRole,
  status,
  setStatus,
  handleAddJob
}) {
  return (
    <div className="job-form">
      <input
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Rejected</option>
        <option>Offer</option>
      </select>

      <button onClick={handleAddJob}>
        Add Job
      </button>
    </div>
  );
}

export default JobForm;