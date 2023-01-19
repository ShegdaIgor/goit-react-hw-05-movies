import axios from 'axios';

const CONST_URL = 'http://api.themoviedb.org/3';
const API_KEY = 'bf3651cb61bc1a5b81f0c6f0f7527e55';

export const fetchMovies = async () => {
  const { data } = await axios.get(
    `${CONST_URL}/trending/all/day?api_key=${API_KEY}`
  );
  return data;
};

export const fetchMovieDetails = async id => {
  const { data } = await axios.get(
    `${CONST_URL}/movie/${id}?api_key=${API_KEY}`
  );
  return data;
};

export const searchAnyMovie = async query => {
  const { data } = await axios.get(
    `${CONST_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`
  );
  return data.results;
};

export const movieReview = async id => {
  const { data } = await axios.get(
    `${CONST_URL}/movie/${id}/reviews?api_key=${API_KEY}`
  );
  return data.results;
};

export const movieActors = async id => {
  const { data } = await axios.get(
    `${CONST_URL}/movie/${id}/credits?api_key=${API_KEY}`
  );
  return data;
};
