import React from "react";
import styles from "./SearchBar.module.scss";
import { FaSearch, FaTimes } from "react-icons/fa";

interface ISearchBar {
  placeholder: string;
  value: string;
  onChange: (value: string) => void; 
}

const SearchBar: React.FC<ISearchBar> = ({ placeholder, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const clearSearch = () => {
    onChange("");
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <button onClick={clearSearch}>
        {value ? <FaTimes /> : <FaSearch />}
      </button>
    </div>
  );
};

export default SearchBar;