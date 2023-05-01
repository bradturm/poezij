
import React from "react";
import { DefaultEditor } from 'react-simple-wysiwyg';

import styles from "../../css/LineEditor.module.css";

function LineEditor(props) {            // = ({ setIsOpen }) =>

    const handleHtmlChange = (e) => {

        // invoke functions up the tree to parent

        props.handleHtmlChange(e.target.value);

    }

    return (
        <>
            <div className={styles.darkBG} onClick={() => props.setIsOpen(false)} />
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <h5 className={styles.heading}>Edit</h5>
                    </div>
                    <button className={styles.closeBtn} onClick={() => props.setIsOpen(false)}>
                        {/*            <RiCloseLine style={{ marginBottom: "-3px" }} /> */}
                    </button>
                    <div className={styles.modalContent}>


                        <DefaultEditor value={props.html} onChange={handleHtmlChange} />


                    </div>
                    <div className={styles.modalActions}>
                        <div className={styles.actionsContainer}>
                            <button
                                className={styles.saveBtn}
                                onClick={() => props.setIsOpen(false)}
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

export default LineEditor;