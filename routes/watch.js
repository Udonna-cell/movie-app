const express = require("express");
const router = express.Router();
const movies = require("../movies.json");
const series = require("../serise.json");
const users = require("../profiles.json");
const { profileData } = require("./profile");
//const watch = require("../watch.json")
const fs = require("fs");
const path = require("path");

router.get("/:title", (req, res, next) => {
  //console.log(profileData)
  req.params.title = req.params.title.split(",");
  let movie = movies.filter((movie) => req.params.title[0] == movie.title)[0];
  if (movie.isSeries) {
    let d = req.params.title;
    movie = series.filter((s) => s.ID == movie.ID)[0].season[parseInt(d[1])][
      parseInt(d[2])
    ];
  }
  //console.log(movie, req.cookies)
  if (req.cookies.name) {
    let watch = fs
      .readFileSync(path.resolve(__dirname, "../watch.json"))
      .toString();
    watch = JSON.parse(watch);
    console.log(watch, ">>");
    let user = users.filter((u) => u.Name == req.cookies.name)[0];
    let watching = watch.filter((w) => {
      //console.log(user.ID, w.userID)
      if (movie.ID == w.movieID && user.ID == w.userID) {
        return true;
      }
    });
    watching = watching.length > 0 ? watching[0] : watching;

    console.log(watching, watch);
    let left = watching.left ? watching.left : 0;
    console.log(left);
    res.render("watch", { movie, left, userID: user.ID });
  } else {
    res.render("profile", profileData(req));
  }
});

router.post("/:title", (req, res, next) => {
  function areObjectsEqual(obj1, obj2) {
    let o1 = parseInt(obj1.movieID);
    let o2 = parseInt(obj2.movieID);
    let m2 = parseInt(obj2.userID);
    let m1 = parseInt(obj1.userID);

    //console.log(`\n`,m1,m2,`\n`)

    if (o1 !== o2 || m1 !== m2) {
      return false;
    } else {
      return true;
    }
  }
  let watch = fs
    .readFileSync(path.resolve(__dirname, "../watch.json"))
    .toString();
  watch = JSON.parse(watch);
  let data = req.body;
  let wd = watch;
  let isNew = false;
  for (let i = 0; i < wd.length; i++) {
    let equal = areObjectsEqual(wd[i], data);
    //console.log(equal,"<<<<>>>>>")
    if (!equal) {
      isNew = true;
    }
  }
  //console.log(data, wd)
  console.log(isNew, "<<new");
  if (wd.length == 0 || isNew) {
    wd.push(data);
    isNew = false;
  } else {
    wd = wd.map((d) => {
      if (d.movieID == data.movieID && d.userID == data.userID) {
        return data;
      } else {
        return d;
      }
    });
  }
  console.log(wd);

  function writeFile() {
    try {
      fs.writeFile(
        path.resolve(__dirname, "../watch.json"),
        JSON.stringify(wd),
        (er) => {
          if (er) throw er;
          console.log("done");
        },
      );
      console.log("File has been written successfully");
    } catch (err) {
      console.error(err);
    }
  }

  writeFile();

  next();
});

module.exports = router;
