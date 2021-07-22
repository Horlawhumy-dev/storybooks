const express =  require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session')
const exphbs = require('express-handlebars');
const connectDB = require('./config/db');


const app = express()
// Load Dotenv
dotenv.config({ path: './config/config.env'})
require('./config/passport')(passport)
connectDB();

// Logging
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main.hbs'}));
app.set('view engine', '.hbs');

// Express Session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }))

// Pssport Middleware
app.use(passport.initialize()) 
app.use(passport.session())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 3000;
app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    );