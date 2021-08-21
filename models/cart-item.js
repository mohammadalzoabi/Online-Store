const Seq = require('sequelize');
const seq = require('../util/database');



const CartItem = seq.define('cartItem', {
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

module.exports = CartItem;