const Seq = require('sequelize');
const seq = require('../util/database');



const Cart = seq.define('cart', {
    id: {
        type: Seq.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Cart;