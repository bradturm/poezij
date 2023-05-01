import { config } from '../config';
import { fetchWrapper } from './fetch-wrapper';

const baseUrl = `${config.apiUrl}/poems`;

export const poemService = {
    getList,
    getTypes,
    getThemes,
    getLevels,
    getLineTypes,
    getById,
    getDay,
    getSearchResults,
    update
};

function getList() {
    return fetchWrapper.get(`${baseUrl}/list`);
}

function getTypes() {
    return fetchWrapper.get(`${baseUrl}/types`);
}

function getThemes() {
    return fetchWrapper.get(`${baseUrl}/themes`);
}

function getLevels() {
    return fetchWrapper.get(`${baseUrl}/levels`);
}

function getLineTypes() {
    return fetchWrapper.get(`${baseUrl}/lineTypes`);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function getDay() {
    return fetchWrapper.get(`${baseUrl}/day`);
}

function getSearchResults(word) {
    return fetchWrapper.get(`${baseUrl}/search?word=${word}`);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(poem => {

            return poem;
        });
}

