const Koa = require('koa');
const path = require('path');
// const router = require('./src/router/index.js');
const routerResponse = require('./routerResponse');
const bodyParser = require('koa-bodyparser');
const verifyToken = require('./middlewares/verifyToken.js');
const bindRoute = require('./utils/requireDir');
const koa2Multiparty = require('koa2-multiparty');
const koaBody = require('koa-body');

const argv = process.argv;
const env = argv[2];
let app = new Koa();

// 可以通过 koa-cors 中间件进行配置
app.use(async (ctx, next) => {
  // console.log("ctx.is('multipart')", ctx.is('multipart'))
  // console.log('cors');
  if (env === 'dev') {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  } else {
    ctx.set('Access-Control-Allow-Origin', 'http://1.116.142.138:8081');
  }
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token');
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  ctx.set('Content-Type', 'application/json');
  ctx.set("Access-Control-Allow-Credentials", "true");
  await next();
});


app.use(async (ctx, next) => {
  // console.log(ctx.method);
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
// app.use(bodyParser());
app.use(koaBody({
  multipart:true, // 支持文件上传
  // encoding:'gzip',
  formidable:{
    uploadDir:path.join(__dirname,'public/upload/'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    // maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
    // onFileBegin:(name,file) => { // 文件上传前的设置
    //   console.log(`name: ${name}`);
    //   // console.log(file);
    // },
  }
}));

// app.use(koa2Multiparty)
// app.use(koaBody({multipart: true }))

// 绑定路由
bindRoute(app);

// app.use(router.routes());

app.listen(4008, () => {
  console.log('running')
})