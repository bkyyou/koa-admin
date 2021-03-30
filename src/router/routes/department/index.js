const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

const jwt = require('../../../../utils/jwt.js');
// addDepartment

let router =  Router();
const captcha = '1234';
let accountRouter = [];

router.post('/addDepartment', async (ctx, next) => {
  // ctx.response.status = 200
  // ctx.body = 'login';
  // console.log(ctx.request.body)
  let data = ctx.request.body;
  console.log('addDepartment data', data);
  const file = await fs.readFileSync(path.join(__dirname, './data.json'));
  // console.log('addDepartment file', JSON.parse(file.toString()));
  console.log('addDepartment file', file.toString());

  let fileArr = JSON.parse(file.toString());

  data.id = fileArr.length;

  fileArr.push(data);

  try {
    await fs.writeFileSync(path.join(__dirname, './data.json'), JSON.stringify(fileArr));
    ctx.success({
      msg: '添加成功'
    })
  } catch (error) {
    ctx.fail('添加失败', 50000)
  }

})

accountRouter = [
  {
    method: 'post',
    url: '/addDepartment',
    fun: async (ctx, next) => {
      // ctx.response.status = 200
      // ctx.body = 'login';
      // console.log(ctx.request.body)
      let data = ctx.request.body;
      console.log('addDepartment data', data);
      const file = await fs.readFileSync(path.join(__dirname, './data.json'));
      // console.log('addDepartment file', JSON.parse(file.toString()));
      console.log('addDepartment file', file.toString());

      let fileArr = JSON.parse(file.toString());

      data.id = fileArr.length;

      fileArr.push(data);

      try {
        await fs.writeFileSync(path.join(__dirname, './data.json'), JSON.stringify(fileArr));
        ctx.success({
          msg: '添加成功'
        })
      } catch (error) {
        ctx.fail('添加失败', 50000)
      }

    }
  },
  {
    method: 'get',
    url: '/departmentList',
    fun: async (ctx, next) => {
      // ctx.response.status = 200
      // ctx.body = 'login';
      // console.log(ctx.request.body)
      // let data = ctx.request.body;
      // let data = ctx.request.query;
      let {page, size} = ctx.request.query;
      // console.log('addDepartment data', data);
      const file = await fs.readFileSync(path.join(__dirname, './data.json'));
      // console.log('addDepartment file', JSON.parse(file.toString()));
      console.log('addDepartment file', file.toString());

      let fileArr = JSON.parse(file.toString());

      // data.id = fileArr.length;

      var newArr = fileArr.splice(size * (page - 1), size);

      // fileArr.push(data);

      ctx.success({
        data: newArr
      })


    }
  }
]

module.exports = router