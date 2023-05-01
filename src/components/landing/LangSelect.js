import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

import styles from "../../css/LangSelect.module.css";

export default function LangSelect({
    lang,
    setLang
}) {

    const { t } = useTranslation();

    const changeLang2en = () => {
        i18next.changeLanguage("en");
        setLang("en");
    }
    const changeLang2nl = () => {
        i18next.changeLanguage("nl");
        setLang("nl");
    }
    const changeLang2fy = () => {
        i18next.changeLanguage("fy");
        setLang("fy");
    }

    return (
        <>
            <div className={`${styles.langSelect}`}>
                <nav>
                    <div className={`${styles.select}`}>
                        {!(lang === 'en') && <NavLink className={`${styles.langLink}`} onClick={changeLang2en}>{t('landing_english')}</NavLink>}
                        {!(lang === 'nl') && <NavLink className={`${styles.langLink}`} onClick={changeLang2nl}>{t('landing_dutch')}</NavLink>}
                        {!(lang === 'fy') && <NavLink className={`${styles.langLink}`} onClick={changeLang2fy}>{t('landing_frisian')}</NavLink>}
                    </div>
                </nav>
            </div>
            <div className={`${styles.signIn}`}>
                <NavLink className={`${styles.signInLink}`} to="account/login">{t('landing_sign_in')}</NavLink>
            </div>
        </>
    );
}