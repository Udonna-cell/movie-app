const express = require("express");
const router = express.Router();
const movies = require("../movies.json");
const castProfile = require("../cast-profile.json");
const castsInfo = require("../cast.json");
const series = require("../serise.json");

for (let i = 0; i < movies.length; i++) {
  // movies[i].poster = `/poster/${movies[i].poster}`
  movies[i].source = `/movies/${movies[i].source}`;
}
for (let i = 0; i < castProfile.length; i++) {
  castProfile[i].profile = `/casts/${castProfile[i].profile}`;
}
router.get("/:name", (req, res, next) => {
  let rates = [];
  let movie = movies.filter((movie) => req.params.name == movie.title)[0];

  let casts = castsInfo.filter((data) => data.ID == movie.ID)[0];
  if (casts == undefined) {
    console.log(null);
  } else {
    casts = casts.casts.map((data) => {
      let odj = {
        ID: data.ID,
        character: data.character,
        characterPic: data.profile,
        name: castProfile.filter((d) => d.ID == data.ID)[0].Name,
        profile: castProfile.filter((d) => d.ID == data.ID)[0].profile,
      };
      return odj;
    });
  }
  let count = 0;
  let seasons = series.filter((d) => movie.ID == d.ID);
  seasons = seasons[0] == undefined ? [] : seasons[0].season;

  let data = {
    seasons: seasons.map(() => {
      count++;
      return {
        name: `Sesson ${count}`,
        value: count,
        checked: count == 1 ? true : false,
      };
    }),
    episodes: seasons,
  };
  console.log(data.seasons);
  console.log(req.cookies);
  res.render("detail", {
    movie,
    year: new Date().getFullYear(),
    rates,
    casts,
    data,
  });
});

module.exports = router;
