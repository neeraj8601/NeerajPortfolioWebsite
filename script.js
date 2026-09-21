document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = [...document.querySelectorAll("main section[id]")];
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const nav = document.getElementById("navLinks");
  const themeBtn = document.getElementById("themeBtn");
  const themeIcon = document.getElementById("themeIcon");
  const scrollTop = document.getElementById("scrollTop");
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const toast = document.getElementById("toast");
  const year = document.getElementById("year");

  year.textContent = new Date().getFullYear();

  // Mobile menu
  mobileBtn?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    mobileBtn.setAttribute("aria-expanded", String(open));
    mobileBtn.innerHTML = open
      ? '<i class="bi bi-x-lg"></i>'
      : '<i class="bi bi-list"></i>';
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      mobileBtn.setAttribute("aria-expanded", "false");
      mobileBtn.innerHTML = '<i class="bi bi-list"></i>';
    });
  });

  // Active navigation on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`,
            );
          });
        }
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
  );

  sections.forEach((section) => observer.observe(section));

  // Theme toggle
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "light") {
    body.classList.add("light");
    themeIcon.className = "bi bi-moon-stars-fill";
  }

  themeBtn.addEventListener("click", () => {
    body.classList.toggle("light");
    const light = body.classList.contains("light");
    localStorage.setItem("portfolio-theme", light ? "light" : "dark");
    themeIcon.className = light ? "bi bi-moon-stars-fill" : "bi bi-sun-fill";
    showToast(light ? "Light mode enabled" : "Dark mode enabled");
  });

  // Reveal animation
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );

  document
    .querySelectorAll(".reveal")
    .forEach((el) => revealObserver.observe(el));

  // Scroll-to-top
  window.addEventListener("scroll", () => {
    scrollTop.classList.toggle("show", window.scrollY > 500);
  });
  scrollTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );

  // Contact form: demo interaction
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
      status.textContent = "Please fill in all fields.";
      status.style.color = "#f87171";
      return;
    }

    // Frontend-only demo. Connect this form to Formspree, EmailJS,
    // a Node/Express API, or your own backend for real submissions.
    status.textContent =
      "Message validated successfully. Connect a backend to send it.";
    status.style.color = "#60a5fa";
    form.reset();
  });

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1800);
  }

  // Make placeholder social links explain what to edit instead of navigating.
  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      showToast("Replace this link with your profile URL.");
    });
  });
});
