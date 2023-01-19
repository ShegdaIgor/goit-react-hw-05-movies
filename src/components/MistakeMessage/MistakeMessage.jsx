import css from './MistakeMessage.module.css';

export const MistakeMessage = () => (
  <p className={css.mistakeMessage}>Something went wrong !</p>
);

export const EmptyMessage = () => (
  <p className={css.emptyMessage}>There is nothing here !</p>
);

export const PageNotFound = () => (
  <p className={css.pageNotFound}>Page not found !</p>
);
