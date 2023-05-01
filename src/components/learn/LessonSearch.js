import React, { useState, useRef } from "react";
import SearchResults from "./SearchResults";
import styles from "../../css/PoemList.module.css";

export default function Search({

  searchShown,
  show,
  hide

}) {

  const [searchTerm, setSearchTerm] = useState("");
  const inputBox = useRef();

  //set the search term
  const searchHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  //clear the search input - IS THIS EVER USED?
  const clearInput = () => {
    inputBox.current.value = "";
  };

  return (
    <>
      <div className={`${searchShown ? styles.sideSearchOpen : styles.sideSearchClosed}`} onFocus={show}>
        {searchShown && (
          <>
            <div className={styles.sideContentsHeader}>
              <span>
                <input
                  className={styles.searchInput}
                  ref={inputBox}
                  autoFocus={inputBox}
                  id="search"
                  type="text"
                  placeholder="What are you looking for?"
                  onChange={searchHandler}
                />
              </span>
              <span onClick={hide}>
                <button className={styles.closeBtn} onClick={hide}>
                  <img className={styles.close_btn} alt="" src="assets/images/close.svg" />
                </button>
              </span>
            </div>
            <SearchResults
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              clearInput={clearInput}
              hide={hide}
            />
          </>
        )}
      </div>
    </>
  );
}
