import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import Poem from "../common/poem/Poem";

import styles from "../../css/Poems.module.css";

export default function PoemOfDay({
    poem,
    poemID,
    poemDayHeight
}) {

    return (
        <>

            <div className={styles['poem_day_container']}>
                <h1>Poem of the Day</h1>
                <Poem
                    poemID={poemID}
                    poem={poem}
                    poemDayHeight={poemDayHeight}
                />
            </div>

        </>
    )
}