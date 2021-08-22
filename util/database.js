const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

/** @type {mongodb.Db} */
let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://mido:agmmasz7@cluster0.awpvs.mongodb.net/shop?retryWrites=true&w=majority')
        .then(client => {
            console.log('Connected!');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}


const getDb = () => {
    if(_db) {
        return _db;
    }

    throw 'No Database Found';
}


exports.mongoConnect = mongoConnect;
exports.getDb = getDb;