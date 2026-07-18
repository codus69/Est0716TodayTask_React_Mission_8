import { memo } from 'react';

function StudyItem({ item, isFavorite, onToggleFavorite }) {
  console.log(`${item.title} 렌더링`);

  return (
    <div className="study-item" style={{ position: 'relative' }}>
      <h3>
        {item.title} <span className={`badge ${item.level}`}>{item.level}</span>
      </h3>
      <p>{item.desc}</p>
      <span className="category-tag">#{item.category}</span>

      <button onClick={() => onToggleFavorite(item.id)}>{isFavorite ? '★ 즐겨찾기 해제' : '☆ 즐겨찾기'}</button>
    </div>
  );
}

export default memo(StudyItem);
