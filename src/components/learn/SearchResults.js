
import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import styles from "../../css/PoemList.module.css";

export default function SearchResults({

  searchTerm,
  setSearchTerm,
  clearInput,
  hide

}) {

  const context = useContext(AppContext);

  const { contents } = context.selectedLesson;

  // highlight the matched word in the result

  const highlightResult = (result) => {
    return result.split(new RegExp(`(${searchTerm})`, `gi`)).map((piece, index) => {
      return (
        <span
          key={index}
          style={{
            //if piece is equal to the search term style it
            background: piece.toLowerCase() === searchTerm.toLocaleLowerCase() ? "GOLD" : "TRANSPARENT",
            padding: "0.15rem 0rem",
            borderRadius: "0.15rem",
          }}
        >
          {piece}
        </span>
      );
    });
  };

  // called from findMatch.
  // checks if the block of text matches the search string
  // and returns a result object if it does.

  function createResult(obj, text) {
    if (text.toLowerCase().includes(searchTerm.toLowerCase())) {
      const newObj = { ...obj };
      newObj.text = text.replace(/(<([^>]+)>)/ig, ''); // strip out all HTML tags
      return newObj
    }
    return false
  }

  // called from findMatches.
  // checks the title and content blocks in a lesson page for matches.

  function findMatch(content) {
    let objArr = []
    let obj = {}
    obj.title = context.lang === "nl" ? content.title_nl : content.title_fy;
    obj.order = content.lesson_order;

    let text = context.lang === "nl" ? content.title_nl : content.title_fy;
    let result = createResult(obj, text);
    if (result) { objArr.push(result); }

    text = context.lang === "nl" ? content.pre_text_nl : content.pre_text_fy;
    result = createResult(obj, text);
    if (result) { objArr.push(result); }

    text = context.lang === "nl" ? content.post_text_nl : content.post_text_fy;
    result = createResult(obj, text);
    if (result) { objArr.push(result); }

    // TO DO - DELVE DEEPER INTO CONTENT TO LOOK FOR MATCHES, IN IMAGE CAPTIONS ETC.
    // if (contents[j].hasOwnProperty('post_text_fy')) {

    return objArr
  }

  // called from renderSearchItems.
  // checks all the content in the lesson and returns an array of match results.

  function findMatches(contents) {

    let resArr = []
    for (var i = 0; i < contents.length; i++) {
      const matchArr = findMatch(contents[i])
      for (var j = 0; j < matchArr.length; j++) {
        resArr.push(matchArr[j]);
      }
    }
    return resArr
  }

  // render all the search results

  const renderSearchItems = () => {

    if (searchTerm.length < 3)  //only show results if user has entered at least 3 characters
      return

    const results = findMatches(contents);

    let ResultsObjArr = [];

    // iterate through all the blocks of text.
    for (let i = 0; i < results.length; i++) {

      // split the string with the matched word into words. 
      if (results[i].text) {
        let wordsArr = results[i].text.split(' ');

        // go through the array of words and find the word that matches
        for (let k = 0; k < wordsArr.length; k++) {
          let newRes = "";
          if (wordsArr[k].toLowerCase().includes(searchTerm.toLowerCase())) {

            // take range from 10 words before and 15 words after the matched word,
            // or if it is close to the start or end, whatever is available.
            newRes = "..." + [...wordsArr].slice(k - 10 > 0 ? k - 10 : 0, k + 15 < wordsArr.length ? k + 15 : wordsArr.length).join(' ');

            // add result along with title of slide to the results array.
            let resObj = {};
            resObj.title = results[i].title;
            resObj.order = results[i].order;
            resObj.result = newRes;
            ResultsObjArr.push(resObj);
          }
        }
      }
    }

    return (
      ResultsObjArr.map((item, index) => {
        return (
          <div
            key={index}
            className={styles.searchResult}
            onClick={() => {
              if (item.order % 2 === 0) {  // number is even
                context.setCurrentSlide(item.order - 1);
              } else {
                context.setCurrentSlide(item.order - 1);  // number is odd
              }

              //setSearchTerm("");  // TAKEN OUT FOR NOW - DESIRED BEHAVIOUR SHOULD BE...?
              // clearInput();
              hide();
            }}>
            <h3 style={{ padding: "1rem 0rem" }}>{highlightResult(item.title)}</h3>
            <div className={styles.searchResultText}>
              {highlightResult(item.result)}
            </div>
          </div>
        )
      })
    )
  }

  return (
    <div className={styles.sideSearchResults}>
      {!searchTerm ? <p>Try searching something above.</p> : null}
      <ul>{renderSearchItems()}</ul>
    </div>
  );
}
