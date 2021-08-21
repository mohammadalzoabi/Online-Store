const Seq = require('sequelize');

const seq = require('../util/database');


const User = seq.define('user', {
    id: {
        type: Seq.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name: {
        type: Seq.STRING,
        allowNull: false
    },

    email: {
        type: Seq.STRING,
        allowNull: false
    }
});

module.exports = User;