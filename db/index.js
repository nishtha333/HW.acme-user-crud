const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL);

const Users = conn.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
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

const updateUser = (id, name) => {
    return Users.findById(id)
        .then(user => user.update({name}));
};

module.exports = {
    sync,
    seed,
    updateUser,
    models: {
        Users
    }
};