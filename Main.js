/* ========================================================================
 ✅ CORE FEATURES
  - Update year
  - Mobile nav auto-close
  - Blog slider + modal
  - Fullscreen image
  - WhatsApp form submit
========================================================================= */


/* ========================================================================
 ✅ FOOTER YEAR
========================================================================= */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();


/* ========================================================================
 ✅ CLOSE NAV WHEN LINK CLICKED (mobile)
========================================================================= */
const navToggle = document.getElementById("nav-toggle");

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    if (navToggle?.checked) navToggle.checked = false;
  });
});



/* ========================================================================
 ✅ BLOG SLIDER
========================================================================= */
const slidesWrap = document.querySelector(".slides");
const slideItems = Array.from(document.querySelectorAll(".slide"));
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 0;

function goTo(i) {
  if (!slidesWrap || slideItems.length === 0) return;

  const total = slideItems.length;
  index = (i + total) % total;

  const slideWidth =
    slideItems[0].getBoundingClientRect().width + 12; // includes gap

  slidesWrap.scrollTo({
    left: slideWidth * index,
    behavior: "smooth",
  });
}

prevBtn?.addEventListener("click", () => goTo(index - 1));
nextBtn?.addEventListener("click", () => goTo(index + 1));

/* Auto-play */
let autoPlay = setInterval(() => goTo(index + 1), 5000);

slidesWrap?.addEventListener("mouseenter", () => clearInterval(autoPlay));
slidesWrap?.addEventListener("mouseleave", () => {
  autoPlay = setInterval(() => goTo(index + 1), 5000);
});

window.addEventListener("load", () => goTo(0));



/* ========================================================================
 ✅ BLOG MODAL
========================================================================= */
const modal = document.getElementById("blogModal");
const modalImg = document.getElementById("blogModalImg");
const modalText = document.getElementById("blogModalText");
const closeBtn = document.querySelector(".blog-close");

function showModal(img, text) {
  modalImg.src = img;
  modalText.textContent = text;
  modal.style.display = "flex";
  requestAnimationFrame(() => modal.classList.add("show"));
}

function hideModal() {
  modal.classList.remove("show");
  setTimeout(() => (modal.style.display = "none"), 350);
}

/* Slide → modal */
document.querySelectorAll(".slide").forEach(slide => {
  slide.addEventListener("click", () => {
    const img = slide.querySelector("img")?.src;
    const text = slide.querySelector("p")?.innerText || "";

    showModal(img, text);
  });
});

/* Close modal */
closeBtn?.addEventListener("click", hideModal);

/* Click outside -> close */
modal?.addEventListener("click", e => {
  if (e.target === modal) hideModal();
});



/* ========================================================================
 ✅ FULLSCREEN IMAGE
========================================================================= */
modalImg?.addEventListener("click", () => {
  const fullscreen = document.createElement("div");
  fullscreen.className = "fullscreen";

  const img = document.createElement("img");
  img.src = modalImg.src;

  fullscreen.appendChild(img);

  fullscreen.addEventListener("click", () => fullscreen.remove());
  document.body.appendChild(fullscreen);
});



/* ========================================================================
 ✅ WHATSAPP FORM
========================================================================= */
const helpForm = document.getElementById("helpForm");

helpForm?.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("helpName").value.trim();
  const phone = document.getElementById("helpPhone").value.trim();
  const query = document.getElementById("helpQuery").value.trim();

  if (!name || !phone || !query) {
    alert("Please fill all fields.");
    return;
  }

  // Replace with your number
  const yourWhatsAppNumber = "919573923509";

  const text =
    `Hello DRY FLY CONSULTANCY,%0A%0A` +
    `Name: ${encodeURIComponent(name)}%0A` +
    `Phone: ${encodeURIComponent(phone)}%0A` +
    `Query: ${encodeURIComponent(query)}%0A%0A` +
    `Please get back to me.`;

  const url = `https://wa.me/${yourWhatsAppNumber}?text=${text}`;

  window.open(url, "_blank");
});
