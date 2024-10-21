const express = require('express');
const passport = require('passport');
const router = express.Router();

// Mostrar el formulario de inicio de sesión
router.get('/', function(req, res) {
  res.render('login', {
    title: 'Iniciar sesión',
    message: req.flash('error')
  });
});

// Manejar la solicitud de inicio de sesión
router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

module.exports = router;
