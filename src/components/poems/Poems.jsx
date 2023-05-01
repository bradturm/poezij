import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";

import MoreFromPoet from "./MoreFromPoet";
import Notes from "./Notes";
import PoemList from "./PoemList";
import Search from "./Search";
import Filter from "./Filter";
import PoetDetails from "./PoetDetails";
import MoreInfo from "./MoreInfo";
import Commentary from "./Commentary";
import AudioPlayer from "../audio-player/AudioPlayer";
import Poem from "../common/poem/Poem";

import styles from "../../css/Poems.module.css";

import { poemService } from '../../services/poem-service';
import { poetService } from '../../services/poet-service';
import { accountService } from '../../services/account-service';

export default function Poems({

    textSelectable,
    setTextSelectable,
    paged,
    setPaged

}) {

    const context = useContext(AppContext);

    const [showNotes, setShowNotes] = useState(true);
    const [showCommentary, setShowCommentary] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [poemsPopupShown, setPoemsPopupShown] = useState(false);
    const [searchShown, setSearchShown] = useState(false);
    const [filterShown, setFilterShown] = useState(false);
    const [poetDetailsShown, setPoetDetailsShown] = useState(false);
    const [moreInfoShown, setMoreInfoShown] = useState(false);

    const user = accountService.userValue;

    const toggleShowNotes = () => {
        if (showNotes) { setShowNotes(false) }
        else { setShowNotes(true) }
    };

    const toggleShowCommentary = () => {
        if (showCommentary) { setShowCommentary(false) }
        else { setShowCommentary(true) }
    };

    const showPoemList = () => { setPoemsPopupShown(true) };
    const showSearch = () => { setSearchShown(true) };
    const showFilter = () => { setFilterShown(true) };
    const savePoemToDb = () => { context.saveSelectedPoemToDb(); };
    const showPoetDetails = () => {
        const poet_id = context.selectedPoem.poet_id;
        console.log("poetId is " + JSON.stringify(poet_id));
        poetService.getById(poet_id).then(x => context.setPoetDetails(x));
        setPoetDetailsShown(true)
    };
    const showMoreInfo = () => { setMoreInfoShown(true) };

    useEffect(() => {
        poemService.getList().then(x => context.setPoemList(x));
        poemService.getTypes().then(x => context.setTypes(x));
        poemService.getThemes().then(x => context.setThemes(x));
        poemService.getLevels().then(x => context.setLevels(x));
        poemService.getLineTypes().then(x => context.setLineTypes(x));

    }, [context.setPoemList, context.setTypes, context.setThemes, context.setLineTypes]);

    return (
        <>
            <div className={styles['poem-page']}>
                <PoemList
                    poemList={context.poemList}
                    poemsPopupShown={poemsPopupShown}
                    selectedPoemID={context.selectedPoemID}
                    setSelectedPoemID={context.setSelectedPoemID}
                    setPoemsPopupShown={setPoemsPopupShown}
                    setCurrentPage={setCurrentPage}
                />

                <Search
                    searchShown={searchShown}
                    selectedPoemID={context.selectedPoemID}
                    setSelectedPoemID={context.setSelectedPoemID}
                    setSearchShown={setSearchShown}
                    setCurrentPage={setCurrentPage}
                />

                <Filter
                    filterShown={filterShown}
                    setFilterShown={setFilterShown}
                    poemList={context.poemList}
                    types={context.types}
                    themes={context.themes}
                    levels={context.levels}
                    selectedPoemID={context.selectedPoemID}
                    setSelectedPoemID={context.setSelectedPoemID}
                    setCurrentPage={setCurrentPage}
                />
                <PoetDetails
                    poetDetailsShown={poetDetailsShown}
                    setPoetDetailsShown={setPoetDetailsShown}
                    setCurrentPage={setCurrentPage}
                />
                <MoreInfo
                    moreInfoShown={moreInfoShown}
                    setMoreInfoShown={setMoreInfoShown}
                    setCurrentPage={setCurrentPage}
                />

                <div className={styles['poem_page_grid']}>
                    {!(context.selectedPoemID) &&
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
                    {context.selectedPoemID &&
                        <div className={styles.poem_container}>
                            <Poem
                                poemID={context.selectedPoemID}
                                poem={context.selectedPoem}
                                paged={paged}
                                setPaged={setPaged}
                                textSelectable={textSelectable}
                                poet={context.poet}
                            />
                        </div>
                    }
                    <div className={styles.notes}>
                        < Notes
                            lang={context.lang}
                        />
                    </div>

                    <div className={styles['audio-player']}>
                        <AudioPlayer
                            poem={context.selectedPoem}
                            lang={context.lang}
                        />
                    </div>

                    <div className={styles['button-bar2']}>

                        {user?.role === "Admin" &&
                            <div onClick={savePoemToDb} className={styles['poem_btn']}>
                                <img alt="" src="assets/images/save.svg" />
                            </div>
                        }
                        <div onClick={showFilter} className={styles['poem_btn']}>
                            <img alt="" src="assets/images/filter.svg" />
                        </div>
                        <div onClick={showPoemList} className={styles['poem_btn']}>
                            <img alt="" src="assets/images/show-poems.svg" />
                        </div>
                        <div onClick={showMoreInfo} className={styles['poem_btn']}>
                            <img alt="" src="assets/images/more-info-circle.svg" />
                        </div>
                        <div onClick={showPoetDetails} className={styles['poem_btn']}>
                            <img alt="" src="assets/images/poet.svg" />
                        </div>
                        <div onClick={showSearch} className={styles['poem_btn']}>
                            <img alt="" src="assets/images/search.svg" />
                        </div>
                        <div onClick={toggleShowNotes} className={styles['poem_btn']}>
                            <img className={showNotes ? styles['on'] : styles['off']} alt="" src="assets/images/hide-notes.svg" />
                            <img className={showNotes ? styles['off'] : styles['on']} alt="" src="assets/images/show-notes.svg" />
                        </div>
                        <div onClick={toggleShowCommentary} className={styles['poem_btn']}>
                            <img className={showCommentary ? styles['on'] : styles['off']} alt="" src="assets/images/hide-commentary.svg" />
                            <img className={showCommentary ? styles['off'] : styles['on']} alt="" src="assets/images/show-commentary.svg" />
                        </div>

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

                            < Commentary
                                commentary_fy={context.selectedPoem?.commentary_fry}
                                commentary_nl={context.selectedPoem?.commentary_nl}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}