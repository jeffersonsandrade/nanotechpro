const root = document.documentElement;
const header = document.querySelector(".header");
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-menu__panel a");
const revealItems = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll(".number-value");
const form = document.getElementById("whatsappForm");

const savedTheme = localStorage.getItem("nanotech-theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
}

themeToggle?.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme") === "light" ? "light" : "dark";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", nextTheme);
  localStorage.setItem("nanotech-theme", nextTheme);
});

function updateHeaderState() {
  if (window.scrollY > 20) {
    header.classList.add("is-scrolled");
  } else {
    header.classList.remove("is-scrolled");
  }
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState);

menuToggle?.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.style.overflow = isOpen ? "hidden" : "";
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

function animateCounter(element, target) {
  const duration = 1400;
  const startTime = performance.now();

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.floor(target * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = target;
    }
  }

  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      if (!el.dataset.animated) {
        animateCounter(el, Number(el.dataset.target));
        el.dataset.animated = "true";
      }

      observer.unobserve(el);
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => counterObserver.observe(counter));

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const whatsapp = document.getElementById("whatsapp").value.trim();
  const servico = document.getElementById("servico").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  const phoneNumber = "5543991059128";

  const text = [
    "Olá, NanoTech Pro!",
    "Gostaria de solicitar uma avaliação técnica.",
    "",
    `Nome: ${nome}`,
    `E-mail: ${email || "-"}`,
    `WhatsApp: ${whatsapp}`,
    `Serviço de interesse: ${servico}`,
    `Necessidade: ${mensagem || "-"}`
  ].join("\n");

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
});