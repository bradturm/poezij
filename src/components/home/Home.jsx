import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";

import Dashboard from "./Dashboard";
import Latest from "./Latest";
import PoemOfDay from "./PoemOfDay";
import Welcome from "./Welcome";
import MoreFromPoet from "../poems/MoreFromPoet";

import styles from "../../css/Home.module.css";

import { poemService } from '../../services/poem-service';
import { accountService } from '../../services/account-service';

export default function Home() {

    const context = useContext(AppContext);
    const user = accountService.userValue;

    const [shownPoems, setShownPoems] = useState([]);
    const [poemDay, setPoemDay] = useState(null);
    const [progress, setProgress] = useState(40);

    useEffect(() => {

        poemService.getDay().then(x => setPoemDay(x));

        //   const poemDayID = generateUniqueRandom(100);
        //   poemService.getById(poemDayID).then(x => setPoemDay(x));
    }, []);

    const showPoemList = () => { console.log("clicked") };
    const showSearch = () => { console.log("clicked") };
    // 
    const showFilter = () => { console.log("clicked") };
    const savePoemToDb = () => { console.log("clicked") };

    return (
        <>
            <div>



                <div className={styles.home_page_grid}>

                    <div className={styles.welcome}>
                        <Welcome />
                    </div>

                    {!poemDay &&
                        <div className={styles.no_poem_grid}>
                            <p>Welcome to the Poems page.</p>
                            <p>Select from a list of <span className={styles['poem_link']} onClick={showPoemList}>all the poems
                            </span> in the collection (or click the <span className={styles['poem_btn_icon']} onClick={showPoemList}>
                                    <img alt="" src="assets/images/show-poems.svg" /></span> button at any time to view the
                                list), <span className={styles['poem_link']} onClick={showSearch}>search</span> for poems containing
                                certain words (or click the <span className={styles['poem_btn_icon']} onClick={showSearch}>
                                    <img alt="" src="assets/images/search.svg" /></span> button), or <span className={styles['poem_link']}
                                        onClick={showFilter}>filter</span> the poems to view only those from a particular poet or of particular types or levels
                                of difficulty, or addressing certain themes (or click the <span className={styles['poem_btn_icon']}
                                    onClick={showFilter}> <img alt="" src="assets/images/filter.svg" /></span> button).
                            </p>
                        </div>

                    }
                    {poemDay &&
                        <div className={styles.poem_day_container}>
                            <PoemOfDay
                                poemID={poemDay.poem_id}
                                poem={poemDay}
                                poemDayHeight={true}
                            />
                        </div>
                    }
                    <div className={styles.latest}>
                        < Latest
                            lang={context.lang}
                        />
                    </div>

                    <div className={styles['audio-player']}>

                    </div>

                    <div className={styles['button-bar2']}>



                    </div>

                    <div className={styles.sidebar}>
                        <div className={styles.commentary}>
                            {context.moreFrom &&
                                <div className={styles['more-from']}>
                                    <MoreFromPoet
                                        poet={context.poet}
                                        moreFrom={context.moreFrom}
                                    />
                                </div>
                            }
                            <div className={styles.dashboard}>
                                < Dashboard
                                    progress={progress}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}