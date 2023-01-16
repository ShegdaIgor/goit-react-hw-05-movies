import axios from 'axios';

const CONST_URL = 'http://api.themoviedb.org/3';
const API_KEY = 'bf3651cb61bc1a5b81f0c6f0f7527e55';

export const fetchMovies = async () => {
  const { data } = await axios.get(
    `${CONST_URL}/trending/all/day?api_key=${API_KEY}`
  );
  return data;
};
