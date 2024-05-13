//window.location.reload()
let progress = document.querySelectorAll(".progress")
let progress_bar = document.querySelectorAll(".bar")
progress.forEach((prog, index)=>{
  let parcent = (parseFloat(progress_bar[index].getAttribute("data-left")) / parseFloat(prog.getAttribute("data-total"))) * 100
  progress_bar[index].style.width = parcent + "%"
  // alert(parcent)
})
document.querySelectorAll(".watch").forEach((element) => {
  element.addEventListener("click", () => {
    window.location.href = `/detail/${element.getAttribute("data")}`;
  });
});
// alert(document.querySelector(".watching figure img").src);
