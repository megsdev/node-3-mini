const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const mc = require( `./controllers/messages_controller` );
require('dotenv').config()
const filterProfanity = require('./middlewares/filter')
const port = 1337;

const createInitialSession = require('./middlewares/session')

const app = express();

app.use( bodyParser.json() );
app.use( express.static( `${__dirname}/../build` ) );
app.use( session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10000 }
  }));

app.use( createInitialSession )
app.use( (req, res, next) => {
    const { method } = req
    if(method === 'POST' || method || 'PUT') {
        filterProfanity(req, res, next)
    } else {
        next()
    }
})

app.post( "/api/messages", mc.create );
app.get( "/api/messages", mc.read );
app.put( "/api/messages", mc.update );
app.delete( "/api/messages", mc.delete );
app.get( "/api/messages/history", mc.history )

app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );