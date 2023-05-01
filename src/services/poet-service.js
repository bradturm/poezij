import { config } from '../config';
import { fetchWrapper } from './fetch-wrapper';

const baseUrl = `${config.apiUrl}/poets`;

export const poetService = {
    getList,
    getById,
    update
};

function getList() {
    return fetchWrapper.get(`${baseUrl}/list`);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(poet => {
            return poet;
        });
}

