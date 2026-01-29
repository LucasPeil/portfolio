document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.fade-in-up');
  fadeElements.forEach((el) => observer.observe(el));

  // Initialize Swiper Carousel
  const swiper = new Swiper('.featured-projects', {
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: false,
    loop: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  });

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
        });

        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }
      }
    });
  });

  // Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');

      // Optional: Toggle icon between menu and close
      const icon = mobileToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        // You could switch icon here if you want
      }
    });
  }

  // Add sticky header capability (optional enhancement)
  const header = document.querySelector('header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(15, 23, 42, 0.95)';
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
      header.style.background = 'rgba(15, 23, 42, 0.8)';
      header.style.boxShadow = 'none';
    }
  });

  // Add mobile styles dynamically if needed,
  // though CSS media queries handle most of it.
  // We just need to inject the active class style for the mobile menu.
  const style = document.createElement('style');
  style.textContent = `
        @media (max-width: 768px) {
            .nav-links.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: var(--header-height);
                left: 0;
                width: 100%;
                background: var(--bg-secondary);
                padding: 2rem;
                border-bottom: 1px solid var(--glass-border);
                animation: slideDown 0.3s ease-out forwards;
            }

            @keyframes slideDown {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        }
    `;
  document.head.appendChild(style);
});
