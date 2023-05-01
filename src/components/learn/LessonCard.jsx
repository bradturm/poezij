import React, { useState, useContext } from "react";
import styles from "../../css/LessonCard.module.css";
import { config } from '../../config';

function LessonCard({

    lesson,
    index,
    setLessonShown,
    selectedLessonID,
    setSelectedLessonID,
    setLessonSlideShown

}) {

    const baseUrl = `${config.apiUrl}`;
    const path = baseUrl + "/lessons/images/lesson" + lesson.lesson_id + ".jpg";

    const [done, setDone] = useState([1, 0, 1, 1, 0, 0, 1, 1, 1])

    const handleLessonClick = (i) => {
        setSelectedLessonID(i + 1);
        setLessonShown(true)
        setLessonSlideShown(true)
    };

    const handlePageClick = (e) => { console.log("lesson page tick clicked" + e) };
    return (
        <div style={{ gridArea: 'l' + lesson.lesson_id }} >
            <div className={`${styles.container}`} onClick={() => handleLessonClick(index)}>
                <div className={`${styles.cta}`}>
                    <img src={path} />
                    <div className={`${styles.text}`}>
                        <div className={`${styles.cover}`}>
                            <h2>{lesson.title_fy}</h2>
                            <p>{lesson.short_desc_fy}</p>
                        </div>
                    </div>
                    <div>
                        <h1 className={`${styles.lesson_num}`}>{lesson.lesson_id}</h1>
                    </div>
                    <div>
                        <p className={`${styles.lesson_level}`}>
                            {(lesson.lesson_id <= 3) && 'novice'}
                            {(lesson.lesson_id > 3 && lesson.lesson_id <= 6) && 'apprentice'}
                            {(lesson.lesson_id > 6 && lesson.lesson_id <= 9) && 'artisan'}
                            {(lesson.lesson_id > 9 && lesson.lesson_id <= 12) && 'master'}
                        </p>
                    </div>
                    <div>
                        <div className={`${styles.lesson_lock_star}`}>
                            {(lesson.lesson_id <= 3) &&
                                <img alt="" className={`${styles.lock_star_img}`} src="assets/images/star-white.svg" />}
                            {(lesson.lesson_id === 4) &&
                                <img alt="" className={`${styles.lock_star_img}`} src="assets/images/star-half-white.svg" />}
                            {(lesson.lesson_id > 4 && lesson.lesson_id <= 6) &&
                                <img alt="" className={`${styles.lock_star_img}`} src="assets/images/lock-open-white.svg" />}
                            {(lesson.lesson_id > 6 && lesson.lesson_id <= 9) &&
                                <img alt="" className={`${styles.lock_star_img}`} src="assets/images/lock-closed-white.svg" />}
                            {(lesson.lesson_id > 9 && lesson.lesson_id <= 12) &&
                                <img alt="" className={`${styles.lock_star_img}`} src="assets/images/lock-closed-white.svg" />}
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <div className={styles['lesson-progress-container']}>
                    <nav>
                        <ul className={styles['lesson-progress']} >
                            {done.map((page, i) => (

                                <li key={i}
                                    className={`${styles['page-item']}`} >
                                    <span onClick={() => handlePageClick(i)} className={styles['poem_btn']}>
                                        {page === 1 ? <img alt="" src="assets/images/tick.svg" /> : <img alt="" src="assets/images/no-tick.svg" />}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default LessonCard;