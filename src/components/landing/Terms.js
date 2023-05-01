
import { useTranslation } from 'react-i18next';

import styles from "../../css/Terms.module.css";

function Terms(props) {

    const { t } = useTranslation();

    const handleCloseClick = () => {
        props.setTermsPopupShown(false);
    };

    return (
        <>
            {props.termsPopupShown &&
                <div>
                    <div className={`${styles.popup_background}`} />
                    <div className={`${styles.poem_list_popup}`}>
                        <div className={styles.modalHeader}>
                            <h5 className={styles.heading}>{t('terms_title')}</h5>
                        </div>
                        <button className={styles.closeBtn} onClick={() => handleCloseClick()}>
                            {/*            <RiCloseLine style={{ marginBottom: "-3px" }} /> */}
                        </button>
                        <div className={`${styles.popup_container_outer}`} >
                            <div className={`${styles.popup_container_inner}`} >
                                <div className={`${styles.terms_text}`} >
                                    <p>{t('terms_1')}</p>
                                    <h1>{t('terms_2')}</h1>
                                    <h2>{t('terms_3')}</h2>
                                    <p>{t('terms_4')} {t('terms_5')}</p>
                                    <h2>{t('terms_6')}</h2>
                                    <p>{t('terms_7')}</p>
                                    <ul>
                                        <li><p>{t('terms_8')}</p></li>
                                        <li><p>{t('terms_9')}</p></li>
                                        <li><p>{t('terms_10')}</p></li>
                                        <li><p>{t('terms_11')}</p></li>
                                        <li><p>{t('terms_12')}</p></li>
                                        <li><p>{t('terms_13')}</p></li>
                                        <li><p>{t('terms_14')}</p></li>
                                        <li><p>{t('terms_15')} <a href="http://poezielezer.com" rel="external nofollow noreferrer" target="_blank">http://poezielezer.com</a>.</p></li>
                                        <li><p>{t('terms_16')}</p></li>
                                    </ul>
                                    <h1>{t('terms_17')}</h1>
                                    <p>{t('terms_18')}</p>
                                    <p>{t('terms_19')}</p>
                                    <p>{t('terms_20')}</p>
                                    <p>{t('terms_21')}</p>
                                    <p>{t('terms_22')}</p>
                                    <h1>{t('terms_23')}</h1>
                                    <p>{t('terms_23a')}</p>
                                    <p>{t('terms_24')}</p>
                                    <p>{t('terms_25')}</p>
                                    <h1>{t('terms_26')}</h1>
                                    <p>{t('terms_27')}</p>
                                    <p>{t('terms_28')}</p>
                                    <h1>{t('terms_29')}</h1>
                                    <p>{t('terms_30')}</p>
                                    <p>{t('terms_31')}</p>
                                    <p>{t('terms_32')}</p>
                                    <h1>{t('terms_33')}</h1>
                                    <p>{t('terms_34')}</p>
                                    <p>{t('terms_35')}</p>
                                    <p>{t('terms_36')}</p>
                                    <h1>{t('terms_37')}</h1>
                                    <p>{t('terms_38')}</p>
                                    <h1>{t('terms_39')}</h1>
                                    <p>{t('terms_40')}</p>
                                    <h1>{t('terms_41')}</h1>
                                    <p>{t('terms_42')}</p>
                                    <h1>{t('terms_43')}</h1>
                                    <p>{t('terms_44')}</p>
                                    <h1>{t('terms_44a')}</h1>
                                    <h2>{t('terms_45')}</h2>
                                    <p>{t('terms_46')}</p>
                                    <h2>{t('terms_47')}</h2>
                                    <p>{t('terms_48')}</p>
                                    <h1>{t('terms_49')}</h1>
                                    <p>{t('terms_50')}</p>
                                    <h1>{t('terms_51')}</h1>
                                    <p>{t('terms_52')}</p>
                                    <p>{t('terms_53')}</p>
                                    <p>{t('terms_54')}</p>
                                    <h1>{t('terms_55')}</h1>
                                    <p>{t('terms_56')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}


export default Terms;
