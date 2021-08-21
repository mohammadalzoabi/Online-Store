const Seq = require('sequelize');
const seq = require('../util/database');



const OrderItem = seq.define('orderItem', {
    id: {
        type: Seq.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: {
        type: Seq.INTEGER
    }
});

module.exports = OrderItem;