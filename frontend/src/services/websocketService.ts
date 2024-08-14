import { io, Socket } from 'socket.io-client';
import { Order } from '../types/types';

export const setupWebSocket = (onNewOrder: (order: Order) => void): Socket => {
    const socket = io('http://localhost:5000');

    socket.on('newOrder', (order: Order) => {
        onNewOrder(order);
    });

    return socket;
};
