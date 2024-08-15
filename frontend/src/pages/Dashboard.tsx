import React, { useState, useEffect } from 'react';
import OrderList from '../components/OrderList';
import OrderDetails from '../components/OrderDetails';
import Notification from '../components/Notification';
import { Order } from '../types/types';
import { setupWebSocket } from '../services/websocketService';
import OrderCreation from '../components/OrderCreation';
import { fetchOrders, fetchUserOrders } from '../services/api';

const Dashboard: React.FC<{ username: String }> = ({ username }) => {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [notification, setNotification] = useState<string | null>(null);
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [userOrders, setUserOrders] = useState<Order[]>([]);
    // const [ordersUpdated, setOrdersUpdated] = useState<boolean>(false);

    useEffect(() => {
        const socket = setupWebSocket();

        socket.on('newOrder', (order: Order) => {
            setNotification(`New order placed by ${order.customerName}`);
        });

        socket.on('orderCreated', async () => {
            const fetchedOrders = await fetchOrders();
            setOrders(fetchedOrders);
            const fetchedUserOrders = await fetchUserOrders();
            setUserOrders(fetchedUserOrders);
        });

        socket.on('orderUpdated', (updatedOrder) => {
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === updatedOrder._id ? updatedOrder : order
                )
            );
            setUserOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === updatedOrder._id ? updatedOrder : order
                )
            );
        });
    
        socket.on('orderDeleted', (deletedOrderId) => {
            setOrders(prevOrders =>
                prevOrders.filter(order => order._id !== deletedOrderId)
            );
            setUserOrders(prevOrders =>
                prevOrders.filter(order => order._id !== deletedOrderId)
            );
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        const loadOrders = async () => {
            const fetchedOrders = await fetchOrders();
            setOrders(fetchedOrders);
            const fetchedUserOrders = await fetchUserOrders();
            setUserOrders(fetchedUserOrders);
        };
        loadOrders();
    }, []);

    useEffect(() => {
        if (notification) {
            setShowNotification(true);
            // const loadOrders = async () => {
            //     const fetchedOrders = await fetchOrders();
            //     setOrders(fetchedOrders);
            // };
            // loadOrders();

            const timer = setTimeout(() => {
                setShowNotification(false);
                setNotification(null);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleUpdate = () => {
        setSelectedOrder(null);
        // setOrdersUpdated(!ordersUpdated);
    };

    const handleDelete = () => {
        setSelectedOrder(null);
        // setOrdersUpdated(!ordersUpdated);
    };

    const capitalizeFirstLetter = (username: String) => {
        return username.charAt(0).toUpperCase() + username.slice(1);
    };

    return (
        <div>
            <h1>{capitalizeFirstLetter(username)}'s Dashboard</h1>
            <OrderCreation username={capitalizeFirstLetter(username)}/>
            {username === "admin" ? <OrderList onSelectOrder={setSelectedOrder} orders={orders}/> : 
                <OrderList onSelectOrder={setSelectedOrder} orders={userOrders}/>}
            {username === "admin" && selectedOrder && <OrderDetails order={selectedOrder} onUpdate={handleUpdate} onDelete={handleDelete} />}
            {showNotification && username === "admin" && notification && <Notification message={notification} />}
        </div>
    );
};

export default Dashboard;
