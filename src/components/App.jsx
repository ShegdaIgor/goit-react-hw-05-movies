import HomePage from 'pages/HomePage';
import MovieDetails from 'pages/MovieDetails';
import Movies from 'pages/Movies';
import { NavLink, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <div>
      <header>
        <nav>
          <NavLink to="/" className="NavLink">
            Home
          </NavLink>
          <NavLink to="/movies" className="NavLink">
            Movies
          </NavLink>
        </nav>
      </header>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:moviesId" element={<MovieDetails />} />
          <Route path="cast" />
          <Route path="reviews" />
        </Routes>
      </div>
    </div>
  );
};
