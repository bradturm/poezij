import React, { useState } from "react";
import styles from "../../css/Editor.module.css";
import HTMLEditor from "../HTMLEditor"


function Editor() {



    return (

        <div className={`${styles.page_container}`}>
            <HTMLEditor />
        </div>
    );
}

export default Editor;
