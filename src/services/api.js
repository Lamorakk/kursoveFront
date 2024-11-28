// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Встановлення токену в заголовки
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});
export const registerUser = async (email, password) => {
    try {
        const response = await api.post("/register", { email, password }); // Use the `api` instance
        return response.data; // Expecting JSON
    } catch (error) {
        console.error("Error Response:", error.response);
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || "Unexpected error.");
        } else {
            throw new Error("Unexpected error. Please try again.");
        }
    }
};



export const loginUser = async (email, password) => {
    try {
        const response = await api.post("/login", { email, password }); // Use the `api` instance
        return response.data; // Expecting JSON
    } catch (error) {
        console.error("Error Response:", error.response);
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error || "Unexpected error.");
        } else {
            throw new Error("Unexpected error. Please try again.");
        }
    }
};



export default api;
