import { NavLink, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { accountService } from '../../services/account-service';

import styles from "../../css/Nav.module.css";

export default function Nav({
    lang,
    setLang
}) {

    const location = useLocation();

    const { t } = useTranslation();

    const user = accountService.userValue;

    // ensure top navigation is always shown when a user is logged in
    useEffect(() => {
    }, [user, location]);

    useEffect(() => {
        //     console.log("lang is" + JSON.stringify(lang))
    }, [lang]);

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

    // only show nav when logged in
    if (!user) return null;

    return (

        <div>
            <nav className={`${styles.navbar} ${styles.navbarExpand}`}>
                <div className={`${styles.navbarNav}`}>
                    <div className={`${styles.navbarLeft}`}>
                        <img className={`${styles.featherIcon}`} src="assets/images/feather.svg" alt="" />
                        <NavLink to="home" className={({ isActive }) =>
                            isActive ? `${styles.navLinkActive} ` : `${styles.navLink} `
                        } end>{t('nav_home')}</NavLink>

                        <NavLink to="poems" className={({ isActive }) =>
                            isActive ? `${styles.navLinkActive} ` : `${styles.navLink} `
                        }>{t('nav_poems')}</NavLink>

                        {user?.role === "Admin" &&
                            <NavLink to="editpoems" className={({ isActive }) =>
                                isActive ? `${styles.navLinkActive} ` : `${styles.navLink} `
                            }>{t('nav_edit_poems')}</NavLink>
                        }
                        <NavLink to="learn" className={({ isActive }) =>
                            isActive ? `${styles.navLinkActive} ` : `${styles.navLink} `
                        } end>{t('nav_learn')}</NavLink>
                        <NavLink to="slidelearn" className={({ isActive }) =>
                            isActive ? `${styles.navLinkActive} ` : `${styles.navLink} `
                        } end>Slide</NavLink>
                        {user?.role === "Admin" &&
                            <NavLink to="editlessons" className={({ isActive }) =>
                                isActive ? `${styles.navLinkActive} ` : `${styles.navLink} `
                            }>{t('nav_edit_lessons')}</NavLink>
                        }
                    </div>
                    <div className={`${styles.navbarRight}`}>
                        <div className="icon">
                            {lang === "nl" && <div className={`${styles.lang_select}`} onClick={changeLang2fy}>FY</div>}
                            {lang === "fy" && <div className={`${styles.lang_select}`} onClick={changeLang2en}>EN</div>}
                            {lang === "en" && <div className={`${styles.lang_select}`} onClick={changeLang2nl}>NL</div>}
                        </div>
                        {user?.role === "Admin" &&
                            <NavLink to="/admin" className={({ isActive }) =>
                                isActive ? `${styles.navLinkActive} ` : `${styles.navLink} `
                            } >{t('nav_admin')}</NavLink>
                        }
                        <NavLink to="settings" className={styles.navLink1} end>
                            <div className="icon">
                                <div className={`${styles.lang_select}`}><img className={`${styles.settings_icon}`} alt="" src="assets/images/settings.svg" /></div>
                            </div>
                        </NavLink>

                        <NavLink to="home/profile/details" className={({ isActive }) =>
                            isActive ? `${styles.navLinkActive} ` : `${styles.navLink} `
                        } end>{t('nav_profile')}</NavLink>
                        <NavLink to="/" onClick={accountService.logout} className={`${styles.navLink}`} end>{t('nav_logout')}</NavLink>
                    </div>
                </div>
            </nav>
            {/*      <Route path="/admin" component={AdminNav} /> */}
        </div>

    );
}