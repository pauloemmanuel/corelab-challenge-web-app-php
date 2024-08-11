import styles from './Todo.module.scss'
import NoteCardManager  from '../../components/TodoComponents/NoteCardManager'
import Header from "../../components/Header";

    
const TodoPage = () => {

  return (
    <div>
      <Header/>
    <div className={styles.todoListContainer}>
      <main className={styles.mainContent}>
        <NoteCardManager />
      </main>
      </div>
      </div>
  );
};

export default TodoPage;
