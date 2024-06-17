import "./MovieCard.css";
import PropTypes from "prop-types";

const MovieCard = ({ movie }) => {
  return (
    <div className="card">
      <h2 id="movieTitle">{movie.title}</h2>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} id="moviePoster" alt={movie.title} />
      <div id="movieRating">Rating: {movie.vote_average}</div>
    </div>
  );
};


MovieCard.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string,
    vote_average: PropTypes.number,
  }).isRequired,
};

export default MovieCard;
