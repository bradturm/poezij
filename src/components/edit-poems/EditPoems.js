import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useTranslation } from 'react-i18next';
import StyledSelect from "../common/StyledSelect";

import styles from "../../css/PoemList.module.css";

import { poemService } from '../../services/poem-service';
import { accountService } from '../../services/account-service';

import PoemList from "../poems/PoemList";
import Search from "../poems/Search";
import Filter from "../poems/Filter";
import EditPoem from "./EditPoem";
import PoemTitle from "../common/poem/PoemTitle";
import Notification from "../common/Notification";
import HTMLEditor from "../HTMLEditor";

export default function EditPoems({

}) {

    const context = useContext(AppContext);

    const [poemsPopupShown, setPoemsPopupShown] = useState(false);
    const [searchShown, setSearchShown] = useState(false);
    const [filterShown, setFilterShown] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [optionsTypes, setOptionsTypes] = useState([]);
    const [optionsThemes, setOptionsThemes] = useState([]);
    const [optionsLevels, setOptionsLevels] = useState([]);
    const [typeValue, setTypeValue] = useState([]);
    const [themeValue, setThemeValue] = useState([]);
    const [levelValue, setLevelValue] = useState([]);

    const [initialCommentaryFY, setInitialCommentaryFY] = useState("");
    const [initialCommentaryNL, setInitialCommentaryNL] = useState("");

    const [currentPoemID, setCurrentPoemID] = useState(0);

    const { t } = useTranslation();

    const user = accountService.userValue;

    const handleChangeCommentaryFY = (data) => {
        if (context.editingCommentaryFY) {
            const newPoem = { ...context.selectedPoem, commentary_fry: data };
            context.setSelectedPoem(newPoem);
            context.setSelectedPoemDirty(true);
        }
        context.setEditingCommentaryFY(true);
    }

    const handleChangeCommentaryNL = (data) => {
        if (context.editingCommentaryNL) {
            const newPoem = { ...context.selectedPoem, commentary_nl: data };
            context.setSelectedPoem(newPoem);
            context.setSelectedPoemDirty(true);
        }
        context.setEditingCommentaryNL(true);
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

        if (!context.selectedPoem) { return }

        if (context.selectedPoemID !== currentPoemID) {
            setInitialCommentaryFY(context.selectedPoem.commentary_fry);
            setInitialCommentaryNL(context.selectedPoem.commentary_nl);
            setCurrentPoemID(context.selectedPoemID);
        }

        if (context.selectedPoem.types) {

            let typeArr = [];
            for (let i = 0; i < context.selectedPoem.types.length; i++) {
                const type = context.selectedPoem.types[i];
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

        if (context.selectedPoem.themes) {

            let themeArr = [];
            for (let i = 0; i < context.selectedPoem.themes.length; i++) {
                const theme = context.selectedPoem.themes[i];
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

        if (context.selectedPoem.level && Object.keys(context.selectedPoem.level).length !== 0) {

            let level = context.selectedPoem.level;
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

    const showPoemList = () => { setPoemsPopupShown(true) };
    const showSearch = () => { setSearchShown(true) };
    const showFilter = () => { setFilterShown(true) };
    const savePoemToDb = () => { context.saveSelectedPoemToDb(); };

    const action1 = () => {  // don't save
        context.setSavePoem("no");
        context.setSelectedPoemDirtyNotificationShown(false);
    };
    const action2 = () => {  // save
        context.setSavePoem("yes");
        context.setSelectedPoemDirtyNotificationShown(false);
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
            <div className={styles['edit-poems-page']}>

                <Notification
                    notificationShown={context.selectedPoemDirtyNotificationShown}
                    setNotificationShown={context.setSelectedPoemDirtyNotificationShown}
                    title="Save Changes?"
                    message="You made changes to the poem which will be lost if you switch to another poem without saving them."
                    action1Label="Don't Save"
                    action2Label="Save"
                    action1={action1}
                    action2={action2}
                />

                <PoemList
                    poemList={context.poemList}
                    poemsPopupShown={poemsPopupShown}
                    selectedPoemID={context.selectedPoemID}
                    setSelectedPoemID={context.setSelectedPoemID}
                    setPoemsPopupShown={setPoemsPopupShown}
                    setCurrentPage={setCurrentPage}
                />
                <Search
                    searchShown={searchShown}
                    selectedPoemID={context.selectedPoemID}
                    setSelectedPoemID={context.setSelectedPoemID}
                    setSearchShown={setSearchShown}
                    setCurrentPage={setCurrentPage}
                />
                <Filter
                    filterShown={filterShown}
                    setFilterShown={setFilterShown}
                    setCurrentPage={setCurrentPage}
                />
                <div className={styles.edit_poems_grid}>
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
                            <div onClick={savePoemToDb} className={styles['poem_btn']}>
                                <img alt="" src="assets/images/save.svg" />
                            </div>
                        }
                        <div onClick={showFilter} className={styles['poem_btn']}>
                            <img alt="" src="assets/images/filter.svg" />
                        </div>
                        <div onClick={showPoemList} className={styles['poem_btn']}>
                            <img alt="" src="assets/images/show-poems.svg" />
                        </div>
                        <div onClick={showSearch} className={styles['poem_btn']}>
                            <img alt="" src="assets/images/search.svg" />
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
                    {context.selectedPoem &&
                        <div className={`${styles.edit_poem}`}>
                            <EditPoem
                                selectedPoem={context.selectedPoem}
                                lineTypes={context.lineTypes}
                            />
                        </div>
                    }
                    {!context.selectedPoem &&
                        <div className={styles.edit_poem}>
                            <p>Select a poem to edit.</p>
                            <p>Choose from a list of <span className={styles['poem_link']} onClick={showPoemList}>all the poems
                            </span> in the collection (or click the <span className={styles['poem_btn_icon']} onClick={showPoemList}>
                                    <img alt="" src="assets/images/show-poems.svg" /></span> button at any time to view the
                                list), <span className={styles['poem_link']} onClick={showSearch}>search</span> for poems containing
                                certain words (or click the <span className={styles['poem_btn_icon']} onClick={showSearch}>
                                    <img alt="" src="assets/images/search.svg" /></span> button), or <span className={styles['poem_link']}
                                        onClick={showFilter}>filter</span> the poems to view only those from a particular poet or of particular types or levels
                                of difficulty, or addressing certain themes (or click the <span className={styles['poem_btn_icon']}
                                    onClick={showFilter}> <img alt="" src="assets/images/filter.svg" /></span> button).
                            </p>
                        </div>
                    }
                    <div className={`${styles.edit_notes}`}>
                        <HTMLEditor
                            title="Commentary FY"
                            initialContent={initialCommentaryFY}
                            handleChange={handleChangeCommentaryFY}
                        />
                        <HTMLEditor
                            title="Commentary NL"
                            initialContent={initialCommentaryNL}
                            handleChange={handleChangeCommentaryNL}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}