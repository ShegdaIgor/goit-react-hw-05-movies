import { useState } from 'react';
import css from './SearchBar.module.css';
import { useSearchParams } from 'react-router-dom';
import { Notify } from 'notiflix';

export const Searchbar = ({ onSubmit }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const data = searchParams.get('query');
  const [query, setQuery] = useState(data ?? '');

  const handleInputChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    setSearchParams({ query });

    if (query === '') {
      Notify.failure('Write something');
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <div className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          onInput={handleInputChange}
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          value={query}
        />
      </form>
    </div>
  );
};
