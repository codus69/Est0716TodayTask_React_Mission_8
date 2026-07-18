import StudyItem from './StudyItem';

function StudyList({ filteredData, favoriteIds, onToggleFavorite }) {
  return (
    <div className="list-section">
      {filteredData.length > 0 ? (
        filteredData.map((item) => (
          <StudyItem
            key={item.id}
            item={item}
            isFavorite={favoriteIds.includes(item.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))
      ) : (
        <p className="no-result">검색 결과가 없습니다.</p>
      )}
    </div>
  );
}

export default StudyList;
