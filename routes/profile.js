const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const usersProfiles = require("../profiles.json");
const getGenre = require("../utility/getGenre");
const movies = require("../movies.json")

router.get("/", (req, res, next) => {
  let genres = getGenre(movies)
  let profiles = []
  let fdata = fs.readdirSync(path.resolve(__dirname, "../public/profile"))
      fdata.forEach((profile) => {
        profiles.push(`/profile/${profile}`);
      });
  let data = {
    user: req.query.user,
    path: req.query.profile,
    type: req.query.type,
  };
  res.render("profile", { profile: usersProfiles, profiles: profiles, genres });
});

module.exports = router;
