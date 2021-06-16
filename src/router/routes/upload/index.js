const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const officegen = require('officegen');


let router = Router();

function getRandomNum(min, max) {
  min = +min;
  max = +max;
  return (max - min) * Math.random() + min;
}

// function getAllNum(min, max, count, sym, digits) {
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

router.get('/getRandomNum', async (ctx, next) => {
  // console.log('ctx.request.query', ctx.request.query);
  // let {min, max, count, sym = '', digits, numRepeat=1, symPosi=1} = ctx.request.query;
  let filename = 'randomNum';
  ctx.set('Content-Disposition', 'attachment;filename=' + filename + '.txt');//attachment
  ctx.set('Content-Type', 'application/txt');
  // fs.writeFileSync( './randomNum.txt', '1.111 \n 1.222', { encoding: 'utf8' });
  fs.writeFileSync('./randomNum.txt', getAllNum(ctx.request.query), { encoding: 'utf8' });
  // let gReadData = fs.readFileSync('./randomNum.txt', { encoding: 'utf8' })
  let gReadData = Buffer.from(fs.readFileSync('./randomNum.txt', 'utf-8'))
  // ctx.success(
  //   gReadData
  // );
  ctx.body = gReadData;
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