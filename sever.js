const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const db = require('./services/db');
const port = process.env.PORT || 3000;


const app = express();

//session
app.use(cookieSession({
  name: 'session',
  keys: ['123456'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));






app.set('views', './views');
app.set('view engine', 'ejs');





app.use(bodyParser.urlencoded({extended:false}));

//auth middlew
app.use(require('./middlewares/auth'));


app.get('/', require('./routes/index'));
 app.use('/login',require('./routes/login'));
 app.use('/register',require('./routes/register'));
 app.get('/logout', require('./routes/logout'));
 app.use('/profile', require('./routes/profile'));
 app.use('/todos', require('./routes/todos'));


app.use(express.static('public'));

db.sync().then(function(){
    app.listen(port);
    console.log(`sever is listtening ${port}`);
}).catch(function (err){
    console.error(err);
});


















