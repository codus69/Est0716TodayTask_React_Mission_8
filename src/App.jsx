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
  const [level, setLevel] = useState('all');

  const renderCount = useRef(0);
  renderCount.current += 1;
  const searchInputRef = useRef(null);
  const prevKeywordRef = useRef('');

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

  const handleReset = () => {
    setKeyword('');
    setCategory('all');
    setFavoriteOnly(false);
    setLevel('all');

    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  useEffect(() => {
    return () => {
      prevKeywordRef.current = keyword;
    };
  }, [keyword]);

  const filteredData = useMemo(() => {
    console.log('데이터 필터링 계산 중...');

    const result = initialData.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category;
      const matchesKeyword = item.title.toLowerCase().includes(keyword.toLowerCase());
      const matchesFavorite = !favoriteOnly || favoriteIds.includes(item.id);
      const matchesLevel = level === 'all' || item.level === level;

      return matchesCategory && matchesKeyword && matchesFavorite && matchesLevel;
    });

    return result;
  }, [keyword, category, favoriteOnly, favoriteIds, level]);

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

      <h2>검색</h2>
      <SearchForm keyword={keyword} setKeyword={setKeyword} searchInputRef={searchInputRef} />

      <div>
        <p>현재 검색어: {keyword}</p>
        <p>이전 검색어: {prevKeywordRef.current}</p>
      </div>

      <div>
        <button onClick={handleFocusSearch}>검색창으로 이동</button>
        <button onClick={handleReset}>초기화</button>
      </div>

      <h2>카테고리 필터</h2>
      <CategoryFilter category={category} setCategory={setCategory} />

      <div>
        <span>난이도: </span>
        <button onClick={() => setLevel('all')}>전체 난이도</button>
        <button onClick={() => setLevel('basic')}>basic</button>
        <button onClick={() => setLevel('intermediate')}>intermediate</button>
      </div>

      <button onClick={() => setFavoriteOnly(!favoriteOnly)}>
        {favoriteOnly ? '전체 항목 보기' : '즐겨찾기만 보기'}
      </button>

      <div>
        <p>전체 항목: {summary.total}개</p>
        <p>현재 표시: {summary.visible}개</p>
        <p>즐겨찾기: {summary.favorite}개</p>
        <p>App 렌더링 횟수: {renderCount.current}회</p>
      </div>

      <h2>학습 목록</h2>
      {filteredData.length === 0 ? (
        <p>조건에 맞는 학습 항목이 없습니다.</p>
      ) : (
        <StudyList filteredData={filteredData} favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} />
      )}
    </div>
  );
}

export default App;
