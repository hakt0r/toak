
const jwt      = require('jsonwebtoken');
const { User } = require("../models/User");
const config   = require('../../config');

module.exports = (req, res, next) => {

  if ( ! req.headers['x-auth-header'] ) {
    return res.status(401).end('auth');
  }

  const token = req.headers['x-auth-header'];

  return jwt.verify(token, config.jwtSecret, (err, decoded) => {

    if (err) { return res.status(401).end('token'); }

    const { sub } = decoded;

    return User.findById(sub, (userErr, user) => {

      if ( userErr || !user ) return res.status(401).end('user');

      req.user = user

      req.user.group = req.user.group || []

      if ( config.admins.includes(user.authId) )
        req.user.group.push('admin')

      return next();
    });
  });
};
