
import React, { useState, useEffect } from "react"
import Creatable from 'react-select/creatable';

import styles from "../../css/LineEditor.module.css";

function LineTypeEditor(props) {

    const [optionsTypes, setOptionsTypes] = useState([]);
    const [typeValue, setTypeValue] = useState([]);

    const handleLineTypeChange = (value) => {

        setTypeValue(value);

        if (value === null) {
            props.handleLineTypeChange(null);
            return
        }
        props.handleLineTypeChange(value.value);
    }

    useEffect(() => {

        if (props.lineTypes) {

            let optionsArr = [];
            for (let i = 0; i < props.lineTypes.length; i++) {
                const type = props.lineTypes[i];
                let optionObj = {};
                optionObj.value = type.line_type;

                if (type.line_type === 'D') { optionObj.label = 'Dedication' }
                if (type.line_type === 'P') { optionObj.label = 'Prose' }
                if (type.line_type === 'S') { optionObj.label = 'Subheading' }
                if (type.line_type === 'H') { optionObj.label = 'Heading' }
                if (type.line_type === 'F') { optionObj.label = 'Footnote' }
                if (type.line_type === 'Q') { optionObj.label = 'Quote' }

                optionsArr.push(optionObj);
            }
            setOptionsTypes(optionsArr);
        }

        if (props.lineType) {

            let type = props.lineType;
            let typeObj = {};

            typeObj.value = type;

            if (type === 'D') { typeObj.label = 'Dedication' }
            if (type === 'P') { typeObj.label = 'Prose' }
            if (type === 'S') { typeObj.label = 'Subheading' }
            if (type === 'H') { typeObj.label = 'Heading' }
            if (type === 'F') { typeObj.label = 'Footnote' }
            if (type === 'Q') { typeObj.label = 'Quote' }

            setTypeValue(typeObj);
        }

    }, [props.lineType, props.lineTypes]);


    return (
        <>
            <div className={styles.darkBG} onClick={() => props.setLineTypeIsOpen(false)} />
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <h5 className={styles.heading}>Set Line Type</h5>
                    </div>
                    <button className={styles.closeBtn} onClick={() => props.setLineTypeIsOpen(false)}>
                        {/*            <RiCloseLine style={{ marginBottom: "-3px" }} /> */}
                    </button>
                    <div className={styles.modalContent}>

                        <Creatable
                            isClearable
                            options={optionsTypes}
                            onChange={(value) => handleLineTypeChange(value)}
                            value={typeValue}
                        />

                    </div>
                    <div className={styles.modalActions}>
                        <div className={styles.actionsContainer}>
                            <button
                                className={styles.saveBtn}
                                onClick={() => props.setLineTypeIsOpen(false)}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LineTypeEditor