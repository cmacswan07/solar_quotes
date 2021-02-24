const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../config').pool;
const bCrypt = require('bcrypt');

passport.use(new LocalStrategy(
    function(username, password, done) {
        pool.query(`SELECT * FROM users WHERE username='${username}'`)
        .then((res, reject) => {
            if (res.rows.length > 0) {
                const userRes = res.rows[0];
                console.log("userRes", userRes);
                console.log(bCrypt.compareSync(password, userRes.password));
                if (bCrypt.compareSync(password, userRes.password)) {
                    return done(null, userRes);
                } else {
                    return done(null, false);
                }
            } else {
                reject();
            }
        })
        .catch((err) => {
            return done(err);
        });
    }
));

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser((id, done) => {
    pool.query(`SELECT id, username FROM users WHERE id=${id}`)
    .then((queryRes) => {
        return done(null, queryRes.rows[0]);
    })
    .catch((e) => console.log(e));
});

module.exports = passport;