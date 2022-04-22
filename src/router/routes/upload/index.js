const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const officegen = require('officegen');
const xlsx = require('node-xlsx');
const send = require('koa-send') // 将静态文件转换成文件流，提供下载功能


let router = Router();

function getRandomNum(min, max) {
  min = +min;
  max = +max;
  return (max - min) * Math.random() + min;
}

function getAllNum(query) {
  let { min, max, count, sym = '', digits, numRepeat = 1, symPosi = 1 } = query;
  let numArr = [];
  for (let i = 0; i < count; i++) {
    // console.log('getRandomNum(min, max)', getRandomNum(min, max));
    let num = getRandomNum(min, max).toFixed(+digits);
    if (numRepeat == 1 || (numRepeat == 2 && !numArr.includes(num))) {
      numArr.push(symPosi == 1 ? num + sym : sym + num)
    }
  }
  // console.log("numArr.join('\n')", numArr.join('\n'));
  return numArr.join('\n');
}

function getXlsxNum(query) {
  let { min, max, count, sym = '', digits, numRepeat = 1, symPosi = 1 } = query;
  let numArr = [];
  const list = [
    {
      name: "sheet",
      data: [
        ["data1", "data2", "data3"],
        ["data1", "data2", "data3"],
        ["data1", "data4", "data3"],
      ],
    },
  ];
  for (let i = 0; i < count; i++) {
    // console.log('getRandomNum(min, max)', getRandomNum(min, max));
    let num = getRandomNum(min, max).toFixed(+digits);
    if (numRepeat == 1 || (numRepeat == 2 && !numArr.includes(num))) {
      numArr.push(symPosi == 1 ? [num + sym] : [sym + num])
    }
  }
  list[0].data = numArr;
  return list;
}
let i = 1;
function writeStream () {
  var data = '';
  return new Promise((resolve, reject) => {
    var readerStream = fs.createReadStream('./testFile.xlsx');
    // 设置编码为 utf8。
    readerStream.setEncoding('UTF8');

    //要读取一个可读流中的数据，必须要给该流绑定一个data事件
    //绑定data事件后，流会自动读取数据，数据读取完毕以后，流会自动关闭
    //读取到的数据会通过回调函数的参数的形式返回

    // 处理流事件 --> data, end, and error
    readerStream.on('data', function(chunk) {
      console.log('1111', i++)
      data += chunk;
    });

    readerStream.on('end',function(){
      console.log('----', data);
      // resolve(readerStream);
      resolve(data);
    });

    readerStream.on('error', function(err){
      console.log(err.stack);
    });
  })
}

router.get('/getRandomNum', async (ctx, next) => {
  // // console.log('ctx.request.query', ctx.request.query);
  // // let {min, max, count, sym = '', digits, numRepeat=1, symPosi=1} = ctx.request.query;
  // let filename = 'randomNum';
  // ctx.set('Content-Disposition', 'attachment;filename=' + filename + '.txt');//attachment
  // ctx.set('Content-Type', 'application/txt');
  // fs.writeFileSync('./randomNum.txt', getAllNum(ctx.request.query), { encoding: 'utf8' });
  // let gReadData = Buffer.from(fs.readFileSync('./randomNum.txt', 'utf-8'))
  // ctx.body = gReadData;

  ctx.set('Content-Disposition', 'attachment;filename=testFile.xlsx');//attachment
  ctx.set('Content-Type', 'application/octet-stream');
  ctx.set('Access-Control-Expose-Headers', 'Content-Disposition');

  const list = [
    {
      name: "sheet",
      data: [
        ["data1", "data2", "data3"],
        ["data1", "data2", "data3"],
        ["data1", "data4", "data3"],
      ],
    },
  ];
  
  // 返回流 第一种方式
  const buffer = xlsx.build(getXlsxNum(ctx.request.query));
  ctx.body = buffer;


  // 返回流 第二种方式
  // const buffer = xlsx.build(getXlsxNum(ctx.request.query));
  // fs.writeFileSync("./testFile.xlsx", buffer,  { encoding: 'utf8' });
  // var readerStream = fs.createReadStream('./testFile.xlsx');
  // // console.log('readerStream', readerStream);
  // // await writeStream()
  // ctx.body = readerStream;

  // let gReadData = (fs.readFileSync('./testFile.xlsx', 'utf-8'))
  // ctx.body = await writeStream();

  // 这是 二进制 的， 需要返回流
  // let gReadData = Buffer.from(fs.readFileSync('./testFile.xlsx', 'utf-8'))
  // ctx.body = gReadData;
  
  // 第三种方式， 使用插件了
  // const path = './testFile.xlsx';
  // ctx.attachment(path)
  // await send(ctx, path)


})

