import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from 'react-i18next';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import AlertPopup from '../common/AlertPopup';
import { AppContext } from "../../context/AppContext";
import StyledSelect from "../common/StyledSelect";
import HTMLEditor from "../HTMLEditor";

import { poetService } from '../../services/poet-service';

import styles from "../../css/PoemList.module.css";

function EditPoets({

    editPoetsShown,
    setEditPoetsShown,
    setCurrentPage

}) {

    const context = useContext(AppContext);

    const [poetsValue, setPoetsValue] = useState([]);
    const [optionsPoets, setOptionsPoets] = useState([]);
    const [editingBioFY, setEditingBioFY] = useState(false);
    const [editingBioNL, setEditingBioNL] = useState(false);
    const [selectedPoet, setSelectedPoet] = useState(null);
    const [selectedPoetDirty, setSelectedPoetDirty] = useState(false);
    const [initialBioFY, setInitialBioFY] = useState("");
    const [initialBioNL, setInitialBioNL] = useState("");

    const btn1Click = () => {
        updatePoet();
    }
    const btn2Click = () => {
        // not saving, so do nothing
    }

    const { t } = useTranslation();

    const showConfirm = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <AlertPopup
                        onClose={onClose}
                        heading={"Unsaved changes"}
                        message={"Do you want to save the changes you made to the poet's bio?"}
                        btn1Label={"Save"}
                        btn1Click={btn1Click}
                        btn2Label={"Don't Save"}
                        btn2Click={btn2Click}
                    />
                );
            },
            closeOnClickOutside: false
        });
    };


    function getPoet(id) {
        poetService.getById(id)
            .then((poet) => {
                setSelectedPoet(poet);
                setInitialBioFY(poet.bio_fy);
                setInitialBioNL(poet.bio_nl);
                setSelectedPoetDirty(false);
                setEditingBioFY(false);
                setEditingBioNL(false);
            })
    }

    function updatePoet() {
        poetService.update(selectedPoet.poet_id, selectedPoet)
            .then((poet) => {
                setSelectedPoetDirty(false);
                setEditingBioFY(false);
                setEditingBioNL(false);
            })
    }

    // clear form when edit poets popup hidden
    useEffect(() => {
        if (!editPoetsShown) {
            setPoetsValue([]);
            setEditingBioFY(false);
            setEditingBioNL(false);
            setSelectedPoet(null);
            setSelectedPoetDirty(false);
            setInitialBioFY("");
            setInitialBioNL("");
        }
    }, [editPoetsShown]);

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

        }
    }, [context.poemList]);

    const handleCloseClick = () => {
        if (selectedPoetDirty) {
            showConfirm();
        }
        setSelectedPoetDirty(false);
        setEditPoetsShown(false);
    };

    const handleSelectChange = (value) => {
        setPoetsValue(value);
        if (selectedPoetDirty) { // if poet has been edited, give opportunity to save changes
            showConfirm();
        }
        getPoet(value.poetID);
        setSelectedPoetDirty(false);
        setEditingBioFY(false);
        setEditingBioNL(false);
    }

    const handleChangeBioFY = (data) => {
        if (editingBioFY) {
            let newBio = selectedPoet.bio_fy;
            newBio = data;
            setSelectedPoet({ ...selectedPoet, bio_fy: newBio });
            setSelectedPoetDirty(true);
        }
        setEditingBioFY(true);
    }

    const handleChangeBioNL = (data) => {
        if (editingBioNL) {
            let newBio = selectedPoet.bio_nl;
            newBio = data;
            setSelectedPoet({ ...selectedPoet, bio_nl: newBio });
            setSelectedPoetDirty(true);
        }
        setEditingBioNL(true);
    }

    return (
        <>
            {editPoetsShown &&
                <div>
                    <div className={`${styles.popup_background}`} />
                    <div className={`${styles.search_popup}`}>
                        <div className={styles.modalHeader}>
                            <h5 className={styles.heading}>Edit Poets</h5>
                        </div>
                        <div className={styles.select_poets_container}>
                            <StyledSelect
                                isMulti={false}
                                className={styles.select_poets}
                                onChange={(value) => handleSelectChange(value)}
                                options={optionsPoets}
                                value={poetsValue}
                                placeholder={t('select_all_poets')}
                                noOptionsMessage={() => t('select_no_more_options')}
                            />
                        </div>
                        <div onClick={updatePoet} className={styles['poem_btn']}>
                            <img alt="" src="assets/images/save.svg" />
                        </div>
                        <button className={styles.closeBtn} onClick={() => handleCloseClick()}>
                            <img className={styles.close_btn} alt="" src="assets/images/close.svg" />
                        </button>
                        <div className={styles.selects_container_grid}>

                            <div className={styles.results}>

                                {editPoetsShown && selectedPoet &&
                                    <div className={`${styles.popup_container_inner}`} >
                                        <div>
                                            <HTMLEditor
                                                title={"Poet bio FY"}
                                                initialContent={initialBioFY}
                                                handleChange={handleChangeBioFY}
                                            />
                                        </div>
                                        <div>
                                            <HTMLEditor
                                                title={"Poet bio NL"}
                                                initialContent={initialBioNL}
                                                handleChange={handleChangeBioNL}
                                            />
                                        </div>
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

export default EditPoets;