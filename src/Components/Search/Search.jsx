// import { useState } from 'react';

// import PropTypes from 'prop-types'; // Import PropTypes

// const Search = ({ setSearchResults }) => {
//   const [searchTerm, setSearchTerm] = useState('');
  

//   const handleSearch = async () => {
//     const apiKey = import.meta.env.VITE_APP_API_KEY;

//     const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&api_key=${apiKey}`);
//     const data = await response.json();
//     console.log(data.results);
//      setSearchResults(data.results); 
//   };

//   return (
//     <div className="search-container">
//     <input
//       type="text"
//       placeholder="Search Movie"
//       value={searchTerm}
//       onChange={(e) => setSearchTerm(e.target.value)}
//       className="search-input"
//     />
//   </div>
//   );
// };

// // PropTypes validation
// Search.propTypes = {
//   setSearchResults: PropTypes.func.isRequired,
// };

// export default Search;
