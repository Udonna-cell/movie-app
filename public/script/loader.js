setTimeout(() => {
  document.querySelector("section.loader").style.display = "none";
  let body = document.body;
  body.classList.remove("loader");
}, 2000);
