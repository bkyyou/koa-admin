

const whiteUrl = [
  '/login', 
  '/getms', 
  '/registerModule', 
  '/getRandomNum', 
  '/gettest', 
  '/getPDFRandomNum',
  '/getExecl',
  '/uploadExcel',
  '/downloadExecl',
]

module.exports = whiteUrl;



// docker stop d33cad94c650
// cd  /data/koa-admin
// rm -rf *
// cd /home/react-admin-service-tem
// cp dist.tar.gz  /data/koa-admin
// cd /data/koa-admin
// tar zxvf dist.tar.gz
// docker start d33cad94c650


// dockerfile 文件内容
// FROM node:latest
// RUN mkdir -p /home/Service
// WORKDIR /home/Service
// COPY . /home/Service
// RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
// RUN cnpm install
// EXPOSE 4008
// CMD [ "node", "serve.js" ]

// docker run -d -p 3001:4008 --name testservice -v /home/react-admin-service-tem-test:/home/Service reacttestserver
