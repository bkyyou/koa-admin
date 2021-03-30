const Koa = require('koa');
// const router = require('./src/router/index.js');
const routerResponse = require('./routerResponse');
const bodyParser = require('koa-bodyparser');
const verifyToken = require('./middlewares/verifyToken.js');
const bindRoute = require('./utils/requireDir');

let app = new Koa();

// 可以通过 koa-cors 中间件进行配置
app.use(async (ctx, next) => {
  console.log('cors');
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token');
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  ctx.set('Content-Type', 'application/json');
  ctx.set("Access-Control-Allow-Credentials", "true",);
  await next();
});


app.use(async (ctx, next) => {
  console.log(ctx.method);
  if (ctx.method === 'OPTIONS') {
    ctx.response.status = 200;
  } else {
    await next();
  }
})

// 响应设置统一设置
app.use(routerResponse());

// api token验证
app.use(verifyToken);

// 解析 post 数据
app.use(bodyParser());

// 绑定路由
bindRoute(app);

// app.use(router.routes());

app.listen(4008, () => {
  console.log('running')
})