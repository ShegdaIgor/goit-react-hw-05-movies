import { Loader } from 'components/Loader/Loader';
import {
  EmptyMessage,
  MistakeMessage,
} from 'components/MistakeMessage/MistakeMessage';
import { Searchbar } from 'components/SearchBar/SearchBar';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { searchAnyMovie } from 'services/Api';

function Movies() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchMovie, setSearchMovie] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (!query) {
      return;
    }

    const getMovies = async query => {
      try {
        setIsLoading(true);
        const movie = await searchAnyMovie(query);
        setSearchMovie(movie);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies(query);
  }, [query]);

  const onSubmit = query => {
    setQuery(query);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {searchMovie.length === 0 && <EmptyMessage />}
      {error && <MistakeMessage />}
      <div>
        {isLoading && <Loader />}
        <ul>
          {searchMovie.map(movie => {
            return (
              <li key={movie.id}>
                <NavLink to={`/movies/${movie.id}`} state={{ from: location }}>
                  <p>{movie.title}</p>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Movies;
