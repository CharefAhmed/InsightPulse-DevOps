import axios from 'axios';

let logout;
export const setLogoutHandler = (handleLogOut) => {
    logout = handleLogOut;
};
const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
});
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await axios.post(
                    'http://localhost:5000/auth/refresh',
                    {},
                    { withCredentials: true }
                );
                return api(originalRequest);
            } catch (refreshError) {
                if (logout) logout();
                window.location.href = '/login';
                return new Promise(() => { });
            }
        }
        return Promise.reject(error);
    }
);
export default api;