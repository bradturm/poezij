import React, { useState, useEffect, useContext } from "react";

import { AppContext } from "../../context/AppContext";

import LessonCard from './LessonCard';
import LessonSlide from './LessonSlide'

import { lessonService } from '../../services/lesson-service';
import { accountService } from '../../services/account-service';

import styles from "../../css/Learn.module.css";

export default function LearnSlide({

    lesson,

}) {

    const [lessonSlideShown, setLessonSlideShown] = useState(false);

    const [lessonShown, setLessonShown] = useState(false);
    const [paged, setPaged] = useState(false);
    const user = accountService.userValue;

    const context = useContext(AppContext);

    useEffect(() => {
        if (user?.id) {
            lessonService.getList(user.id).then(x => context.setLessonList(x));
        }
        lessonService.getTypes().then(x => context.setLessonTypes(x));
        lessonService.getThemes().then(x => context.setLessonThemes(x));
        lessonService.getLevels().then(x => context.setLessonLevels(x));

    }, [context.setLessonList, context.setLessonTypes, context.setLessonThemes, context.setLessonLevels, user.id]);

    return (
        <>
            {lessonShown &&
                <div className={`${styles.lesson_container}`} >
                    <LessonSlide
                        selectedLesson={context.selectedLesson}
                        poet={context.poet}
                        lesson={lesson}
                        setLessonShown={setLessonShown}

                    />
                </div>
            }
            <div className={`${styles.lessons_container}`} >
                {context.lessonList.map((lesson, index) => (
                    <LessonCard
                        key={index}
                        index={index}
                        lesson={lesson}
                        setLessonShown={setLessonShown}
                        setSelectedLessonID={context.setSelectedLessonID}
                        setLessonSlideShown={setLessonSlideShown}
                    />
                ))}
            </div>
        </>
    )
}