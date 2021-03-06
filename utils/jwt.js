// 引入模块依赖
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const cert = 'private_key';
// 创建 token 类
const Jwt = {
  //生成token
  generateToken(data) {
    // let data = data;
    console.log('data', data);
    let created = Math.floor(Date.now() / 1000);
    // let cert = fs.readFileSync(path.join(__dirname, '../pem/private_key.pem'));//私钥 可以自己生成
    // let token = jwt.sign({...data, exp: created + 60 * 30,}, cert, { algorithm: 'RS256' });
    let token = jwt.sign({...data, exp: created + 60 * 30,}, cert);
    return token;
  },

  // 校验token
  verifyToken(token) {
    // let token = data;
    // let cert = fs.readFileSync(path.join(__dirname, '../pem/public_key.pem'));//公钥 可以自己生成
    let res;
    try {
      let result = jwt.verify(token, cert) || {};
      let { exp = 0 } = result, current = Math.floor(Date.now() / 1000);
      if (current <= exp) {
        res = result.data || {};
      }
    } catch (e) {
      res = 'err';
    }
    return res;
  }
}

module.exports = Jwt;