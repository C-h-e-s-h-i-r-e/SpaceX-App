import axios from 'axios';
//const axios = require('axios');

const baseURL = 'https://api.spacexdata.com/';

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {

        alert(
            'A server/network/api error occurred.'
        );

        return Promise.reject(error);
    }
);

export default axiosInstance;