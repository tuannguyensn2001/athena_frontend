import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:14000',
});

export default API;
