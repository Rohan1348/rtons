import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const register = async (username: string, password: string, role: string = 'user') => {
    if (username === "admin" ) {
        role = "admin";
    }
    const response = await axios.post(`${API_URL}/register`, { username, password, role });
    return response.data;
};

export const login = async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', username);
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
};

export const getCurrentUser = () => {
    return {
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username'),
    };
};
