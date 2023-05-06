//...
const { Client } = require('ssh2');
const config = require('./config.js');
const conn = new Client();
// console.log('conn', conn);

/**
 * config 
 * 
 * host: '',
   port: ,
   username: '',
   password: ''
 */

/**
 * 
 * @param {*} cmd 
 * @returns 
 */
const myexec = (cmd) => {
  return new Promise(resolve => {
    conn.exec(cmd, (err, stream) => {
      if (err) throw err;
      let str = ''
      stream.on('close', (code, signal) => {
        console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
        // conn.end();
        resolve(str);
      }).on('data', (data) => {
        //监听数据
        str += data;
      }).stderr.on('data', (data) => {
        console.log('STDERR: ' + data);
      });
    });
  })
}

conn.on('ready', async () => {
  console.log('Client :: ready');
  const res = await myexec('docker ps');
  // console.log(res);
  if (res.indexOf('426fae94ea33') !== -1) {
    console.log('jenkins: 我还在运行');
    conn.end();
    return
  }
  console.log('jenkins: 我挂了，正在尝试启动');
  const dockerStartRes = await myexec('docker start 426fae94ea33');
  console.log('dockerStartRes', dockerStartRes);
  conn.end();
}).connect(config);

