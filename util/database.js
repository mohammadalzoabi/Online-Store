const Seq = require('sequelize').Sequelize;

const seq = new Seq('node-complete', 'root', '123123', {
    dialect: 'mysql',
    host: 'localhost'
    });

module.exports = seq;