import { Loader } from 'components/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { fetchMovieDetails } from 'services/Api';
import css from './MovieDetails.module.css';

function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();

  useEffect(() => {
    const getMovieDetails = async movieId => {
      try {
        setIsLoading(true);
        const movieDetails = await fetchMovieDetails(movieId);
        setMovieDetails(movieDetails);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieDetails(movieId);
  }, [movieId, error]);

  const genres = movieDetails?.genres;
  const movieOverview = movieDetails?.overview;
  const movieTitle = movieDetails?.original_title;
  const genresMovies = genres?.map(({ name }) => name).join(' ');
  const imgMovie = `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`;
  const userScore = Math.round(movieDetails?.vote_average * 10);

  return (
    <>
      <NavLink to={location.state?.from ?? '/'}>
        <button className={css.GoBack}>Go back</button>
      </NavLink>
      <div>
        {isLoading === true && <Loader />}
        {movieDetails !== null && (
          <div className={css.movieWrapper}>
            <div>
              <img src={imgMovie} alt="Poster" className={css.imgMovie} />
            </div>
            <div className={css.movieItem}>
              <p className={css.movieTitle}>
                <b></b> {movieTitle}
              </p>
              <p className={css.userScore}>
                <b>User Score</b>: {userScore}%
              </p>
              <h3>Overview</h3>
              <p className={css.movieOverview}>{movieOverview}</p>
              <h3>Genres</h3>
              <p className={css.genresMovies}>{genresMovies}</p>
            </div>
          </div>
        )}
        <h2 className={css.addInfo}>Additional information</h2>

        <ul>
          <li>
            <NavLink to="cast" state={{ from: location.state?.from ?? '' }}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" state={{ from: location.state?.from ?? '' }}>
              Reviews
            </NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
    </>
  );
}

export default MovieDetails;
