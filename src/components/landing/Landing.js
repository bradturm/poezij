import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { AppContext } from "../../context/AppContext";

import LangSelect from "./LangSelect";
import Terms from "./Terms";

import styles from "../../css/Landing.module.css";

function Landing({

    termsPopupShown,
    setTermsPopupShown
}
) {

    const context = useContext(AppContext);

    //   const [termsPopupShown, setTermsPopupShown] = useState(false);

    const { t } = useTranslation();

    const handleClick = () => {
        console.log("clicked!")
    }

    return (
        <>
            < LangSelect
                lang={context.lang}
                setLang={context.setLang}
            />

            <Terms
                termsPopupShown={termsPopupShown}
                setTermsPopupShown={setTermsPopupShown}
            />
            <div className={styles['context']}>
                <h1>PoëzijLab</h1>
                <p>{t('landing_main1')}</p>
                <p>{t('landing_main2')}</p>
                <p>{t('landing_main3')}</p>
                <p>{t('landing_main4')}</p>
                <p>
                    <NavLink to="account/login" onClick={handleClick}>{t('landing_main5')}</NavLink> {t('landing_main6')} <NavLink to="account/register">{t('landing_main7')}</NavLink> {t('landing_main8')}</p>
            </div>
            <div className={styles['area']} >
                <ul className={styles['circles']}>
                    <li>{t('landing_snippet1')}</li>
                    <li>{t('landing_snippet2')}</li>
                    <li>{t('landing_snippet3')}</li>
                    <li>{t('landing_snippet4')}</li>
                    <li>{t('landing_snippet5')}</li>
                    <li>{t('landing_snippet6')}</li>
                    <li>{t('landing_snippet7')}</li>
                    <li>{t('landing_snippet8')}</li>
                    <li>{t('landing_snippet9')}</li>
                    <li>{t('landing_snippet10')}</li>
                </ul>
            </div >
            <Outlet
            />
        </>
    );
}
export default Landing;