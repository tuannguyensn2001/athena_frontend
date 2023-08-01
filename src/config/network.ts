import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND,
});

export default API;
