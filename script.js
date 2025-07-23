// Floating animation delay
document.addEventListener('DOMContentLoaded', () => {
  const floatables = document.querySelectorAll('.float-up');
  floatables.forEach(el => {
    el.style.animationDelay = `${Math.random() * 2}s`;
  });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Scroll animation (fade-in)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.project-card, .about-content, .contact-form').forEach(el => {
  observer.observe(el);
});

// Optional: Scroll to top button
const scrollTopBtn = document.querySelector('#scrollTop');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Contact form submission using JS to avoid redirect issue
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop default submission

    const formData = new FormData(contactForm);
    
    // Disable button to prevent resubmission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    fetch("https://formsubmit.co/ajax/santhoshkumar.j7373@gmail.com", {
      method: "POST",
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    })
    .then(response => {
      if (response.ok) {
        // Reset form after success
        contactForm.reset();
        // Redirect to thank you page
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
