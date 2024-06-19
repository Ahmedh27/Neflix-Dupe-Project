import './App.css'
import MovieList from './Components/MovieList/MovieList';
import Footer from './Components/Footer/Footer'

const App = () => {
  return (
    <div id='app-container'>

      <header className='header'>
      <div className="logo">🍿Flixster🍿</div>
      </header>

      <MovieList />
      <Footer />
      

    </div>
  )
}

export default App
