import { jwtVerify } from '../utils/jwt.util';

module.exports = async function(ctx, next) {
  try {
    if (!ctx.headers.authorization) ctx.throw(403, 'No token.');
    const token = ctx.headers.authorization.split(' ')[1];
    ctx.request.jwtPayload = jwtVerify(token);
    await next();
  } catch (err) {
    ctx.throw(err.status || 403, err.message);
  }
};
