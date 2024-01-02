class UserService {
    constructor(b2cClient) {
        this.b2cClient = b2cClient;
    }

    get(id) {
        return this.b2cClient.getUser(id);
    }

    create(user) {
        return this.b2cClient.createUser(user);
    }

    update(id, user) {
        return this.b2cClient.updateUser(id, user);
    }

    delete(id) {
        return this.b2cClient.deleteUser(id);
    }

    list() {
        return this.b2cClient.listUsers();
    }
}

module.exports = UserService;
