import React, { useContext } from "react";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import Parser from "./Parser";

import { AppContext } from "../../context/AppContext";
import styles from "../../css/Commentary.module.css";

function Commentary(props) {

    const context = useContext(AppContext);

    const ref1 = useRef(); // We will use React useRef hook to reference the wrapping div:

    const { events: events1 } = useDraggable(ref1, {
        applyRubberBandEffect: true, // activate rubber band effect 
        safeDisplacement: 10, // specify the drag sensitivity default 10
        decayRate: 0.99, // specify the decay rate default 0.95
    });

    return (
        <>
            <div {...events1} ref={ref1} className={`${styles.commentary}`}>

                <div className={`${styles.commentary_title}`} >
                    {props.commentary_title_fry &&
                        <p dangerouslySetInnerHTML={{ __html: props.commentary_title_fry }} />}
                    {!props.commentary_title_fry &&
                        <p>The title of the commentary</p>}
                </div>

                <div className={`${styles.commentary_intro}`} >
                    {props.short_desc_fry &&
                        <p dangerouslySetInnerHTML={{ __html: props.short_desc_fry }} />}
                    {!props.short_desc_fry &&
                        <p>A short description or summary of the poem</p>}
                </div>

                <div className={`${styles.commentary_body}`}>

                    {(context.lang === "fy" || context.lang === "en") &&
                        <div>
                            <Parser
                                commentary={props.commentary_fy}
                            />
                        </div>
                    }
                    {(context.lang === "nl") &&
                        <div>
                            <Parser
                                commentary={props.commentary_nl}
                            />
                        </div>
                    }

                </div>
            </div>
        </>
    )
}


export default Commentary;