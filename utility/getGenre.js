function getGenre(movies) {
  movies = movies
    .map((m) => m.genre.toLowerCase())
    .map((g) =>
      g
        .replace(/["/"]/g, ",")
        .split(",")
        .map((r) => r.trim()),
    );

  let genres = [];
  movies.forEach((m) => {
    genres.push(...m);
  });
  genres = genres.filter((d, i, a) => i == a.lastIndexOf(d));
  return genres;
}

module.exports = getGenre;
