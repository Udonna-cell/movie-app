const fs = require("fs");
const path = require("path");

function readDir(locate) {
  fs.readdir(path.resolve(__dirname, `${locate}`), (err, data) => {
    if (err) throw "can't read or find folder";
    console.log(data);
  });
}

module.exports = readDir;
