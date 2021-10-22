import axios from "axios";

let instance;

export function getInstance() {
    if (!instance) {
        instance = axios.create({
            baseURL: process.env.REACT_APP_API_URL || 'https://poloniex.com/public'
        });

        instance.interceptors.response.use(
            response => {
                return response.data;
            },
            error => {
                return Promise.reject(error.response);
            }
        );
    }

    return instance;
}
