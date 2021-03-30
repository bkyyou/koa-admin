const Router = require('koa-router');
// const fs = require('fs');
// const path = require('path');

// const captcha = '1234'

let router =  Router();

const accountRouter = require('./routes/account/index.js');
const departmentRouter = require('./routes/department/index.js');

// let routes = Object.assign({}, accountRouter);
// let routes = [...accountRouter, ...departmentRouter];

// routes.forEach(val => {
//   router[val.method](val.url, val.fun)
// })

// router.get('/login', async (ctx, next) => {
//   // ctx.response.status = 200
//   // ctx.body = 'login';
//   console.log(ctx.request.query)
//   let data = ctx.request.query;
//   const file = await fs.readFileSync(path.join(__dirname, './data.json'));
//   console.log('file', JSON.parse(file.toString()));
//   let fileArr = JSON.parse(file.toString());
//   for (let i = 0; i < fileArr.length; i++) {
//     if (fileArr[i].username === data.username && fileArr[i].password === data.password && data.captcha === '1234') {
//       ctx.success({
//         msg: '登录成功'
//       })
//       return
//     }
//   }
//   ctx.fail('登录失败', 40003)
// })

// router.get('/register', async (ctx, next) => {
//   // ctx.response.status = 200
//   // ctx.body = 'login';
//   console.log(ctx.request.query)
//   let data = ctx.request.query;
//   const file = await fs.readFileSync(path.join(__dirname, './data.json'));
//   console.log('file', JSON.parse(file.toString()));
//   let fileArr = JSON.parse(file.toString());
//   for (let i = 0; i < fileArr.length; i++) {
//     if (fileArr[i].username === data.username) {
//       ctx.fail('已经注册')
//       return
//     }
//   }
//   if (data.captcha !== captcha) {
//     ctx.fail('验证码不正确');
//     return
//   }
//   fileArr.push({
//     username: data.username,
//     password: data.password
//   })
//   try {
//     await fs.writeFileSync(path.join(__dirname, './data.json'), JSON.stringify(fileArr));
//     ctx.success({
//       msg: '注册成功'
//     })
//   } catch (error) {
//     ctx.fail('注册失败', 50000)
//   }
// })

// router.post('/getms', async (ctx, next) => {
//   // ctx.response.status = 200
//   // ctx.body = 'login';
//   // console.log(ctx);
//   if (ctx.request.body) {
//     console.log(ctx.request.body)
//   }
//   let data = ctx.request.body;
//   let type = data.type;
//   let flag = type === 'register'
//   const file = await fs.readFileSync(path.join(__dirname, './data.json'));
//   console.log('file', JSON.parse(file.toString()));
//   let fileArr = JSON.parse(file.toString());
//   for (let i = 0; i < fileArr.length; i++) {
//     if (fileArr[i].username === data.username) {
//       if (flag) {
//         ctx.fail('用户已经注册', 40001);
//       } else {
//         ctx.success({
//           msg: '正在发送',
//           code: '1234'
//         })
//       }
//       return
//     }
//   }

//   if (flag) {
//     ctx.success({
//       msg: '正在发送',
//       code: '1234'
//     })
//   } else {
//     ctx.fail('用户未注册', 40003)
//   }
//   // ctx.body = '1111'
// })

module.exports = router