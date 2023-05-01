import React, { useEffect, useContext } from "react";

import { AppContext } from "../../context/AppContext";

import styles from "../../css/PoemList.module.css";

export default function LessonContents({

  contentsShown,
  setContentsShown,
  slideSelect

}) {

  const context = useContext(AppContext);

  useEffect(() => {
    if (context.selectedLesson) { }
    //   console.log("contents in LessonContents is " + JSON.stringify(context.selectedLesson))
  }, []);

  const hideContents = () => {
    setContentsShown(false);
  };

  /*
   {/* 
  context.selectedLesson.contents.map(title_nl, i) => ( 
         context.selectedLesson.contents.map(((context.lang === 'fy' ? title_fy: title_nl), i) => ( 
  
         context.selectedLesson.contents.map((title, i) => (
  
  */

  return (
    <>

      <div className={` ${contentsShown ? styles.sideContentsOpen : styles.sideContentsClosed} `}>
        {contentsShown &&
          <>
            <div className={styles.sideContentsHeader}>
              <span>Lesson {context.selectedLesson?.lesson_id} - {context.lang === 'fy' ?
                context.selectedLesson?.title_fy : context.selectedLesson?.title_nl}</span>
              <span onClick={hideContents}>
                <button className={styles.closeBtn} onClick={hideContents}>
                  <img className={styles.close_btn} alt="" src="assets/images/close.svg" />
                </button>
              </span>
            </div>
            <div className={styles.sideContentsList}>
              {context.index &&

                context.selectedLesson.contents.map((content, i) => (
                  <div
                    className={styles.sideContentsListItem}
                    key={i}
                    onClick={() => {
                      context.setCurrentSlide(i);
                      slideSelect(i);
                      setContentsShown(false);
                    }}
                  >
                    <div>
                      {content.lesson_order}  {context.lang === 'fy' ? content.title_fy : content.title_nl}
                    </div>
                  </div>
                ))}
            </div>
          </>
        }
      </div>
    </>
  );
}
