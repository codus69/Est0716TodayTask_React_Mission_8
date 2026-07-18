import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import initialData from './data/data.json';
import SearchForm from './components/SearchForm';
import CategoryFilter from './components/CategoryFilter';
import StudyList from './components/StudyList';
import './App.css';

function App() {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('all');
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favoriteOnly, setFavoriteOnly] = useState(false);

  const renderCount = useRef(0);

  renderCount.current += 1;

  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleFocusSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const filteredData = useMemo(() => {
    console.log('데이터 필터링 계산 중...');

    return initialData.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category;
      const matchesKeyword = item.title.toLowerCase().includes(keyword.toLowerCase());
      const matchesFavorite = !favoriteOnly || favoriteIds.includes(item.id);

      return matchesCategory && matchesKeyword && matchesFavorite;
    });
  }, [keyword, category, favoriteOnly, favoriteIds]);

  const summary = useMemo(() => {
    console.log('통계 정보 계산 중...');

    return {
      total: initialData.length,
      visible: filteredData.length,
      favorite: favoriteIds.length,
    };
  }, [filteredData, favoriteIds]);

  const handleToggleFavorite = useCallback((id) => {
    setFavoriteIds((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
  }, []);

  return (
    <div className="app-container">
      <p>React Basic Review Mission 8</p>
      <h1>React Hooks 학습 목록 관리</h1>
      <p>useState, useMemo, useCallback, useRef를 활용한 복습 미션입니다.</p>

      <SearchForm keyword={keyword} setKeyword={setKeyword} searchInputRef={searchInputRef} />

      <div style={{ margin: '10px 0' }}>
        <button onClick={handleFocusSearch}>검색창으로 이동</button>
      </div>

      <CategoryFilter category={category} setCategory={setCategory} />

      <button onClick={() => setFavoriteOnly(!favoriteOnly)}>
        {favoriteOnly ? '전체 항목 보기' : '즐겨찾기만 보기'}
      </button>

      <div>
        <p>전체 항목: {summary.total}개</p>
        <p>현재 표시: {summary.visible}개</p>
        <p>즐겨찾기: {summary.favorite}개</p>
        <p>App 렌더링 횟수: {renderCount.current}회</p>
      </div>

      <StudyList filteredData={filteredData} favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} />
    </div>
  );
}

export default App;
