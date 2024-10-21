const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../db');

passport.use(new LocalStrategy(
    function(username, password, done) {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.get(query, [username], function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Usuario no encontrado' });
            }
            bcrypt.compare(password, user.password, function(err, res) {
                if (err) {
                    return done(err);
                }
                if (res) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Contraseña incorrecta' });
                }
            });
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    const query = 'SELECT * FROM users WHERE id = ?';
    db.get(query, [id], function(err, user) {
        if (err) {
            return done(err);
        }
        done(null, user);
    });
});

module.exports = passport;