import React, { useState, useEffect } from 'react';
import NoteCard from '../NoteCards';
import AddCard from '../AddCard';
import { getNotes, createNote, updateNote, deleteNote, toggleFavorite } from '../../../lib/Api/todo';
import styles from './NoteCardManager.module.scss';
import { INoteCard } from '../../../types/INoteCard';

interface NoteCardManagerProps {
  searchQuery: string;
}

const NoteCardManager: React.FC<NoteCardManagerProps> = ({ searchQuery }) => {
  const [notes, setNotes] = useState<INoteCard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setLoadingMessage('Carregando notas...');
      try {
        const fetchedNotes = await getNotes();
        setNotes(fetchedNotes);
      } catch (error) {
        alert('Erro ao carregar notas');
      } finally {
        setLoading(false);
        setLoadingMessage('');
      }
    };

    fetchNotes();
  }, []);

  const addNote = async (title: string, content: string, isFavorite: boolean) => {
    setLoading(true);
    setLoadingMessage('Adicionando nota...');
    try {
      const newNote = await createNote({ id: 0, title, content, isFavorite, color: '#fff' });
      setNotes([...notes, newNote]);
    } catch (error) {
      alert('Erro ao criar nota');
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  };

  const handleTitleChange = async (id: number, newTitle: string) => {
    setLoading(true);
    setLoadingMessage('Atualizando nota...');
    try {
      const noteToUpdate = notes.find(note => note.id === id);
      if (noteToUpdate) {
        await updateNote(id, { ...noteToUpdate, title: newTitle });
        setNotes(notes.map(note => (note.id === id ? { ...note, title: newTitle } : note)));
      }
    } catch (error) {
      alert('Erro ao atualizar nota');
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  };

  const handleContentChange = async (id: number, newContent: string) => {
    setLoading(true);
    setLoadingMessage('Atualizando nota...');
    try {
      const noteToUpdate = notes.find(note => note.id === id);
      if (noteToUpdate) {
        await updateNote(id, { ...noteToUpdate, content: newContent });
        setNotes(notes.map(note => (note.id === id ? { ...note, content: newContent } : note)));
      }
    } catch (error) {
      alert('Erro ao atualizar nota');
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  };

  const handleFavoriteToggle = async (id: number) => {
    setLoading(true);
    setLoadingMessage('Alterando favorito...');
    try {
      const noteToUpdate = notes.find(note => note.id === id);
      if (noteToUpdate) {
        const updatedNote = await toggleFavorite(id, !noteToUpdate.isFavorite);
        setNotes(notes.map(note => (note.id === id ? updatedNote : note)));
      }
    } catch (error) {
      alert('Erro ao alternar favorito');
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  };

  const handleColorChange = async (id: number, color: string) => {
    setLoading(true);
    setLoadingMessage('Atualizando cor...');
    try {
      const noteToUpdate = notes.find(note => note.id === id);
      if (noteToUpdate) {
        await updateNote(id, { ...noteToUpdate, color });
        setNotes(notes.map(note => (note.id === id ? { ...note, color } : note)));
      }
    } catch (error) {
      alert('Erro ao atualizar cor');
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    setLoadingMessage('Deletando nota...');
    try {
      await deleteNote(id);
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      alert('Erro ao deletar nota');
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteNotes = filteredNotes.filter(note => note.isFavorite);
  const otherNotes = filteredNotes.filter(note => !note.isFavorite);

  return (
    <div className={styles['note-card-manager']}>
      {loading && (
        <div className={styles['loading-overlay']}>
          <div className={styles['loading-content']}>
            <div className={styles['spinner']} />
            <p>{loadingMessage}</p>
          </div>
        </div>
      )}
      <div style={{ marginTop: '15px' }}></div>
      <AddCard onAddCard={addNote} />

      <div className={styles['note-list-section']}>
        {favoriteNotes.length > 0 && <h4 className={styles['note-list-title']}>Favoritas</h4>}
        <div className={styles['note-list']}>
          {favoriteNotes.map(note => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              color={note.color}
              isFavorite={note.isFavorite}
              onTitleChange={handleTitleChange}
              onContentChange={handleContentChange}
              onFavoriteToggle={handleFavoriteToggle}
              onColorChange={handleColorChange}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      <div className={styles['note-list-section']}>
        {otherNotes.length > 0 && <h4 className={styles['note-list-title']}>Outras</h4>}
        <div className={styles['note-list']}>
          {otherNotes.map(note => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              color={note.color}
              isFavorite={note.isFavorite}
              onTitleChange={handleTitleChange}
              onContentChange={handleContentChange}
              onFavoriteToggle={handleFavoriteToggle}
              onColorChange={handleColorChange}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteCardManager;
