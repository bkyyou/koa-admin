const xlsx = require("node-xlsx");
const fs = require("fs");
const path = require("path");
const mathjs = require("mathjs");
const Router = require("koa-router");
const multer = require("multer");

// console.log("multer", multer);

let router = Router();

const argv = process.argv;

const math = mathjs.create(mathjs.all, {
  number: "BigNumber",
  precision: 20,
});
const sum = function (m1, m2) {
  // console.log(m1, m2);
  const m = math.evaluate(`${m1} + ${m2 || 0}`).toNumber();
  // console.log('m', m);
  return m;
};

function getXlsxNum(obj) {
  const list = [
    {
      name: "sheet",
      data: [
        // ["data1", "data2", "data3"],
        // ["data1", "data2", "data3"],
        // ["data1", "data4", "data3"],
      ],
    },
  ];
  const data = list[0].data;
  for (const key in obj) {
    data.push([key]);
    for (const key2 in obj[key]) {
      data.push([key2, obj[key][key2]]);
      // data.push([obj[key][key2]]);
    }
  }
  return list;
}
// console.log(111);
// const sheets = xlsx.parse('./333.xlsx');
function getData() {
  const sheets = xlsx.parse(path.join(__dirname, "./333.xlsx"));

  // console.log('111', sheets[0].data[0]);
  const allData = {};

  sheets[0].data.forEach((oneArr, i) => {
    // console.log("oneArr[0]", oneArr);
    if (
      i !== 0 &&
      typeof oneArr[0] === "string" &&
      typeof oneArr[0].split("2022") === "object" &&
      oneArr[0].split("2022").length === 2
    ) {
      // console.log(oneArr[0].split('2022'))
      const name = oneArr[oneArr.length - 1];
      const m = oneArr[0].split("2022")[1].slice(0, 2);
      const oneMoney = oneArr[oneArr.length - 2];
      // console.log('name', name);
      // allData[name] = allData[name] ? allData[name] + oneArr[9] : oneArr[9];
      if (allData[name]) {
        if (typeof allData[name][m] === "number") {
          // console.log('oneArr', oneArr)
          allData[name][m] = sum(allData[name][m], oneMoney);
          // allData[name][m] = allData[name][m] + (oneMoney || 0);
        } else {
          allData[name][m] = oneMoney;
        }
      } else {
        allData[name] = {};
        allData[name][m] = oneMoney;
      }
    }
  });

  return allData;
}
function getUserExcel(file) {
  const sheets = xlsx.parse(path.join(__dirname, "../../../../public/upload/" + file));

  // console.log('111', sheets[0].data[0]);
  const allData = {};

  sheets[0].data.forEach((oneArr, i) => {
    // console.log("oneArr[0]", oneArr);
    if (
      i !== 0 &&
      typeof oneArr[0] === "string" &&
      typeof oneArr[0].split("2022") === "object" &&
      oneArr[0].split("2022").length === 2
    ) {
      // console.log(oneArr[0].split('2022'))
      const name = oneArr[oneArr.length - 1];
      const m = oneArr[0].split("2022")[1].slice(0, 2);
      const oneMoney = oneArr[oneArr.length - 2];
      // console.log('name', name);
      // allData[name] = allData[name] ? allData[name] + oneArr[9] : oneArr[9];
      if (allData[name]) {
        if (typeof allData[name][m] === "number") {
          // console.log('oneArr', oneArr)
          allData[name][m] = sum(allData[name][m], oneMoney);
          // allData[name][m] = allData[name][m] + (oneMoney || 0);
        } else {
          allData[name][m] = oneMoney;
        }
      } else {
        allData[name] = {};
        allData[name][m] = oneMoney;
      }
    }
  });

  return allData;
}
// console.log('all', all);

// console.log(process.argv);
/**
 * node 直接运行
 */
function nodejsGetExcel() {
  const buffer = xlsx.build(getXlsxNum(getData()));
  fs.writeFile("testFile.xlsx", buffer, function (err) {
    if (err) {
      console.log(err, "保存excel出错");
    } else {
      console.log("写入excel成功!!!");
    }
  });
}
if (argv[2] === "nodejsGetExcel") {
  nodejsGetExcel();
}

/**
 * 接口运行
 */
router.post("/downloadExecl", (ctx, next) => {
  ctx.set("Content-Disposition", "attachment;filename=testFile.xlsx"); //attachment
  ctx.set("Content-Type", "application/octet-stream");
  ctx.set("Access-Control-Expose-Headers", "Content-Disposition");

  // const buffer = xlsx.build(getXlsxNum(ctx.request.query));
  // const buffer = xlsx.build(getXlsxNum(getData()));
  const buffer = fs.readFileSync(path.join(__dirname, './333.xlsx'));
  ctx.body = buffer;
});

/**
 * 接收文件
 */
// router.post("/uploadExcel", multer().single('file'), (ctx, next) => {
router.post("/uploadExcel", (ctx, next) => {
  // try {
  //   console.log("ctx.request.query", JSON.stringify(ctx.request.files.file));
  //   const response = fs.writeFileSync( './test.xlsx', ctx.request.files.file, { encoding: 'utf8' });
  // } catch (error) {
  //   console.log('error', error);
  // }

  // ctx.set("Content-Disposition", "attachment;filename=testFile.xlsx"); //attachment
  // ctx.set("Content-Type", "application/octet-stream");
  // ctx.set("Access-Control-Expose-Headers", "Content-Disposition");

  // const buffer = xlsx.build(getXlsxNum(ctx.request.query));
  // const buffer = xlsx.build(getXlsxNum(getData()));
  // ctx.body = buffer;

  let basenameList = [];
  const fileList = ctx.request.files["file"];
  //Array.isArray(fileList) ? fileList : Array(fileList)
  //为了单文件上传和多文件上传都可以读取到正确的路径
  for (let file of Array.isArray(fileList) ? fileList : Array(fileList)) {
    console.log('file', file);
    // file.originalFilename 是上传文件的名称
    basenameList.push(file.newFilename);
  }
  let urlList = [];
  for (let k in basenameList) {
    urlList.push(`${ctx.origin}/${basenameList[k]}`);
  }
  // ctx.body = urlList;

  // fs.writeFileSync('1.xlsx', fileList[0])

  const buffer = xlsx.build(getXlsxNum(getUserExcel(basenameList[0])));
  ctx.body = buffer;
});


/**
 * 接收文件
 */
router.post("/getStudentSource", (ctx, next) => {
  const data = [
    {
      name: 'sheet1',
      data: [
        ['name', 'id', 'source'],
        ['zs', 100, 99],
        ['ls', 100, 99],
        ['ww', 100, 99],
      ]
    }
  ]

  const buffer = xlsx.build(data);
  ctx.body = buffer;
});



module.exports = router;
