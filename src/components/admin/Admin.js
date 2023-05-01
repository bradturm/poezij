import { useState } from 'react'
import { Outlet } from "react-router-dom"

import EditPoets from './EditPoets'

import { dbService } from '../../services/db-service';
import { accountService } from '../../services/account-service';

import styles from "../../css/Admin.module.css";

export default function Admin() {

    const user = accountService.userValue;

    const [editPoetsShown, setEditPoetsShown] = useState(false);

    const rebuildPoemDB = () => {
        dbService.rebuildPoemDB();
    };

    const rebuildLessonDB = () => {
        dbService.rebuildLessonDB();
    };

    const backupDBToXLS = () => {
        dbService.backupDBToXLS();
    };

    const backupLessonDBToXLS = () => {
        dbService.backupLessonDBToXLS();
    };

    const editPoets = () => {
        setEditPoetsShown(true);
    };

    return (
        <>
            <EditPoets
                editPoetsShown={editPoetsShown}
                setEditPoetsShown={setEditPoetsShown}
            />
            <div className={`${styles.admin_container}`}>
                <h1>Admin</h1>
                {user?.role === "Admin" &&
                    <div className={`${styles.btn_container}`}>
                        <div onClick={rebuildPoemDB}
                            className={`${styles.btn} ${styles.btn__secondary}`}>
                            <p>Rebuild Poem DB</p>
                        </div>
                        <div onClick={rebuildLessonDB}
                            className={`${styles.btn} ${styles.btn__secondary}`}>
                            <p>Rebuild Lesson DB</p>
                        </div>
                        <div onClick={backupDBToXLS}
                            className={`${styles.btn} ${styles.btn__secondary}`}>
                            <p>Backup DB To Excel</p>
                        </div>
                        <div onClick={backupLessonDBToXLS}
                            className={`${styles.btn} ${styles.btn__secondary}`}>
                            <p>Backup Lesson DB To Excel</p>
                        </div>
                        <div onClick={editPoets}
                            className={`${styles.btn} ${styles.btn__secondary}`}>
                            <p>Edit Poets</p>
                        </div>
                    </div>
                }
                <Outlet />
            </div>
        </>
    )
}