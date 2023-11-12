import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND,
});

API.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
        'access_token',
    )}`;
    config.params = {
        ...config.params,
        workshop_id: localStorage.getItem('workshop_id'),
    };
    return config;
});

export const ApiFeatureFlag = axios.create({
    baseURL: import.meta.env.VITE_FEATURE_FLAG || 'http://localhost:3000',
});

export default API;
