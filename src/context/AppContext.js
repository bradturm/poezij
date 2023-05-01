import React, { createContext, useState, useEffect } from "react";
import cookies from 'js-cookie';

//import { lessonList } from "../data/LessonList";

import { poemService } from '../services/poem-service';
import { lessonService } from '../services/lesson-service';
import { alertService } from '../services/alert-service';


const AppContext = createContext();

function AppProvider(props) {

  const [poemList, setPoemList] = useState([]);
  const [types, setTypes] = useState([]);
  const [themes, setThemes] = useState([]);
  const [levels, setLevels] = useState([]);
  const [lineTypes, setLineTypes] = useState([]);
  const [selectedPoemID, setSelectedPoemID] = useState(0);
  const [selectedPoem, setSelectedPoem] = useState(null);
  const [poetDetails, setPoetDetails] = useState(null);
  const [savePoem, setSavePoem] = useState("ask");

  const [selectedPoemDirty, setSelectedPoemDirty] = useState(false);
  const [selectedPoemDirtyNotificationShown, setSelectedPoemDirtyNotificationShown] = useState(false);
  const [editingCommentaryFY, setEditingCommentaryFY] = useState(false);
  const [editingCommentaryNL, setEditingCommentaryNL] = useState(false);

  const [lessonList, setLessonList] = useState([]);
  const [lessonTypes, setLessonTypes] = useState([]);
  const [lessonThemes, setLessonThemes] = useState([]);
  const [lessonLevels, setLessonLevels] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedLessonID, setSelectedLessonID] = useState(null);
  const [selectedLessonDirty, setSelectedLessonDirty] = useState(null);

  const [lang, setLang] = useState("");
  const [poet, setPoet] = useState("");
  const [moreFrom, setMoreFrom] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(1);

  // may not be needed after refactoring
  //const [currentActivity, setCurrentActivity] = useState([]);

  //const [searchLineResults, setSearchLineResults] = useState([]);




  // const [searchSynonyms, setSearchSynonyms] = useState(true);
  // const [searchWord, setSearchWord] = useState("");
  // const [termsPopupShown, setTermsPopupShown] = useState(false);


  //old ones
  const [checkedState, setCheckedState] = useState(new Array(lessonList.length).fill(false)); // USE FOR COMPLETED ACTIVITIES (SLIDES)
  const [index, setIndex] = useState();

  const [total, setTotal] = useState();
  const [quizComplete, setQuizComplete] = useState(false);
  const [progress, setProgress] = useState();
  const [courseProgress, setCourseProgress] = useState(0);
  //

  function getPoem(id) {
    poemService.getById(id)
      .then((poem) => {
        if ((poem.poem_id === id)) {
          setSelectedPoem(poem);
          setSelectedPoemDirty(false);
          setEditingCommentaryFY(false);
          setEditingCommentaryNL(false);
          setSavePoem("ask");
        }
        let count = 0;
        for (let i = 0; i < poemList.length; i++) {
          if (poem.poet_id === poemList[i].poet_id) {
            count++;
          }
        }
        setMoreFrom(false);
        if (count > 1) {
          setMoreFrom(true);
        }
        count = 0;
      })
  }

  const replaceSelectedPoem = () => {
    console.log("in replace selected poem")
    console.log("selected poem is " + JSON.stringify(selectedPoem));
    poemService.update(selectedPoem.poem_id, selectedPoem)
      .then(() => {
        setSelectedPoemDirty(false);
        setEditingCommentaryFY(false);
        setEditingCommentaryNL(false);
        alertService.success('Update successful', { keepAfterRouteChange: true });
      })
      .then(getPoem(selectedPoemID))
      .catch(error => {
        alertService.error(error);
      });
  }


  useEffect(() => {
    const currLang = cookies.get('i18next') || 'en';
    setLang(currLang);
  }, []);

  useEffect(() => {  //using the poem list, filter, search or other means, the user wants to display a new poem.
    console.log("selectedPoemID is " + selectedPoemID)
    if (selectedPoemID !== 0) {
      if (selectedPoemDirty) {  // if poem has been edited and has unsaved changes, show 'save, don't save dialog.
        setSelectedPoemDirtyNotificationShown(true);
        //    setNewSelectedPoemID(selectedPoemID); // save the ID of the poem the user is navigating to.
        return
      }

      getPoem(selectedPoemID);  // if any changes have been saved (poem not dirty), just replace the old poem.
    }
  }, [selectedPoemID]);

  useEffect(() => { // the poem was dirty and the user clicked either to save the changes or discard them.
    console.log("in AppContext useEffect, savePoem is " + savePoem);
    if (savePoem === "ask")
      return;
    if (savePoem === "yes") {
      console.log("in savepoem is yes, selectedPoem is " + selectedPoem.poem_id);
      replaceSelectedPoem();
    }
    else
      getPoem(selectedPoemID);
  }, [savePoem]);

  /*
    useEffect(() => {
  
      if (selectedPoemID !== 0) {
        console.log("useEffect runs in AppContext")
        poemService.getById(selectedPoemID)
          .then((poem) => {
            if ((poem.poem_id === selectedPoemID)) {
              setSelectedPoem(poem);
            }
            
            setPoet(poem.first_names.trim() +
              ' ' +
              ((poem.prefix) ? poem.prefix + ' ' : '')
              + poem.last_name);
  
            let count = 0;
            for (let i = 0; i < poemList.length; i++) {
              if (poem.poet_id === poemList[i].poet_id) {
                count++;
              }
            }
            setMoreFrom(false);
            if (count > 1) {
              setMoreFrom(true);
            }
            count = 0;
          })
      }
      //  }, [selectedPoemID, poemList]); // if include poemList, same poem always fetched again. TO BE FIXED
    }, [selectedPoemID]);
  */

  function test() {

    console.log("gets to test")
    console.log("selectedPoem in test is " + selectedPoem);
    console.log("levels in test are " + JSON.stringify(levels));
  }

  //Generate an index of slides
  function handleIndex() {
    // console.log("handleIndex in context useEffect ")
    const slideTitles = [...document.querySelectorAll(".slide-title")].slice(1, -1);
    //  console.log("slideTitles in context useEffect are " + JSON.stringify(slideTitles));
    const index = slideTitles.map((title, i) => `${title.innerText}`);
    setIndex(index);
  }
  //check completion status
  function handleChange(position) {
    const updatedCheckedState = checkedState.map((item, index) => (index === position ? !item : item));
    setCheckedState(updatedCheckedState);
    localStorage.setItem("checked", JSON.stringify(updatedCheckedState));
  }
  //Updates slide index on slide change
  function onSlideChange(previous, next) {
    let currentSlide = next;
    setCurrentSlide(currentSlide);
  }
  //Recalculates progress bar percentage on every slide change
  function toggleProgress() {
    setTotal(document.querySelectorAll(".slide-title").length - 3);
    let progressBar = (currentSlide / total) * 100;
    setProgress(progressBar);
  }
  //Sets quiz state to complete
  function onQuizCompletion(obj) {
    setQuizComplete(true);
  }

  const saveSelectedPoemToDb = () => {

    poemService.update(selectedPoemID, selectedPoem)
      .then(() => {
        alertService.success('Update successful', { keepAfterRouteChange: true });
      })
      .catch(error => {
        alertService.error(error);
      });
  }

  const saveSelectedLessonToDb = () => {

    lessonService.update(selectedLessonID, selectedLesson)
      .then(() => {
        alertService.success('Update successful', { keepAfterRouteChange: true });
      })
      .catch(error => {
        alertService.error(error);
      });
  }


  //Export everything
  const values = {
    LessonList: lessonList,
    checkedState: checkedState,
    index: index,
    currentSlide: currentSlide,
    progress: progress,
    total: total,
    quizComplete: quizComplete,
    courseProgress: courseProgress,
    setCourseProgress: setCourseProgress,
    handleIndex: handleIndex,
    handleChange: handleChange,
    setCurrentSlide: setCurrentSlide,
    onSlideChange: onSlideChange,
    onQuizCompletion: onQuizCompletion,
    toggleProgress: toggleProgress,
    setCheckedState: setCheckedState,


    setEditingCommentaryFY: setEditingCommentaryFY,
    setEditingCommentaryNL: setEditingCommentaryNL,
    editingCommentaryFY: editingCommentaryFY,
    editingCommentaryNL: editingCommentaryNL,
    selectedPoemDirtyNotificationShown: selectedPoemDirtyNotificationShown,
    setSelectedPoemDirtyNotificationShown: setSelectedPoemDirtyNotificationShown,
    selectedPoemDirty: selectedPoemDirty,
    setSelectedPoemDirty: setSelectedPoemDirty,
    savePoem: savePoem,
    setSavePoem: setSavePoem,

    selectedLessonDirty: selectedLessonDirty,
    setSelectedLessonDirty: setSelectedLessonDirty,

    test: test,

    poemList: poemList,
    setPoemList: setPoemList,
    types: types,
    setTypes: setTypes,
    themes: themes,
    setThemes: setThemes,
    levels: levels,
    setLevels: setLevels,
    lineTypes: lineTypes,
    setLineTypes: setLineTypes,
    selectedPoemID: selectedPoemID,
    setSelectedPoemID: setSelectedPoemID,
    selectedPoem: selectedPoem,
    setSelectedPoem: setSelectedPoem,
    lessonList: lessonList,
    setLessonList: setLessonList,
    lessonTypes: lessonTypes,
    setLessonTypes: setLessonTypes,
    lessonThemes: lessonThemes,
    setLessonThemes: setLessonThemes,
    lessonLevels: lessonLevels,
    setLessonLevels: setLessonLevels,
    selectedLesson: selectedLesson,
    setSelectedLesson: setSelectedLesson,
    selectedLessonID: selectedLessonID,
    setSelectedLessonID: setSelectedLessonID,
    saveSelectedPoemToDb: saveSelectedPoemToDb,
    saveSelectedLessonToDb: saveSelectedLessonToDb,
    // currentActivity, setCurrentActivity, // may not be needed after refactoring
    lang: lang,
    setLang: setLang,
    poet: poet,
    setPoet: setPoet,
    moreFrom: moreFrom,
    setMoreFrom: setMoreFrom,
    poetDetails: poetDetails,
    setPoetDetails: setPoetDetails

  };

  return <AppContext.Provider value={values}>{props.children}</AppContext.Provider>;
}

export { AppContext, AppProvider };
