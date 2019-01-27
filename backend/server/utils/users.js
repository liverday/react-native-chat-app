class Users {
    constructor() {
        this.users = [];
    }

    addUser(socketId, { userId, name }) {
        const user = { socketId, userId, name };
        this.users.push(user);
        return user;
    }

    removeUser(socketId) {
        var user = this.getUser(socketId);
        if (user) {
            this.users = this.users.filter(user => user.socketId !== socketId);
        }

        return user;
    }

    getUser(socketId) {
        return this.users.filter(user => user.socketId === socketId)[0];
    }

    removeUserById(userId) {
        var user = this.getUserById(userId);
        
        if (user) {
            this.users = this.users.filter(user => user.userId !== userId);
        }

        return user;
    }

    getUserById(userId) {
        return this.users.filter(user => user.userId === userId)[0];
    }

    getUsersCount() {
        return this.users.length
    }
}

module.exports = { Users };