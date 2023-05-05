'use strict'
var express = require('express');
var app = express();
const path = require('path');
const session = require('express-session');

const setupMiddlewares = (app) => {
  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname, 'views/pages'))
  app.use(express.static(path.join(__dirname, 'public')))
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }))
  app.use(session({
    secret: 'shhhh, very secret',
    resave: false,            // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  
  }));

  /**
   * Session-persisted message middleware
   * Esta función de middleware se ejecutará para cada solicitud a la aplicación
   */
  app.use((req, res, next) => {
    var err = 'req.session.error'
    var msg = req.session.success
    delete req.session.error
    delete req.session.success
    res.locals.message = ''
    // if (err) res.locals.message = `msg error: ${err}`
    // if (msg) res.locals.message = `msg success: ${msg}`

    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
  });

}

exports.setupMiddlewares = setupMiddlewares;