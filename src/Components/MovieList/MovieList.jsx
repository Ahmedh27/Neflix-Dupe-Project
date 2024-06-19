import "./MovieList.css";
import { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import Modal from "../Modal/Modal";


const MovieList = () => {
  const apiKey = import.meta.env.VITE_APP_API_KEY;
  const [movies, setMovies] = useState([]); // movies to populate movie.card
  const [loading, setLoading] = useState(false); // loading
  const [page, setPage] = useState(1); // page for load more button
  const [searchTerm, setSearchTerm] = useState(""); // search term for genre
  const [selectedMovie, setSelectedMovie] = useState(null); // modal selected movies
  const [isSearching, setIsSearching] = useState(false); // state to manage if we are in search mode or now playing mode
  const [activeView, setActiveView] = useState("nowPlaying"); // state to manage active view
  const [sortBy, setSortBy] = useState(""); // State to hold current sorting criteria
  const [genres, setGenres] = useState([]); // State to hold genres

  // Fetch genres
  const fetchGenres = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
    );
    const data = await res.json();
    setGenres(data.genres);
  };

  // Fetching movies based on criteria (default to now playing)
  const fetchMovies = async () => {
    setLoading(true);
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`;

    // Apply sorting if sortBy state is set
    if (sortBy) {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=${sortBy}&page=${page}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results);

    // Appending new movies to the existing list if not first time
    if (page === 1) {
      setMovies(data.results);
    } else {
      setMovies((movies) => [...movies, ...data.results]);
    }

    setLoading(false);
  };

  // Fetching searched movies
  const fetchSearchMovies = async () => {
    setLoading(true);
    let url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&api_key=${apiKey}&page=${page}`;

    // Apply sorting if sortBy state is set
    if (sortBy) {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=${sortBy}&page=${page}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    //updates state with fetched movies
    if (page === 1) {
      setMovies(data.results);
    } else {
      setMovies((movies) => [...movies, ...data.results]);
    }
    setLoading(false);
  };

  // Handling the search action
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      setPage(1);
      setIsSearching(true);
      fetchSearchMovies();
    }
  };

  // Handling view change
  const handleViewChange = (view) => {
    setActiveView(view);
    setMovies([]);
    setPage(1);
    if (view === "nowPlaying") {
      setIsSearching(false);
      fetchMovies();
    }
  };

  // Handling sort change
  const handleSortChange = async (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    setPage(1);
  
    if (isSearching) {
      await fetchSearchMovies();
    } else {
      await fetchMovies();
    }
    setLoading(false);

  };


  // Effect to fetch genres on mount
  useEffect(() => {
    fetchGenres();
  }, []);

  // Effect to fetch movies on page change
  useEffect(() => {
    if (!isSearching) {
      fetchMovies();
    } else {
      fetchSearchMovies();
    }
  }, [page, sortBy]); // Include sortBy in the dependency array

  // Function to load more movies
  const loadMore = () => {
    setPage((page) => page + 1);
  };

  // Fetch movie details including runtime
  const fetchMovieDetails = async (movieId) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
    const data = await res.json();
    setSelectedMovie(data);
  };

  // Return JSX
  return (
    <>
      <div className="parent-container">
        {/* View buttons for toggling between now playing and search */}
        <div className="view-buttons">
          <button
            className={activeView === "nowPlaying" ? "active" : ""}
            onClick={() => handleViewChange("nowPlaying")}
          >
            Now Playing
          </button>
          <button
            className={activeView === "search" ? "active" : ""}
            onClick={() => handleViewChange("search")}
          >
            Search
          </button>
        </div>

        {activeView === "search" && (
          <div className="search-container">
            <input
              className="search"
              type="text"
              placeholder="Search Movie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch} id="submit-search">
              Search
            </button>
          </div>
        )}

        <div className="sort-container">
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" value={sortBy} onChange={handleSortChange}>
            <option value="">Select</option>
            <option value="popularity.desc">Popularity</option>
            <option value="release_date.desc">Release Date</option>
            <option value="vote_average.desc">Rating</option>
            <option value="original_title.asc">Alphabetical</option>
          </select>
        </div>

        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => fetchMovieDetails(movie.id)}
            />
          ))}
  
           {selectedMovie && (
            <Modal
              show={selectedMovie !== null}
              onClose={() => setSelectedMovie(null)}
            >
              <h2>{selectedMovie.title}</h2>
              <img
                src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                alt={selectedMovie.title}
                style={{ width: "100%" }}
              />
              <div className="Release">
                Release Date: {selectedMovie.release_date}
              </div>
              <div className="Overview">Overview: {selectedMovie.overview}</div>
              <div className="Genres">
                Genres: {selectedMovie.genres.map((genre) => genre.name).join(", ")}
              </div>
              <div className="Runtime">
                Runtime: {selectedMovie.runtime} Minutes
              </div>
            </Modal>
          )}

          {loading && <p>Loading...</p>}
          {!loading && (
            <button onClick={loadMore} className="load-more-btn">
              Load More
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default MovieList;
