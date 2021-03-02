console.log("Hello world!");

//Lo vamos a encerrar en callback
const editFileContent1 = (data) => {
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
    fs.writeFile("p.html", newValue, function () {});
  });
};

const editFileContent2 = (data) => {
  var fs = require("fs");
  fs.readFile("index.html", "utf8", function (err, dt) {
    let s = "";
    for (let i = 0; i < data.length; i++) {
      s +=
        "<tr> <td>" +
        data[i].idCliente +
        "</td> <td>" +
        data[i].NombreCompania +
        "</td> <td>" +
        data[i].NombreContacto +
        "</td> </tr>";
    }
    var n = dt.replace("{{placeholder}}", s);
    fs.writeFile("c.html", n, function () {});
  });
};

//Codigo de axios

const URL =
  "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";

const URL2 =
  "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";

const http = require("http");

const getFileContent = (fil, callback) => {
  const fs = require("fs");
  //La mayoría de funciones de node son asincronas
  fs.readFile(fil, (err, data) => {
    if (err) {
      console.log(err);
    }
    callback(data.toString());
  });
};

http
  .createServer((req, res) => {
    if (req.url == "/api/proveedores") {
      const axios1 = require("axios");
      axios1
        .get(URL)
        .then(function (response1) {
          editFileContent1(response1.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      getFileContent("p.html", (data) => {
        res.end(data);
      });
    }
    if (req.url == "/api/clientes") {
      const axios2 = require("axios");
      axios2
        .get(URL2)
        .then(function (response1) {
          editFileContent2(response1.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });

      getFileContent("c.html", (data) => {
        res.end(data);
      });
    }
  })
  .listen(8081);
