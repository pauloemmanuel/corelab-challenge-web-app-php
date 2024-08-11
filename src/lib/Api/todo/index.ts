import { INoteCard } from "../../../types/INoteCard";
import api from "../../Api";

const NOTES_BASE_URL = '/api/notes'

const mapNoteFromApi = (note: any): INoteCard => ({
  id: note.id,
  title: note.title,
  content: note.content,
  color: note.color,
  isFavorite: note.is_favorite
});

export const getNotes = async (): Promise<INoteCard[]> => {
  const response = await api.get(NOTES_BASE_URL);
  return response.data.map(mapNoteFromApi);
};

export const createNote = async (note: INoteCard): Promise<INoteCard> => {
  const response = await api.post(NOTES_BASE_URL, {
    ...note,
    is_favorite: note.isFavorite,
  });
  return mapNoteFromApi(response.data);
};

export const updateNote = async (id: number, updatedNote: INoteCard): Promise<INoteCard> => {
  const response = await api.put(`${NOTES_BASE_URL}/${id}`, {
    ...updatedNote,
    is_favorite: updatedNote.isFavorite,
  });
  return mapNoteFromApi(response.data);
};

export const deleteNote = async (id: number): Promise<void> => {
  await api.delete(`${NOTES_BASE_URL}/${id}`);
};

export const toggleFavorite = async (id: number, isFavorite: boolean): Promise<INoteCard> => {
  const response = await api.patch(`${NOTES_BASE_URL}/${id}`, { is_favorite: isFavorite });
  return mapNoteFromApi(response.data);
};