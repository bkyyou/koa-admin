const Router = require('koa-router');
var requireDirectory = require('require-directory');

var whitelist = /.js$/;

module.exports = function bindRoute(app) {
  // 在node.js中process.cwd()方法可以获取项目的根路径
  var modules = requireDirectory(module, '../src/router/routes', { include: whitelist, visit: whenLoadModule });

  function whenLoadModule(obj) {
    // console.log('obj', obj);
    if (obj instanceof Router) {
      // app.use(obj.routes(), obj.allowedMethods())
      app.use(obj.routes())
    }
  }
}

// const requireDirectory = require('require-directory')
// const Router = require('koa-router')

// class InitManger {
//   static InitCore (app){
//     InitManger.app = app
//     InitManger.InitLoadRouters()
//   }
//   static InitLoadRouters () {
//     // 参数：第一个参数固定参数module，第二个参数要加载的模块的文件路径，第三个参数：每次加载一个参数执行的函数
//     // 在node.js中process.cwd()方法可以获取项目的根路径
//     const Url = `${process.cwd()}/app/api`
//     const modules = requireDirectory(module, Url, {visit:whenModuleLoad})

//     function whenModuleLoad (obj) {
//       if(obj instanceof Router){
//         InitManger.app.use(obj.routes())
//       }
//     }
//   }
// }
// module.exports = InitManger
// const InitManger = require('./core/init')
// const app = new Koa()
// InitManger.InitCore(app)
