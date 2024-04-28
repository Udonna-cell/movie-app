let watchNowBtn = document.querySelector(".btn-primary.border");
watchNowBtn.addEventListener("click", () => {
  window.location.href = `/watch/${watchNowBtn.getAttribute("data")}`;
});

let movieEpisode = document.querySelectorAll("section.card");
movieEpisode.forEach((k, i) => {
  movieEpisode[i].addEventListener("click", () => {
    window.location.href = `/watch/${movieEpisode[i].getAttribute("data-title")},${movieEpisode[i].getAttribute("data-s")},${movieEpisode[i].getAttribute("data-e")}`;
  });
});
