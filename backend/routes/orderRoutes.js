const express = require('express');
const { createOrder, getOrders, getUserOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, getOrders);
router.get('/userOrders', protect, getUserOrders);
router.put('/:id', protect, admin, updateOrder);
router.delete('/:id', protect, admin, deleteOrder);

module.exports = router;