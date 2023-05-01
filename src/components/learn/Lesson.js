
import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

import Quiz from './questions/Quiz';
import AudioPlayer from "../audio-player/AudioPlayer";
import Poem from "../common/poem/Poem";

import styles from "../../css/Learn.module.css";

import { accountService } from '../../services/account-service';

export default function Lesson({

    poet,
    textSelectable,
    paged,
    setPaged,
    lessonShown,

}) {

    const context = useContext(AppContext);

    const [activitiesShown, setActivitiesShown] = useState(true);
    const [searchShown, setSearchShown] = useState(false);
    const [quizResult, setQuizResult] = useState();

    const user = accountService.userValue;

    const onQuestionSubmit = (obj) => {
        //   console.log("onQuestionSubmit obj is " + JSON.stringify(obj));
        //  refFeedback.current.scrollIntoView({ behavior: 'smooth' });
    }

    const showLearnPage = () => { console.log("showLearnPage clicked") };
    const toggleShowSearch = () => { setSearchShown(!searchShown) };
    const toggleShowActivities = () => { setActivitiesShown(!activitiesShown) };

    return (
        <>
            {lessonShown &&
                <div>
                    <div className={styles['poem-page']}>

                        <div className={styles.lesson_page_grid}>

                            {!context.selectedPoemID &&
                                <div className={styles.no_poem_grid}>

                                </div>
                            }

                            <Poem
                                selectedPoemID={context.selectedPoemID}
                                selectedPoem={context.selectedPoem}
                                paged={paged}
                                setPaged={setPaged}
                                textSelectable={textSelectable}
                                poet={poet}
                                fullHeight={true}
                            />

                            <div className={styles['audio-player']}>
                                <AudioPlayer
                                    selectedPoem={context.selectedPoem}
                                    lang={context.lang}
                                />
                            </div>

                            <div className={styles['button-bar2']}>

                                <div onClick={showLearnPage} className={styles['poem_btn']}>
                                    <img alt="" src="assets/images/show-lessons.svg" />
                                </div>
                                <div onClick={toggleShowSearch} className={styles['poem_btn']}>
                                    <img className={searchShown ? styles['on'] : styles['off']} alt="" src="assets/images/search.svg" />
                                    <img className={searchShown ? styles['off'] : styles['on']} alt="" src="assets/images/search.svg" />
                                </div>
                                <div onClick={toggleShowActivities} className={styles['poem_btn']}>
                                    <img className={activitiesShown ? styles['on'] : styles['off']} alt="" src="assets/images/show-activities.svg" />
                                    <img className={activitiesShown ? styles['off'] : styles['on']} alt="" src="assets/images/show-activities.svg" />
                                </div>

                            </div>

                            <div className={styles.sidebar}>
                                <div className={styles.activities}>
                                    <Quiz
                                        currentActivity={context.currentActivity}
                                        setCurrentActivity={context.setCurrentActivity}
                                        //shuffle
                                        showInstantFeedback={true}
                                        continueTillCorrect={true}
                                        onComplete={setQuizResult}
                                        //onQuestionSubmit={(obj) => console.log('user question results:', obj)}
                                        onQuestionSubmit={onQuestionSubmit}
                                        // disableSynopsis={false}
                                        revealAnswerOnSubmit={true}
                                        allowNavigation={true}
                                        showCorrectAnswer={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}