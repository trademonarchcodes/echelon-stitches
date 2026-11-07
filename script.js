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
  menuButton.setAttribute("aria-label", !isOpen ? "Close navigation" : "Open navigation");
  nav?.classList.toggle("open", !isOpen);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open navigation");
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

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav?.classList.contains("open")) {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open navigation");
    menuButton?.focus();
  }
});


/* Named image slots: uploaded files display automatically; missing files keep the designed fallback. */
document.querySelectorAll(".slot-image").forEach((img) => {
  const showImage = () => {
    img.classList.add("image-loaded");
    const label = img.parentElement?.querySelector(":scope > span");
    if (label) label.style.opacity = "0";
  };
  img.addEventListener("load", showImage);
  img.addEventListener("error", () => img.classList.remove("image-loaded"));
  if (img.complete && img.naturalWidth > 0) showImage();
});
