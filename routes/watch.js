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
  let isSeries = false;
  if (movie.isSeries) {
    isSeries = true;
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
    res.render("watch", { movie, left, userID: user.ID, isSeries });
  } else {
    res.render("profile", profileData(req));
  }
});

const watchFilePath = path.resolve(__dirname, "../watch.json");

router.post("/:title", (req, res, next) => {
  // Check if objects are equal
  function areObjectsEqual(obj1, obj2) {
    return obj1.movieID === obj2.movieID && obj1.userID === obj2.userID;
  }

  // Read and parse watch data from file
  let watch = [];
  try {
    const watchData = fs.readFileSync(watchFilePath).toString();
    watch = JSON.parse(watchData);
  } catch (error) {
    console.error("Error reading watch data:", error);
  }

  // Check if object is unique based on movieID and userID
  function isUnique(w, index, array) {
    return (
      array.findIndex(
        (item) => item.movieID === w.movieID && item.userID === w.userID,
      ) === index
    );
  }

  // Filter out duplicates
  watch = watch.filter(isUnique);

  let data = req.body;
  let isNew = true;

  // Check if data is new or needs updating
  for (let i = 0; i < watch.length; i++) {
    if (areObjectsEqual(watch[i], data)) {
      isNew = false;
      break;
    }
  }

  if (isNew) {
    watch.push(data);
  } else {
    watch = watch.map((d) => {
      if (d.movieID === data.movieID && d.userID === data.userID) {
        return data;
      } else {
        return d;
      }
    });
  }

  // Write updated watch data to file
  function writeFile() {
    try {
      fs.writeFileSync(watchFilePath, JSON.stringify(watch));
      console.log("File has been written successfully");
    } catch (err) {
      console.error("Error writing file:", err);
    }
  }

  writeFile();

  next();
});

module.exports = router;
