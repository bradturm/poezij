import { config } from '../config';
import { fetchWrapper } from './fetch-wrapper';

const baseUrl = `${config.apiUrl}/db`;

export const dbService = {

    rebuildPoemDB,
    rebuildLessonDB,
    backupDBToXLS,
    backupLessonDBToXLS
};

function rebuildPoemDB() {
    return fetchWrapper.get(`${baseUrl}/rebuild-poem-db`);
}
function rebuildLessonDB() {
    return fetchWrapper.get(`${baseUrl}/rebuild-lesson-db`);
}
function backupDBToXLS() {
    return fetchWrapper.get(`${baseUrl}/backup-to-xls`);
}
function backupLessonDBToXLS() {
    return fetchWrapper.get(`${baseUrl}/backup-lessons-to-xls`);
}