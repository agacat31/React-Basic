import axios from 'axios'

// axios.defaults.headers.common.Authorization = 'Bearer ' + store.getters.token
axios.defaults.baseURL = 'http://private-27298f-frontendtestmaukerja.apiary-mock.com/'

const GET_JOB_LIST = (limit) => `jobs?limit=${limit}`;
const GET_JOB_DETAIL = (id) => `job/${id}`;

export function getJobList(limit) {
    return axios.get(GET_JOB_LIST(limit));
}

export function getJobDetail(id) {
    return axios.get(GET_JOB_DETAIL(id));
}