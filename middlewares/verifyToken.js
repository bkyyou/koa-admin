

const jwt = require('../utils/jwt.js');

module.exports = async function verifyToken(ctx, next) {
  // console.log('ctx.headers', ctx.req);
  var res = jwt.verifyToken(ctx.headers.token);
  // console.log('res token', res);
  if (ctx.url === '/login' || ctx.url === '/getms'  || ctx.url === '/registerModule') {
    await next()
  } else {
    if (res !== 'err') {
      await next();
    } else {
      ctx.fail('登录失败', 40003)
    }
  }
}