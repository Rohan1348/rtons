let io;

exports.setupWebSocket = (server) => {
    const socketIO = require('socket.io');
    io = socketIO(server, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        // console.log('Admin connected');
        socket.on('disconnect', () => {
            // console.log('Admin disconnected');
        });
    });
};

exports.notifyAdmin = (order) => {
    if (io) {
        io.emit('newOrder', order);
    }
};

exports.createdOrder = () => {
    if (io) {
        io.emit('orderCreated');
    }
};

exports.updatedOrder = (order) => {
    if (io) {
        io.emit('orderUpdated', order);
    }
};

exports.deletedOrder = (order) => {
    if (io) {
        io.emit('orderDeleted', order._id);
    }
};
