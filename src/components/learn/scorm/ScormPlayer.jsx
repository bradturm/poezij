import { useState, useCallback, useEffect } from "react";
import Scorm from '../../Scorm';

import styles from "./PoemList.module.css";

function ScormPlayer({

    lessonList,
    setLessonList,
    selectedLesson,
    setSelectedLesson,
    scormPlayerShown,
    setScormPlayerShown,
    selectedLessonID

}) {

    const [closing, setClosing] = useState(false);

    const keyEscape = useCallback(
        (event) => {
            if (event.keyCode === 27) {
                setScormPlayerShown(false);
            }
        }, [setScormPlayerShown]
    );

    useEffect(() => {
        document.addEventListener("keydown", keyEscape, true);
        return () => {
            document.removeEventListener("keydown", keyEscape, false);
        };
    });

    const handleCloseClick = () => {
        console.log("Do something here to save lesson progress before dismissing ScormPlayer");
        setClosing(true);
        // setScormPlayerShown(false);
    };

    return (
        <>
            {scormPlayerShown &&
                <div>
                    <div className={`${styles.popup_background}`} />
                    <div className={`${styles.poem_list_popup}`}>
                        <div className={styles.modalHeader}>
                            <h5 className={styles.heading}>View Lesson</h5>
                        </div>
                        <button className={styles.closeBtn} onClick={handleCloseClick}>
                            <img className={styles.close_btn} alt="" src="assets/images/close.svg" />
                        </button>
                        <div className={`${styles.scorm_container_outer}`} >
                            <div className={`${styles.scorm_container_inner}`} >
                                <Scorm
                                    selectedLessonID={selectedLessonID}
                                    scormPlayerShown={scormPlayerShown}
                                    setScormPlayerShown={setScormPlayerShown}
                                    closing={closing}
                                    setClosing={setClosing}
                                    lessonList={lessonList}
                                    setLessonList={setLessonList}
                                    selectedLesson={selectedLesson}
                                    setSelectedLesson={setSelectedLesson}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ScormPlayer;
