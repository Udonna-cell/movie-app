const video = document.querySelector("video#my-video");
const progress = document.querySelector("section.progress")
const progressBar = document.querySelector("div.progress_bar")
let isPlaying = true;
let forward = document.querySelector("button.forward");
let backward = document.querySelector("button.backward");
let volume = document.querySelector("input[name='volume']");
let copyLink = document.querySelector("button.copy-link");
let streamExtension = video.getAttribute("data");
let movieStream = `http://${window.location.host}${streamExtension}`.replace(
  /[" "]/g,
  encodeURIComponent(" "),
);

video.addEventListener("timeupdate", () => {
  progressBar.style.width = ((video.currentTime / video.duration) * 100) + "%"
  let names = window.location.href.split("/")
  names = names[names.length - 1].split(",")
  let isSeries = names.length > 1 ? true : false;
  // alert(isSeries)
  const postData = {
    movieID: video.getAttribute("data-mi"),
    userID: video.getAttribute("data-ui"),
    left: video.currentTime,
    total: video.duration,
    shot: isSeries ? video.getAttribute("data-poster") : video.getAttribute("data-shot"),
    title: isSeries ? names[0] : video.getAttribute("data-title"),
    subtitle: isSeries ? video.getAttribute("data-title") : false,
    isSeries
  };

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

if (forward) {
  forward.addEventListener("click", () => {
    video.currentTime += 10;
    progressBar.style.width = ((video.currentTime / video.duration) * 100) + "%"
  });
}

if (backward) {
  backward.addEventListener("click", () => {
    video.currentTime -= 10;
    progressBar.style.width = ((video.currentTime / video.duration) * 100) + "%"
  });
}

if (volume) {
  volume.addEventListener("input", () => {
    let value = parseInt(volume.value);
    video.volume = (1 * value) / 100;
  });
}

if (video) {
  video.addEventListener("click", () => {
    let controls = document.querySelector("section.controls");
    controls.style.display = "block";
    setTimeout(() => {
      controls.style.display = "none";
    }, 5000);
  });

  video.addEventListener("loadedmetadata", () => {
    let left = parseInt(video.getAttribute("data-left"));
    video.currentTime += left;
    progressBar.style.width = ((video.currentTime / video.duration) * 100) + "%"
    alert(video.duration);
  });
}

if (copyLink) {
  copyLink.addEventListener("click", copyToClipboard);
}

function copyToClipboard() {
  let text = movieStream;
  const input = document.createElement("input");
  input.style.position = "fixed";
  input.style.opacity = "0";
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
}

document.querySelector(".play").addEventListener("click", () => {
  let icon = document.querySelector("section.controls > .container .play img");
  if (!isPlaying) {
    icon.src = "/images/pause_circle_FILL0_wght400_GRAD0_opsz24.svg";
    video.play();
    document.querySelector("div.volume").style.display = "block"
    isPlaying = true;
  } else {
    icon.src = "/images/play_circle_FILL0_wght400_GRAD0_opsz24.svg";
    video.pause();
    document.querySelector("div.volume").style.display = "none"
    isPlaying = false;
  }
});
