import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import styles from "../../css/VideoPlayer.module.css";

const VideoOverlay = ({
    shown,
    setPlaying,
    cues,
    setCueReached,
    currentCue
}) => {

    const context = useContext(AppContext);

    const resumePlay = () => {
        setPlaying(true);
        setCueReached(false);
    }

    return (
        <>
            {((currentCue <= cues.length) && (currentCue != null)) &&
                <div className={`${styles.overlay_container} ${shown ? styles['on'] : styles['off']}`} onClick={resumePlay} >
                    {(context.lang === "fy" || context.lang === "en") &&
                        <div dangerouslySetInnerHTML={{ __html: cues[currentCue - 1].cue_text_fy }} />}
                    {(context.lang === "nl") &&
                        <div dangerouslySetInnerHTML={{ __html: cues[currentCue - 1].cue_text_nl }} />}
                </div>
            }
        </>
    )
}

export default VideoOverlay;