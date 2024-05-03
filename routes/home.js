const express = require("express");
const router = express.Router();
const movieData = require("../movies.json");
const usersProfile = require("../profiles.json");
const getMatch = require("../utility/getMatch");
const fs = require("fs");
const path = require("path");

for (let i = 0; i < movieData.length; i++) {
  movieData[i].poster = `/poster/${movieData[i].poster}`;
  movieData[i].screenshot = `/poster/${movieData[i].screenshot}`;
}
for (let i = 0; i < usersProfile.length; i++) {
  usersProfile[i].profile = `/profile/${usersProfile[i].profile}`;
}
router.get("/:name", (req, res, next) => {
  let watchs = fs
    .readFileSync(path.resolve(__dirname, "../watch.json"))
    .toString();
  watchs = JSON.parse(watchs);
  movieData.sort(() => 0.5 - Math.random());
  let profile = usersProfile.filter((user) => user.Name == req.params.name)[0];
  let isUser = usersProfile.some((user) => user.Name == profile.Name);
  let genres = movieData.map((m) => m.genre);
  let picked = getMatch(genres, profile.Genre);
  let forYou = picked.map((i) => movieData[i]);
  if (isUser) {
    let userID = profile;
    console.log(userID);
    watchs = watchs.filter(
      (watch) => parseInt(watch.userID) == parseInt(profile.ID),
    );

    if (watchs.length == 0) {
      watchs = 0;
    }
    console.log(watchs);
    res.cookie("name", req.params.name);
    res.render("home", {
      profile,
      watchs,
      movies: forYou,
      movie: movieData[Math.floor(Math.random() * movieData.length)],
    });
  } else {
    res.render("error");
  }
});

module.exports = router;
