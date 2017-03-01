var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session); //session will be destroyed without it if refresh page

var app = express();

mongoose.connect('mongodb://localhost/webtest'); //db name

app.use(express.static('public'));
app.engine('ejs',engine);
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret:'ThisismytestKey',
    resave:false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}) //session store will save in db
}));

require('./routes/user')(app); // give route info

app.listen(3000, function(){
    console.log('listening ........');
})