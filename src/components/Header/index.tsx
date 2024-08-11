import React, { useState } from 'react';
import './Todo.Header.module.scss';
import SearchBar from '../SearchBar';
import styles from './Todo.Header.module.scss';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className={styles.header}>
      <div className={`${styles.headerContainer} container`}>
      <div className={styles.titleContainer}>
        <img src="/images/icons/check_list_icon.png" alt="Logo" className={styles.logo} />
        <h1 className={styles.title}>CoreNotes</h1>
      </div>
      <div className={styles.searchBarContainer}>
        <SearchBar placeholder="Pesquisar notas" value={searchQuery} onChange={setSearchQuery} />
      </div>
      </div>
    </header>
  );
};

export default Header;