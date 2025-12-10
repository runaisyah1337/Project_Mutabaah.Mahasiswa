const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');

const app = express();

// view engine (optional, for later frontend)
const hbs = exphbs.create({ extname: '.hbs', defaultLayout: 'main', layoutsDir: path.join(__dirname, 'views/layouts'), partialsDir: path.join(__dirname, 'views/partials') });
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/evaluations', require('./routes/evaluation.routes'));
app.use('/api/reports', require('./routes/report.routes'));

// optional demo routes to render views
app.get('/', (req, res) => res.redirect('/auth/login'));
app.use('/auth', (req, res, next) => {
  // render login view if exists
  if (req.path === '/login' && req.method === 'GET') return res.render('pages/auth/login');
  next();
});

module.exports = app;


