console.log("Hello world!");

//Lo vamos a encerrar en callback
const getFileContent = (callback) => {
  const fs = require("fs");
  //La mayoría de funciones de node son asincronas
  fs.readFile("index.js", (err, data) => {
    if (err) throw err;
    callback(data.toString());
  });
};

getFileContent((data) => {
  console.log(data);
});
