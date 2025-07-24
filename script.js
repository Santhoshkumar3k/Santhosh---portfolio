document.addEventListener("DOMContentLoaded", function () {
  // === Floating Animation Delay ===
  const floatables = document.querySelectorAll('.float-up');
  floatables.forEach(el => {
    el.style.animationDelay = `${Math.random() * 2}s`;
  });

  // === Scroll-triggered Fade-in Animation ===
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.project-card, .about-content, .contact-form').forEach(el => {
    observer.observe(el);
  });

  // === Scroll-to-top Button ===
  const scrollTopBtn = document.querySelector('#scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === Contact Form Submission ===
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      fetch("https://formsubmit.co/ajax/santhoshkumar.j7373@gmail.com", {
        method: "POST",
        headers: { 'Accept': 'application/json' },
        body: formData
      })
        .then(response => {
          if (response.ok) {
            contactForm.reset();
            window.location.href = "thankyou.html";
          } else {
            alert("Form submission failed. Please try again.");
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";
          }
        })
        .catch(error => {
          console.error("Error submitting form:", error);
          alert("An error occurred. Please try again.");
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Message";
        });
    });
  }

  // === Mobile Nav Toggle (with icon change) ===
  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("show");
      toggle.classList.toggle("open", isOpen);
    });

    const navItems = document.querySelectorAll(".nav-links a");
    navItems.forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        toggle.classList.remove("open");
      });
    });
  }

  // === Active Nav Highlight on Scroll ===
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // === Fix navbar-line animation to play on each page ===
  const navbarLine = document.querySelector('.navbar-line');
  if (navbarLine) {
    navbarLine.classList.remove('navbar-line');
    void navbarLine.offsetWidth; // trigger reflow
    navbarLine.classList.add('navbar-line');
  }
});
