import "./SearchBar.css";

function SearchBar({ search, setSearch }) {
  return (
    <div className="search-wrapper">
      <span className="search-icon">🔍</span>

      <input
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search companies, roles..."
      />

      {search && (
        <button
          className="clear-btn"
          onClick={() => setSearch("")}
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;