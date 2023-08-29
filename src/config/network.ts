import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND,
});

API.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
        'access_token',
    )}`;
    return config;
});

export const ApiFeatureFlag = axios.create({
    baseURL: import.meta.env.VITE_FEATURE_FLAG || 'http://localhost:3000',
})


export default API;
