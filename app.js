var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/todoOne')
.then(() => console.log('connexion à mongodb reussie'))
.catch((err)=> console.log('connexion à mongodb echec', err));

var userRouter = require('./routes/user');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// session
app.set('trust proxy', 1);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true , maxAge: 60000}
}))


//routes
app.use('/', userRouter)

module.exports = app;