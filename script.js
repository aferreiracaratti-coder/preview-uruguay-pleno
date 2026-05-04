const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const toast = document.querySelector(".toast");

const showToast = (message) => {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2600);
};

menuToggle?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("nav-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});

nav?.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link) return;
  header.classList.remove("nav-open");
  menuToggle?.setAttribute("aria-expanded", "false");
});

const testimonialImages = [
  "./assets/images/guide-portrait.jpg",
  "./assets/images/coast-walk.jpg",
  "./assets/images/nature-workshop.jpg",
  "./assets/images/rural-table.jpg",
];

const testimonials = [
  {
    quote: "Una experiencia hermosa, conectamos con la naturaleza y con la cultura local de una manera muy auténtica.",
    author: "Mariana, Buenos Aires",
    image: testimonialImages[0],
  },
  {
    quote: "Mercedes tiene una sensibilidad única para mostrar lo mejor de cada lugar y hacerte sentir parte.",
    author: "Luciano, Montevideo",
    image: testimonialImages[1],
  },
  {
    quote: "Súper recomendable. Los paseos son increíbles y se nota el amor por lo que hace.",
    author: "Florencia, Córdoba",
    image: testimonialImages[2],
  },
  {
    quote: "El itinerario fue claro, cuidado y con momentos que no hubiéramos encontrado por nuestra cuenta.",
    author: "Sofía, Porto Alegre",
    image: testimonialImages[3],
  },
];

const testimonialCards = [...document.querySelectorAll(".testimonial-row blockquote")];
const prevButton = document.querySelector("[data-testimonial-prev]");
const nextButton = document.querySelector("[data-testimonial-next]");
let testimonialIndex = 0;

const renderTestimonials = () => {
  testimonialCards.forEach((card, cardIndex) => {
    const testimonial = testimonials[(testimonialIndex + cardIndex) % testimonials.length];
    card.querySelector("img").src = testimonial.image;
    card.querySelector("p").textContent = `"${testimonial.quote}"`;
    card.querySelector("cite").textContent = testimonial.author;
    card.classList.toggle("is-active", cardIndex === 0);
  });
};

prevButton?.addEventListener("click", () => {
  testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
  renderTestimonials();
});

nextButton?.addEventListener("click", () => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  renderTestimonials();
});

document.querySelectorAll('a[href="#reservar"], a[href="#contacto"]').forEach((link) => {
  link.addEventListener("click", () => {
    const label = link.textContent.trim().toLowerCase();
    if (label.includes("reservar")) {
      showToast("Perfecto, te llevo a las opciones de reserva.");
    }
    if (label.includes("asesoramiento")) {
      showToast("Genial, abrimos el bloque de contacto para tu proyecto.");
    }
  });
});

document.querySelectorAll('a[href^="https://wa.me"]').forEach((link) => {
  link.addEventListener("click", () => {
    showToast("Abrimos WhatsApp en una pestaña nueva.");
  });
});

renderTestimonials();
