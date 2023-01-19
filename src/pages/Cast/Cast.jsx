import { Loader } from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { movieActors } from 'services/Api';

const Cast = () => {
  const [moviesActors, setMoviesActors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) {
      return;
    }
    const getActors = async () => {
      try {
        setIsLoading(true);
        const data = await movieActors(movieId);

        setMoviesActors(data.cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getActors();
  }, [movieId, error]);

  return (
    <>
      {isLoading && <Loader />}
      <ul>
        {moviesActors?.map(actor => {
          return (
            <li key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt="Poster"
                width="200"
              />
              <p>{actor.name}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Cast;
