import React, { useState } from 'react';
import { Knob } from 'primereact/knob';
import 'primereact/resources/primereact.css';
import '../../../css/vol-knob.css';

function VolKnob({ volume, setVolume }) {
    const [showKnob, setShowKnob] = useState(false);

    const knobChange = (e) => {
        setVolume(e.value);
    };

    const handleMouseEnter = () => {
        setShowKnob(true);
    }
    const handleMouseLeave = () => {
        setShowKnob(false);
    }
    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`knob_container${showKnob ? " show" : ""}`}>
            <div className="knob-outer">
                <Knob className="knob"
                    value={volume}
                    min={0}
                    max={100}
                    strokeWidth={10}
                    size={60}
                    valueColor={"#5b0eeb"}
                    rangeColor={"#c9d3e5"}
                    showValue={false}
                    onChange={knobChange} />
                {volume === 0 &&
                    <img className="vol-icon" alt="" src="assets/images/vol-mute.svg" />}
                {volume > 0 && volume < 41 &&
                    <img className="vol-icon" alt="" src="assets/images/vol-low.svg" />}
                {volume > 40 && volume < 71 &&
                    <img className="vol-icon" alt="" src="assets/images/vol-med.svg" />}
                {volume > 70 &&
                    <img className="vol-icon" alt="" src="assets/images/vol-high.svg" />}
            </div>
        </div>
    )
}

export default VolKnob