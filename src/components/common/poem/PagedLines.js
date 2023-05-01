import React, { useEffect } from "react";
import styles from "../../../css/Lines.module.css";


function PagedLines({

    showLineNum,
    textSelectable,
    currentPage,
    pagination,
    lines,
    fullHeight,
    poemDayHeight,
    showFY,
    showNL

}) {

    //  const lines = props.lines;
    //  const currentPage = props.currentPage;
    //  const pagination = props.pagination;

    let pagedlines = [];

    const rowFryArray = [];
    const rowNLArray = [];
    const verseArray = [];

    let startLine = pagination[currentPage - 2];
    if (typeof startLine === 'undefined') {
        startLine = 1;
    }
    let endLine = pagination[currentPage - 1];
    if (typeof endLine === 'undefined') {
        endLine = lines.length + 1;
    }

    pagedlines = lines.slice(startLine - 1, endLine - 1);

    useEffect(() => {
        FixLineHeights();
    }, [pagination, currentPage]);


    function FixLineHeights() {

        let currVerse = 1;

        ////////////////////////////////////////////////////
        // Both Friesian poem and Dutch translation shown //
        ////////////////////////////////////////////////////

        if (showFY && showNL) {

            // reset all the heights and margins of the Friesian and Dutch lines

            for (let i = 0; i < rowFryArray.length; i++) {
                rowFryArray[i].style.height = '';
                rowFryArray[i].style.marginTop = '';
                rowNLArray[i].style.height = '';
                rowNLArray[i].style.marginTop = '';
            }
            for (let i = 0; i < rowFryArray.length; i++) {

                if (rowFryArray[i].offsetHeight > rowNLArray[i].offsetHeight) {
                    rowNLArray[i].setAttribute("style", "height:" + rowFryArray[i].offsetHeight + "px");
                    rowNLArray[i].style.height = rowFryArray[i].offsetHeight;
                }
                if (rowNLArray[i].offsetHeight > rowFryArray[i].offsetHeight) {
                    rowFryArray[i].setAttribute("style", "height:" + rowNLArray[i].offsetHeight + "px");
                    rowFryArray[i].style.height = rowNLArray[i].offsetHeight;
                }

                // add spacing between verses

                if (verseArray[i] !== currVerse) {
                    currVerse = verseArray[i];
                    rowFryArray[i].style.marginTop = '20px';
                    rowNLArray[i].style.marginTop = '20px';
                }
            }
        }

        ////////////////////////////////////////////////////
        // Just the Friesian poem shown                   //
        ////////////////////////////////////////////////////

        if (showFY && !showNL) {

            // reset all the heights and margins of the Friesian lines

            for (let i = 0; i < rowFryArray.length; i++) {
                rowFryArray[i].style.height = '';
                rowFryArray[i].style.marginTop = '';
            }

            // add spacing between verses

            for (let i = 0; i < rowFryArray.length; i++) {
                if (verseArray[i] !== currVerse) {
                    currVerse = verseArray[i];
                    rowFryArray[i].style.marginTop = '20px';
                }
            }
        }

        ////////////////////////////////////////////////////
        // Just the Dutch translation shown               //
        ////////////////////////////////////////////////////

        if (showNL && !showFY) {

            // reset all the heights and margins of the Dutch lines

            for (let i = 0; i < rowNLArray.length; i++) {
                rowNLArray[i].style.height = '';
                rowNLArray[i].style.marginTop = '';
            }

            // add spacing between verses

            for (let i = 0; i < rowNLArray.length; i++) {
                if (verseArray[i] !== currVerse) {
                    currVerse = verseArray[i];
                    rowNLArray[i].style.marginTop = '20px';
                }
            }
        }
    }

    const addFryRow = (line, i, element) => {

        rowFryArray.push(element);
        //    verseArray.push(line.verse_num);

        verseArray.push(line.verse_num);
    }

    const addNLRow = (line, i, element) => {

        rowNLArray.push(element);
        if (!showFY) { verseArray.push(line.verse_num); } // only add if the Friesian poem is not shown
    }

    return (
        <>
            <div
                className={`${styles.container_both_paged} 
                ${textSelectable ? '' : styles.no_select} 
                ${fullHeight ? styles.full_height : ''} 
                ${poemDayHeight ? styles.day_height : ''} 
                ${!showFY || !showNL ? styles.show_one : ''}`}
            >
                {showFY &&
                    <div className={styles['lines-container-outer']}>

                        <div className={styles['lines-container-inner']} >

                            {pagedlines.map((line, i) => (

                                <div key={i} ref={(element) => addFryRow(line, i, element)}
                                    className={styles['line-wrapper-fry']}>

                                    <div className={styles['line-num-fry']} >
                                        {showLineNum && <p>{line.line_num}</p>}
                                    </div>

                                    <div className={styles['line-text']}
                                    >
                                        {line.line_type === 'P' &&
                                            <p className={styles['line-para']} dangerouslySetInnerHTML={{ __html: line.line_fry }} />}
                                        {line.line_type !== 'P' &&
                                            <p className={styles['line-normal']} dangerouslySetInnerHTML={{ __html: line.line_fry }} />}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                }
                {showNL &&
                    <div className={styles['lines-container-outer']}>

                        <div className={styles['lines-container-inner']} >

                            {pagedlines.map((line, i) => (

                                <div key={i} ref={(element) => addNLRow(line, i, element)}
                                    className={styles['line-wrapper-nl']}>

                                    <div className={styles['line-text']}
                                    >
                                        {line.line_type === 'P' &&
                                            <p className={styles['line-para']} dangerouslySetInnerHTML={{ __html: line.line_nl }} />}
                                        {line.line_type !== 'P' &&
                                            <p className={styles['line-normal']} dangerouslySetInnerHTML={{ __html: line.line_nl }} />}
                                    </div>

                                    {showLineNum && <div className={styles['line-num-nl']} ><p>{line.line_num}</p></div>}

                                </div>
                            ))}

                        </div>

                    </div>
                }
            </div>

        </>
    )
}


export default PagedLines;
