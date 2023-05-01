import React, { useContext } from "react";
import { useTranslation } from 'react-i18next';

import { AppContext } from "../../context/AppContext";

import styles from "../../css/PoemList.module.css";

function PoetDetails({

    poetDetailsShown,
    setPoetDetailsShown,
    setCurrentPage

}) {

    const context = useContext(AppContext);
    const { t } = useTranslation();

    const handleCloseClick = () => { setPoetDetailsShown(false); };

    return (
        <>
            {poetDetailsShown && context.poetDetails &&
                <div>
                    <div className={`${styles.popup_background}`} />
                    <div className={`${styles.search_popup}`}>
                        <div className={styles.modalHeader}>
                            <h5 className={styles.heading}>
                                {context.poetDetails.first_names}
                                {context.poetDetails.prefix ? context.poetDetails.prefix : " "}
                                {context.poetDetails.last_name}
                            </h5>
                        </div>
                        <button className={styles.closeBtn} onClick={() => handleCloseClick()}>
                            <img className={styles.close_btn} alt="" src="assets/images/close.svg" />
                        </button>
                        <div className={styles.selects_container_grid}>
                            <div className={styles.results}>
                                {context.poetDetails && (context.lang === "fy" || context.lang === "en") &&
                                    <p dangerouslySetInnerHTML={{ __html: context.poetDetails.bio_fy }}></p>
                                }
                                {context.poetDetails && context.lang === "nl" &&
                                    <p dangerouslySetInnerHTML={{ __html: context.poetDetails.bio_nl }}></p>
                                }
                                {context.poetDetails && (context.poetDetails.links.length > 0) &&
                                    <>
                                        <h3>{t('links')}</h3>
                                        <div>
                                            {context.poetDetails.links.map((l, i) => (
                                                <p key={i}>
                                                    <a
                                                        href={l.link}
                                                        target="_blank"
                                                        rel="noreferrer">
                                                        {(context.lang === "fy" || context.lang === "en") && l.link_text_fy}
                                                        {context.lang === "nl" && l.link_text_nl}
                                                    </a>
                                                </p>
                                            ))}
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default PoetDetails;