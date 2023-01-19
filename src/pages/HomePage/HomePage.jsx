import React from 'react';
import { Loader } from 'components/Loader/Loader';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchMovies } from 'services/Api';
import Notiflix from 'notiflix';

function Homepage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        const movies = await fetchMovies();
        setMovies(movies.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, [error]);

  useEffect(() => {
    if (error === null) {
      return;
    }
    Notiflix.Notify.failure(`some error ${error}`);
  }, [error]);

  return (
    <div className="list">
      <h2>Trending today</h2>
      {isLoading === true && <Loader />}
      {movies.map(movie => {
        return (
          <Link key={movie.id} className="movieItem" to={`/movies/${movie.id}`}>
            <h3>{movie.title}</h3>
          </Link>
        );
      })}
    </div>
  );
}

export default Homepage;
