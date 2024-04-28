const video = document.querySelector("video#my-video")
let isPlaying = true;
let forward = document.querySelector("button.forward")
let backward = document.querySelector("button.backward")
let volume = document.querySelector("input[name='volume']")
let copyLink = document.querySelector("button.copy-link")
let streamExtension = video.getAttribute("data")
let movieStream = `http://${window.location.host}${streamExtension}`.replace(/[" "]/g,"%20")

alert(movieStream)

forward.addEventListener("click", ()=>{
    video.currentTime += (45 / 60) 
})
backward.addEventListener("click",()=>{
  video.currentTime -= (45 / 60)
})
volume.addEventListener("input", ()=>{
  let value = parseInt(volume.value)
  video.volume = 1 * value / 100
})
video.addEventListener("click",()=>{
  let controls = document.querySelector("section.controls")
  controls.style.display = "block"
  setTimeout(()=>{
    controls.style.display = "none"
  },5000)
})
window.addEventListener("orientationchange", function() {
});

document.querySelector(".play").addEventListener("click",()=>{
  let icon = document.querySelector("section.controls > .container .play img")
  if(!isPlaying){
    icon.src = "/images/pause_circle_FILL0_wght400_GRAD0_opsz24.svg"
    video.play()
    isPlaying = true
  }else{
    icon.src = "/images/play_circle_FILL0_wght400_GRAD0_opsz24.svg"
    video.pause()
    isPlaying = false
  }
})

copyLink.addEventListener("click", copyToClipboard("ghh"))
function copyToClipboard(texts) {
  let text = movieStream
    const input = document.createElement('input');
    input.style.position = 'fixed';
    input.style.opacity = 0;
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
}
