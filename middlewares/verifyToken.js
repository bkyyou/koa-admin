

const jwt = require('../utils/jwt.js');
const whiteUrl = require('../whiteUrl.js')

module.exports = async function verifyToken(ctx, next) {
  // console.log('ctx.headers', ctx.req);
  var res = jwt.verifyToken(ctx.headers.token);
  // console.log('res token', res);
  // console.log('ctx.url', ctx);
  // console.log('ctx.url', ctx.url);
  // if (ctx.url === '/login' || ctx.url === '/getms'  || ctx.url === '/registerModule') {
  if (whiteUrl.includes(ctx.url.split('?')[0])) {
    await next()
  } else {
    if (res !== 'err') {
      await next();
    } else {
      ctx.fail('登录失败', 40003)
    }
  }
}