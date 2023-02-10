module.exports = (io) => io.on('connection', socket => {
    console.log('new connection');
    socket.on('disconnect', () => console.log('disconnected'));

    socket.on('addNewPost', () => {
        console.log("new post added!");
        socket.broadcast.emit('updateNews');
    });
});