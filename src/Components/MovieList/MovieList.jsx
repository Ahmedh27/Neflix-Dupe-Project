import "./MovieList.css";
import { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";

const MovieList = () => {
  const apiKey = import.meta.env.VITE_APP_API_KEY;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");


  const fetchMovies = async () => {
    setLoading(true); // Set loading to true before fetch
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`);
      const data = await res.json();
      console.log(data.results);
      // Append new movies to the existing list
      setMovies((movies) => [...movies, ...data.results]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  };

  useEffect(() => {
    if (searchTerm === ''){
      fetchMovies();
    }
    else{
      fetchSearchMovies();
    }


  }, [page]);

  const loadMore = () => {
    setPage((page) => page + 1);
  };


  const fetchSearchMovies = async () => {
    
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&api_key=${apiKey}`);
    const data = await response.json();
    console.log(data.results);
    setMovies((data.results)); 
    setLoading(false);
      
  };

//pass in movie props to modal 
// console.log(data.results[0].overview); //movie.overview, use tate (isModalOpen)

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Movie"
          value={searchTerm}
          onChange={(e) => {setSearchTerm(e.target.value) 
            fetchSearchMovies() }}
        />
      </div>
      {/* <Search setSearchResults= {movie}/> */}
      

      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}

        {loading && <p>Loading...</p>}
        {!loading && (
          <button onClick={loadMore} className="load-more-btn">
            Load More
          </button>
        )}
      </div>
    </>
  );
};

export default MovieList;
