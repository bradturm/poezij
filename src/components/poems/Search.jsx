import React, { useState, useEffect, useRef } from "react";
import ToggleSwitch from "../common/ToggleSwitch";

import { poemService } from '../../services/poem-service';

import styles from "../../css/PoemList.module.css";

function Search({

    searchShown,
    setSearchShown,
    setSelectedPoemID,
    setCurrentPage

}) {
    const inputRef = useRef();

    const [word, setWord] = useState("");
    const [searchSynonyms, setSearchSynonyms] = useState(true);
    const [searchWord, setSearchWord] = useState("");
    const [searchLineResults, setSearchLineResults] = useState([]);


    useEffect(() => {
        if (searchShown) {
            inputRef.current.focus();
        }
    }, [searchShown]);

    useEffect(() => {
        if (searchWord) {
            poemService.getSearchResults(searchWord)
                .then((results) => {
                    setSearchLineResults(results);
                })
        }
    }, [searchWord]);

    const handleCloseClick = () => {
        setSearchShown(false);
    };

    const handleUseSynonymsChange = () => {

        console.log("changed the use Synonyms checkbox ")
        setSearchSynonyms(!searchSynonyms);
        //  checked = props.searchSynonyms;
    };

    const handleSearchClick = () => {

        console.log("search button clicked with word: " + word);
        //   props.setSearchSynonyms(!props.searchSynonyms);
        setSearchWord(word);
        //searchSynonyms;
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            setSearchWord(word);
        }
    };

    const handleResultClick = (i) => {
        console.log("clicked on the results list: " + i);
        setSelectedPoemID(i);
        // setSelectedPoem(i);
        setCurrentPage(1);
        setSearchShown(false);
    };

    return (
        <>
            {searchShown &&
                <div>
                    <div className={`${styles.popup_background}`} />
                    <div className={`${styles.search_popup}`}>
                        <div className={styles.modalHeader}>
                            <h5 className={styles.heading}>Search</h5>
                        </div>

                        <button className={styles.closeBtn} onClick={() => handleCloseClick()}>
                            <img className={styles.close_btn} alt="" src="assets/images/close.svg" />
                        </button>
                        {/*   <form>*/}

                        <div className={styles.search_container}>
                            <input type="text"
                                className={styles.search_input}
                                placeholder="Search..."
                                spellCheck="false"
                                ref={inputRef}
                                onChange={(e) => {
                                    setWord(e.target.value);
                                }}
                                onKeyDown={handleKeyDown} />
                            <div className={styles.search_icon_wrapper} onClick={handleSearchClick}>
                                <img className={styles.search_icon} alt="" src="assets/images/search.svg" />
                            </div>
                        </div>

                        {/*  </form>*/}
                        <ToggleSwitch
                            id="searchSynonymsSwitch"
                            small
                            disabled={false}
                            checked={searchSynonyms}
                            onChange={handleUseSynonymsChange}
                        />

                        <div className={`${styles.popup_container_outer}`} >

                            <div className={`${styles.popup_container_inner}`} >

                                {searchLineResults &&

                                    searchLineResults.map((result, i) => (
                                        <div key={i} className={`${styles.result_wrapper}`} onClick={() => handleResultClick(result.poem_id)}>
                                            {result.lines.map((line, j) => (
                                                <div key={j} className={`${styles.search_result_line}`}>

                                                    {/*                   <div className={`${styles.result_line}`} dangerouslySetInnerHTML={{ __html: line.line_fry }} />   */}
                                                    <div className="search-result-line" dangerouslySetInnerHTML={{ __html: line.line_fry }} />
                                                </div>
                                            ))}
                                            <div className={`${styles.result_details}`}><span className={`${styles.details_italic}`}>On line {result.word_on_line} in </span><span>{result.poem_title_fry} ({result.poem_title_nl})</span><span className={`${styles.details_italic}`}> by {result.poet_name}</span></div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}


export default Search;