function SearchForm({ keyword, setKeyword, searchInputRef }) {
  return (
    <div className="search-section">
      <input
        ref={searchInputRef}
        type="text"
        placeholder="학습 항목 검색..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </div>
  );
}

export default SearchForm;
