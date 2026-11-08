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

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px 60px 0px" });
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
}

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


document.querySelectorAll(".brand-logo").forEach((img) => {
  const showLogo = () => img.classList.add("image-loaded");
  img.addEventListener("load", showLogo);
  img.addEventListener("error", () => img.classList.remove("image-loaded"));
  if (img.complete && img.naturalWidth > 0) showLogo();
});


/* Full image catalogue: every unique uploaded image in the product/detail folders. */
const ECHELON_ALL_IMAGES = ["craft-details/beige-striped-fabric-garment-detail.jpg","craft-details/blue-embroidery-work-detail.jpg","craft-details/blue-woven-fabric-detail.jpg","menswear/black-embroidered-top-mannequin.jpg","menswear/black-kaftan-model.jpg","menswear/black-tailored-trousers-detail.jpg","menswear/blush-pink-traditional-set-model.jpg","menswear/burgundy-embroidered-set-flatlay.jpg","menswear/charcoal-traditional-set-model.jpg","menswear/chocolate-kaftan-model.jpg","menswear/cream-smart-casual-set-model.jpg","menswear/lilac-two-piece-model.jpg","menswear/lime-green-outfit-flatlay.jpg","menswear/lime-short-sleeve-set-mannequin.jpg","menswear/mauve-kaftan-model.jpg","menswear/midnight-blue-kaftan-model.jpg","menswear/mustard-embroidered-set-flatlay.jpg","menswear/olive-outfit-mannequin.jpg","menswear/plum-kaftan-model.jpg","menswear/printed-casual-shirt-model.jpg","menswear/purple-traditional-set-model.jpg","menswear/royal-blue-traditional-set-mannequin.jpg","menswear/sand-kaftan-model.jpg","menswear/white-embroidered-kaftan-flatlay.jpg","menswear/white-graphic-casual-set-model.jpg","review-needed/purple-childrenswear-illustration.jpg","review-needed/stylised-black-dress-illustration.jpg","review-needed/stylised-pink-dress-illustration.jpg","womenswear/matching-red-black-womenswear.jpg","womenswear/orange-patterned-occasionwear-mannequin.jpg","womenswear/printed-occasion-dress-model.jpg"];
const allPhotosGrid = document.querySelector("#allPhotosGrid");
if (allPhotosGrid) {
  const readableName = (path) => path.split("/").pop().replace(/\\.(jpg|jpeg|png|webp)$/i, "").replace(/[-_]+/g, " ").replace(/\\b\\w/g, (letter) => letter.toUpperCase());
  ECHELON_ALL_IMAGES.forEach((path, index) => {
    const category = path.split("/")[0].replace(/-/g, " ").toUpperCase();
    const card = document.createElement("figure");
    card.className = "all-photo-card";
    const image = document.createElement("img");
    image.src = path;
    image.alt = "Echelon Stitches fashion look";
    image.loading = "lazy";
    image.decoding = "async";
    image.addEventListener("error", () => card.classList.add("is-broken"), { once: true });
    card.append(image);
    allPhotosGrid.append(card);
  });
}
