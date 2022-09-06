const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const jwt = require('../../../../utils/jwt.js');
const mysql = require('../../../../mysql/index.js');

let router = Router();
const captcha = '1234';

router.post('/login', async (ctx, next) => {
  // ctx.response.status = 200
  // ctx.body = 'login';
  console.log('ctx.request.body', ctx.request.body)
  let data = ctx.request.body;
  // const file = await fs.readFileSync(path.join(__dirname, './data.json'));
  const res = await mysql.query({name: data.username, pwd: data.password})
    console.log('mysql', res);
    if(res.length > 0) {
      ctx.success({
        msg: '登录成功',
        token: jwt.generateToken({ username: data.username, password: data.password })
      })
      return;
    }
    ctx.fail('登录失败', 0)

  // console.log('file', JSON.parse(file.toString()));
  // let fileArr = JSON.parse(file.toString());
  // for (let i = 0; i < fileArr.length; i++) {
  //   if (fileArr[i].username === data.username && fileArr[i].password === data.password && data.captcha === '1234') {
  //     ctx.success({
  //       msg: '登录成功',
  //       token: jwt.generateToken({ username: data.username, password: data.password })
  //     })
  //     return
  //   }
  // }
  // ctx.fail('登录失败', 0)
})

// router.get('/aaa', async (ctx, next) => {
//   ctx.success({msg: 11111})
// })

router.get('/register', async (ctx, next) => {
  // ctx.response.status = 200
  // ctx.body = 'login';
  console.log(ctx.request.query)
  let data = ctx.request.query;
  const file = await fs.readFileSync(path.join(__dirname, './data.json'));
  console.log('file', JSON.parse(file.toString()));
  let fileArr = JSON.parse(file.toString());
  for (let i = 0; i < fileArr.length; i++) {
    if (fileArr[i].username === data.username) {
      ctx.fail('已经注册')
      return
    }
  }
  if (data.captcha !== captcha) {
    ctx.fail('验证码不正确');
    return
  }
  fileArr.push({
    username: data.username,
    password: data.password
  })
  try {
    await fs.writeFileSync(path.join(__dirname, './data.json'), JSON.stringify(fileArr));
    ctx.success({
      msg: '注册成功'
    })
  } catch (error) {
    ctx.fail('注册失败', 50000)
  }
})

router.post('/getms', async (ctx, next) => {
  // ctx.response.status = 200
  // ctx.body = 'login';
  // console.log(ctx);
  if (ctx.request.body) {
    console.log(ctx.request.body)
  }
  let data = ctx.request.body;
  let type = data.type;
  let flag = type === 'register'
  const file = await fs.readFileSync(path.join(__dirname, './data.json'));
  console.log('file', JSON.parse(file.toString()));
  let fileArr = JSON.parse(file.toString());
  for (let i = 0; i < fileArr.length; i++) {
    if (fileArr[i].username === data.username) {
      if (flag) {
        ctx.fail('用户已经注册', 40001);
      } else {
        ctx.success({
          msg: '正在发送',
          code: '1234'
        })
      }
      return
    }
  }

  if (flag) {
    ctx.success({
      msg: '正在发送',
      code: '1234'
    })
  } else {
    ctx.fail('用户未注册', 40003)
  }
  // ctx.body = '1111'
})

router.get('/getUserList', async (ctx, next) => {
  ctx.success({
    msg: 'success'
  })
})

// module.exports = accountRouter
module.exports = router