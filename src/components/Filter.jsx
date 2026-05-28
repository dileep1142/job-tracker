import "./Filter.css";

function Filter({ status, setStatus }) {
  return (
    <select
      className="filter"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option>All</option>
      <option>Applied</option>
      <option>Interview</option>
      <option>Rejected</option>
      <option>Offer</option>
    </select>
  );
}

export default Filter;