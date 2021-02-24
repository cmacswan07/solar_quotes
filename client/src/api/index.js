import axios from 'axios';

var api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:8080',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api;