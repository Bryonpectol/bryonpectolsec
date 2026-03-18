const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");
const header = document.querySelector(".site-header");
const navLinkItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll(".section, .hero");
const terminalLastLine = document.querySelector(".terminal-body p:last-child");

/* =========================
   MOBILE MENU TOGGLE
========================= */
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.addEventListener("click", (event) => {
    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedMenuButton = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
      navLinks.classList.remove("active");
    }
  });

  navLinkItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}

/* =========================
   HEADER SCROLL EFFECT
========================= */
function updateHeaderOnScroll() {
  if (!header) return;

  if (window.scrollY > 20) {
    header.style.background = "rgba(5, 14, 30, 0.92)";
    header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.25)";
  } else {
    header.style.background = "rgba(5, 14, 30, 0.75)";
    header.style.boxShadow = "none";
  }
}

window.addEventListener("scroll", updateHeaderOnScroll);
updateHeaderOnScroll();

/* =========================
   SCROLL REVEAL ANIMATION
========================= */
sections.forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.15
  }
);

sections.forEach((section) => {
  observer.observe(section);
});

/* =========================
   TERMINAL CURSOR BLINK
========================= */
if (terminalLastLine) {
  let cursorVisible = true;

  setInterval(() => {
    if (cursorVisible) {
      terminalLastLine.textContent = "user@portfolio:~$ ";
    } else {
      terminalLastLine.textContent = "user@portfolio:~$ _";
    }

    cursorVisible = !cursorVisible;
  }, 500);
}
