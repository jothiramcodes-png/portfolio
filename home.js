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
    // Find the image within the same card
    const img = btn.closest(".cert-card").querySelector(".certificate-img");

    if (img) {
      if (img.requestFullscreen) {
        img.requestFullscreen();
      } else if (img.webkitRequestFullscreen) {
        img.webkitRequestFullscreen(); // Safari
      } else if (img.msRequestFullscreen) {
        img.msRequestFullscreen(); // IE11
      }
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
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once revealed, no need to observe anymore
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.02,
    rootMargin: "0px 0px -50px 0px"
  });

  revealItems.forEach(item => observer.observe(item));
});

// ===== Professional Animation Enhancements =====
document.addEventListener("DOMContentLoaded", () => {

  // 1. Scroll Progress Bar
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.appendChild(progressBar);

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = docHeight > 0 ? (scrollTop / docHeight) * 100 + '%' : '0%';
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // 2. Mouse Glow Follower (desktop only)
  if (!('ontouchstart' in window)) {
    const glow = document.createElement('div');
    glow.id = 'mouse-glow';
    document.body.appendChild(glow);

    let glowVisible = false;
    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
      if (!glowVisible) {
        glow.style.opacity = '1';
        glowVisible = true;
      }
    });

    document.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
      glowVisible = false;
    });
  }

  // 3. Staggered Reveal for grouped items
  const staggerContainers = document.querySelectorAll(
    '#skill-content, #projects, #certificate, .premium-services-grid, #featured-work, .why-choose-grid, .industries-container'
  );

  staggerContainers.forEach(container => container.classList.add('reveal-stagger'));

  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.02, rootMargin: '0px 0px -50px 0px' });

  staggerContainers.forEach(container => staggerObserver.observe(container));

  // 4. 3D Tilt Effect (desktop only)
  if (!('ontouchstart' in window)) {
    const tiltCards = document.querySelectorAll(
      '#skill-card, .project-card, .cert-card, .premium-service-card, .featured-card, .choose-item'
    );

    tiltCards.forEach(card => {
      card.classList.add('tilt-card');

      const shine = document.createElement('div');
      shine.className = 'shine-overlay';
      if (getComputedStyle(card).position === 'static') {
        card.style.position = 'relative';
      }
      card.appendChild(shine);

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale3d(1.01, 1.01, 1.01)`;

        const px = (x / rect.width) * 100;
        const py = (y / rect.height) * 100;
        shine.style.setProperty('--mouse-x', px + '%');
        shine.style.setProperty('--mouse-y', py + '%');
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // 5. Enhanced Particles (colored, glowing)
  const particlesContainer = document.getElementById('particles-container');
  if (particlesContainer) {
    const colors = ['#a855f7', '#22d3ee', '#c084fc', '#ec4899'];
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('div');
      p.className = 'particle enhanced-particle';
      const size = 4 + Math.random() * 8;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.top = Math.random() * 100 + 'vh';
      p.style.animationDuration = (15 + Math.random() * 15) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.color = p.style.background;
      p.style.boxShadow = '0 0 ' + (size * 2) + 'px currentColor';
      particlesContainer.appendChild(p);
    }
  }

  // 6. Decorative Background Orbs
  const orbColors = [
    'rgba(168, 85, 247, 0.2)',
    'rgba(34, 211, 238, 0.15)',
    'rgba(236, 72, 153, 0.15)'
  ];

  orbColors.forEach((color, i) => {
    const orb = document.createElement('div');
    orb.className = 'bg-orb';
    const size = 250 + Math.random() * 200;
    orb.style.width = size + 'px';
    orb.style.height = size + 'px';
    orb.style.background = color;
    orb.style.top = (15 + Math.random() * 60) + '%';
    orb.style.left = (10 + Math.random() * 60) + '%';
    orb.style.animation = `orbDrift ${18 + Math.random() * 10}s ease-in-out ${i * 4}s infinite`;
    document.body.appendChild(orb);
  });

  // 7. Magnetic Buttons (desktop only)
  if (!('ontouchstart' in window)) {
    const magnets = document.querySelectorAll('.hero-btn, #contact-button');

    magnets.forEach(btn => {
      btn.classList.add('magnetic-btn');

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const dist = Math.sqrt(x * x + y * y);
        const strength = Math.min(dist, 40);
        const angle = Math.atan2(y, x);
        const moveX = Math.cos(angle) * strength * 0.25;
        const moveY = Math.sin(angle) * strength * 0.25;
        btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // 8. Ripple Effect on Buttons
  const rippleButtons = document.querySelectorAll('.hero-btn, #contact-button, #submit-btn, .fullscreen-btn, .live-demo-btn');

  rippleButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
});
