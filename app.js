const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const PORT = 5005;
const path = require('path');
const cookieParser = require("cookie-parser");
var flash = require('connect-flash');
require('dotenv').config();
const cors = require('cors');


mongoose
    .connect('mongodb://localhost/expressApp')
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));

app.use(
    session({
        secret: '123secret',
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 600000
        },
        store: MongoStore.create({
            mongoUrl: 'mongodb://localhost/expressApp'
        })
    })
);

app.use(cookieParser());
app.use(flash());

app.use(express.static(path.join(__dirname, "..", "public")));


let whitelist = ['http://localhost:5005','http://localhost:3000'];
let corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }, credentials: true
}


app.use(cors(corsOptions));


app.use('/cars', require('./routes/cars'));
app.use('/locations', require('./routes/locations'));
app.use('/', require('./routes/authroutes'));


app.use((req, res, next) => {
    res.status(404).render("not-found-page");
});

app.use((err, req, res, next) => {
    console.error("ERROR", req.method, req.path, err);

    if (!res.headersSent) {
        res.status(500).json({theError: err});
    }
});

app.listen(PORT || 5005, () => console.log(`Listening on port ${PORT}`));

