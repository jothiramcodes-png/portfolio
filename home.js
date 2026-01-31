// Mobile responsive menu
let menubtn = document.getElementById('menu-btn');
let menu = document.getElementById('menu');
menubtn.addEventListener('click', () => {
    menu.classList.toggle("active");
});

//show button on scrolling
const backToTopBtn = document.getElementById("arrow-button");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


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
