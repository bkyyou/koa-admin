
// default.js
// 设置配置文件
const config = {
  // 启动端口
  port: 3000,

  // 数据库配置
  database: {
    DATABASE: 'school',
    USERNAME: 'root',
    PASSWORD: '123456',
    PORT: '3310',
    HOST: '1.116.142.138'
  }
}

// CREATE TABLE IF NOT EXISTS `user`(
// 	`id` INT(4) NOT NULL AUTO_INCREMENT COMMENT '用户id',
// 	`name` VARCHAR(30) NOT NULL DEFAULT '匿名' COMMENT '邮箱',
// 	`pwd` VARCHAR(20) NOT NULL DEFAULT '123456' COMMENT '密码',
// 	PRIMARY KEY (`id`)
// ) ENGINE=INNODB DEFAULT CHARSET=utf8


// INSERT INTO user (`id`, `name`, `pwd`) VALUES (1, '111@qq.com', '123456')

// SELECT `id` FROM user WHERE name == '95' AND StudentResult == 100;

module.exports = config
