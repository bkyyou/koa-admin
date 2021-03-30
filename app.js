// 测试文件

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

let app = new Koa();

// 可以通过 koa-cors 中间件进行配置
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  ctx.set('Content-Type', 'application/json');
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

// app.use(bodyParser());

app.use(async (ctx, next) => {
  // console.log(ctx.request.body);
  if (ctx.url === '/getms' && ctx.method === 'POST') {
    console.log('getms')
    var res = await parsePostData(ctx);
    // parsePostData(ctx).then(res => {
    //   console.log('res', res);
    //   ctx.body = { username: 'zs' };

    // })
    // console.log('res', res);
    // ctx.response.status = 200;
    // ctx.body = JSON.parse(res)
    ctx.body = { username: 'zs' };
    // next()
  }
})


app.listen(4009, () => {
  console.log('running')
})

function parsePostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = '';
      ctx.req.addListener('data', (data) => {
        postdata += data;
      });
      ctx.req.on("end", function() {
        console.log(11111111, postdata)
        resolve(postdata);
      })
    } catch (error) {
      reject(error);
    }
  });
}

// nuxt.js