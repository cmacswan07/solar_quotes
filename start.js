require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
const nodePostgres = require('node-postgres');
const passport = require('passport');
const session = require('express-session');

const routes = require('./routes');
const config = require('./config');
const port = config.port;
const pool = config.pool;

app.use(express.static(path.join(__dirname, "/client/build")));
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
}));
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/client/build'));
});

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});