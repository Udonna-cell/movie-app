document.querySelectorAll("section.profile").forEach(element =>{
  element.addEventListener("click", ()=>{
    let n = element.getAttribute("data-info")
    window.location.href= `/home/${n}`
  })
})
let newProfile = document.querySelector("button#add")
let form = document.querySelector("section.add-user")
let isFormOpne = false
newProfile.addEventListener("click", ()=>{
  if (!isFormOpne) {
    form.style.display = "block"
    isFormOpne = true
  } else {
    form.ststyle.display = "none"
    isFormOpne = false
  }
})

function profiles() {
  let profilesCard = document.querySelector("section.profiles")
  profilesCard.style.display = "grid"
}
function pick(e) {
  let profilesCard = document.querySelector("section.profiles")
  let profile = document.querySelector("form div.profile img")
  document.querySelector("input[name='profile']").value = e.getAttribute("data")
  profile.src = e.getAttribute("data")
  profilesCard.style.display = "none"
}
