import './App.css'
import MovieList from './Components/MovieList/MovieList';
// import Search from './Components/Search/Search';
// import MovieCard from './Components/MovieCard/MovieCard'; // not inuse
// import React from 'react' //rafce - shortcut for boiler code

const App = () => {
  // Any function used = outside of return inside comp(APP), Inside return = HTML
  return (
    <>
      <header>Flixster</header>
      <MovieList />
      <footer id="footer">  <p>Author: Ahmed Hamouda</p><p><a href="mailto:Movies@google.com">music@google.com</a></p> </footer>
    </>
  )
}

export default App
