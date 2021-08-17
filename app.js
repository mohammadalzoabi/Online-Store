const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const app = express();


app.engine('handlebars', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout'}));
app.set('view engine', 'handlebars');
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