function CategoryFilter({ category, setCategory }) {
  const categories = ['all', 'concept', 'library', 'hook'];

  return (
    <div className="category-section">
      {categories.map((cat) => (
        <button key={cat} className={category === cat ? 'active' : ''} onClick={() => setCategory(cat)}>
          {cat === 'all' ? '전체' : cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
