import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000/api', // TODO: Change this to the actual API URL
});

// Interceptors
// Token is currently stored in sessionStorage
// TODO: Figure out how to store it securely in the future

// Intercepts the request from frontend before being sent
axiosClient.interceptors.request.use((config) => {
    if (!config.url.includes('/register') && !config.url.includes('/login')) {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default axiosClient;