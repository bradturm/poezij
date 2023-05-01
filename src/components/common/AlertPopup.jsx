import React from 'react';
import './AlertPopup.css';

function AlertPopup({
    onClose,
    heading,
    message,
    btn1Label,
    btn2Label,
    btn1Click,
    btn2Click
}) {
    return (
        <div className="popup-overlay">
            <h1>{heading}</h1>
            <p>{message}</p>
            <button onClick={() => {
                btn1Click();
                onClose();
            }}>{btn1Label}</button>
            <button
                onClick={() => {
                    btn2Click();
                    onClose();
                }}
            >
                {btn2Label}
            </button>
        </div>
    );
}

export default AlertPopup;