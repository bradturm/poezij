import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from 'react-i18next';

import { AppContext } from "../../context/AppContext";

import styles from "../../css/PoemList.module.css";

function Notification({

    notificationShown,
    setNotificationShown,
    title,
    message,
    action1,
    action2,
    action1Label,
    action2Label

}) {

    const { t } = useTranslation();

    const handleCloseClick = () => {
        setNotificationShown(false);
    };

    return (
        <>
            {notificationShown &&
                <div>
                    <div className={`${styles.popup_background}`} />
                    <div className={`${styles.search_popup}`}>
                        <div className={styles.modalHeader}>
                            <h5 className={styles.heading}>{title}</h5>
                        </div>
                        <button className={styles.closeBtn} onClick={action1}>
                            <img className={styles.close_btn} alt="" src="assets/images/close.svg" />
                        </button>
                        <div>
                            <p>{message}</p>
                        </div>
                        <div className={styles.selects_container_grid}>
                            <button onClick={action1} className={`${styles.btn} ${styles.btn_secondary}`}>{action1Label}</button>
                            <button onClick={action2} className={`${styles.btn} ${styles.btn_primary}`}>{action2Label}</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}


export default Notification;