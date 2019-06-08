const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

module.exports = {
  authenticate: expressJwt({
    secret: process.env.SECRET
  }),

  createHash (password, salt) {
    salt = salt || crypto.randomBytes(128).toString('base64');
    const hash = crypto.createHash('sha256');
    hash.update(salt, 'base64');
    hash.update(password);
    return {
      hash: hash.digest('base64'),
      salt
    };
  },

  getToken (user) {
    return jwt.sign({
      sub: user.member_id,
      name: user.first_name,
      profile_image: user.profile_image
    }, process.env.SECRET)
  }
};
