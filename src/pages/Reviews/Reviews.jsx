import { Loader } from 'components/Loader/Loader';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { movieReview } from 'services/Api';
import css from './Reviews.module.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReview = async () => {
      try {
        setIsLoading(true);
        const data = await movieReview(movieId);
        setReviews(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getReview();
  }, [movieId, error]);

  if (reviews.length === 0) {
    return <p>We don't have any reviews for this movie</p>;
  }

  return (
    <>
      {isLoading && <Loader />}
      <ul>
        {reviews?.map(review => {
          return (
            <li key={review.id}>
              <p className={css.autor}>Author: {review.author}</p>
              <p>{review.content}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Reviews;
