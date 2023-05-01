import { config } from '../config';
import { fetchWrapper } from './fetch-wrapper';

const baseUrl = `${config.apiUrl}/lessons`;

export const lessonService = {
    getList,
    getTypes,
    getThemes,
    getLevels,
    getById,
    update,
    updateProgress
};

function getList(userId) {
    return fetchWrapper.get(`${baseUrl}/list/${userId}`);
}

function getTypes() {
    return fetchWrapper.get(`${baseUrl}/types`);;
}

function getThemes() {
    return fetchWrapper.get(`${baseUrl}/themes`);;
}

function getLevels() {
    return fetchWrapper.get(`${baseUrl}/levels`);;
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(lesson => {
            return lesson;
        });
}

function updateProgress(studentId, params) {
    // console.log("gets to updateProgress in lesson-service on client")
    //  console.log("studentId is " + studentId)
    //   return fetchWrapper.put(`${baseUrl}/progress/?lessonId=${lessonId}&studentId=${studentId}`, params)
    //  return fetchWrapper.put(`${baseUrl}/progress?lessonId=${lessonId}&studentId=${studentId}`, params)
    // console.log("params is " + JSON.stringify(params))
    return fetchWrapper.put(`${baseUrl}/progress/${studentId}`, params)
        //   return fetchWrapper.put(`${baseUrl}/progress/${lessonId}&${studentId}`, params)
        .then(progress => {
            return progress;
        });
}


