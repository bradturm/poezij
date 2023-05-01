
import { useState, useRef, useEffect, useContext } from "react";
import ReactPlayer from "react-player";

import { AppContext } from "../../context/AppContext";
import VideoOverlay from "./VideoOverlay";
import { config } from '../../config';

import styles from "../../css/VideoPlayer.module.css";

export default function YouTubePlayer({
    filename,
    cues
}) {

    const [playing, setPlaying] = useState(false);
    const [currentCue, setCurrentCue] = useState(1);
    const [nextCue, setNextCue] = useState(1);
    const [cueReached, setCueReached] = useState(false);

    const context = useContext(AppContext);
    const baseUrl = `${config.apiUrl}`;

    const player = useRef();

    // set the language of subtitle track shown when first loaded
    const handleReady = () => {
        const textTracks = player.current.getInternalPlayer()?.textTracks;
        for (var i = 0; textTracks?.length && i < textTracks.length; i++) {
            if (textTracks[i].language === context.lang) {
                textTracks[i].mode = "showing";
            } else {
                textTracks[i].mode = "hidden";
            }
        }
    }

    // the user has changed the position of the video. Recalculate the next cue
    const handleSeek = (time) => {

        if (player.current.getInternalPlayer()) {
            player.current.getInternalPlayer().pause();
        }

        let newCue = null;
        //  let cueFound = false;
        for (let i = 0; i < cues.length; ++i) {
            // find the first cue time that is greater than current position
            if (cues[i].cue_time > time) {
                newCue = cues[i].cue;
                //      cueFound = true;
                break
            }
        }
        setNextCue(newCue);
    }

    // display messages at cue points
    const handleProgress = (e) => {
        let newCue = null;
        let cueFound = false;
        for (let i = 0; i < cues.length; ++i) {
            // find the first cue time that is greater than current position
            if (cues[i].cue_time > e.playedSeconds) {
                newCue = cues[i].cue;
                cueFound = true;
                break
            }
        }
        if (!cueFound && nextCue == null)       // there are no more cues, and nextCue has already 
        { return }                              // been set to null, so do nothing.

        if (newCue !== nextCue) {                // we have passed a cue point.
            setPlaying(false);
            setCurrentCue(nextCue);
            setNextCue(newCue);
            setCueReached(true);
            if (player.current.getInternalPlayer()) {
                player.current.getInternalPlayer().pauseVideo();
            }
        }
    }

    // handle changes in language while viewing video
    useEffect(() => {
        if (context.lang === "fy" || context.lang === "nl") {
            const textTracks = player.current.getInternalPlayer()?.textTracks;
            for (var i = 0; textTracks?.length && i < textTracks.length; i++) {
                if (textTracks[i].language === context.lang) {
                    textTracks[i].mode = "showing";
                } else {
                    textTracks[i].mode = "hidden";
                }
            }
        }
    }, [context.lang, playing]);

    // if user moves to new section, pause the video
    useEffect(() => {
        if (context.currentSlide) {
            setPlaying(false);
            if (player.current.getInternalPlayer()) {
                player.current.getInternalPlayer().pauseVideo();
            }
        }
    }, [context.currentSlide]);

    return (
        <>
            <div className={`${styles.player_container_youtube}`}>
                <VideoOverlay
                    shown={cueReached}
                    setPlaying={setPlaying}
                    cues={cues}
                    setCueReached={setCueReached}
                    currentCue={currentCue}
                />
                <ReactPlayer
                    className={`${styles.react_player}`}
                    ref={player}

                    config={{
                        youtube: {
                            playerVars: {
                                showinfo: 1,
                                cc_lang_pref: context.lang,
                                cc_load_policy: 1,
                                enablejsapi: 1,
                                modestbranding: 1,
                                hl: context.lang,
                                iv_load_policy: 3,
                                loop: 1
                            }
                        },
                        file: {
                            attributes: {
                                crossOrigin: "anonymous"
                            },
                            tracks: [
                                {
                                    kind: "subtitles",
                                    src: baseUrl + "/files/subtitles?file=" + filename.replace('.mp4', '-fy.vtt'),
                                    srcLang: "fy",
                                    default: false,
                                    mode: context.lang === "fy" ? "showing" : "hidden"
                                },
                                {
                                    kind: "subtitles",
                                    src: baseUrl + "/files/subtitles?file=" + filename.replace('.mp4', '-nl.vtt'),
                                    srcLang: "nl",
                                    default: false,
                                    mode: context.lang === "nl" ? "showing" : "hidden"
                                }
                            ]
                        }
                    }}
                    url={`${baseUrl}/files/video?file=${filename}`}
                    playing={playing}
                    controls={true}
                    onReady={handleReady}
                    onProgress={handleProgress}
                    onSeek={handleSeek}
                    width="100%"
                    height="100%"
                />
            </div>
        </>
    );
}
