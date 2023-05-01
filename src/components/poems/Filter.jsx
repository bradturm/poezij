import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from 'react-i18next';

import { AppContext } from "../../context/AppContext";

import ToggleSwitch from "../common/ToggleSwitch";

import StyledSelect from "../common/StyledSelect";

import styles from "../../css/PoemList.module.css";

function Filter({

    filterShown,
    setFilterShown,
    setCurrentPage

}) {

    const context = useContext(AppContext);

    const [levelValue, setLevelValue] = useState('');
    const [themesValue, setThemesValue] = useState('');
    const [typesValue, setTypesValue] = useState('');
    const [poetsValue, setPoetsValue] = useState([]);

    const [typesUseAnd, setTypesUseAnd] = useState(false);
    const [themesUseAnd, setThemesUseAnd] = useState(false);

    const [optionsThemes, setOptionsThemes] = useState([]);
    const [optionsTypes, setOptionsTypes] = useState([]);
    const [optionsLevels, setOptionsLevels] = useState([]);
    const [optionsPoets, setOptionsPoets] = useState([]);

    const [filterResults, setFilterResults] = useState([]);

    const { t } = useTranslation();

    useEffect(() => {
        if (filterShown) {
            console.log("add some code to initialise filter");

            //   setFilterResults(filterResults);
        }

    }, [filterShown, context.poemList]);

    useEffect(() => {
        if (context.poemList) {

            let poemsThemesArr = [];
            let poemsTypesArr = [];
            let poemsPoetsArr = [];
            let poemsLevelsArr = [];

            if (themesValue.length === 0) { // there is no filtering applied for themes
                poemsThemesArr = context.poemList;  // so include all poems in the array
            }
            else {
                for (let i = 0; i < context.poemList.length; i++) {  // for all the poems
                    const poem = context.poemList[i];

                    console.log("themesValue.length is " + themesValue.length);
                    for (let j = 0; j < themesValue.length; j++) {  // for the length of the themes array
                        for (let k = 0; k < poem.themes.length; k++) {

                            if (poem.themes[k] === themesValue[j]?.value) {
                                console.log("match in level")
                                poemsThemesArr.push(poem);
                            }
                        }
                    }
                }
            }

            if (typesValue.length === 0) { // there is no filtering applied for types
                poemsTypesArr = context.poemList;  // so include all poems in the array
            }
            else {
                for (let i = 0; i < context.poemList.length; i++) {  // for all the poems
                    const poem = context.poemList[i];
                    for (let j = 0; j < typesValue.length; j++) {  // for the length of the types array
                        for (let k = 0; k < poem.types.length; k++) {

                            if (poem.types[k] === typesValue[j]?.value) {
                                console.log("match in level")
                                poemsTypesArr.push(poem);
                            }
                        }
                    }
                }
            }

            if (poetsValue.length === 0) { // there is no filtering applied for poets
                poemsPoetsArr = context.poemList;  // so include all poems in the array
            }
            else {

                for (let i = 0; i < context.poemList.length; i++) {  // for all the poems
                    const poem = context.poemList[i];
                    for (let j = 0; j < poetsValue.length; j++) {  // for the length of the poets array

                        if (poem.poet_id === poetsValue[j]?.poetID) {
                            console.log("match in poet")
                            poemsPoetsArr.push(poem);
                        }
                    }
                }
            }

            if (levelValue.length === 0) { // there is no filtering applied for levels
                poemsLevelsArr = context.poemList;  // so include all poems in the array
            }
            else {
                for (let i = 0; i < context.poemList.length; i++) {  // for all the poems
                    const poem = context.poemList[i];
                    for (let j = 0; j < levelValue.length; j++) {  // for the length of the levels array
                        if (poem.level === parseInt(levelValue[j]?.value)) {
                            console.log("match in level")
                            poemsLevelsArr.push(poem);
                        }
                    }
                }
            }

            // perform an AND combination of the arrays

            let ThemesAndTypes = poemsThemesArr.filter(x => poemsTypesArr.includes(x));
            let ThemesAndTypesAndPoets = ThemesAndTypes.filter(x => poemsPoetsArr.includes(x));
            let ThemesAndTypesAndPoetsAndLevels = ThemesAndTypesAndPoets.filter(x => poemsLevelsArr.includes(x));

            setFilterResults(ThemesAndTypesAndPoetsAndLevels);
        }

    }, [context.poemList, levelValue, themesValue, typesValue, poetsValue]);

    useEffect(() => {

        if (context.poemList) {

            let optionsArr = [];
            let poetsArr = [];

            for (let i = 0; i < context.poemList.length; i++) {  // for all the poems
                const poem = context.poemList[i];
                let found = false;  // check poet not already included in array
                for (let j = 0; j < poetsArr.length; j++) {
                    if (poem.poet_id === poetsArr[j].poetID) {
                        found = true;
                    }
                }
                if (!found) {

                    // poet not in array so add 
                    let poetObj = {};

                    poetObj.fullName = poem.first_names.trim() +
                        ' ' +
                        ((poem.prefix) ? poem.prefix + ' ' : '')
                        + poem.last_name;
                    poetObj.lastName = poem.last_name.trim();  // for sorting by surname
                    poetObj.poetID = poem.poet_id;

                    poetsArr.push(poetObj);
                }
                found = false;

                poetsArr.sort((a, b) => a.lastName.localeCompare(b.lastName));  // sort poet names alphabetically
            }
            for (let i = 0; i < poetsArr.length; i++) {

                let optionObj = {};
                optionObj.value = i + 1;
                optionObj.label = poetsArr[i].fullName;
                optionObj.poetID = poetsArr[i].poetID;
                optionsArr.push(optionObj);
            }

            setOptionsPoets(optionsArr);

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

            if (context.levels) {

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
                setOptionsLevels(optionsArr);
            }
        }
    }, [context.themes, context.types, context.levels, context.poemList, context.lang]);

    const handleCloseClick = () => {
        setFilterShown(false);
    };

    const handleTypesAndOrChange = () => {

        setTypesUseAnd(!typesUseAnd);

        console.log("changed and/or for types ")
    };

    const handleThemesAndOrChange = () => {

        setThemesUseAnd(!themesUseAnd);

        console.log("changed and/or for themes ")
    };

    const handleResultClick = (i) => {

        if (context.selectedPoemID !== i) {
            context.setSelectedPoemID(i);
            setCurrentPage(1);
        }
        setFilterShown(false);
    };

    const handleSelectChange = (field, value) => {
        switch (field) {

            case 'themes':
                setThemesValue(value);
                break;

            case 'types':
                setTypesValue(value);
                break;

            case 'poets':
                setPoetsValue(value);
                break;

            case 'level':
                setLevelValue(value);
                break;

            default:
                break;
        }
    }

    return (
        <>
            {filterShown &&
                <div>
                    <div className={`${styles.popup_background}`} />
                    <div className={`${styles.search_popup}`}>
                        <div className={styles.modalHeader}>
                            <h5 className={styles.heading}>Filter</h5>
                        </div>
                        <button className={styles.closeBtn} onClick={() => handleCloseClick()}>
                            <img className={styles.close_btn} alt="" src="assets/images/close.svg" />
                        </button>

                        <div>
                            <p>Some text on how to filter</p>
                        </div>

                        <div className={styles.selects_container_grid}>

                            <div className={styles.select_themes_container}>
                                <StyledSelect
                                    isMulti={true}
                                    className={styles.select_themes}
                                    onChange={(value) => handleSelectChange('themes', value)}
                                    options={optionsThemes}
                                    value={themesValue}
                                    placeholder={t('select_all_themes')}
                                    noOptionsMessage={() => t('select_no_more_options')}
                                />
                                <div className={styles.themes_and_or}>
                                    <span>and </span>
                                    <ToggleSwitch
                                        id="andOrThemesSwitch"
                                        small
                                        disabled={false}
                                        checked={themesUseAnd}
                                        onChange={handleThemesAndOrChange}
                                    /><span> or</span>
                                </div>
                            </div>
                            <div className={styles.select_types_container}>

                                <StyledSelect
                                    isMulti={true}
                                    className={styles.select_types}
                                    onChange={(value) => handleSelectChange('types', value)}
                                    options={optionsTypes}
                                    value={typesValue}
                                    placeholder={t('select_all_types')}
                                    noOptionsMessage={() => t('select_no_more_options')}
                                />

                                <div className={styles.types_and_or}>
                                    <span>and </span>
                                    <ToggleSwitch
                                        id="andOrTypesSwitch"
                                        small
                                        disabled={false}
                                        checked={typesUseAnd}
                                        onChange={handleTypesAndOrChange}
                                    /><span> or</span>
                                </div>
                            </div>
                            <div className={styles.select_poets_container}>
                                <StyledSelect
                                    isMulti={true}
                                    className={styles.select_poets}
                                    onChange={(value) => handleSelectChange('poets', value)}
                                    options={optionsPoets}
                                    value={poetsValue}
                                    placeholder={t('select_all_poets')}
                                    noOptionsMessage={() => t('select_no_more_options')}
                                />
                            </div>
                            <div className={styles.select_levels_container}>
                                <StyledSelect
                                    isMulti={true}
                                    className={styles.select_levels}
                                    onChange={(value) => handleSelectChange('level', value)}
                                    options={optionsLevels}
                                    value={levelValue}
                                    placeholder={t('select_all_levels')}
                                    noOptionsMessage={() => t('select_no_more_options')}
                                />
                            </div>
                            <div className={styles.results}>

                                {filterResults &&
                                    <div className={`${styles.popup_container_inner}`} >

                                        {filterResults.map((poem, i) => (
                                            <div key={i} className={`${styles.poem_wrapper}`} onClick={() => handleResultClick(poem.poem_id)}>

                                                <div className={styles['poem-num']} >
                                                    <p>{poem.poem_id}</p>
                                                </div>
                                                <div className={styles['poem-titles']}>
                                                    <p>
                                                        <span dangerouslySetInnerHTML={{ __html: poem.title_fry }} />&nbsp;(
                                                        <span dangerouslySetInnerHTML={{ __html: poem.title_nl }} />)&nbsp;&nbsp;&nbsp;
                                                        <span className={`${styles.poem_poet}`}>({poem.first_names} {poem.prefix} {poem.last_name}) </span>
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}


export default Filter;