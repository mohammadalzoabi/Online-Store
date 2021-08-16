const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set()

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.routes);

app.use(shopRoutes);


app.use((req, res, nexy) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html')); 
});


 
// const server = http.createServer(app);
// server.listen(3000);
app.listen(3000);