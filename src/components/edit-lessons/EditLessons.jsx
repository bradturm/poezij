import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useTranslation } from 'react-i18next';
import StyledSelect from "../common/StyledSelect";

import styles from "../../css/EditLessons.module.css";

import { poemService } from '../../services/poem-service';
import { accountService } from '../../services/account-service';

import LessonList from "./LessonList";
import PoemTitle from "../common/poem/PoemTitle";
import Notification from "../common/Notification";
import HTMLEditor from "../HTMLEditor";

export default function EditLessons(

) {

    const context = useContext(AppContext);

    const [lessonsPopupShown, setLessonsPopupShown] = useState(false);
    const [lessonPage, setLessonPage] = useState(1);
    const [optionsTypes, setOptionsTypes] = useState([]);
    const [optionsThemes, setOptionsThemes] = useState([]);
    const [optionsLevels, setOptionsLevels] = useState([]);
    const [typeValue, setTypeValue] = useState([]);
    const [themeValue, setThemeValue] = useState([]);
    const [levelValue, setLevelValue] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);


    const [initialTitleLeftFY, setInitialTitleLeftFY] = useState("");
    const [initialTitleLeftNL, setInitialTitleLeftNL] = useState("");
    const [initialUpperTextLeftFY, setInitialUpperTextLeftFY] = useState("");
    const [initialUpperTextLeftNL, setInitialUpperTextLeftNL] = useState("");
    const [initialLowerTextLeftFY, setInitialLowerTextLeftFY] = useState("");
    const [initialLowerTextLeftNL, setInitialLowerTextLeftNL] = useState("");

    const [initialTitleRightFY, setInitialTitleRightFY] = useState("");
    const [initialTitleRightNL, setInitialTitleRightNL] = useState("");
    const [initialUpperTextRightFY, setInitialUpperTextRightFY] = useState("");
    const [initialUpperTextRightNL, setInitialUpperTextRightNL] = useState("");
    const [initialLowerTextRightFY, setInitialLowerTextRightFY] = useState("");
    const [initialLowerTextRightNL, setInitialLowerTextRightNL] = useState("");

    const [editingTitleLeftFY, setEditingTitleLeftFY] = useState(false);
    const [editingTitleLeftNL, setEditingTitleLeftNL] = useState(false);
    const [editingUpperTextLeftFY, setEditingUpperTextLeftFY] = useState(false);
    const [editingUpperTextLeftNL, setEditingUpperTextLeftNL] = useState(false);
    const [editingLowerTextLeftFY, setEditingLowerTextLeftFY] = useState(false);
    const [editingLowerTextLeftNL, setEditingLowerTextLeftNL] = useState(false);

    const [editingTitleRightFY, setEditingTitleRightFY] = useState(false);
    const [editingTitleRightNL, setEditingTitleRightNL] = useState(false);
    const [editingUpperTextRightFY, setEditingUpperTextRightFY] = useState(false);
    const [editingUpperTextRightNL, setEditingUpperTextRightNL] = useState(false);
    const [editingLowerTextRightFY, setEditingLowerTextRightFY] = useState(false);
    const [editingLowerTextRightNL, setEditingLowerTextRightNL] = useState(false);


    const [currentLessonID, setCurrentLessonID] = useState(0);

    const { t } = useTranslation();

    const user = accountService.userValue;

    const handleChangeTitleLeftFY = (data) => {
        if (editingTitleLeftFY) {
            const newContents = [...context.selectedLesson.contents];
            newContents[currentPage - 1].title_fy = data;
            context.setSelectedLesson({ ...context.selectedLesson, contents: newContents });
            context.setSelectedLessonDirty(true);
        }
        setEditingTitleLeftFY(true);
    }

    const handleChangeTitleLeftNL = (data) => {
        if (editingTitleLeftNL) {
            const newContents = [...context.selectedLesson.contents];
            newContents[currentPage - 1].title_nl = data;
            context.setSelectedLesson({ ...context.selectedLesson, contents: newContents });
            context.setSelectedLessonDirty(true);
        }
        setEditingTitleLeftNL(true);
    }

    const handleChangeUpperTextLeftFY = (data) => {
        if (editingUpperTextLeftFY) {
            const newContents = [...context.selectedLesson.contents];
            newContents[currentPage - 1].pre_text_fy = data;
            context.setSelectedLesson({ ...context.selectedLesson, contents: newContents });
            context.setSelectedLessonDirty(true);
        }
        setEditingUpperTextLeftFY(true);
    }

    const handleChangeUpperTextLeftNL = (data) => {
        if (editingUpperTextLeftNL) {
            const newContents = [...context.selectedLesson.contents];
            newContents[currentPage - 1].pre_text_nl = data;
            context.setSelectedLesson({ ...context.selectedLesson, contents: newContents });
            context.setSelectedLessonDirty(true);
        }
        setEditingUpperTextLeftNL(true);
    }

    const handleChangeLowerTextLeftFY = (data) => {
        if (editingLowerTextLeftFY) {
            const newContents = [...context.selectedLesson.contents];
            newContents[currentPage - 1].post_text_fy = data;
            context.setSelectedLesson({ ...context.selectedLesson, contents: newContents });
            context.setSelectedLessonDirty(true);
        }
        setEditingLowerTextLeftFY(true);
    }

    const handleChangeLowerTextLeftNL = (data) => {
        if (editingLowerTextLeftNL) {
            const newContents = [...context.selectedLesson.contents];
            newContents[currentPage - 1].post_text_nl = data;
            context.setSelectedLesson({ ...context.selectedLesson, contents: newContents });
            context.setSelectedLessonDirty(true);
        }
        setEditingLowerTextLeftNL(true);
    }


    const handleChangeTitleRightFY = (data) => {
        if (editingTitleRightFY) {
            const newContents = [...context.selectedLesson.contents];
            newContents[currentPage].title_fy = data;
            context.setSelectedLesson({ ...context.selectedLesson, contents: newContents });
            context.setSelectedLessonDirty(true);
        }
        setEditingTitleRightFY(true);
    }

    const handleChangeTitleRightNL = (data) => {
        if (editingTitleRightNL) {
            const newContents = [...context.selectedLesson.contents];
            newContents[currentPage].title_nl = data;
            context.setSelectedLesson({ ...context.selectedLesson, contents: newContents });
            context.setSelectedLessonDirty(true);
        }
        setEditingTitleRightNL(true);
    }

    const handleChangeUpperTextRightFY = (data) => {
        if (editingUpperTextRightFY) {
            const newContents = [...context.selectedLesson.contents];
            newContents[currentPage].pre_text_fy = data;
            context.setSelectedLesson({ ...context.selectedLesson, contents: newContents });
            context.setSelectedLessonDirty(true);
        }
        setEditingUpperTextRightFY(true);
    }
    const handleChangeUpperTextRightNL = (data) => {
        if (editingUpperTextRightNL) {
            const newContents = [...context.selectedLesson.contents];
            newContents[currentPage].pre_text_nl = data;
            context.setSelectedLesson({ ...context.selectedLesson, contents: newContents });
            context.setSelectedLessonDirty(true);
        }
        setEditingUpperTextRightNL(true);
    }
    const handleChangeLowerTextRightFY = (data) => {
        if (editingLowerTextRightFY) {
            const newContents = [...context.selectedLesson.contents];
            newContents[currentPage].post_text_fy = data;
            context.setSelectedLesson({ ...context.selectedLesson, contents: newContents });
            context.setSelectedLessonDirty(true);
        }
        setEditingLowerTextRightFY(true);
    }
    const handleChangeLowerTextRightNL = (data) => {
        if (editingLowerTextRightNL) {
            const newContents = [...context.selectedLesson.contents];
            newContents[currentPage].post_text_nl = data;
            context.setSelectedLesson({ ...context.selectedLesson, contents: newContents });
            context.setSelectedLessonDirty(true);
        }
        setEditingLowerTextRightNL(true);
    }

    // get list of poems, types, themes, levels and line types from database
    useEffect(() => {

        poemService.getList().then(x => context.setPoemList(x));
        poemService.getTypes().then(x => context.setTypes(x));
        poemService.getThemes().then(x => context.setThemes(x));
        poemService.getLevels().then(x => context.setLevels(x));
        poemService.getLineTypes().then(x => context.setLineTypes(x));

    }, [context.setPoemList, context.setTypes, context.setThemes, context.setLevels, context.setLineTypes]);

    useEffect(() => {

        if (!context.selectedLesson) { return }

        setInitialTitleLeftFY(context.selectedLesson.contents[currentPage - 1].title_fy);
        setInitialTitleLeftNL(context.selectedLesson.contents[currentPage - 1].title_nl);
        setInitialUpperTextLeftFY(context.selectedLesson.contents[currentPage - 1].pre_text_fy);
        setInitialUpperTextLeftNL(context.selectedLesson.contents[currentPage - 1].pre_text_nl);
        setInitialLowerTextLeftFY(context.selectedLesson.contents[currentPage - 1].post_text_fy);
        setInitialLowerTextLeftNL(context.selectedLesson.contents[currentPage - 1].post_text_nl);

        setInitialTitleRightFY(context.selectedLesson.contents[currentPage]?.title_fy);
        setInitialTitleRightNL(context.selectedLesson.contents[currentPage]?.title_nl);
        setInitialUpperTextRightFY(context.selectedLesson.contents[currentPage]?.pre_text_fy);
        setInitialUpperTextRightNL(context.selectedLesson.contents[currentPage]?.pre_text_nl);
        setInitialLowerTextRightFY(context.selectedLesson.contents[currentPage]?.post_text_fy);
        setInitialLowerTextRightNL(context.selectedLesson.contents[currentPage]?.post_text_nl);

    }, [currentPage]);

    useEffect(() => {

        if (!context.selectedLesson) { return }

        if (context.selectedLessonID !== currentLessonID) {
            setCurrentLessonID(context.selectedLessonID);
        }

        if (context.selectedLesson?.types) {

            let typeArr = [];
            for (let i = 0; i < context.selectedLesson.types.length; i++) {
                const type = context.selectedLesson.types[i];
                if (type.type) {
                    let typeObj = {};
                    typeObj.value = type.type;
                    typeObj.label = type.type.charAt(0).toUpperCase() + type.type.slice(1);
                    if (context.lang === "fy") {
                        typeObj.label = type.type_fy.charAt(0).toUpperCase() + type.type_fy.slice(1);
                    }
                    if (context.lang === "nl") {
                        typeObj.label = type.type_nl.charAt(0).toUpperCase() + type.type_nl.slice(1);
                    }
                    typeArr.push(typeObj);
                }
            }
            setTypeValue(typeArr);
        }

        if (context.selectedLesson?.themes) {

            let themeArr = [];
            for (let i = 0; i < context.selectedLesson.themes.length; i++) {
                const theme = context.selectedLesson.themes[i];
                if (theme.theme) {
                    let themeObj = {};
                    themeObj.value = theme.theme;

                    themeObj.label = theme.theme.charAt(0).toUpperCase() + theme.theme.slice(1);
                    if (context.lang === "fy") {
                        themeObj.label = theme.theme_fy.charAt(0).toUpperCase() + theme.theme_fy.slice(1);
                    }
                    if (context.lang === "nl") {
                        themeObj.label = theme.theme_nl.charAt(0).toUpperCase() + theme.theme_nl.slice(1);
                    }
                    themeArr.push(themeObj);
                }
            }
            setThemeValue(themeArr);
        }

        if (context.selectedLesson.level && Object.keys(context.selectedLesson.level).length !== 0) {

            let level = context.selectedLesson.level;
            if (level.level != null) {
                let levelObj = {};

                levelObj.value = level.level;
                levelObj.label = level.level_en.charAt(0).toUpperCase() + level.level_en.slice(1);
                if (context.lang === "fy") {
                    levelObj.label = level.level_fy.charAt(0).toUpperCase() + level.level_fy.slice(1);
                }
                if (context.lang === "nl") {
                    levelObj.label = level.level_nl.charAt(0).toUpperCase() + level.level_nl.slice(1);
                }
                setLevelValue(levelObj);
            }
        }
        else {
            setLevelValue(null);
        }

        if (context.themes) {
            let optionsArr = [];
            for (let i = 0; i < context.themes.length; i++) {
                const theme = context.themes[i];
                let optionObj = {};
                optionObj.value = theme.theme;
                optionObj.label = theme.theme.charAt(0).toUpperCase() + theme.theme.slice(1);
                if (context.lang === "fy") {
                    optionObj.label = theme.theme_fy.charAt(0).toUpperCase() + theme.theme_fy.slice(1);
                }
                if (context.lang === "nl") {
                    optionObj.label = theme.theme_nl.charAt(0).toUpperCase() + theme.theme_nl.slice(1);
                }
                optionObj.theme_fy = theme.theme_fy;
                optionObj.theme_nl = theme.theme_nl;
                optionsArr.push(optionObj);
            }
            setOptionsThemes(optionsArr);
        }

        if (context.types) {

            let optionsArr = [];
            for (let i = 0; i < context.types.length; i++) {
                const type = context.types[i];
                let optionObj = {};
                optionObj.value = type.type;
                optionObj.label = type.type.charAt(0).toUpperCase() + type.type.slice(1);
                if (context.lang === "fy") {
                    optionObj.label = type.type_fy.charAt(0).toUpperCase() + type.type_fy.slice(1);
                }
                if (context.lang === "nl") {
                    optionObj.label = type.type_nl.charAt(0).toUpperCase() + type.type_nl.slice(1);
                }
                optionsArr.push(optionObj);
            }
            setOptionsTypes(optionsArr);
        }

        if (context.levels && context.levels.length > 0) {

            context.levels.sort(function (a, b) { return a.level - b.level }); // sort levels in ascending order of difficulty

            let optionsArr = [];
            for (let i = 0; i < context.levels.length; i++) {
                const level = context.levels[i];
                let optionObj = {};
                optionObj.value = level.level;
                optionObj.level = level.level;
                optionObj.label = level.level_en.charAt(0).toUpperCase() + level.level_en.slice(1);
                if (context.lang === "fy") {
                    optionObj.label = level.level_fy.charAt(0).toUpperCase() + level.level_fy.slice(1);
                }
                if (context.lang === "nl") {
                    optionObj.label = level.level_nl.charAt(0).toUpperCase() + level.level_nl.slice(1);
                }
                optionsArr.push(optionObj);
            }
            // optionsArr.sort((a, b) => a.level.localeCompare(b.level));  // sort levels in ascending order
            setOptionsLevels(optionsArr);
        }


    }, [context.selectedPoem, context.lang]);

    const showLessonList = () => { setLessonsPopupShown(true) };
    const showTutorNotes = () => { console.log("show tutor notes") };

    const saveLessonToDb = () => { context.saveSelectedLessonToDb(); };

    const action1 = () => {  // don't save
        //  context.setSavePoem("no");
        //  context.setSelectedPoemDirtyNotificationShown(false);
    };
    const action2 = () => {  // save
        //    context.setSavePoem("yes");
        //    console.log(" context.savePoem is " + context.savePoem);
        //    context.setSelectedPoemDirtyNotificationShown(false);
    };

    // update the types, themes or level of the selected poem
    const handleSelectChange = (field, value) => {
        switch (field) {
            case 'types':
                setTypeValue(value);

                let poemTypes = [];
                for (let i = 0; i < value.length; i++) {
                    let typeObj = {};
                    for (let j = 0; j < value.length; j++) {
                        if (context.types[j].type === value[i].value) {
                            typeObj.type = context.types[j].type;
                            typeObj.type_fy = context.types[j].type_fy;
                            typeObj.type_nl = context.types[j].type_nl;
                        }
                    }
                    poemTypes.push(typeObj);
                }
                context.selectedPoem.types = poemTypes;  // update the types of selected poem
                break;

            case 'themes':
                setThemeValue(value);

                let poemThemes = [];
                for (let i = 0; i < value.length; i++) {
                    let themeObj = {};
                    for (let j = 0; j < value.length; j++) {
                        if (context.themes[j].theme === value[i].value) {
                            themeObj.theme = context.themes[j].theme;
                            themeObj.theme_fy = context.themes[j].theme_fy;
                            themeObj.theme_nl = context.themes[j].theme_nl;
                        }
                    }
                    poemThemes.push(themeObj);
                }

                context.selectedPoem.themes = poemThemes; // update the themes of selected poem
                break;

            case 'levels':
                setLevelValue(value);

                if (value.length === 0) {  // a level has been removed from select, leaving it empty
                    context.selectedPoem.level = null;
                }
                else {
                    let levelObj = {};

                    for (let i = 0; i < context.levels.length; i++) {
                        // take only first item in value array - only one level currently allowed
                        // if there are more than one values for level, second and subsequent
                        // will be ignored
                        if (context.levels[i].level === value[0].value) {
                            levelObj.level = context.levels[i].level;
                            levelObj.level_en = context.levels[i].level_en;
                            levelObj.level_fy = context.levels[i].level_fy;
                            levelObj.level_nl = context.levels[i].level_nl;
                        }
                    }
                    context.selectedPoem.level = levelObj;
                }
                break;
            default:
                break;
        }
    }

    return (
        <>
            <div>
                <Notification
                    notificationShown={context.selectedPoemDirtyNotificationShown}
                    setNotificationShown={context.setSelectedPoemDirtyNotificationShown}
                    title="Save Changes?"
                    message="You made changes to the lesson which will be lost if you switch to another poem without saving them."
                    action1Label="Don't Save"
                    action2Label="Save"
                    action1={action1}
                    action2={action2}
                />
                <LessonList
                    lessonList={context.lessonList}
                    lessonsPopupShown={lessonsPopupShown}
                    selectedLessonID={context.selectedLessonID}
                    setSelectedLessonID={context.setSelectedLessonID}
                    setLessonsPopupShown={setLessonsPopupShown}
                />
                <div className={styles.edit_lessons_grid}>
                    <div className={styles['edit_poem_title']}>
                        {context.selectedPoem &&
                            <PoemTitle
                                poet={context.poet}
                                title_fry={context.selectedPoem.title_fry}
                                title_nl={context.selectedPoem.title_nl}
                            />
                        }
                    </div>
                    <div className={styles['edit_poems_button_bar']}>

                        {user?.role === "Admin" &&
                            <div onClick={saveLessonToDb} className={styles['poem_btn']}>
                                <img alt="" src="assets/images/save.svg" />
                            </div>
                        }
                        <div onClick={showTutorNotes} className={styles['poem_btn']}>
                            <img alt="" src="assets/images/tutor-notes.svg" />
                        </div>
                        <div onClick={showLessonList} className={styles['poem_btn']}>
                            <img alt="" src="assets/images/show-lessons.svg" />
                        </div>

                    </div>
                    <div className={styles['edit_select_container']}>
                        <div className={styles.select_edit_types}>
                            <StyledSelect
                                isMulti={true}
                                className={styles.select_types}
                                onChange={(value) => handleSelectChange('types', value)}
                                options={optionsTypes}
                                value={typeValue}
                                placeholder={t('select_add_types')}
                                noOptionsMessage={() => t('select_no_more_options')}
                            />
                        </div>
                        <div className={styles.select_edit_themes}>
                            <StyledSelect
                                isMulti={true}
                                className={styles.select_themes}
                                onChange={(value) => handleSelectChange('themes', value)}
                                options={optionsThemes}
                                value={themeValue}
                                placeholder={t('select_add_themes')}
                                noOptionsMessage={() => t('select_no_more_options')}
                            />
                        </div>
                        <div className={styles.select_set_level}>
                            <StyledSelect
                                isMulti={true}
                                className={styles.select_levels}
                                onChange={(value) => handleSelectChange('levels', value)}
                                options={optionsLevels}
                                value={levelValue}
                                placeholder={t('select_set_level')}
                                noOptionsMessage={() => t('select_no_more_options')}
                            />
                        </div>
                    </div>

                    {context.selectedLesson && lessonPage &&
                        <div className={styles['lesson-pagination-container']}>
                            <nav>
                                <ul className={styles['lesson-pagination']} >
                                    {context.selectedLesson.contents.map(content => (
                                        !(content.content_id % 2 === 0) &&
                                        <li key={content.content_id}
                                            className={`${styles['page-item']} ${currentPage === content.content_id ? styles['active'] : ''}`} >
                                            <span onClick={() => setCurrentPage(content.lesson_order)} className={styles['poem_btn']}>
                                                {content.lesson_order}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    }
                    {!context.selectedLesson && lessonPage &&
                        <div className={styles.edit_poem}>
                            <p>Select a lesson to edit.</p>
                            <p>&nbsp;</p>
                            <p>Choose from a list of <span className={styles['poem_link']} onClick={showLessonList}>all the lessons
                            </span> (or click the <span className={styles['poem_btn_icon']} onClick={showLessonList}>
                                    <img alt="" src="assets/images/show-lessons.svg" /></span> button at any time to view the
                                list). Click the <span className={styles['poem_btn_icon']} onClick={showTutorNotes}>
                                    <img alt="" src="assets/images/tutor-notes.svg" /></span> button to
                                <span className={styles['poem_link']} onClick={showTutorNotes}> edit the tutor's notes</span>.
                            </p>
                            <p>&nbsp;</p>
                            <p>Click the <span className={styles['poem_btn_icon']} onClick={saveLessonToDb}>
                                <img alt="" src="assets/images/save.svg" /></span> button to
                                <span className={styles['poem_link']} onClick={saveLessonToDb}> save the lesson</span>. </p>
                        </div>
                    }
                    {context.selectedLesson && lessonPage &&
                        <>
                            <div className={`${styles.edit_lesson_left}`}>
                                <div>
                                    <HTMLEditor
                                        title={"Title Page " + lessonPage + " FY"}
                                        initialContent={initialTitleLeftFY}
                                        handleChange={handleChangeTitleLeftFY}
                                    />
                                </div>
                                <div>
                                    <HTMLEditor
                                        title={"Title Page " + lessonPage + " NL"}
                                        initialContent={initialTitleLeftNL}
                                        handleChange={handleChangeTitleLeftNL}
                                    />
                                </div>
                                <div>
                                    <HTMLEditor
                                        title={"Upper Text Page " + lessonPage + " FY"}
                                        initialContent={initialUpperTextLeftFY}
                                        handleChange={handleChangeUpperTextLeftFY}
                                    />
                                </div>
                                <div>
                                    <HTMLEditor
                                        title={"Upper Page " + lessonPage + " NL"}
                                        initialContent={initialUpperTextLeftNL}
                                        handleChange={handleChangeUpperTextLeftNL}
                                    />
                                </div>
                                <div>
                                    <HTMLEditor
                                        title={"Lower Text Page " + lessonPage + " FY"}
                                        initialContent={initialLowerTextLeftFY}
                                        handleChange={handleChangeLowerTextLeftFY}
                                    />
                                </div>
                                <div>
                                    <HTMLEditor
                                        title={"Lower Text Page " + lessonPage + " NL"}
                                        initialContent={initialLowerTextLeftNL}
                                        handleChange={handleChangeLowerTextLeftNL}
                                    />
                                </div>
                            </div>
                            <div className={`${styles.edit_lesson_right}`}>
                                <div>
                                    <HTMLEditor
                                        title={"Title Page " + (lessonPage + 1) + " FY"}
                                        initialContent={initialTitleRightFY}
                                        handleChange={handleChangeTitleRightFY}
                                    />
                                </div>
                                <div>
                                    <HTMLEditor
                                        title={"Title Page " + (lessonPage + 1) + " NL"}
                                        initialContent={initialTitleRightNL}
                                        handleChange={handleChangeTitleRightNL}
                                    />
                                </div>
                                <div>
                                    <HTMLEditor
                                        title={"Upper Text Page " + (lessonPage + 1) + " FY"}
                                        initialContent={initialUpperTextRightFY}
                                        handleChange={handleChangeUpperTextRightFY}
                                    />
                                </div>
                                <div>
                                    <HTMLEditor
                                        title={"Upper Text Page " + (lessonPage + 1) + " NL"}
                                        initialContent={initialUpperTextRightNL}
                                        handleChange={handleChangeUpperTextRightNL}
                                    />
                                </div>
                                <div>
                                    <HTMLEditor
                                        title={"Lower Text Page " + (lessonPage + 1) + " FY"}
                                        initialContent={initialLowerTextRightFY}
                                        handleChange={handleChangeLowerTextRightFY}
                                    />
                                </div>
                                <div>
                                    <HTMLEditor
                                        title={"Lower Text Page " + (lessonPage + 1) + " NL"}
                                        initialContent={initialLowerTextRightNL}
                                        handleChange={handleChangeLowerTextRightNL}
                                    />
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}