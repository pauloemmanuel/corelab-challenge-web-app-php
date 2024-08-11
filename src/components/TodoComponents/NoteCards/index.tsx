import React, { useState, useEffect, useRef } from 'react';
import { MdOutlineStarBorder, MdOutlineStar, MdOutlineClose, MdOutlineModeEdit, MdCheck } from "react-icons/md";
import style from './NoteCard.module.scss';
import { INoteCard } from '../../../types/INoteCard';

interface NoteCardProps extends INoteCard {
  onTitleChange: (id: number, newTitle: string) => void;
  onContentChange: (id: number, newContent: string) => void;
  onFavoriteToggle: (id: number) => void;
  onColorChange: (id: number, color: string) => void;
  onDelete: (id: number) => void;
}

const colors = ['#BAE2FF', '#B9FFDD', '#FFE8AC', '#FFCAB9', '#F99494', '#9DD6FF','#ECA1FF','#DAFF8B','#FFA285','#CDCDCD','#979797','#A99A7C'];

const NoteCard: React.FC<NoteCardProps> = ({
  id,
  title,
  content,
  isFavorite,
  color,
  onTitleChange,
  onContentChange,
  onFavoriteToggle,
  onColorChange,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [colorPalleteVisible, setColorPalleteVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const colorPalleteRef = useRef<HTMLDivElement>(null);
  const noteCardRef = useRef<HTMLDivElement>(null);
  const [useSmallGrid, setUseSmallGrid] = useState(false);

  useEffect(() => {
    setEditedTitle(title);
    setEditedContent(content);
    setSelectedColor(color);
  }, [title, content, color]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  };

  const saveChanges = () => {
    onTitleChange(id, editedTitle);
    onContentChange(id, editedContent);
    setIsEditing(false);
  };

  const toggleColorPallete = () => {
    if (noteCardRef.current) {
      const rect = noteCardRef.current.getBoundingClientRect();
      const spaceLeft = window.innerWidth - rect.right;
      setUseSmallGrid(spaceLeft < 180); // Ajusta para usar grid menor se o espaço for menor que 300px
    }
    setColorPalleteVisible(!colorPalleteVisible);
  };

  const selectColor = (color: string) => {
    setSelectedColor(color);
    onColorChange(id, color);
    setColorPalleteVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPalleteRef.current && !colorPalleteRef.current.contains(event.target as Node)) {
        setColorPalleteVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={style['note-card']} style={{ backgroundColor: selectedColor ?? '', borderColor: selectedColor ? '#fff' : 'inherit' }} ref={noteCardRef}>
      <div className={style['note-header']}>
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={handleTitleChange}
            className={style['note-title']}
            placeholder="Título"
          />
        ) : (
          <span className={style['note-title']}>{title}</span>
        )}
        <button onClick={() => onFavoriteToggle(id)} className={style['favorite-button']}>
          {isFavorite ? <MdOutlineStar className={style['favorite-button_checked']} /> : <MdOutlineStarBorder />}
        </button>
      </div>
      <div className={style['note-content__container']}>
        {isEditing ? (
          <textarea
            className={style['note-content']}
            value={editedContent}
            onChange={handleContentChange}
            placeholder="Escreva aqui sua nota..."
          />
        ) : (
          <p className={style['note-content']}>{content}</p>
        )}
      </div>
      <div className={style['note-actions']}>
        <div className={style['note-actions__edit-actions']}>
          {isEditing ? (
            <>
              <button onClick={saveChanges} className={style['save-button']}><MdCheck /></button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className={style['edit-button']}><MdOutlineModeEdit /></button>
          )}
          <button onClick={toggleColorPallete} className={style['color-button']}>
            <img src="/images/icons/paint_icon.png" alt="Edit Icon" />
          </button>
          {colorPalleteVisible && (
            <div className={`${style['color-pallete']} ${useSmallGrid ? style['color-pallete--small'] : ''}`} ref={colorPalleteRef}>
              {colors.map((color) => (
                <div
                  key={color}
                  className={style['color-circle']}
                  style={{ backgroundColor: color }}
                  onClick={() => selectColor(color)}
                />
              ))}
            </div>
          )}
        </div>
        <div className={style['note-actions__delete-actions']}>
          <button onClick={() => onDelete(id)} className={style['delete-button']}><MdOutlineClose /></button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
