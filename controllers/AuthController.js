const bCrypt = require('bcrypt');
const pool = require('../config').pool;

exports.createUser = function(req, res) {
    var generateHash = (pass) => {
        return bCrypt.hashSync(pass, bCrypt.genSaltSync(8));
    }

    var user = {};

    pool.query(`SELECT * FROM users WHERE username='${req.body.username}'`)
    .then((res, reject) => {
        if (res.rows.length > 0) {
            reject();
        } else {
            user = {
                id: 0,
                username: req.body.username,
                password: generateHash(req.body.password)
            }
            return pool.query(`
                INSERT INTO users (username, password) 
                VALUES ('${user.username}', '${user.password}')
                RETURNING (id)
            `)
        }
    })
    .catch(() => res.send(false))
    .then((queryRes) => {
        user.id = queryRes.rows[0].id;
        req.login(user, (err) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            return res.send(queryRes);
        })
    });
}

exports.logIn = function(req, res) {
    res.send(req.user);
}

exports.logOut = function(req, res) {
    req.logout();
    res.send('logged out');
}

exports.getUser = function(req, res) {
    if (!req.user) {
        res.send(false);
    } else {
        res.send(req.user);
    }
}