router.get('/getPDFRandomNum', async (ctx, next) => {
  // console.log('ctx.request.query', ctx.request.query);
  // let {min, max, count, sym = '', digits, numRepeat=1, symPosi=1} = ctx.request.query;
  let filename = 'randomNum';
  ctx.set('Content-Type', 'application/pdf');
  ctx.set('Content-Disposition', 'attachment;filename=' + filename + '.pdf');//attachment
  // ctx.set('Content-Type', 'application/pdf');
  // fs.writeFileSync( './randomNum.pdf', getAllNum(ctx.request.query), { encoding: 'utf8' });
  // let gReadData = fs.readFileSync('./randomNum.pdf', { encoding: 'utf8' })
  // let gReadData = Buffer.from(fs.readFileSync('./randomNum.pdf', 'utf-8'))
  // ctx.success(
  //   gReadData
  // );
  let data = fs.readFileSync(path.resolve(__dirname, '111.pdf'));
  console.log('data', data)
  await createDocx()
  ctx.body = data;

  // let data = Buffer.from(getAllNum(ctx.request.query), 'utf-8');
  


  // let data = fs.createWriteStream()
  // ctx.body =  Buffer.from(data);
})

router.get('/gettest', async (ctx, next) => {
  // console.log(1111)
  ctx.success({
    test: '测试'
  })
})

function createDocx() {
  return new Promise(resolve => {
    let docx = officegen('docx')

    // Officegen calling this function after finishing to generate the docx document:
    docx.on('finalize', function(written) {
      console.log(
        'Finish to create a Microsoft Word document.'
      )
      resolve();
    })


    // Create a new paragraph:
    let pObj = docx.createP()

    pObj.addText('Simple')
    pObj.addText(' with color', { color: '000088' })
    pObj.addText(' and back color.', { color: '00ffff', back: '000088' })

    pObj = docx.createP()

    pObj.addText('Since ')
    pObj.addText('officegen 0.2.12', {
      back: '00ffff',
      shdType: 'pct12',
      shdColor: 'ff0000'
    }) // Use pattern in the background.
    pObj.addText(' you can do ')
    pObj.addText('more cool ', { highlight: true }) // Highlight!
    pObj.addText('stuff!', { highlight: 'darkGreen' }) // Different highlight color.

    pObj = docx.createP()

    pObj.addText('Even add                         ')
    pObj.addText('external link', { link: 'https://github.com' })
    pObj.addText('!')

    pObj = docx.createP()

    pObj.addText('Bold + underline', { bold: true, underline: true })

    pObj = docx.createP({ align: 'center' })

    pObj.addText('Center this text', {
      border: 'dotted',
      borderSize: 12,
      borderColor: '88CCFF'
    })

    pObj = docx.createP()
    pObj.options.align = 'right'

    pObj.addText('Align this text to the right.')

    pObj = docx.createP()

    pObj.addText('Those two lines are in the same paragraph,')
    pObj.addLineBreak()
    pObj.addText('but they are separated by a line break.')

    docx.putPageBreak()

    pObj = docx.createP()

    pObj.addText('Fonts face only.', { font_face: 'Arial' })
    pObj.addText(' Fonts face and size.', { font_face: 'Arial', font_size: 40 })

    docx.putPageBreak()

    pObj = docx.createP()

    // We can even add images:
    // pObj.addImage('some-image.png')

    // Let's generate the Word document into a file:

    let out = fs.createWriteStream(path.resolve(__dirname, './example.docx'))

    out.on('error', function(err) {
      console.log(err)
    })

    // createWriteStream 使用
    // out.on('open', () => {
    //   const blockSize = 128;
    //   const nbBlocks = Math.ceil(fileData.length / (blockSize));
    //   for (let i = 0; i < nbBlocks; i += 1) {
    //    const currentBlock = fileData.slice(
    //     blockSize * i,
    //     Math.min(blockSize * (i + 1), fileData.length),
    //    );
    //    out.write(currentBlock);  currentBlock 写入的数据
    //   }
  
    //   out.end();
    //  });
    //  out.on('error', (err) => { reject(err); });
    //  out.on('finish', () => { resolve(true); });

    // Async call to generate the output file:
    docx.generate(out)
  })
}

module.exports = router;