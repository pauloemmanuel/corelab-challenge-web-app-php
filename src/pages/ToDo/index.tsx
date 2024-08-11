import React, { useState } from 'react';
import styles from './Todo.module.scss';
import NoteCardManager from '../../components/TodoComponents/NoteCardManager';
import Header from "../../components/Header";

const TodoPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className={styles.todoListContainer}>
        <main className={styles.mainContent}>
          <NoteCardManager searchQuery={searchQuery} />
        </main>
      </div>
    </div>
  );
};

export default TodoPage;
