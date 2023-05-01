import React from 'react';
import { Outlet, useNavigate } from "react-router-dom";

import ToggleSwitch from "../common/ToggleSwitch";

import styles from "../../css/Settings.module.css";

//import { accountService } from '../../services/account-service';

export default function Settings({

    textSelectable,
    setTextSelectable,
    paged,
    setPaged

}) {

    //  const user = accountService.userValue;

    const navigate = useNavigate();

    const handleClose = () => {
        console.log("closing Settings page");
        navigate(-1);
    };

    const handleSelectableChange = () => {

        console.log("changed the text selectable checkbox ")
        console.log("textSelectable is " + JSON.stringify(textSelectable));
        console.log("setTextSelectable is " + JSON.stringify(setTextSelectable));
        setTextSelectable(!textSelectable);
        //  checked = props.searchSynonyms;
    };

    const handlePagedChange = () => {
        setPaged(!paged)
    };

    const handleHideScrollbarsChange = () => {
        console.log("in handleHideScrollbarsChange");
    };

    return (
        <>
            <div className={`${styles.no_poem_grid}`}>
                <button className={styles.closeBtn} onClick={() => handleClose()}>
                    <img className={styles.close_btn} alt="" src="assets/images/close.svg" />
                </button>
                <div className={`${styles.container}`}>
                    {/*      <h1>Hi {user?.firstName}!</h1> */}
                    <div className={styles.modalHeader}>
                        <h5 className={styles.heading}>Settings</h5>
                    </div>
                    <div>
                        <div className={styles.setting}><span>Make text selectable in poems (paged mode) </span><ToggleSwitch
                            id="setSelectableSwitch"
                            small
                            disabled={false}
                            checked={textSelectable}
                            onChange={handleSelectableChange}
                        /></div>
                        <div className={styles.setting}><span>Set paged mode for poems as default </span><ToggleSwitch
                            id="setPagedSwitch"
                            small
                            disabled={false}
                            checked={paged}
                            onChange={handlePagedChange}
                        /></div>
                        <div className={styles.setting}><span>Hide scrollbars </span><ToggleSwitch
                            id="setHideScrollbarSwitch"
                            small
                            disabled={false}
                            checked={textSelectable}
                            onChange={handleHideScrollbarsChange}
                        /></div>
                    </div>
                    <button onClick={handleClose} className={`${styles.btn} ${styles.btn_primary}`}>Close</button>
                </div>
            </div>
            <Outlet />
        </>
    )
}