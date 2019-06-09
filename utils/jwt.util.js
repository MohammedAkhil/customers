const jwt = require('jsonwebtoken');
const secret = require('../config').jwtSecret;

export const jwtSign = user => jwt.sign(user, secret);
export const jwtVerify = token => jwt.verify(token, secret);
