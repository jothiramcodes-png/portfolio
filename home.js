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

// Advanced UI: Particles and Scroll Reveal
document.addEventListener("DOMContentLoaded", () => {
  // Particles
  const container = document.getElementById('particles-container');
  if (container) {
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 12 : 25;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 5 + 2 + 'px';
      particle.style.width = size;
      particle.style.height = size;
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.top = Math.random() * 100 + 'vh';
      particle.style.animationDuration = Math.random() * 10 + 10 + 's';
      particle.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(particle);
    }
  }

  // Scroll Reveal Observer
  const revealItems = document.querySelectorAll('.reveal');
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once revealed, no need to observe anymore
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealItems.forEach(item => observer.observe(item));
});
