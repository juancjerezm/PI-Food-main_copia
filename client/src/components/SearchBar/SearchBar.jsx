import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByTitle } from "../../actions/index";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  //----------------------------------------------------------------
  function handlerInputSearch(e) {
    e.preventDefault();
    setTitle(e.target.value);
    console.log(title);
  }

  function handlerSubmit(e) {
    e.preventDefault();
    dispatch(getRecipesByTitle(title));
    setTitle("");
  }
  //----------------------------------------------------------------
  return (
    <div className={styles.searchBarContainer}>
      <input
        
        type="text"
        placeholder="Search by title..."
        value={title}
        onChange={(e) => handlerInputSearch(e)}
      />

      <button type="submit" onClick={(e) => handlerSubmit(e)}>
        Search
      </button>
    </div>
  );
};
export default SearchBar;
