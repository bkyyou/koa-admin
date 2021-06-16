module.exports = {
  "apps" : [{
    "name": "node-app",
    "script": "server.js",
    "instances":"max",
    "exec_mode":"cluster",
  }]
};