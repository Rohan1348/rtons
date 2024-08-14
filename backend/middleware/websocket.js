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
