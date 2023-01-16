import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchMovies } from 'services/Api';

function Homepage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        const movies = await fetchMovies();
        setMovies(movies);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, [movies, error]);

  return (
    <div className="mainWrapper">
      <div className="list">
        <h2>movies</h2>
        {isLoading === true && <p>loading ...</p>}
        {Array.isArray(movies) &&
          movies.map(movie => {
            return (
              <Link
                key={movie.id}
                className="movieItem"
                to={`/movies/${movie.id}`}
              >
                <h3>{movie.title}</h3>
                <p>{movie.body}</p>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default Homepage;
