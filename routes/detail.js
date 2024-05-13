const express = require("express");
const router = express.Router();
const movies = require("../movies.json");
const castProfile = require("../cast-profile.json");
const castsInfo = require("../cast.json");
const series = require("../serise.json");

for (const movie of movies) {
  movie.source = `/movies/${movie.source}`;
}

for (const profile of castProfile) {
  profile.profile = `/casts/${profile.profile}`;
}

router.get("/:name", (req, res, next) => {
  const rates = [];
  const movie = movies.find((movie) => req.params.name === movie.title);

  if (!movie) {
    // Handle case where movie is not found
    return res.status(404).send("Movie not found");
  }

  const casts = castsInfo.find((data) => data.ID === movie.ID);
  
  // if (!casts) {
  //   // Handle case where casts information is not found
  //   console.log(null);
  //   return res.status(404).send("Casts information not found");
  // }

  // const castsData = casts.casts.map((data) => {
  //   const profile = castProfile.find((d) => d.ID === data.ID);
  //   return {
  //     ID: data.ID,
  //     character: data.character,
  //     characterPic: data.profile,
  //     name: profile ? profile.Name : "Unknown",
  //     profile: profile ? profile.profile : "",
  //   };
  // });

  let count = 0;
  let seasons = [];
  const seriesData = series.find((d) => movie.ID === d.ID);

  if (seriesData) {
    seasons = seriesData.season || [];
  }

  const data = {
    seasons: seasons.map(() => {
      count++;
      return {
        name: `Season ${count}`,
        value: count,
        checked: count === 1,
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
    // casts: castsData? castsData : false,
    data,
  });
});

module.exports = router;
