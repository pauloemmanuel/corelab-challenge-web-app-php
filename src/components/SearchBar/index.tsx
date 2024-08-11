import React from 'react';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Pesquisar notas..."
        value={searchQuery}
        onChange={handleSearchChange}
        className={styles.input}
      />
    </div>
  );
};

export default SearchBar;
