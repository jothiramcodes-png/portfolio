// Mobile responsive menu
let menubtn = document.getElementById('menu-btn');
let menu = document.getElementById('menu');
menubtn.addEventListener('click', () => {
    menu.classList.toggle("active");
});

//show button on scrolling
function gohome(){
    document.getElementById("home").scrollIntoView({
        behavior:"smooth"
    })
}

//show the certificate images

  const buttons = document.querySelectorAll(".fullscreen-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const img = btn.previousElementSibling;

      if (img.requestFullscreen) {
        img.requestFullscreen();
      } else if (img.webkitRequestFullscreen) {
        img.webkitRequestFullscreen(); // Safari
      } else if (img.msRequestFullscreen) {
        img.msRequestFullscreen(); // IE11
      }
    });
  });
