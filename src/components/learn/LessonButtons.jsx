
import React from "react";
import { AppContext } from "../../context/AppContext";

import { accountService } from '../../services/account-service';

import styles from "../../css/Poems.module.css";

export default function LessonButtons({

    searchShown,
    setSearchShown,
    contentsShown,
    setContentsShown,
    notesShown,
    setNotesShown,
    setLessonShown

}) {

    const user = accountService.userValue;

    const toggleShowTutorNotes = () => { setNotesShown(!notesShown) };
    const toggleShowSearch = () => { setSearchShown(!searchShown); setContentsShown(false); };
    const toggleShowContents = () => { setContentsShown(!contentsShown); setSearchShown(false); };
    const hideLessonPage = () => { setLessonShown(false) };

    return (
        <div className={styles['lesson-button-bar']}>

            {user?.role === "Admin" &&
                <div onClick={toggleShowTutorNotes} className={styles['poem_btn']}>
                    <img className={notesShown ? styles['on'] : styles['off']} alt="" src="assets/images/hide-tutor-notes.svg" />
                    <img className={notesShown ? styles['off'] : styles['on']} alt="" src="assets/images/tutor-notes.svg" />
                </div>
            }
            <div onClick={toggleShowContents} className={styles['poem_btn']}>
                <img className={contentsShown ? styles['on'] : styles['off']} alt="" src="assets/images/hide-contents.svg" />
                <img className={contentsShown ? styles['off'] : styles['on']} alt="" src="assets/images/contents.svg" />
            </div>
            <div onClick={toggleShowSearch} className={styles['poem_btn']}>
                <img className={searchShown ? styles['on'] : styles['off']} alt="" src="assets/images/hide-search.svg" />
                <img className={searchShown ? styles['off'] : styles['on']} alt="" src="assets/images/search.svg" />
            </div>
            <div onClick={hideLessonPage} className={styles['poem_btn']}>
                <img alt="" src="assets/images/show-lessons.svg" />
            </div>
        </div >
    );
}


