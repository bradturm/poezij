import { useRef, useContext } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { AppContext } from "../../context/AppContext";

import styles from "../../css/Notes.module.css";

function Notes(props) {

    const context = useContext(AppContext);

    const ref1 = useRef(); // We will use React useRef hook to reference the wrapping div:

    const { events: events1 } = useDraggable(ref1, {
        applyRubberBandEffect: true, // activate rubber band effect 
        safeDisplacement: 10, // specify the drag sensitivity default 10
        decayRate: 0.99, // specify the decay rate default 0.95
    });

    return (
        <>

            {/*
            <div className={styles.lines_fry_container}  // add reference and events to the wrapping div
            >
*/}


            <div {...events1} ref={ref1} className={`${styles.notes}`}>

                {(context.selectedPoem && (context.selectedPoem?.lines) && (context.lang === "en" || context.lang === "fy")) &&
                    <div>
                        {context.selectedPoem.lines.map(line => (
                            (line.note_fry) &&
                            <p key={line.line_id}>
                                {line.line_num}&nbsp;&nbsp;{line.note_fry}
                            </p>
                        ))}
                    </div>
                }
                {context.selectedPoem?.lines && context.lang === "nl" &&
                    <div>
                        {context.selectedPoem.lines.map(line => (
                            (line.note_nl) &&
                            <p key={line.line_id}>
                                {line.line_num}&nbsp;&nbsp;{line.note_nl}
                            </p>
                        ))}
                    </div>
                }
            </div>
        </>
    )
}

export default Notes;