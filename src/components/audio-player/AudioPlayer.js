import { useState, useEffect, useRef } from 'react'
import PlayButton from './controls/PlayButton'
import Slider from './controls/Slider'
import VolKnob from './controls/VolKnob'
import { config } from '../../config';

import '../../css/audio-player.css'

function AudioPlayer({ poem, lang }) {
    const [percentage, setPercentage] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [volume, setVolume] = useState(50)

    const audioRef = useRef();
    const baseUrl = `${config.apiUrl}`;

    useEffect(() => {
        const audio = audioRef.current;
        audio.volume = volume / 100;

    }, [volume])

    useEffect(() => {

        if (lang && poem) {

            //audio.src is of the form: "http://localhost:4000/files/audio?file=hege-flecht-fy"

            const audio = audioRef.current;
            audio.pause();
            setIsPlaying(false);
            setCurrentTime(0);
            setPercentage(0);

            if (poem.audio_file) {
                const suffix = (lang === 'en') ? 'fy' : lang;  // use Friesian file if language set to English
                const filename = poem.audio_file + "-" + suffix;
                audio.src = `${baseUrl}/files/audio?file=${filename}`;
            }
        }

    }, [poem, lang, baseUrl])


    const onChange = (e) => {
        const audio = audioRef.current

        audio.currentTime = (audio.duration / 100) * e.target.value;
        setPercentage(e.target.value);
    }

    const play = () => {

        const audio = audioRef.current;

        audio.volume = volume / 100;

        if (!isPlaying) {
            setIsPlaying(true)
            audio.play()
        }
        if (isPlaying) {
            setIsPlaying(false)
            audio.pause()
        }
    }

    const getCurrDuration = (e) => {
        const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
        const time = e.currentTarget.currentTime

        setPercentage(+percent)
        setCurrentTime(time.toFixed(2))
        if (currentTime === duration) {
            setIsPlaying(false);
        }
        if (percentage > 99.5) {
            // setIsPlaying(false);
            const audio = audioRef.current;
            audio.pause();
            setIsPlaying(false);
            setCurrentTime(0);
            setPercentage(0);
        }
    }

    return (
        <div className='app-container'>
            <div className="player-container">
                <div className="play-button">
                    <PlayButton
                        play={play}
                        isPlaying={isPlaying}
                    />
                </div>
                <div className={`vol-knob${isPlaying ? " show" : ""}`}>
                    <VolKnob
                        volume={volume}
                        setVolume={setVolume}
                    />
                </div>
                <div className={`slider${isPlaying ? " show" : ""}`}>
                    <Slider
                        percentage={percentage}
                        onChange={onChange}
                        duration={duration}
                        currentTime={currentTime}
                    />
                </div>
                <audio
                    ref={audioRef}
                    onTimeUpdate={getCurrDuration}
                    onLoadedData={(e) => {
                        setDuration(e.currentTarget.duration.toFixed(2))
                    }}
                    volume={volume / 100}
                ></audio>
            </div>
        </div>
    )
}

export default AudioPlayer
