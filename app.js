const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const toggle = document.querySelector("[data-nav-toggle]");
const year = document.querySelector("[data-year]");

if (year) year.textContent = String(new Date().getFullYear());

function closeNav() {
  if (!nav || !toggle) return;
  nav.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
}

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-open", open);
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) closeNav();
  });
}

function updateHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealItems = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );

  revealItems.forEach((item) => observer.observe(item));
}
