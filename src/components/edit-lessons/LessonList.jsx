import React, { useContext } from "react";

import { AppContext } from "../../context/AppContext";

import styles from "../../css/PoemList.module.css";

function LessonList({

    lessonList,
    lessonsPopupShown,
    selectedLessonID,
    setSelectedLessonID,
    setLessonsPopupShown

}) {

    const context = useContext(AppContext);

    const handleListClick = (i) => {
        if (context.selectedLessonID !== i + 1) {
            context.setSelectedLessonID(i + 1);
        }
        setLessonsPopupShown(false);
    };

    const handleCloseClick = () => {
        setLessonsPopupShown(false);
    };

    return (
        <>
            {lessonsPopupShown &&
                <div>
                    <div className={`${styles.popup_background}`} />
                    <div className={`${styles.poem_list_popup}`}>
                        <div className={styles.modalHeader}>
                            <h5 className={styles.heading}>Select a Lesson</h5>
                        </div>
                        <button className={styles.closeBtn} onClick={() => handleCloseClick()}>
                            <img className={styles.close_btn} alt="" src="assets/images/close.svg" />
                        </button>
                        <div className={`${styles.popup_container_outer}`} >
                            <div className={`${styles.popup_container_inner}`} >

                                {lessonList.map((lesson, i) => (

                                    <div key={i} className={`${styles.poem_wrapper}`} onClick={() => handleListClick(i)}>

                                        <div className={styles['poem-num']} >
                                            <p>{lesson.lesson_id}</p>
                                        </div>
                                        <div className={styles['poem-titles']}>
                                            <p>
                                                <span dangerouslySetInnerHTML={{ __html: lesson.title_fry }} />&nbsp;(
                                                <span dangerouslySetInnerHTML={{ __html: lesson.title_nl }} />)&nbsp;&nbsp;&nbsp;
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default LessonList;