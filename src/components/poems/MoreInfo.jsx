import React, { useContext } from "react";

import { AppContext } from "../../context/AppContext";

import styles from "../../css/PoemList.module.css";



function MoreInfo({
    selectedPoemID,
    setSelectedPoemID,
    setCurrentPage,
    moreInfoShown,
    setMoreInfoShown,
    poemList

}) {

    const context = useContext(AppContext);

    const handleCloseClick = () => {
        setMoreInfoShown(false);
    };

    return (
        <>
            {moreInfoShown &&
                <div>
                    <div className={`${styles.popup_background}`} />
                    <div className={`${styles.poem_list_popup}`}>
                        <div className={styles.modalHeader}>
                            <h5 className={styles.heading}>More about the poem</h5>
                        </div>
                        <button className={styles.closeBtn} onClick={() => handleCloseClick()}>
                            <img className={styles.close_btn} alt="" src="assets/images/close.svg" />
                        </button>
                        <div className={`${styles.popup_container_outer}`} >
                            <div className={`${styles.popup_container_inner}`} >

                                <p>More info</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default MoreInfo;
