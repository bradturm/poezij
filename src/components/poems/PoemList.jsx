import React, { useContext } from "react";

import { AppContext } from "../../context/AppContext";

import styles from "../../css/PoemList.module.css";



function PoemList({
    selectedPoemID,
    setSelectedPoemID,
    setCurrentPage,
    poemsPopupShown,
    setPoemsPopupShown,
    poemList

}) {

    const context = useContext(AppContext);

    const handleListClick = (i) => {
        if (context.selectedPoemID !== i + 1) {
            context.setSelectedPoemID(i + 1);
            setCurrentPage(1);
        }
        setPoemsPopupShown(false);
    };

    const handleCloseClick = () => {
        setPoemsPopupShown(false);
    };

    return (
        <>
            {poemsPopupShown &&
                <div>
                    <div className={`${styles.popup_background}`} />
                    <div className={`${styles.poem_list_popup}`}>
                        <div className={styles.modalHeader}>
                            <h5 className={styles.heading}>Select a Poem</h5>
                        </div>
                        <button className={styles.closeBtn} onClick={() => handleCloseClick()}>
                            <img className={styles.close_btn} alt="" src="assets/images/close.svg" />
                        </button>
                        <div className={`${styles.popup_container_outer}`} >
                            <div className={`${styles.popup_container_inner}`} >

                                {poemList.map((poem, i) => (

                                    <div key={i} className={`${styles.poem_wrapper}`} onClick={() => handleListClick(i)}>

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
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default PoemList;
