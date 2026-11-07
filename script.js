/* Echelon Stitches — site interactions
   Add the client's WhatsApp number below when it is available.
   Use international format without +, spaces or punctuation. */
const WHATSAPP_NUMBER = "2349138170355";
const WHATSAPP_MESSAGE = "Hello Echelon Stitches! I'd love to enquire about a bespoke outfit.";

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  nav?.classList.toggle("open", !isOpen);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  if (WHATSAPP_NUMBER) {
    const url = new URL("https://wa.me/" + WHATSAPP_NUMBER);
    url.searchParams.set("text", WHATSAPP_MESSAGE);
    link.href = url.toString();
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else {
    link.href = "mailto:?subject=" + encodeURIComponent("Enquiry for Echelon Stitches") +
      "&body=" + encodeURIComponent(WHATSAPP_MESSAGE + "\n\nPlease add the business email address when available.");
    link.addEventListener("click", (event) => {
      event.preventDefault();
      alert("The WhatsApp booking link will be activated when the business number is added.");
    });
  }
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();