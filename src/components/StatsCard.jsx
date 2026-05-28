import "./StatsCard.css";

function StatsCard({ title, count, type }) {
  return (
    <div className={`card stats-card ${type || ""}`}>
      <h3 className="title">{title}</h3>
      <p className="count">{count}</p>
    </div>
  );
}

export default StatsCard;