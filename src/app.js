'use strict'
var express = require('express');
var app = express();

const fn = require('./functions')

const middlewares = require('./config')
middlewares.setupMiddlewares(app);

app.use(require('./routes'))

const port = 3000
app.listen(port, () => {
    fn.bcryptHash({ 'pass': 'hash' }) 
    console.log('Server started: ', port)
})

exports.app = app