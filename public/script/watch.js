const video = document.querySelector("video#my-video");
let isPlaying = true;
let forward = document.querySelector("button.forward");
let backward = document.querySelector("button.backward");
let volume = document.querySelector("input[name='volume']");
let copyLink = document.querySelector("button.copy-link");
let streamExtension = video.getAttribute("data");
let movieStream = `http://${window.location.host}${streamExtension}`.replace(
  /[" "]/g,
  "%20",
);

//alert(window.location.href)

video.addEventListener("timeupdate", () => {
  // Define the data to be sent in the request
  const postData = {
    movieID: video.getAttribute("data-mi"),
    userID: video.getAttribute("data-ui"),
    left: video.currentTime,
    total: video.duration,
    shot: video.getAttribute("data-shot"),
    title: video.getAttribute("data-title"),
    isSeries: video.getAttribute("data-series"),
  };

  // Make a POST request using fetch
  fetch(`${window.location.href}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error in POST request");
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

forward.addEventListener("click", () => {
  video.currentTime += 10;
});
backward.addEventListener("click", () => {
  video.currentTime -= 10;
});
volume.addEventListener("input", () => {
  let value = parseInt(volume.value);
  video.volume = (1 * value) / 100;
});
video.addEventListener("click", () => {
  let controls = document.querySelector("section.controls");
  controls.style.display = "block";
  setTimeout(() => {
    controls.style.display = "none";
  }, 5000);
});
window.addEventListener("orientationchange", function () {});

video.addEventListener("loadedmetadata", () => {
  let left = parseInt(video.getAttribute("data-left"));
  video.currentTime += left;
  alert(left);
});

document.querySelector(".play").addEventListener("click", () => {
  let icon = document.querySelector("section.controls > .container .play img");
  if (!isPlaying) {
    icon.src = "/images/pause_circle_FILL0_wght400_GRAD0_opsz24.svg";
    video.play();
    isPlaying = true;
  } else {
    icon.src = "/images/play_circle_FILL0_wght400_GRAD0_opsz24.svg";
    video.pause();
    isPlaying = false;
  }
});

copyLink.addEventListener("click", copyToClipboard("ghh"));
function copyToClipboard(texts) {
  let text = movieStream;
  const input = document.createElement("input");
  input.style.position = "fixed";
  input.style.opacity = 0;
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
}
