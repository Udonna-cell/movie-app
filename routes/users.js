var express = require('express');
var router = express.Router();
const path = require("path")
const fs = require("fs");
const { log } = require('debug/src/browser');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let movieFilePath = path.resolve(__dirname,"../public/movies/A Tourist's Guide to Love (2023) (NetNaija.com).mkv")
  const stat = fs.statSync(movieFilePath);
  const fileSize = stat.size;
  const range = req.headers.range

  if (range) {
    const parts = range.replace(/bytes=/,"").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(movieFilePath, {start, end});

    const head = {
      "Content-Ranges": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4"
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4"
    };
    res.writeHead(200, head);
    fs.createReadStream(movieFilePath).pipe(res)
  }
});

module.exports = router;
