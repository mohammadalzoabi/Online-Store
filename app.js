const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const errorController = require('./controllers/error');
const User = require('./models/user');


const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('612756ec3c2c4393273f5c97')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
        });
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoose.connect('mongodb+srv://mido:agmmasz7@cluster0.awpvs.mongodb.net/shop?retryWrites=true&w=majority')
            .then(results => {
                User.findOne()
                .then(user => {
                    if (!user) {
                        const user = new User({
                            name: 'Mido',
                            email: 'moalzoabi@outlook.com',
                            cart: {
                                items: []
                            }
                        });
                        user.save();
                    }
                })
                app.listen(3000);
            })
            .catch(err => {
                console.log(err);
            })