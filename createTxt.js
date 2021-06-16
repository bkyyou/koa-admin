console.log(process.argv)

const fs = require('fs');
const path = require('path');

function getRandom(min, max) {
  // return Math.random()
  return Math.random() * (max - min + 1) + min
}

var content=new Buffer(0);//累计合并读取片段

fs.writeFileSync(
  './randomNum.pdf',
  '1.111\n1.222',
  { encoding: 'utf8' }
)

// let gReadData = fs.readFileSync('./randomNum.pdf', { encoding: 'Buffer' })
let gReadData = Buffer.from(fs.readFileSync('./randomNum.pdf', 'utf-8'))
// content=Buffer.concat([content,gReadData]);


console.log('gReadData', gReadData);