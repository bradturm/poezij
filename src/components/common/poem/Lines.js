import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { ScrollSync, ScrollSyncNode } from "scroll-sync-react";
import styles from "../../../css/Lines.module.css";
import useResizeObserver from "use-resize-observer";

///////////////////////////////////////////////////////

function Lines({

  setPagination,
  disabled,
  showLineNum,
  textSelectable,
  paged,
  lines,
  fullHeight,
  poemDayHeight,
  showFY,
  showNL

}) {

  const [targetwidth, setTargetWidth] = useState();
  const [targetheight, setTargetHeight] = useState();

  const rowFryArray = [];
  const verseArray = [];
  const rowNLArray = [];


  const target = useRef(null);

  useResizeObserver({
    ref: target,
    onResize: ({ width, height }) => {
      setTargetWidth(width);
      setTargetHeight(height);
    },
  });

  //const FixLineHeights = () => {
  function FixLineHeights() {

    let pageArr = [];
    let pageHeight = 0;
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

        // if the heights are the same (neither wraps or both wrap the same)
        // add this height to the overall height

        if (rowFryArray[i].offsetHeight === rowNLArray[i].offsetHeight) {
          pageHeight = pageHeight + rowFryArray[i].offsetHeight;
        }

        // if the height of the Friesian line is greater than the Dutch one, 
        // increase the height of the Dutch and add this to the overall height

        if (rowFryArray[i].offsetHeight > rowNLArray[i].offsetHeight) {
          rowNLArray[i].setAttribute("style", "height:" + rowFryArray[i].offsetHeight + "px");
          rowNLArray[i].style.height = rowFryArray[i].offsetHeight;
          pageHeight = pageHeight + rowFryArray[i].offsetHeight;
        }

        // if the height of the Dutch line is greater than the Friesian one, 
        // increase the height of the Friesian and add this to the overall height

        if (rowNLArray[i].offsetHeight > rowFryArray[i].offsetHeight) {
          rowFryArray[i].setAttribute("style", "height:" + rowNLArray[i].offsetHeight + "px");
          rowFryArray[i].style.height = rowNLArray[i].offsetHeight;
          pageHeight = pageHeight + rowNLArray[i].offsetHeight;
        }

        // if we have reached the start of a new verse, add spacing between

        if (verseArray[i] !== currVerse) {
          currVerse = verseArray[i];
          if (showFY) { rowFryArray[i].style.marginTop = '20px'; }
          if (showNL) { rowNLArray[i].style.marginTop = '20px'; }
          pageHeight = pageHeight + 20;
        }

        if (pageHeight > targetheight) {

          if (i === 0) {
            fixLongLine(rowFryArray[i], targetheight);
          }
          pageArr.push(i + 1);
          pageHeight = 0 + rowFryArray[i].offsetHeight;
        }
      }
      setPagination(pageArr);
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

      for (let i = 0; i < rowFryArray.length; i++) {

        pageHeight = pageHeight + rowFryArray[i].offsetHeight;

        // if we have reached the start of a new verse, add spacing between
        if (verseArray[i] !== currVerse) {
          currVerse = verseArray[i];
          rowFryArray[i].style.marginTop = '20px';
          pageHeight = pageHeight + 20;
        }

        if (pageHeight > targetheight) {

          if (i === 0) {
            fixLongLine(rowFryArray[i], targetheight);
          }
          pageArr.push(i + 1);
          pageHeight = 0 + rowFryArray[i].offsetHeight;
        }
      }
      setPagination(pageArr);
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

      for (let i = 0; i < rowNLArray.length; i++) {

        pageHeight = pageHeight + rowNLArray[i].offsetHeight;

        // if we have reached the start of a new verse, add spacing between
        if (verseArray[i] !== currVerse) {
          currVerse = verseArray[i];
          rowNLArray[i].style.marginTop = '20px';
          pageHeight = pageHeight + 20;
        }

        if (pageHeight > targetheight) {

          if (i === 0) {
            fixLongLine(rowNLArray[i], targetheight);
          }
          pageArr.push(i + 1);
          pageHeight = 0 + rowNLArray[i].offsetHeight;
        }
      }
      setPagination(pageArr);
    }
  }

  function fixLongLine(row, targetheight) {

    row.style.height = '';

    console.log("the long line is " + row.childNodes[1].innerText);
    let words = row.childNodes[1].innerText.split(' ');

    console.log("words length is " + words.length);
    let currline = ""
    let newline = "";
    let newrow1 = row.cloneNode(true);
    console.log(newrow1.childNodes[1].innerText);
    let newrow2 = row.cloneNode(true);
    for (let i = 0; i < words.length; i++) {
      currline = newline;
      newline = newline + " " + words[i];
      row.childNodes[1].innerText = newline;
      //console.log("word is " + words[i]);
      // console.log("row.offsetHeight is " + row.offsetHeight);
      if (row.offsetHeight > targetheight) {

        row.childNodes[1].innerText = currline;
        //console.log("word is " + words[i]);
        console.log(" row offsetheight is " + row.offsetHeight);
        console.log("targetheight is " + targetheight);
        newrow1.childNodes[1].innerText = currline;
        newrow2.childNodes[1].innerText = words.slice(i).join(' ');
        console.log("second string is " + words.slice(i).join(' '));
        break
      }

      console.log("newrow2.childNodes[1].innerText is " + newrow2.childNodes[1].innerText);
      //  return { row1: row, row2: newrow2 }
      //   console.log("newrow1: " + newrow1.childNodes[1].innerText);
      //   console.log("newrow2: " + newrow2.childNodes[1].innerText);

    }
  }

  ////////////////////////////////////////////////

  useLayoutEffect(() => {

    FixLineHeights();

  }, [lines, targetwidth, targetheight, showFY, showNL]);

  // }, [props.lines, targetwidth, targetheight], FixLineHeights);

  /////////////////////////////////////////////////

  const addFryRow = (line, i, element) => {

    rowFryArray.push(element);
    verseArray.push(line.verse_num);
  }

  const addNLRow = (line, i, element) => {

    rowNLArray.push(element);
    if (!showFY) { verseArray.push(line.verse_num); } // only add if the Friesian poem is not shown
  }

  /////////////////////////////////////////////////

  const handleFryCellClick = (i) => {
    console.log("clicked in a FRY line cell")
  };
  const handleNLCellClick = (i) => {
    console.log("clicked in an NL line cell")
  };
  const handleFryCellMouseDown = (i) => {
    console.log("mouse down in a FRY line cell")
  };
  const handleNLCellMouseDown = (i) => {
    console.log("mouse down in a FRY line cell")
  };

  /////////////////////////////////////////////////

  const [mounted1, setMounted1] = React.useState(false);
  const [mounted2, setMounted2] = React.useState(false);

  let ref1 = useRef(null);
  let ref2 = useRef(null);

  const { events: events1 } = useDraggable(ref1, {
    applyRubberBandEffect: true, // activate rubber band effect 
    safeDisplacement: 10, // specify the drag sensitivity default 10
    decayRate: 0.97, // specify the decay rate default 0.95
    isMounted: mounted1,

  });

  const { events: events2 } = useDraggable(ref2, {
    applyRubberBandEffect: true,
    safeDisplacement: 10,
    decayRate: 0.97,
    isMounted: mounted2,
  });

  // need to unmount useDraggable if lines are not rendered
  useEffect(() => {
    setMounted1(showFY);
    setMounted2(showNL);
  }, [showFY, showNL]);

  /////////////////////////////////////////////////

  return (
    <>
      <ScrollSync disabled={disabled}>

        <div ref={target}
          className={`${styles.container_both_scroll} 
          ${paged ? styles.hidden : ''} 
          ${fullHeight ? styles.full_height : ''} 
          ${poemDayHeight ? styles.day_height : ''} 
          ${!showFY || !showNL ? styles.show_one : ''}`}
        >
          {showFY &&
            <div className={styles['lines-container-outer']} >
              <ScrollSyncNode group="a">
                <div className={styles['lines-container-inner']} {...events1} ref={ref1}>

                  {lines && lines.map((line, i) => (

                    <div key={i} ref={(element) => addFryRow(line, i, element)}
                      className={styles['line-wrapper-fry']}>

                      <div className={styles['line-num-fry']} >
                        {showLineNum && <p>{line.line_num}</p>}
                      </div>

                      <div className={styles['line-text']} onClick={() => handleFryCellClick(i)}
                        onMouseDown={() => handleFryCellMouseDown(i)} >
                        {line.line_type === 'P' &&
                          <p className={styles['line-para']} dangerouslySetInnerHTML={{ __html: line.line_fry }} />}
                        {line.line_type !== 'P' &&
                          <p className={styles['line-normal']} dangerouslySetInnerHTML={{ __html: line.line_fry }} />}
                      </div>
                    </div>
                  ))}


                </div>
              </ScrollSyncNode>
            </div>
          }
          {showNL &&
            <div className={styles['lines-container-outer']} >
              <ScrollSyncNode group="a">
                <div className={styles['lines-container-inner']} {...events2} ref={ref2}>

                  {lines && lines.map((line, i) => (

                    <div key={i} ref={(element) => addNLRow(line, i, element)}
                      className={styles['line-wrapper-nl']}>

                      <div className={styles['line-text']} onClick={() => handleNLCellClick(i)}
                        onMouseDown={() => handleNLCellMouseDown(i)} >
                        {line.line_type === 'P' &&
                          <p className={styles['line-para']} dangerouslySetInnerHTML={{ __html: line.line_nl }} />}
                        {line.line_type !== 'P' &&
                          <p className={styles['line-normal']} dangerouslySetInnerHTML={{ __html: line.line_nl }} />}
                      </div>

                      {showLineNum && <div className={styles['line-num-nl']} ><p>{line.line_num}</p></div>}

                    </div>
                  ))}

                </div>

              </ScrollSyncNode>
            </div>
          }
        </div>
      </ScrollSync>
    </>
  )
}

export default Lines;

