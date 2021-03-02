console.log("Hello world!");

//Lo vamos a encerrar en callback
const editFileContent = (data) => {
  var fs = require("fs");
  fs.readFile("index.html", "utf8", function (err, dt) {
    let s = "";
    for (let i = 0; i < data.length; i++) {
      s +=
        "<tr> <td>" +
        data[i].idproveedor +
        "</td> <td>" +
        data[i].nombrecompania +
        "</td> <td>" +
        data[i].nombrecontacto +
        "</td> </tr>";
    }
    var newValue = dt.replace("{{placeholder}}", s);
    fs.writeFile("index.html", newValue, function () {
      console.log(newValue);
    });
  });
};

//Codigo de axios

const axios = require("axios");

const URL =
  "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
axios
  .get(URL)
  .then(function (response) {
    editFileContent(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

//PRIMERO: AGARRAMOS LOS ARCHIVOS DEL AXIOS, LOS LEEMOS
//SEGUNDO: AGREGAR AL DOM LOS ELEMENTOS DE LA TABLA DESDE JS
//TERCERO: (YA HECHO) MANDARLO AL SERVIR POR HTTP (aqui tenemos que ver la varación de url)

//Vamos a armar el servidor

const http = require("http");

const getFileContent = (callback) => {
  const fs = require("fs");
  //La mayoría de funciones de node son asincronas
  fs.readFile("index.html", (err, data) => {
    if (err) throw err;
    callback(data.toString());
  });
};

http
  .createServer((req, res) => {
    getFileContent((data) => {
      res.end(data);
    });
  })
  .listen(8081);
