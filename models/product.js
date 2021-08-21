const Seq = require('sequelize');

const seq = require('../util/database');


const Product = seq.define('product', {
    id: {
        type: Seq.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    title: {
        type: Seq.STRING,
        allowNull: false
    },

    price: {
        type: Seq.DOUBLE,
        allowNull: false
    },

    imageUrl: {
        type: Seq.STRING,
        allowNull: false
    },

    description: {
        type: Seq.TEXT,
        allowNull: false
    }
});

module.exports = Product;