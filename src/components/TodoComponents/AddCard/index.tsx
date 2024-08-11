import React, { useState } from 'react';
import { MdSave, MdOutlineStarBorder, MdOutlineStar } from "react-icons/md";
import style from './AddCard.module.scss';

interface AddCardProps {
  onAddCard: (title: string, content: string, isFavorite: boolean) => void;
}

const AddCard: React.FC<AddCardProps> = ({ onAddCard }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const resetData = () => {
    setTitle('');
      setContent('');
      setIsFavorite(false);
  }

  const handleAddCard = () => {
    if (title.trim() && content.trim()) {
      onAddCard(title, content, isFavorite);
      resetData()
      return;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddCard();
    }
  }

  return (
    <div className={style['add-card']}>
      <div className={style['note-header']}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={style['note-title']}
          onKeyDown={handleKeyDown}
          placeholder="Título"
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={style['favorite-button']}
        >
          {isFavorite ? <MdOutlineStar className={style['favorite-button_checked']} /> : <MdOutlineStarBorder />}
        </button>
      </div>
      <div className={style['note-content__container']}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={style['note-content']}
          placeholder="Criar nota..."
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className={style['check-button-container']}>
        <button onClick={handleAddCard} className={style['check-button']}>
          <MdSave />
        </button>
      </div>
    </div>
  );
};

export default AddCard;