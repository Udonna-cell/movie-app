//window.location.reload()
document.querySelectorAll(".watch").forEach((element) => {
  element.addEventListener("click", () => {
    window.location.href = `/detail/${element.getAttribute("data")}`;
  });
});
alert(document.querySelector(".watching figure img").src);
