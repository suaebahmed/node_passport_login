const express = require('express');
const app = express();
const flash = require('connect-flash');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser')

const url = 'mongodb://127.0.0.1:27017/edx';
mongoose.connect(url, {  useUnifiedTopology: true , useNewUrlParser: true });
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
});
db.on('error', err => {
  console.error('connection error:', err)
});

// app.set('view engine','hbs');
// app.use(express.static(path.join(__dirname+'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


require('./config/passport')(passport);

// ------- router  -------
app.use("/user",require('./routes/register'));
app.use("/user",require('./routes/login'));

// error handling 
app.use((req,res,next)=>{
  const error = new Error('Not Found');
  error.status= 404;
  next(error);
});

app.use((error,req,res,next)=>{
  res.status(error.status || 500);
  res.json({
      error:{
          message: error.message
      }
  })
})



app.listen(3000,function(){
    console.log('your app is listening port on 3000...');
});