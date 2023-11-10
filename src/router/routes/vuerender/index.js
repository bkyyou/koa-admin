const fs = require("fs");
const path = require("path");
const Router = require("koa-router");
const jwt = require("../../../../utils/jwt.js");
const mysql = require("../../../../mysql/index.js");
// import { createSSRApp } from "vue";
// import { renderToString } from "vue/server-renderer";

const vue = require('vue');
const vuerender = require('@vue/server-renderer');

let router = Router();

router.get("/vue", async (ctx, next) => {
  ctx.set('Content-Type', 'text/html');
  const app = vue.createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`,
  });

  vuerender.renderToString(app).then((html) => {
    ctx.body = (`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script src="/vue.js"></script>
        <script>
          Vue.createSSRApp({
            data: () => ({ count: 1 }),
            template: '<button @click="count++">{{ count }}</button>',
          }).mount('#app');
        </script>
      </body>
    </html>
    `);
  });
});

module.exports = router;
