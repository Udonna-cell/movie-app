const express = require("express")
const router = express.Router()
const movies = require("../movies.json")
const series = require("../serise.json")

router.get("/:title", (req, res, next)=> {
  req.params.title = req.params.title.split(",")
  let movie = movies.filter(movie => req.params.title[0] == movie.title)[0]  
  if (movie.isSeries){
    let d = req.params.title
    movie = series.filter((s)=> s.ID == movie.ID)[0].season[parseInt(d[1])][parseInt(d[2])]
  }
  console.log(movie)
  res.render("watch", { movie  })
})

module.exports = router
