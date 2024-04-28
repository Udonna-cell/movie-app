const express = require("express");
const router = express.Router();
const movieData = require("../movies.json");
const usersProfile = require("../profiles.json");
const getMatch = require("../utility/getMatch")
const cookieParser = require("cookie-parser")


for (let i = 0; i < movieData.length; i++) {
  movieData[i].poster = `/poster/${movieData[i].poster}`;
}
for(let i = 0; i < usersProfile.length; i++){
  usersProfile[i].profile = `/profile/${usersProfile[i].profile}`
}
router.get("/:name", (req, res, next) => {
  movieData.sort(() => 0.5 - Math.random());
  let profile = usersProfile.filter((user) => user.Name == req.params.name)[0];
  let isUser = usersProfile.some((user) => user.Name == profile.Name);
  let genres = movieData.map(m => m.genre)
  let picked = getMatch(genres, profile.Genre)
  let forYou = picked.map(i => movieData[i])
  if (isUser) {
    //console.log(forYou, picked, movieData)
    res.cookie("name", req.params.name)
    res.render("home", {
      profile,
      movies: forYou,
      movie: movieData[Math.floor(Math.random() * movieData.length)],
    });
  } else {
    res.render("error");
  }
});

module.exports = router;
