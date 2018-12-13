'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jwt-simple');

const ADMIN = 'admin';
const ADMIN_PASSWORD = 'password';
const SECRET = 'mysecret';

var app = express();

app.use(bodyParser.json());

// passport.use(new LocalStrategy((username, password, done) => {
//   if (username === ADMIN && password === ADMIN_PASSWORD) {
//     done(null, 'TOKEN');
//     return;
//   }
//   done(null, false);
// }));

passport.use(new LocalStrategy((username, password, done) => {
  if (username === ADMIN && password === ADMIN_PASSWORD) {
    done(null, jwt.encode({
      username
    }, SECRET));
    return;
  }
  done(null, false);
}));

app.post('/login', passport.authenticate('local', {
  session: false
}), function (req, res) {
  res.send({
    token: req.user,
  });
});

app.listen(7000, function () {
  console.log('Server listening on port 7000.');
});