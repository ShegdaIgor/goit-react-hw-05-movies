import { lazy, Suspense } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { Loader } from './Loader/Loader';
import css from '../components/App.module.css';
import { PageNotFound } from './MistakeMessage/MistakeMessage';

const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const Movies = lazy(() => import('pages/Movies/Movies'));
const MovieDetails = lazy(() => import('pages/MovieDetails/MovieDetails'));
const Reviews = lazy(() => import('../pages/Reviews/Reviews'));
const Cast = lazy(() => import('../pages/Cast/Cast'));

export const App = () => {
  return (
    <div>
      <header className={css.header}>
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
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieId" element={<MovieDetails />}>
              <Route path="reviews" element={<Reviews />} />
              <Route path="cast" element={<Cast />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};
