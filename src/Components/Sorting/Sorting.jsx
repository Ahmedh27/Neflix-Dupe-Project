// // FilterSortDropdown.jsx
// // import React from 'react';
// import PropTypes from 'prop-types';

// const FilterSortDropdown = ({
//   genres,
//   activeView,
//   sortBy,
//   onSortChange,
//   onSearch,
//   onToggleView,
//   setSearchTerm,
//   searchTerm,
// }) => {
//   const handleSortChange = (e) => {
//     onSortChange(e.target.value);
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   return (
//     <div className="filter-sort-dropdown">
//       <div className="view-buttons">
//         <button
//           className={activeView === 'nowPlaying' ? 'active' : ''}
//           onClick={() => onToggleView('nowPlaying')}
//         >
//           Now Playing
//         </button>
//         <button className={activeView === 'search' ? 'active' : ''} onClick={() => onToggleView('search')}>
//           Search
//         </button>
//       </div>

//       {activeView === 'search' && (
//         <div className="search-container">
//           <input
//             className="search"
//             type="text"
//             placeholder="Search Movie..."
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//           <button onClick={onSearch} id="submit-search">
//             Search
//           </button>
//         </div>
//       )}

//       <div className="sort-container">
//         <label htmlFor="sort">Sort by:</label>
//         <select id="sort" value={sortBy} onChange={handleSortChange}>
//           <option value="">Select</option>
//           <option value="popularity.desc">Popularity</option>
//           <option value="release_date.desc">Release Date</option>
//           <option value="vote_average.desc">Rating</option>
//           <option value="original_title.asc">Alphabetical</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// FilterSortDropdown.propTypes = {
//   genres: PropTypes.array.isRequired,
//   activeView: PropTypes.string.isRequired,
//   sortBy: PropTypes.string.isRequired,
//   onSortChange: PropTypes.func.isRequired,
//   onSearch: PropTypes.func.isRequired,
//   onToggleView: PropTypes.func.isRequired,
//   setSearchTerm: PropTypes.func.isRequired,
//   searchTerm: PropTypes.string.isRequired,
// };

// export default FilterSortDropdown;
