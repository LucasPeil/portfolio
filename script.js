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

  // Removed Swiper

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
    // Contact Form Submit Handling (WhatsApp)
    const whatsappForm = document.getElementById('whatsappForm');
    const waMessage = document.getElementById('waMessage');
    const charCount = document.getElementById('charCount');

    // Update character count on input
    if (waMessage && charCount) {
        waMessage.addEventListener('input', function () {
            const currentLength = this.value.length;
            charCount.textContent = `${currentLength} / 150 caracteres`;

            // Changed from --text-muted to --text-secondary to match your styles.css
            if (currentLength >= 140) {
                charCount.style.color = '#ff6b6b'; // Redish color for alert
            } else {
                charCount.style.color = 'var(--text-secondary)';
            }
        });
    }

    if (whatsappForm) {
        whatsappForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('waName').value;
            const message = document.getElementById('waMessage').value;
      
            const numeroWhatsApp = '5553981157066';

            const textoFormatado = `Olá, meu nome é ${name}.%0A%0A${message}`;
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${textoFormatado}`;

            window.open(urlWhatsApp, '_blank');
            whatsappForm.reset();
            
            // Reset character count display after submitting
            if (charCount) {
                charCount.textContent = '0 / 150 caracteres';
                charCount.style.color = 'var(--text-secondary)';
            }
        });
    }
});
