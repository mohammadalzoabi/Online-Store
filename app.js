const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.routes);

app.use(shopRoutes);


app.use((req, res, nexy) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found'}); 
});


 
// const server = http.createServer(app);
// server.listen(3000);
app.listen(3000);