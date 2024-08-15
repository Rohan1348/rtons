import axios from 'axios';
import { Order } from '../types/types';

const API_URL = 'http://localhost:5000/api/orders';

export const fetchOrders = async (): Promise<Order[]> => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('No token found');
    }

    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const fetchUserOrders = async (): Promise<Order[]> => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('No token found');
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${API_URL}/userOrders`, config);
    return response.data;
};

export const createOrder = async (customerName: String, items: string[], totalAmount: number) => {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(`${API_URL}`, { customerName, items, totalAmount }, config);
    return response.data;
};

export const updateOrder = async (id: string, data: Partial<Order>): Promise<Order> => {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(`${API_URL}/${id}`, data, config);
    return response.data;
};

export const deleteOrder = async (id: string): Promise<void> => {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    await axios.delete(`${API_URL}/${id}`, config);
};
