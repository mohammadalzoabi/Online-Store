const Seq = require('sequelize');
const seq = require('../util/database');



const Order = seq.define('order', {
    id: {
        type: Seq.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Order;