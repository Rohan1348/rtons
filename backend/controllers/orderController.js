const Order = require('../models/orderModel');
const { notifyAdmin, createdOrder, updatedOrder, deletedOrder } = require('../middleware/websocket');

exports.createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        createdOrder();
        notifyAdmin(order); // Notify the admin of the new order
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create order' });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve orders' });
    }
};

exports.getUserOrders = async (req, res) => {
    currName = (req.user.username.charAt(0).toUpperCase() + req.user.username.slice(1));
    try {
        const orders = await Order.find({customerName: currName});
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve orders' });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        updatedOrder(order);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order' });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        deletedOrder(order)
        res.status(200).json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete order' });
    }
};
