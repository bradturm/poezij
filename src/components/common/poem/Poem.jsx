import React, { useState, useEffect } from "react";

import PoemTitle from "./PoemTitle";
import Lines from "./Lines";
import PagedLines from "./PagedLines";
import Pagination from "./Pagination";

import styles from "../../../css/Poems.module.css";

export default function Poem({

    poemID,
    poem,
    //  paged,
    //  setPaged,
    textSelectable,
    fullHeight,
    poemDayHeight
}) {

    const [pagination, setPagination] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [disabled, setDisabled] = useState(true);
    const [showLineNum, setShowLineNum] = useState(true);
    const [showFY, setShowFY] = useState(true);
    const [showNL, setShowNL] = useState(true);
    const [paged, setPaged] = useState(false);
    const [poet, setPoet] = useState("");

    useEffect(() => {
        if (poem) {
            setPoet(poem?.first_names?.trim() +
                ' ' +
                ((poem.prefix) ? poem.prefix + ' ' : '')
                + poem.last_name);
        }
    }, [poem]);

    const toggleSyncScroll = () => {
        if (disabled) { setDisabled(false) }
        else { setDisabled(true) }
    };

    const toggleShowLineNumbers = () => {
        if (showLineNum) { setShowLineNum(false) }
        else { setShowLineNum(true) }
    };

    const togglePaged = () => {
        if (paged) { setPaged(false) }
        else { setPaged(true) }
    };

    const handleShowSingle = () => {

        if (showFY && showNL) { setShowNL(false) }
        else if (!showNL) { setShowNL(true); setShowFY(false) }
        else { setShowNL(true); setShowFY(true) }
    };
    // <div className={`${styles.poem_grid} ${fullHeight ? styles.full_height : ''}`}>
    return (
        <>
            {poemID &&

                <div className={`${styles.poem_grid} ${fullHeight ? styles.full_height : poemDayHeight ? styles.day_height : ''}`}>
                    <div className={styles['link_btn']}>
                        <span onClick={toggleSyncScroll} className={styles['poem_btn']}>
                            <img className={disabled ? styles['on'] : styles['off']} alt="" src="assets/images/link.svg" />
                            <img className={disabled ? styles['off'] : styles['on']} alt="" src="assets/images/unlink.svg" />
                        </span>
                        <span onClick={handleShowSingle} className={styles['poem_btn']}>
                            <img className={showNL && !showFY ? styles['on'] : styles['off']} alt="" src="assets/images/show-both.svg" />
                            <img className={showFY && showNL ? styles['on'] : styles['off']} alt="" src="assets/images/view-fy-only.svg" />
                            <img className={showFY && !showNL ? styles['on'] : styles['off']} alt="" src="assets/images/view-nl-only.svg" />
                        </span>
                    </div>
                    <div className={styles['titles-block']}>
                        <PoemTitle
                            poet={poet}
                            title_fry={poem?.title_fry}
                            title_nl={poem?.title_nl}
                            showFY={showFY}
                            showNL={showNL}
                        />
                    </div>
                    <div className={styles['button-bar1']}>
                        <ul>
                            <span onClick={togglePaged} className={styles['poem_btn']}>
                                <img className={paged ? styles['on'] : styles['off']} alt="" src="assets/images/not-paged.svg" />
                                <img className={paged ? styles['off'] : styles['on']} alt="" src="assets/images/paged.svg" />
                            </span>
                            <span onClick={toggleShowLineNumbers} className={styles['poem_btn']}>
                                <img className={showLineNum ? styles['on'] : styles['off']} alt="" src="assets/images/hide-line-numbers.svg" />
                                <img className={showLineNum ? styles['off'] : styles['on']} alt="" src="assets/images/show-line-numbers.svg" />
                            </span>
                        </ul>
                    </div>
                    <div className={`${styles.lines}`}>
                        < Lines
                            setPagination={setPagination}
                            disabled={disabled}
                            showLineNum={showLineNum}
                            textSelectable={textSelectable}
                            paged={paged}
                            lines={poem?.lines}
                            fullHeight={fullHeight}
                            poemDayHeight={poemDayHeight}
                            showFY={showFY}
                            showNL={showNL}

                        />
                    </div>

                    {paged && <div className={`${styles.pagedLines}`}>
                        < PagedLines
                            showLineNum={showLineNum}
                            textSelectable={textSelectable}
                            currentPage={currentPage}
                            pagination={pagination}
                            lines={poem.lines}
                            fullHeight={fullHeight}
                            poemDayHeight={poemDayHeight}
                            showFY={showFY}
                            showNL={showNL}
                        />
                    </div>}
                    <div className={styles.pagination}>
                        < Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} pagination={pagination} paged={paged} />
                    </div>
                </div>
            }
        </>
    )
}

