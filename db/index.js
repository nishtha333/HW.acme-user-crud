const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL, {logging: false});

const Users = conn.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

const sync = () => {
    return conn.sync({force: true});
};

const seed = () => {
    return Promise.all([
        Users.create({name: "moe"}),
        Users.create({name: "larry"}),
        Users.create({name: "curly"}),
    ]);
};

const updateUser = (id, body) => {
    return Users.findById(id)
        .then(user => user.update(body));
};

module.exports = {
    sync,
    seed,
    updateUser,
    models: {
        Users
    }
};