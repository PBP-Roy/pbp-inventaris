import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api',
});

// Interceptors

// Intercepts the request from frontend before being sent
axiosClient.interceptors.request.use((config) => {
    if (!config.url.includes('/register') && !config.url.includes('/login')) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default axiosClient;