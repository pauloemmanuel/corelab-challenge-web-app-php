import React from 'react';
import './Todo.Header.module.scss';
import SearchBar from '../SearchBar';
import styles from './Todo.Header.module.scss';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className={styles.header}>
      <div className={`${styles.headerContainer} container`}>
        <div className={styles.titleContainer}>
          <img src="/images/icons/check_list_icon.png" alt="Logo" className={styles.logo} />
          <h1 className={styles.title}>CoreNotes</h1>
        </div>
        <div className={styles.searchBarContainer}>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      </div>
    </header>
  );
};

export default Header;