document.addEventListener("DOMContentLoaded", function() {
  let watchNowBtn = document.querySelector(".btn-primary.border");
  if (watchNowBtn) {
    watchNowBtn.addEventListener("click", () => {
      let data = watchNowBtn.getAttribute("data");
      if (data) {
        window.location.href = `/watch/${data}`;
      }
    });
  }

  let movieEpisode = document.querySelectorAll("section.card");
  movieEpisode.forEach((card) => {
    card.addEventListener("click", () => {
      let title = card.getAttribute("data-title");
      let season = card.getAttribute("data-s");
      let episode = card.getAttribute("data-e");
      if (title && season && episode) {
        window.location.href = `/watch/${title},${season},${episode}`;
      }
    });
  });
});
